# ---------- 1. BUILD STAGE ----------
FROM node:20-alpine AS build

WORKDIR /app

# ❗ Спочатку ТІЛЬКИ package.json
COPY package.json package-lock.json* ./

RUN npm install

# ❗ ТІЛЬКИ ПІСЛЯ ЦЬОГО — решта файлів
COPY . .

RUN npm run build


# ---------- 2. NGINX STAGE ----------
FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
