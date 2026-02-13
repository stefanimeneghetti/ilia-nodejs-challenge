# Frontend Application

Frontend application developed with React, TypeScript and Vite, using Material-UI (MUI) for interface components.

## 📋 About the Project

This is a React project that consumes the microservice-wallet API.

## 📦 Prerequisites

- Node.js (version 18 or higher recommended)
- npm or yarn

## 🔧 Installation

**1. Clone the repository**

```bash
git clone [repository-url]
cd frontend-application
```

**2. Install dependencies**

```bash
npm install
# ou
yarn install
```

**3. Configure environment variables**

```bash
cp .env.example .env
```

Change the `VITE_AUTH_TOKEN` variable to a valid token. You can generate a test token valid for 1 hour using the command:

```bash
npx ts-node ../microservice-wallet/generate-test-token.ts
```

**4. Run the application**

```bash
npm run dev
```

The application will be available at http://localhost:5173/
