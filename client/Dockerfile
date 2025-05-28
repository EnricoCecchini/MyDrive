# Use official Node.js image as base
FROM node:18

# Set working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 80 (or any port your app uses)
EXPOSE 80

# Run the app in development mode
CMD ["npm", "run", "dev"]
