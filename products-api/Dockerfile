FROM node:11-alpine

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3335

CMD npm run server:api