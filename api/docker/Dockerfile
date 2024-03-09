FROM node:20.10.0-alpine as build
RUN mkdir -p /opt/app/src
WORKDIR /opt/app
COPY ./src/ ./src/
COPY ./package.json ./package.json
COPY ./package-lock.json ./package-lock.json
COPY ./nest-cli.json ./nest-cli.json
COPY ./tsconfig.json ./tsconfig.json
COPY ./tsconfig.build.json ./tsconfig.build.json
# COPY . . 
RUN npm install
RUN npm run build

FROM node:20.10.0-alpine as compiled
WORKDIR /opt/app/
COPY --from=build /opt/app/package.json /opt/app/package.json
COPY --from=build /opt/app/dist /opt/app/dist
COPY --from=build /opt/app/node_modules /opt/app/node_modules/
EXPOSE 3000