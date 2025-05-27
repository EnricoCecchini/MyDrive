from src.app import app

from rich import print as rich_print
import builtins

builtins.print = rich_print


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("src.app:app", host="0.0.0.0", port=8000, reload=True)
