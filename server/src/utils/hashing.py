import bcrypt
from passlib.context import CryptContext

pwd_context = CryptContext(schemes=["bcrypt"])


class Hash:
    @staticmethod
    def bcrypt(password: str) -> str:
        """
        Hash provided password.

        Args:
            `password` (`str`) - User password to hash.

        Returns:
            `str` - Hashed password
        """
        return pwd_context.hash(password)

    @staticmethod
    def verify(plain_password: str, hashed_password: str) -> bool:
        """Verify provided password"""

        return pwd_context.verify(plain_password, hashed_password)