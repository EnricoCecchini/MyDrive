import os
from typing import Generator

from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import Session, sessionmaker
from src.models import Base


class DatabaseSession:
    def __init__(self):
        """
        Init func to create a new database engine to handle sessions.
        """
        self.db_user = os.getenv("DB_USER")
        self.db_password = os.getenv("DB_PASSWORD")
        self.db_host = os.getenv("DB_HOST")
        self.db_port = os.getenv("DB_PORT", "3306")
        self.db_database = os.getenv("DB_DATABASE")
        self.db_string = os.getenv("DB_STRING")

        self.engine = self._create_engine()
        self.SessionLocal = sessionmaker(autoflush=False, bind=self.engine)

    def _create_engine(self):
        """
        Create a SQLAlchemy engine instance.
        Uses `DB_STRING` if provided, else builds from individual env vars.
        Echo enabled for debugging.

        Returns:
            `engine` - SQLAlchemy engine object.
        """

        print("Starting engine...")
        try:
            if self.db_string:
                return create_engine(self.db_string, echo=True, future=True)

            url = f"mysql+pymysql://{self.db_user}:{self.db_password}@{self.db_host}:{self.db_port}/{self.db_database}"
            return create_engine(url, echo=True, future=True)

        except Exception as e:
            print(f"Error creating SQLAlchemy engine: {e}")
            raise e

    def get_session(self) -> Generator[Session, None, None]:
        """
        Helper func to create a new SQLAlchemy session.

        Returns:
            `Session` - Session instance.
        """

        session = self.SessionLocal()
        try:
            yield session

        finally:
            print("Closing session.")
            session.close()

    def initialize_database(self):
        """
        Helper func to initialize database if schema has not been imported.
        """
        print("[blue]Checking database has been initialized...[/blue]")

        try:
            db_inspector = inspect(self.engine)
            tables = db_inspector.get_table_names()

            if not tables:
                print("[yellow]Warning:[/yellow] Database has not been initialized. Creating tables...")
                Base.metadata.create_all(bind=self.engine)
                print("[green]Database Initialized.[/green]")

            else:
                print(f"[green]Database already initialized with {len(tables)} tables.[/green]")

        except Exception as e:
            print("[red]Error initializing database: [/red]", e)
            raise e


db_session = DatabaseSession()
