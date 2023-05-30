# Use an existing Node.js runtime as the base image
FROM node:14-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json files to the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the entire project directory to the container
COPY . .

# Build the React app
RUN npm run build

# Set the environment variable for production
ENV NODE_ENV=production

# Expose the desired port (e.g., 3000 for React development server)
EXPOSE 3000

# Start the application
CMD ["npm", "start"]

