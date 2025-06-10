# FROM node:18

# # Install Java
# RUN apt-get update && \
#     apt-get install -y default-jdk && \
#     apt-get clean

# # Set working directory
# WORKDIR /app

# # Copy package.json and install dependencies
# COPY package*.json ./
# RUN npm install

# # Copy all project files
# COPY . .

# # Use /tmp as the Java execution directory
# ENV JAVA_TMP_DIR=/tmp

# # Expose the port
# EXPOSE 8080

# # Start server
# CMD ["node", "server.js"]

# Use Ubuntu base image
# Use Ubuntu base image
FROM ubuntu:22.04

# Install Java, Node.js, and required build tools
RUN apt-get update && \
    apt-get install -y curl gnupg openjdk-17-jdk build-essential && \
    curl -fsSL https://deb.nodesource.com/setup_20.x | bash - && \
    apt-get install -y nodejs && \
    npm install -g npm && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy and install dependencies
COPY package*.json ./
RUN npm install

# Copy the app source
COPY . .

# Set environment for Java
ENV JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
ENV PATH=$JAVA_HOME/bin:$PATH

# Expose app port
EXPOSE 8080

# Start the server
CMD ["node", "index.js"]


