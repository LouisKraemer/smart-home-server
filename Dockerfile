FROM node:latest

COPY ./src ./src
COPY tsconfig.json .
COPY package.json .
COPY yarn.lock .
COPY .env .
COPY config.js .

RUN mkdir /dist

RUN yarn

CMD yarn start