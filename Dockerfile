# Base Image
FROM node:20

# Install Angular CLI globally
RUN npm install -g @angular/cli

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package.json /app/

# Install dependencies
RUN npm install

# Copy the rest of the Angular application
COPY . /app/

# Expose port 4200 for the Angular app
EXPOSE 4200

# Start the Angular app using Angular CLI
CMD ["ng", "serve", "--host", "0.0.0.0"]
