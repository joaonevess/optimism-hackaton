// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/Ownable.sol";

contract Sibyl is Ownable {
    constructor(address initialOwner) Ownable(initialOwner) {}

    event QueryRequest(uint256 requestId, Query query);
    event QueryResponse(uint256 requestId, bytes response);

    struct Query {
        string question;
        ResponseType responseType;
        AIModel model;
    }

    enum ResponseType {
        Bool,
        Int,
        String
    }

    enum AIModel {
        Gemini,
        GPT4,
        GPT3,
        Claude
    }

    uint256 private requestCounter;
    mapping(address => bool) private oracleDataProviders;
    mapping(uint256 => bool) private pendingRequests;

    function query(Query calldata queryData) public returns (uint256) {
        uint256 requestId = requestCounter++;
        pendingRequests[requestId] = true;
        emit QueryRequest(requestId, queryData);
        return requestId;
    }

    function respond(uint256 requestId, bytes memory response) external {
        require(oracleDataProviders[msg.sender], "Unknown data provider");
        require(pendingRequests[requestId], "Request is not pending");

        pendingRequests[requestId] = false;
        emit QueryResponse(requestId, response);
    }

    // Management
    function addDataProvider(address dataProvider) external onlyOwner {
        oracleDataProviders[dataProvider] = true;
    }

    function removeDataProvider(address dataProvider) external onlyOwner {
        delete oracleDataProviders[dataProvider];
    }
}
