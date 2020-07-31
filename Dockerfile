FROM node:current-alpine3.11

RUN mkdir -p /app

RUN apk update && apk add sox && rm -rf /var/cache/apk/*
RUN apk add --update --no-cache python3 && ln -sf python3 /usr/bin/python

WORKDIR /app

COPY package.json /app
COPY package-lock.json /app

RUN npm i

COPY ./ /app
RUN npm run build

CMD [ "npm", "start" ]
