# Microservice Wallet

Microserviço de carteira digital desenvolvido com NestJS, Prisma ORM e PostgreSQL, totalmente containerizado com Docker.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v22 ou superior) - para desenvolvimento local
- [npm](https://www.npmjs.com/) (v10 ou superior)

## 🔧 Instalação e Execução

1. **Clone o repositório**

```bash
git clone https://github.com/stefanimeneghetti/ilia-nodejs-challenge
cd ilia-nodejs-challenge/microservice-wallet
```

2. **Configure o .env**

Você pode apenas clonar o valor disponível no .env.example e alterar conforme sua necessidade.

### Com Docker

1. **Execute com Docker Compose**

```bash
docker-compose up -d
```

2. **Verificação de logs**

Para verificar os logs da api use:

```bash
docker-compose logs -f app
```

Para os logs do banco de dados use:

```bash
docker-compose logs -f postgres
```

A aplicação estará disponível em http://localhost:3001

### Desenvolvimento Local (sem Docker)

1. **Instale as dependências**

```bash
npm install
```

2. **Configure o banco de dados PostgreSQL**

Caso queira utilizar a instancia configurada no docker basta rodar:

```bash
docker-compose up -d postgres
```

3. **Execute as migrations do prisma**

```bash
npx prisma migrate deploy
npx prisma generate
```

5. **Inicie o servidor de desenvolvimento**

```bash
npm run start:dev
```
