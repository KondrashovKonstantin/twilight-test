FROM node:20-alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

EXPOSE 3001

CMD [ "npm", "run", "dev" ]