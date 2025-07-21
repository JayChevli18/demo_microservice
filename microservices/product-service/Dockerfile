# Use Node 16 (or a compatible version) as the base image
FROM node:22.16.0

# Set the working directory
WORKDIR /

# Copy package.json and package-lock.json first to take advantage of Docker's caching mechanism
COPY microservices/product-service/package*.json ./

# Install dependencies
RUN npm install --force

COPY microservices/product-service/tsconfig.json ./tsconfig.json

# Install ts-node and typescript globally to run TypeScript files directly
RUN npm install -g ts-node typescript

# Copy the source code into the container
COPY microservices/product-service/src ./src

COPY shared ./shared

RUN tsc 

# Expose the port
EXPOSE 5002

# Set the default command to start the app with ts-node
CMD ["ts-node", "src/app.ts"]