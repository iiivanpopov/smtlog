FROM oven/bun:1.3.0-alpine AS builder
WORKDIR /app

COPY package.json ./
RUN bun i

COPY . .

ARG VITE_API_BASE_URL
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL 

RUN bun build:prod


FROM nginx:1.29.3-alpine AS runner
WORKDIR /usr/share/nginx/html

RUN rm -rf ./*

COPY --from=builder /app/dist ./
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]