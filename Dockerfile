FROM node:14.15.0-alpine as builder

COPY . /marvelopedia
WORKDIR /marvelopedia

# ENV REACT_APP_PUBLIC_KEY 9ae1505f5688a5e9d19904d452628af5

# install app dependencies
COPY package.json ./
COPY package-lock.json ./

RUN npm install

RUN npm run-script build

FROM nginx:1.19.0-alpine

COPY --from=builder /marvelopedia/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
RUN rm -rf docker-entrypoint.d/

RUN chown -R nginx:nginx /usr/share/nginx/html && chmod -R 755 /usr/share/nginx/html && \
chown -R nginx:nginx /var/cache/nginx && \
chown -R nginx:nginx /var/log/nginx && \
chown -R nginx:nginx /etc/nginx/conf.d
RUN touch /var/run/nginx.pid && \
chown -R nginx:nginx /var/run/nginx.pid

USER nginx
EXPOSE 8000

CMD ["nginx", "-g", "daemon off;"]