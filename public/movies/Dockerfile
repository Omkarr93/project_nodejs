FROM node:14

WORKDIR /app

COPY . .



RUN npm install

RUN npm install express


EXPOSE 3001


CMD ["node", "server.js"]