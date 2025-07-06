# Build React app
FROM node:18-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . .
# Nhận các biến môi trường từ build args
ARG REACT_APP_API_URI
ARG REACT_APP_LIMIT
ARG REACT_APP_MCETINY
ARG REACT_APP_URL
RUN npm run build

# Serve bằng nginx
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"] 