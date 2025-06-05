# Use Node.js base image
FROM node:18

# Install Java (default-jdk)
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json if available
COPY package*.json ./

# Install node dependencies
RUN npm install

# Copy all source code
COPY . .

# Create temp folder for Java file execution
RUN mkdir -p /tmp

# Expose backend port
EXPOSE 5000

# Start the Express server
CMD ["node", "server.js"]
