FROM node:18-alpine

WORKDIR /app

COPY ./package*.json ./

RUN npm install

COPY . .

RUN npm install -g npm@9.6.6

EXPOSE 8081

CMD ["npm","run","dev"]