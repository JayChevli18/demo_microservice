# # Use Node 16 (or a compatible version) as the base image
# FROM node:22.16.0

# # Set the working directory
# WORKDIR /
# # Copy package.json and package-lock.json first to take advantage of Docker's caching mechanism

# COPY microservices/auth-service/package*.json ./

# # Install dependencies
# RUN npm install --force

# # Install ts-node and typescript globally to run TypeScript files directly
# RUN npm install -g ts-node typescript

# # Copy the source code into the container
# COPY microservices/auth-service/src ./src

# # COPY shared ./shared
# COPY shared ./shared

# COPY microservices/auth-service/tsconfig.json ./tsconfig.json

# # COPY microservices/auth-service/.env .env

# RUN tsc 

# # Expose the port
# EXPOSE 5000

# # Set the default command to start the app with ts-node
# CMD ["ts-node", "src/app.ts"]

FROM node:22.16.0

WORKDIR /

COPY microservices/auth-service/package*.json ./

RUN npm install --force

COPY microservices/auth-service/tsconfig.json ./tsconfig.json

RUN npm install -g ts-node typescript

COPY microservices/auth-service/src ./src

COPY shared ./shared

RUN tsc 

EXPOSE 5000

CMD ["ts-node", "src/app.ts"]