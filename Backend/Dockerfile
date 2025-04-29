# # Use a specific Node.js base image
# FROM 22.11.0

# # Set the working directory inside the container
# # WORKDIR /app

# # Copy package.json and package-lock.json from the backend folder
# COPY package*.json ./

# # Install production dependencies
# RUN npm install && npm rebuild bcrypt --build-from-source 

# # Copy the entire backend folder into the container
# COPY . .

# # Set the working directory for your backend code

# # Expose the port your backend server uses
# EXPOSE 5000

# # Start the application
# CMD ["npm", "start"]


# Use a compatible Node.js base image with Debian base for building native modules
FROM node:22.11.0-bullseye

# Install build tools required by bcrypt
RUN apt-get update && apt-get install -y python3 make g++ && rm -rf /var/lib/apt/lists/*

# Set working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json first for caching purposes
COPY package*.json ./

# Install dependencies and rebuild bcrypt from source
RUN npm install && npm rebuild bcrypt --build-from-source

# Copy the rest of the application code
COPY . .

# Expose the port your backend uses
EXPOSE 5000

# Start the application
CMD ["npm", "start"]


