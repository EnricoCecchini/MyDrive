import builtins
import os

from dotenv import load_dotenv
from rich import print as rich_print
from src.app import app
from src.utils import db_session

load_dotenv()

builtins.print = rich_print
db_session.initialize_database()


if __name__ == "__main__":
    import uvicorn

    port = int(os.getenv("API_PORT", "8001"))
    uvicorn.run(app="src.app:app", host="0.0.0.0", port=port, reload=True)
