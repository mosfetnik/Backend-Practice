FROM node:22-alpine


# Set the working dir
WORKDIR /app

# copy package.json and package-lock.json files to the container


COPY package*.json .

# installing the dependency
RUN npm install

#Copy the rest code
COPY . .
 
# Expose the port that the app runs on
EXPOSE 5003

# Define then command to run up your application

CMD ["node","./src/server.js"]


