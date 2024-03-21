from hexbytes import HexBytes
from web3 import AsyncWeb3
import json
from models import QueryRequestedEvent, ResponseType
from dotenv import load_dotenv
import os

load_dotenv()


async def setup():
    contract_deployer_address = os.environ.get("CONTRACT_DEPLOYER_ADDRESS")
    assert contract_deployer_address, "CONTRACT_DEPLOYER_ADDRESS not set"

    contract_address = os.environ.get("CONTRACT_ADDRESS")
    assert contract_address, "CONTRACT_ADDRESS not set"
    contract_address = w3.to_checksum_address(contract_address)

    w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider("http://127.0.0.1:8545"))
    w3.eth.default_account = contract_deployer_address
    assert await w3.is_connected(), "Web3 connection failed"

    # Define the smart contract address and ABI
    with open("./abi/Sibyl.json", "r") as abi_file:
        abi = json.load(abi_file)["abi"]

    contract = w3.eth.contract(address=contract_address, abi=abi)
    return contract


async def fulfill_request(
    sibyl, query_requested_event: QueryRequestedEvent, response: bool | int | str
):
    print(f"Fulfilling request: {query_requested_event}, {response}")
    response_dict = {
        "integerResponse": (
            response if query_requested_event.responseType == ResponseType.INT else 0
        ),
        "stringResponse": (
            response
            if query_requested_event.responseType == ResponseType.STRING
            else ""
        ),
        "boolResponse": (
            response
            if query_requested_event.responseType == ResponseType.BOOL
            else False
        ),
    }

    tx_hash = await sibyl.functions.fulfillRequest(
        query_requested_event.requestId,
        (
            response_dict["integerResponse"],
            response_dict["stringResponse"],
            response_dict["boolResponse"],
        ),
    ).transact()
    print(f"Tx hash: {tx_hash.hex()}")


async def cancel_pending_request(sibyl, query_requested_event: QueryRequestedEvent):
    print(f"Cancelling request: {query_requested_event}")
    tx_hash = await sibyl.functions.cancelPendingRequest(
        query_requested_event.requestId
    ).transact()
    print(f"Tx hash: {tx_hash.hex()}")
    return tx_hash


async def handle_events(sibyl, async_callback):
    print("Listening for events on Sibyl contract...")
    event_filter = await sibyl.events["QueryRequested"].create_filter(
        fromBlock="latest"
    )

    # Start listening for events
    # TODO improve this
    while True:
        for event in await event_filter.get_new_entries():
            print(f"New event received: {event.args}")
            query_requested = QueryRequestedEvent(**event.args)
            try:
                response = await async_callback(query_requested)
                print(f"Got response from LLM: {response}, {type(response)}")
                await fulfill_request(sibyl, query_requested, response)
            except Exception as e:
                print(f"Error getting response from LLM: {e}")
                await cancel_pending_request(sibyl, query_requested)


# TEST FUNCTIONS. These are not part of the main application
async def _query(sibyl, question) -> HexBytes:
    """
    Submit a query to the Sibyl contract
    """
    price_per_char = await sibyl.functions.getCurrentPrice().call()
    cost = 10 * price_per_char * len(question)

    tx_hash = await sibyl.functions.query(
        question,
        2,  # ResponseType
    ).transact({"value": cost})

    return tx_hash


async def _submit_sample_question(sibyl):
    question = "What is the capital of Japan?"
    tx_hash = await _query(sibyl, question)
    print(f"Tx hash: {tx_hash.hex()}")
