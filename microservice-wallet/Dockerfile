FROM node:22.12-slim

WORKDIR /usr/src/app

# Instalar openssl necessário para o Prisma
RUN apt-get update && apt-get install -y \
    openssl \
    && rm -rf /var/lib/apt/lists/*

COPY package*.json ./

# Instalar Prisma e dependências
RUN npm install prisma@7.4.0 @prisma/client@7.4.0
RUN npm install

COPY prisma ./prisma/
COPY . .

# Gerar Prisma Client - não precisa mais de DATABASE_URL dummy
RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["node", "dist/main"]