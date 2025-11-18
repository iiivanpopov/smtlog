FROM oven/bun:1.3-alpine AS builder
WORKDIR /app

COPY package.json .
RUN bun i --omit=dev --omit=peer --omit=optional
COPY . .

RUN bun build:prod

FROM oven/bun:1.3-alpine AS runtime
WORKDIR /app

COPY --from=builder /app/dist ./dist

CMD ["bun", "./dist/index.js"]