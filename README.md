# TrustedLink

TrustedLink is a service-matching platform that connects customers with service providers in various categories such as plumbing, electrical, and landscaping.

## Project Setup

### Prerequisites

- Node.js (v16 or later)
- Docker (for MongoDB setup)

### Steps to Set Up and Run the backend

```bash
git clone git@github.com:Yibhir0/2025-TrustedLink.git
cd 2025-TrustedLink/server
cd ./db
docker-compose up -d
cd ..
npm i
npm run seed:data
npm run dev
```

### Steps to Set Up and Run the frontend

```bash
cd ../client
npm i
npm start
```

### API Documentation

The TrustedLink API provides endpoints to interact with the platform. Below is a summary of the available endpoints:

#### Base URL

http://localhost:3000/api

```


```
