FROM nginx:latest

COPY dist/ /usr/share/nginx/html/
COPY src/assets/nginx.conf /etc/nginx/conf.d/default.conf


