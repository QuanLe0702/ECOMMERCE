# Stage 1: Build a React application
FROM node:18-alpine AS build

# Chấp nhận biến môi trường API_URL khi build
ARG REACT_APP_API_URI
ENV REACT_APP_API_URI=$REACT_APP_API_URI

WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
RUN npm install --legacy-peer-deps
COPY . ./
RUN npm run build

# Stage 2: Serve application with Nginx server
FROM nginx:stable-alpine
# Sao chép các file tĩnh đã được build từ giai đoạn trước vào thư mục public của Nginx
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 để cho phép truy cập từ bên ngoài
EXPOSE 80

# Lệnh mặc định của Nginx sẽ tự khởi động server
CMD ["nginx", "-g", "daemon off;"] 