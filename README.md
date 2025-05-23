Zeiad Badawy 40247477  

Miskat Mahmud 40250110  

Yassine Ibhir 40251116  

Mohamed Saidi 40248103  

Sadee Mohammad Shadman 40236919  

# TrustedLink

TrustedLink is a service-matching platform that connects customers with service providers in various categories such as plumbing, electrical, and landscaping.

## Project Setup

### Prerequisites

- Node.js (v16 or later)
- Docker (for MongoDB setup)
- Make sure you have the docker installed and running before attempting to run backend

### Steps to Set Up and Run the backend

```bash
git clone https://github.com/Yibhir0/2025-TrustedLink.git
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

The TrustedLink API provides endpoints to interact with the platform

#### Base URL

http://localhost:3000/api

#### Admin user

username: 'adminmaster',  
password: 'admin123',  

#### Provider user

plumber :  

username: 'johnplumber',  
password: 'pass123',  

electrician:  

username: 'sallyspark',  
password: 'pass123',  

landscaping:  

username: 'mikelawn',  
password: 'pass123',  












