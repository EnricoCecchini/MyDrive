import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, Session


class DatabaseSession:
    def __init__(self, env_path: str = ".env"):
        """
        Init func to create a new database engine to handle sessions.
        """
        self.db_user = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_host = os.getenv("DB_HOST")
        self.db_port = os.getenv("DB_PORT", "3306")
        self.db_database = os.getenv("DB_DATABASE")
