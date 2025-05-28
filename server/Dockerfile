# Use the official Python image as a base
FROM python:3.9-slim

# Set the working directory
WORKDIR /app

# Copy the requirements file into the container
COPY requirements.txt .

# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Install MySQL tools
RUN apt-get update && apt-get install -y default-mysql-client

# Copy the rest of your application code into the container
COPY . .

# Expose the port that FastAPI will run on
EXPOSE ${API_PORT}

# Run FastAPI with Uvicorn
CMD ["python", "main.py"]
