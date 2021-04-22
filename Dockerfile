FROM node:14.16.1-alpine3.10 AS build
WORKDIR /build
COPY package.json .
COPY yarn.lock .
RUN rm -rf /build/node_modules && yarn install --frozen-lockfile
COPY . .
RUN yarn build

FROM node:14.16.1-alpine3.10 AS app
WORKDIR /app
COPY --from=build /build/dist /app
COPY package.json .
COPY yarn.lock .
COPY ormconfig.js .
COPY start.sh .
ENV NODE_ENV=production
RUN rm -rf /app/node_modules && yarn install --production --frozen-lockfile
EXPOSE 3000
CMD [ "node", "main.js" ]
