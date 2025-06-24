from datetime import datetime, timezone


def util_get_curr_date() -> datetime:
    """
    Util function to get the current datetime.

    Returns:
        `datetime` - Current timestamp.
    """

    return datetime.now(tz=timezone.utc)
