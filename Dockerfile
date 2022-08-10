### Our base image
FROM node:14-alpine 

#### Create app directory
WORKDIR /app

#### Install app dependencies
COPY package*.json ./
RUN npm install



#### Bundle app source
COPY . .

ENV APP_VERSION $NEXT_PUBLIC_APP_VERSION

ARG COGNITO_REGION us-east-1
ARG COGNITO_APP_CLIENT_ID $COGNITO_APP_CLIENT_ID
ARG COGNITO_USER_POOL_ID $COGNITO_USER_POOL_ID

#### Configure container
EXPOSE 3000
RUN npm run build && npm ci
CMD [ "npm", "start" ]