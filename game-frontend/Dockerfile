# Dockerfile for Vite + React App
FROM node:18-slim

# Set working directory
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the frontend
RUN npm run build

# Serve using a lightweight HTTP server
RUN npm install -g serve

# Expose port
EXPOSE 5173

# Command to run the app
CMD ["serve", "-s", "dist", "-l", "5173"]
