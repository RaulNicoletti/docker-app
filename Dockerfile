FROM node:14.16.1-alpine3.10
ENV NODE_ENV=production

WORKDIR /app

COPY ["package.json", "package-lock.json*", "./"]

RUN npm install --production

COPY ./dist .

EXPOSE 3000

CMD [ "node", "main.js" ]
