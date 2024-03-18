// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract Sibyl {
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
        GPT3,
        GPT4,
        Gemini,
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
}
