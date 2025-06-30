# Stage 1: Sử dụng Node.js image chính thức
FROM node:18-alpine AS base

# Stage 2: Cài đặt dependencies
FROM base AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install --frozen-lockfile

# Stage 3: Chạy ứng dụng
FROM base AS runner
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Server sẽ chạy trên port được cung cấp bởi biến môi trường hoặc 8888
EXPOSE 8888

# Lấy giá trị PORT từ biến môi trường của nền tảng deploy
ENV PORT=${PORT}

# Lệnh để khởi động server
CMD ["node", "server.js"] 