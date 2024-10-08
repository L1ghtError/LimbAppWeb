#STEP 1 "react js"
FROM node:lts-bullseye-slim AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
#RUN apk --no-cache add curl
COPY . .
RUN npm run build 
#STEP 2 "Nginx server"
FROM nginx:alpine AS prod-stage
COPY default.conf /etc/nginx/conf.d/
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
