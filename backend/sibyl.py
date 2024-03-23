from hexbytes import HexBytes
from web3 import AsyncWeb3
import json
from models import QueryRequestedEvent, ResponseType
from dotenv import load_dotenv
import os

load_dotenv()


async def setup():
    with open("./abi/Sibyl.json", "r") as abi_file:
        abi = json.load(abi_file)["abi"]

    owner_address = os.getenv("SIBYL_CONTRACT_OWNER_ADDRESS")
    assert owner_address, "Contract owner address not set in .env file"

    contract_address = os.getenv("SIBYL_CONTRACT_ADDRESS")
    assert contract_address, "Sibyl contract address not set in .env file"

    rpc_data_provider = os.getenv("OPTIMISM_RPC_URL")
    assert rpc_data_provider, "Optimism RPC URL not set in .env file"

    w3 = AsyncWeb3(AsyncWeb3.AsyncHTTPProvider(rpc_data_provider))
    w3.eth.default_account = owner_address
    assert await w3.is_connected(), "Web3 connection failed"

    # Set the smart contract address and ABI
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
            response_dict["boolResponse"],
            response_dict["integerResponse"],
            response_dict["stringResponse"],
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


import time


async def handle_events(sibyl, async_callback):
    print("Listening for events on Sibyl contract...")
    event_filter = await sibyl.events["QueryRequested"].create_filter(
        fromBlock="latest"
    )

    # Start listening for events
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
        time.sleep(1)


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
