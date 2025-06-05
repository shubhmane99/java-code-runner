FROM node:18

# Install Java
RUN apt-get update && \
    apt-get install -y default-jdk && \
    apt-get clean

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package*.json ./
RUN npm install

# Copy all project files
COPY . .

# Use /tmp as the Java execution directory
ENV JAVA_TMP_DIR=/tmp

# Expose the port
EXPOSE 5000

# Start server
CMD ["node", "server.js"]
