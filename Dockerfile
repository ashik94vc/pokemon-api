FROM alpine:3.1
MAINTAINER Ashik Vetrivelu <vcashik@gmail.com>

#Install Node and npm
RUN apk update && apk add nodejs

#Setup source directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY package.json /usr/src/app/
RUN npm install

COPY . /usr/src/app/

EXPOSE 8080
EXPOSE 8081
CMD [ "npm", "start"]
