# Step 1: Use a Node.js image to build and run the app
FROM node:18 AS development

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the source code into the container
COPY . .

# Expose the port that the React app will run on
EXPOSE 3000

# Run the React development server
CMD ["npm", "start"]
