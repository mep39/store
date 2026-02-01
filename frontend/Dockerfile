FROM node:20 as build
WORKDIR /app
COPY . .
RUN npm install && npm run build

FROM nginx
COPY --from=build /app/dist /usr/share/nginx/html
