from ai import get_llm_response
from sibyl import setup, handle_events
import asyncio


async def main() -> None:
    sibyl = await setup()
    await handle_events(sibyl, async_callback=get_llm_response)


asyncio.run(main())
