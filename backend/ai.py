import asyncio
import os
from openai import AsyncOpenAI
from models import QueryRequestedEvent, ResponseType
import json
from dotenv import load_dotenv

load_dotenv()

MAX_TOKENS_AI_RESPONSE = 50

client = AsyncOpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
    timeout=20.0,  # 20 seconds (default is 10 minutes)
)


async def get_llm_response(
    query_requested_event: QueryRequestedEvent,
) -> str | int | bool:
    print("OpenAI called")
    messages = get_messages(query_requested_event)

    completion = await client.chat.completions.create(
        max_tokens=MAX_TOKENS_AI_RESPONSE,
        model="gpt-3.5-turbo-0125",
        temperature=0.0,  # 0.0 is deterministic
        response_format={"type": "json_object"},
        messages=messages,
    )
    return json.loads(completion.choices[0].message.content)["response"]


def get_system_prompt(response_type: ResponseType) -> str:
    if response_type == ResponseType.BOOL:
        response_format = '{"response": true}'
    elif response_type == ResponseType.INT:
        response_format = '{"response": 42}'
    elif response_type == ResponseType.STRING:
        response_format = '{"response": "String response here"}'

    return (
        "You are an Oracle. You can answer any question. Be concise. Do NOT provide any additional information. Do NOT answer questions that are not asked. Do NOT ask questions. Do NOT make demands. Do NOT ask for anything in return.\n"
        + "You are optimized to return JSON data in the following format: "
        + response_format
    )


def get_messages(query_requested_event: QueryRequestedEvent) -> list[dict[str, str]]:
    """
    Set up a list of messages to send to the AI, including the system prompt, a few example question/answer pairs, and the user's question.
    """
    question = query_requested_event.question
    response_type = query_requested_event.responseType

    messages = [
        {"role": "system", "content": get_system_prompt(response_type)},
    ]
    if response_type == ResponseType.BOOL:
        messages.extend(
            [
                {"role": "user", "content": "Are humans mammals?"},
                {"role": "assistant", "content": '{"response": true}'},
                {"role": "user", "content": "Is pi a rational number?"},
                {"role": "assistant", "content": '{"response": false}'},
            ]
        )
    elif response_type == ResponseType.INT:
        messages.extend(
            [
                {"role": "user", "content": "What is 26 + 2?"},
                {"role": "assistant", "content": '{"response": 28}'},
                {"role": "user", "content": "How many sides does a triangle have?"},
                {"role": "assistant", "content": '{"response": 3}'},
            ]
        )
    elif response_type == ResponseType.STRING:
        messages.extend(
            [
                {
                    "role": "user",
                    "content": "Who won the US presidential election in 2020?",
                },
                {"role": "assistant", "content": '{"response": "Joe Biden"}'},
                {"role": "user", "content": "What is the capital of Germany?"},
                {"role": "assistant", "content": '{"response": "Berlin"}'},
            ]
        )

    messages.append({"role": "user", "content": question})
    return messages
