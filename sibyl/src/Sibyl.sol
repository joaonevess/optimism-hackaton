// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/Pausable.sol";

contract Sibyl is AccessControl, Pausable {
    // TODO: Ideally, the function's key would be a hash of the caller address + allinfo (or date?)
    event QueryRequested(
        uint256 requestId,
        string question,
        ResponseType responseType,
        address indexed callerAddress
    );

    event QueryCompleted(uint256 indexed requestId);

    struct Query {
        string question;
        RequestStatus status;
        Response response;
        ResponseType responseType;
    }

    enum RequestStatus {
        Pending,
        Responded,
        Failed
    }

    enum ResponseType {
        Bool,
        Int,
        String
    }

    struct Response {
        bool boolResponse;
        uint256 integerResponse;
        string stringResponse;
    }

    uint256 pricePerInputChar;
    uint256 private requestCounter;
    mapping(uint256 => Query) private requests;

    // Public functionality
    function query(
        string memory question,
        ResponseType responseType
    ) public payable whenNotPaused returns (uint256) {
        require(bytes(question).length > 0, "Sibyl: Question cannot be empty");

        require(
            msg.value >= bytes(question).length * pricePerInputChar,
            "Sibyl: Insufficient funds"
        );

        uint256 requestId = requestCounter++;
        requests[requestId] = Query(
            question,
            RequestStatus.Pending,
            Response(false, 0, ""),
            responseType
        );
        emit QueryRequested(requestId, question, responseType, msg.sender);
        return requestId;
    }

    function getCurrentPrice() public view returns (uint256) {
        return pricePerInputChar;
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
    bytes32 public constant DATA_PROVIDER_ROLE =
        keccak256("DATA_PROVIDER_ROLE");
    modifier onlyDataProvider() {
        require(
            hasRole(DATA_PROVIDER_ROLE, msg.sender),
            "Sibyl: Only data provider can call this function"
        );
        _;
    }

    function fulfillRequest(
        uint256 requestId,
        Response calldata response
    ) public onlyDataProvider whenNotPaused {
        require(
            requests[requestId].status == RequestStatus.Pending,
            "Sibyl: Request is not Pending"
        );

        requests[requestId].response = response;
        requests[requestId].status = RequestStatus.Responded;
        emit QueryCompleted(requestId);
    }

    function cancelPendingRequest(
        uint256 requestId
    ) public onlyDataProvider whenNotPaused {
        require(
            requests[requestId].status == RequestStatus.Pending,
            "Sibyl: Request is not pending"
        );

        requests[requestId].status = RequestStatus.Failed;

        emit QueryCompleted(requestId);
    }

    // Admin functionality
    address payable public adminAddress;
    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(DATA_PROVIDER_ROLE, msg.sender);
        adminAddress = payable(msg.sender);
        pricePerInputChar = 0.00001 ether; // todo set a reasonable price per char
    }

    modifier onlyAdmin() {
        require(
            hasRole(DEFAULT_ADMIN_ROLE, msg.sender),
            "Sibyl: Only admin can call this function"
        );
        _;
    }

    function setNewPrice(uint256 _price) public onlyAdmin {
        pricePerInputChar = _price;
    }

    // Helper function to read the balance of this contract
    // access control is not required because it's a view function and contract balance is public data
    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }

    // Function to withdraw all Ether from this contract to the admin
    function drainFunds() public onlyAdmin {
        uint256 amount = address(this).balance;

        (bool success, ) = adminAddress.call{value: amount}("");
        require(success, "Sibyl: Failed to send Ether");
    }

    // Function to withdraw a specific amount of Ether from this contract to the admin
    function withdraw(uint256 _amount) public onlyAdmin {
        (bool success, ) = adminAddress.call{value: _amount}("");
        require(success, "Sibyl: Failed to send Ether");
    }

    // Function to send Ether from this contract to an arbitrary address
    function sendEther(address payable _to, uint256 _amount) public onlyAdmin {
        (bool success, ) = _to.call{value: _amount}("");
        require(success, "Sibyl: Failed to send Ether");
    }

    event DataProviderRegistered(address provider);
    event DataProviderRemoved(address provider);

    function registerDataProvider(address _newProvider) public onlyAdmin {
        require(
            !hasRole(DATA_PROVIDER_ROLE, _newProvider),
            "Sibyl: Address is already a provider"
        );

        _grantRole(DATA_PROVIDER_ROLE, _newProvider);
        emit DataProviderRegistered(_newProvider);
    }

    function removeDataProvider(address _provider) public onlyAdmin {
        require(
            hasRole(DATA_PROVIDER_ROLE, _provider),
            "Sibyl: Address is not a provider"
        );

        _revokeRole(DATA_PROVIDER_ROLE, _provider);
        emit DataProviderRemoved(_provider);
    }

    function transferAdmin(address _newAdmin) public onlyAdmin {
        _grantRole(DEFAULT_ADMIN_ROLE, _newAdmin);
        adminAddress = payable(_newAdmin);

        _revokeRole(DEFAULT_ADMIN_ROLE, msg.sender);
    }

    function pause() public onlyAdmin {
        _pause();
    }

    function unpause() public onlyAdmin {
        _unpause();
    }
}
