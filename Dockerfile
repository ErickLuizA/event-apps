FROM node:17-slim

RUN apt update \
  && apt install sox libsox-fmt-mp3 -y

WORKDIR /spotify-radio/

COPY package.json yarn.lock /spotify-radio/

RUN yarn

COPY . .

USER node

CMD yarn dev