FROM node:11-alpine

WORKDIR /node-app

COPY package.json .

RUN npm install

RUN npm install -g @nestjs/cli

COPY . .

EXPOSE 3334

CMD npm run start:dev