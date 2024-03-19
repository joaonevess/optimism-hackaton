// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Sibyl is AccessControl, Pausable {
    event QueryRequested(
        uint256 requestId,
        string question,
        AIModel model,
        ResponseType responseType
    );
    event QueryCompleted(uint256 requestId);

    struct Query {
        string question;
        RequestStatus status;
        AIModel model;
        Response response;
        ResponseType responseType;
    }

    enum RequestStatus {
        Pending,
        Responded,
        Failed
    }

    enum AIModel {
        Gemini,
        GPT4,
        GPT3,
        Claude
    }

    enum ResponseType {
        Bool,
        Int,
        String
    }

    struct Response {
        uint256 integerResponse;
        string stringResponse;
        bool boolResponse;
    }

    uint256 private requestCounter;
    mapping(uint256 => Query) private requests;

    // Public functionality
    function query(
        string memory question,
        AIModel model,
        ResponseType responseType
    ) public whenNotPaused returns (uint256) {
        require(bytes(question).length > 0, "Sibyl: Question cannot be empty");

        uint256 requestId = requestCounter++;
        requests[requestId] = Query(
            question,
            RequestStatus.Pending,
            model,
            Response(0, "", false),
            responseType
        );
        emit QueryRequested(requestId, question, model, responseType);
        return requestId;
    }

    function readResponse(
        uint256 requestId
    ) public view returns (Response memory) {
        require(requestId < requestCounter, "Sibyl: Invalid request ID");

        require(
            requests[requestId].status == RequestStatus.Responded,
            "Sibyl: Request is not responded"
        );

        return requests[requestId].response;
    }

    function getQueryStatus(
        uint256 requestId
    ) public view returns (RequestStatus) {
        require(requestId < requestCounter, "Sibyl: Invalid request ID");

        return requests[requestId].status;
    }

    // Data provider functionality
    function fulfillRequest(
        uint256 requestId,
        Response calldata response
    ) public onlyRole(DATA_PROVIDER_ROLE) whenNotPaused {
        require(
            requests[requestId].status == RequestStatus.Pending,
            "Sibyl: Request is not Pending"
        );

        requests[requestId].response = response;
        requests[requestId].status = RequestStatus.Responded;
        emit QueryCompleted(requestId);
    }

    function markRequestAsFailed(
        uint256 requestId
    ) public onlyRole(DATA_PROVIDER_ROLE) whenNotPaused {
        require(
            requests[requestId].status == RequestStatus.Pending,
            "Sibyl: Request is not pending"
        );

        requests[requestId].status = RequestStatus.Failed;

        emit QueryCompleted(requestId);
    }

    // Admin functionality
    constructor(address defaultAdmin) {
        _grantRole(DEFAULT_ADMIN_ROLE, defaultAdmin);
    }
    event DataProviderRegistered(address provider);
    event DataProviderRemoved(address provider);

    bytes32 public constant DATA_PROVIDER_ROLE =
        keccak256("DATA_PROVIDER_ROLE");

    function registerDataProvider(
        address _newProvider
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            !hasRole(DATA_PROVIDER_ROLE, _newProvider),
            "Sibyl: Address is already a provider"
        );

        _grantRole(DATA_PROVIDER_ROLE, _newProvider);
        emit DataProviderRegistered(_newProvider);
    }

    function removeDataProvider(
        address _provider
    ) public onlyRole(DEFAULT_ADMIN_ROLE) {
        require(
            hasRole(DATA_PROVIDER_ROLE, _provider),
            "Sibyl: Address is not a provider"
        );

        _revokeRole(DATA_PROVIDER_ROLE, _provider);
        emit DataProviderRemoved(_provider);
    }

    function pause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(DEFAULT_ADMIN_ROLE) {
        _unpause();
    }
}
