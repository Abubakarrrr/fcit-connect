
# Stage 1: Backend Build
FROM node:18 AS backend-builder

# Set working directory for backend
WORKDIR /app

# Copy backend package.json and install dependencies
COPY backend/package.json backend/package-lock.json ./
RUN npm install

# Copy backend source code
COPY backend ./

# Expose backend port
EXPOSE 5000

# Start backend server in production mode
CMD ["npm", "start"]

# Stage 2: Frontend Build
FROM node:18 AS frontend-builder

# Set working directory for frontend
WORKDIR /frontend

# Copy frontend package.json and install dependencies
COPY frontend/package.json frontend/package-lock.json ./
RUN npm install

# Build frontend
COPY frontend ./
RUN npm run build

# Stage 3: Serve Frontend with Nginx
FROM nginx:alpine

# Copy the build from the frontend-builder stage to the Nginx web server
COPY --from=frontend-builder /frontend/dist /usr/share/nginx/html

# Expose the port for Nginx
EXPOSE 80

# Default command to run Nginx
CMD ["nginx", "-g", "daemon off;"]

# Final stage: Set up the complete application with backend and frontend
FROM node:18

# Set working directory for the final app
WORKDIR /app

# Copy from both stages
COPY --from=backend-builder /app /app
COPY --from=frontend-builder /frontend/dist /usr/share/nginx/html

# Expose the necessary ports
EXPOSE 5000 80

# Start both backend and frontend
CMD ["bash", "-c", "npm start & nginx -g 'daemon off;'"]


# commands to build and run
# docker build -t fcit-connect-app .
# docker run -p 5000:5000 -p 80:80 fcit-connect-app

