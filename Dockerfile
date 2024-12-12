# Use Node.js 18 as the base image for building
FROM node:18 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the Vite app for production
RUN npm run build

# Debugging: List files in the dist directory (default output for Vite)
RUN ls -la /app/dist

# Use an Nginx server to serve the built files
FROM nginx:alpine

# Copy the Vite build output to the Nginx HTML folder
COPY --from=build /app/dist /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
