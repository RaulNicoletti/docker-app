FROM node:14.16.1-alpine3.10 AS build
WORKDIR /build
COPY ["package.json", "./"]
RUN npm install
COPY . .
RUN npm run build

FROM node:14.16.1-alpine3.10 AS app
WORKDIR /app
COPY --from=build /build/dist /app
COPY --from=build /build/package.json /app
ENV NODE_ENV=production
RUN npm install --production
EXPOSE 3000
CMD [ "node", "main.js" ]
