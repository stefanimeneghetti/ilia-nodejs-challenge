# Microservice Wallet

Digital wallet microservice developed with NestJS, Prisma ORM and PostgreSQL, fully containerized with Docker.

## 📋 Prerequisites

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (v22 or higher) - for local development
- [npm](https://www.npmjs.com/) (v10 or higher)

## 🔧 Installation and Execution

**1. Clone the repository**

```bash
git clone https://github.com/stefanimeneghetti/ilia-nodejs-challenge
cd ilia-nodejs-challenge/microservice-wallet
```

2. **Configure environment variables**

You can clone the values from .env.example and change them as needed.

```bash
cp .env.example .env
```

### With Docker

1. **Run Docker Composee**

```bash
docker-compose up -d
```

2. **Check logs**

To check the API logs use:

```bash
docker-compose logs -f app
```

To check the database logs use:

```bash
docker-compose logs -f postgres
```

The application will be available at http://localhost:3001

### Local Development (without Docker)

1. **Install dependencies**

```bash
npm install
```

2. **Configure PostgreSQL database**

If you want to use the Docker instance just run:

```bash
docker-compose up -d postgres
```

3. **Run Prisma migrations**

```bash
npx prisma migrate deploy
npx prisma generate
```

5. **Start the development server**

```bash
npm run start:dev
```

The application will be available at http://localhost:3001
