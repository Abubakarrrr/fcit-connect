# Use Node.js 18 Alpine as base image
FROM node:18-alpine

# Create and set working directory
WORKDIR /app

# 1. First copy package files
COPY package*.json ./

# 2. Install dependencies
RUN npm install

# 3. Copy ALL server files (except those in .dockerignore)
COPY . .

# 4. Expose the port your app runs on
EXPOSE 5000

# 5. Start command (adjust if your main file is different)
CMD ["node", "index.js"]