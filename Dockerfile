# 设置运行环境
FROM node:16 AS build
# 设置工作目录
WORKDIR /workspace
# 赋值代码到镜像中
COPY . .
# 安装依赖
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
# 编译
RUN npm run build

# 设置nginx服务
FROM nginx:latest
# 复制打包后的产物到nginx服务路径下
COPY --from=build dist/* /workspace/www
# 复制nginx配置文件到镜像中
COPY src/assets/nginx.conf /etc/nginx/conf.d/Kspace.conf

RUN rm -rf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ['nginx']


