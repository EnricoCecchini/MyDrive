import builtins
import os

from dotenv import load_dotenv
from rich import print as rich_print
from src.app import app

load_dotenv()

builtins.print = rich_print


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("API_PORT", "8001"))
    uvicorn.run(app, host="0.0.0.0", port=port, reload=True)
