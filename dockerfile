# Use the official Node.js image as base
FROM node:20.11.1

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json /app/.

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose the port the app runs on
EXPOSE ${SERVER_PORT}

# Command to run the application
CMD ["npm", "run", "dev"]
