# Use Node.js 12 as the base image for building
FROM node:22 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Build the React app for production
RUN npm run build

# Use an Nginx server to serve the built files
FROM nginx:alpine

# Copy the build output to the Nginx HTML folder
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80 (inside container)
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]
