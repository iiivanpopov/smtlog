FROM oven/bun:1.3.0-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN bun i

COPY . .

ENV VITE_API_BASE_URL=/api 
RUN bun build:prod


FROM nginx:1.29.3-alpine AS runner

RUN rm -rf /usr/share/nginx/html/*

COPY --from=builder /app/dist /usr/share/nginx/html
COPY default.conf.template /etc/nginx/conf.d/default.conf.template
COPY entrypoint.sh /entrypoint.sh

EXPOSE 80
ENTRYPOINT ["/entrypoint.sh"]