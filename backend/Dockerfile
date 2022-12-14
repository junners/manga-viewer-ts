FROM node:lts-alpine as build
WORKDIR /usr/src/app
COPY ["package.json", "package-lock.json*", "npm-shrinkwrap.json*", "./"]
RUN npm ci
COPY . .
RUN npm run build

FROM node:lts-alpine
ENV NODE_ENV=production
WORKDIR /usr/src/dist
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/build ./build
RUN npm install --production --silent
EXPOSE 3050
RUN chown -R node /usr/src/dist
USER node
CMD ["npm", "start"]
