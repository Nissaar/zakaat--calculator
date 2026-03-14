# Stage 1: Build the React application
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies (using the latest compatible versions from package.json)
RUN npm install

# Copy the rest of the application code
COPY . .

# Build the app for production
RUN npm run build

# Stage 2: Serve the application with Nginx
FROM nginx:alpine

# Copy the built assets from the builder stage to Nginx's default public directory
COPY --from=builder /app/dist /usr/share/nginx/html

# Expose port 80 for Traefik to route traffic to
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
