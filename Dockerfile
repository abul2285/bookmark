### Our base image
FROM node:14-alpine 

#### Create app directory
WORKDIR /app

#### Install app dependencies
COPY package*.json ./
RUN npm install



#### Bundle app source
COPY . .

#### Configure container
EXPOSE 3000
RUN npm run build && npm ci
CMD [ "npm", "start" ]