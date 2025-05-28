# MyDrive

MyDrive is a self-hosted alternative to Google Drive, built using:
- FrontEnd
    - React
    - TailwindCSS
- BackEnd
    - FastAPI
    - SQLAlchemy


To run, you must create a .env file with the following values in the root folder:

| **Environment Variable** | **Description**                                         | **Default / Notes**                  |
|--------------------------|---------------------------------------------------------|--------------------------------------|
| **API Variables**        |                                                         |                                      |
| `API_PORT`               | Port where the API will run                             | Default: `8001`                      |
| `TOKEN_SECRET`           | Secret key used for JWT token generation                | *Required*                           |
| `TOKEN_DURATION`         | Duration (in days) for JWT token validity               | Default: `14`                        |
| **API Database Connection** |                                                      |                                      |
| `DB_USER`                | MySQL database username                                 | *Required*                           |
| `DB_PASSWORD`            | MySQL database password                                 | *Required*                           |
| `DB_HOST`                | Host address of the MySQL database                      | *Required*                           |
| `DB_PORT`                | Port number for MySQL database connection               | Default: `3306`                      |
| `DB_DATABASE`            | Name of the database used by the API                    | *Required*                           |
| `DB_STRING`              | Database String to set connection to the database       | *Optional instead of other DB variables*|
| **Client Variables**     |                                                         |                                      |
| `VITE_BASE_API_URL`      | URL and port where the API server is running            | *Required*                           |