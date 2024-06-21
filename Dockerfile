FROM node:16

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build

# 设置nginx服务
FROM nginx:latest

COPY dist/ /usr/share/nginx/html/
COPY src/assets/nginx.conf /etc/nginx/conf.d/Kspace.conf

RUN rm -rf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ['nginx']


