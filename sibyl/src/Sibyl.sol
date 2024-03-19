// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Sibyl is AccessControl, Pausable {
    event QueryRequest(uint256 requestId, Query query);
    event QueryResponse(uint256 requestId, Response response);

    struct Query {
        string question;
        ResponseType responseType;
        AIModel model;
    }

    enum ResponseType {
        Bool,
        Int,
        String,
        Error
    }

    enum AIModel {
        Gemini,
        GPT4,
        GPT3,
        Claude
    }

    enum RequestStatus {
        Pending,
        Responded,
        Failed
    }

    struct Response {
        ResponseType responseType;
        uint256 integerResponse;
        string stringResponse;
        bool boolResponse;
    }

    uint256 private requestCounter;
    mapping(uint256 => RequestStatus) private requestStatus;

    // Public functionality
    function query(Query calldata queryData) public returns (uint256) {
        uint256 requestId = requestCounter++;
        requestStatus[requestId] = RequestStatus.Pending;
        emit QueryRequest(requestId, queryData);
        return requestId;
    }

    // Data provider functionality
    function respond(
        uint256 requestId,
        Response calldata response
    ) public onlyRole(DATA_PROVIDER_ROLE) {
        require(
            requestStatus[requestId] == RequestStatus.Pending,
            "Request is not pending"
        );

        requestStatus[requestId] = RequestStatus.Responded;
        emit QueryResponse(requestId, response);
    }

    function markRequestAsFailed(
        uint256 requestId
    ) public onlyRole(DATA_PROVIDER_ROLE) {
        require(
            requestStatus[requestId] == RequestStatus.Pending,
            "Request is not pending"
        );

        requestStatus[requestId] = RequestStatus.Failed;
        emit QueryResponse(
            requestId,
            Response(ResponseType.Error, 0, "", false)
        );
    }

    // Admin functionality
    constructor(address defaultAdmin) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }

    bytes32 public constant DATA_PROVIDER_ROLE =
        keccak256("DATA_PROVIDER_ROLE");

    function registerDataProvider(
        address _newProvider
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _grantRole(DATA_PROVIDER_ROLE, _newProvider);
    }

    function removeDataProvider(
        address _provider
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        _revokeRole(DATA_PROVIDER_ROLE, _provider);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
