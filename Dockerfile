FROM node:iron-alpine as base
WORKDIR "/usr/app"
COPY package*.json ./
RUN npm install

FROM node:iron-alpine as builder
WORKDIR "/usr/app"
COPY --from=base "/usr/app/node_modules" "./node_modules"
COPY . .
RUN npm run build

FROM node:iron-alpine as runner
WORKDIR "/usr/app"
COPY package*.json ./
COPY tsconfig.json  ./
RUN npm install --omit=dev
COPY --from=builder "/usr/app/dist" "./dist"
CMD ["npm", "run", "start"]