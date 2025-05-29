import os
from datetime import datetime, timedelta, timezone

from fastapi import Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer
from jose import ExpiredSignatureError, JWTError, jwt

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="/api/auth/login")
ALGORITHM = "HS256"


def generate_token(uid: int) -> str:
    """
    Auth func to generate a JWT token

    Args:
        `uid` (`int`) - User ID used to generate token.

    Returns:
        `str` - Generated JWT token.
    """
    expiration = datetime.now(tz=timezone.utc) + timedelta(days=float(os.getenv("TOKEN_DURATION", 14)))
    return jwt.encode(
        {
            "sub": str(uid),
            "exp": int(expiration.timestamp())
        },
        key=os.getenv("TOKEN_SECRET"),
        algorithm=ALGORITHM
    )

def needs_auth(token: str = Depends(oauth2_scheme)):
    try:
        payload = jwt.decode(token, os.getenv("TOKEN_SECRET"), algorithms=[ALGORITHM])
        return payload

    except ExpiredSignatureError:
        print("[red]Error decoding token. Token expired.[/red]")
        raise HTTPException(status_code=401, detail="Token expired.")
    except JWTError:
        print("[red]Error decoding token. Invalid token.[/red]")
        raise HTTPException(status_code=401, detail="Invalid token.")
    except Exception as e:
        print(f"[red]Error decoding token. Unexpected Error: {e}.[/red]",)
        raise HTTPException(status_code=401, detail="Invalid token.")