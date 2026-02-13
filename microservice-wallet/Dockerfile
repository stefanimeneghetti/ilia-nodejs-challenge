FROM node:22.12-slim

WORKDIR /app

RUN apt-get update && apt-get install -y \
    openssl \
    netcat-openbsd \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./
RUN npm install

COPY prisma ./prisma/
COPY . .
RUN npx prisma generate
RUN npm run build

EXPOSE 3000


CMD ["node", "dist/src/main"]