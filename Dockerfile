# 1단계: React 앱 빌드
FROM node:18 AS builder
WORKDIR /app
COPY . ./
RUN npm install
RUN npm run build

# 2단계: NGINX로 정적 파일 서빙
FROM nginx:alpine
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/nginx.conf
COPY nginx/mime.types /etc/nginx/mime.types
