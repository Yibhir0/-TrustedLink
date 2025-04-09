# TrustedLink

TrustedLink is a service-matching platform that connects customers with service providers in various categories such as plumbing, electrical, and landscaping.

## Project Setup

### Prerequisites

- Node.js (v16 or later)
- Docker (for MongoDB setup)

### Steps to Set Up and Run the Project

```bash
git clone <repository-url>
cd 2025-TrustedLink/server
cd ./db
docker-compose up -d
cd ..
npm i
npm run seed:data
npm run dev
```

### API Documentation

The TrustedLink API provides endpoints to interact with the platform. Below is a summary of the available endpoints:

#### Base URL

http://localhost:3000/api

````

### 📘 API Endpoints Documentation

#### 🔹 1. GET All Services
- **URL:** `/api/services`
- **Method:** `GET`
- **Description:** Fetch all available services (plumbing, electrical, landscaping)

**✅ Example Request:**
```bash
GET http://localhost:8080/api/services
````

**✅ Example Response:**

```json
[
    {
        "_id": "662b5583c2a7bd89f37d9f7a",
        "name": "Plumbing Repair",
        "description": "Fix leaks and clogs",
        "category": "plumbing"
    },
    ...
]
```

#### 🔹 2. GET Providers by Service Category

- **URL:** `/api/providers/service/:category`
- **Method:** `GET`
- **Description:** Fetch all provider profiles by service category

**✅ Example Request:**

```bash
GET http://localhost:8080/api/providers/service/plumbing
```

**✅ Example Response:**

```json
[
    {
        "_id": "662b56f9f72a81355d3f905e",
        "hourlyRate": 75,
        "category": "plumbing",
        "city": "New York",
        "bio": "Licensed plumber with 10+ years of experience.",
        "user": {
            "_id": "662b56f9f72a81355d3f905d",
            "username": "johnplumber",
            "role": "provider",
            ...
        }
    }
]
```

#### 🔹 3. POST Create Provider + Profile

- **URL:** `/api/providers`
- **Method:** `POST`
- **Description:** Create a new provider user and their profile

**✅ Example Request Body:**

```json
{
  "userData": {
    "username": "newplumber",
    "password": "pass123",
    "email": "new@plumber.com",
    "firstName": "New",
    "lastName": "Plumber",
    "city": "Calgary",
    "phone": "111-222-3333",
    "bio": "Plumbing expert"
  },
  "profileData": {
    "category": "plumbing",
    "hourlyRate": 70,
    "city": "Calgary",
    "bio": "Certified plumber",
    "rating": 0,
    "yearsOfExperience": 6
  }
}
```

**✅ Example Response:**

```json
{
    "user": {
        "_id": "...",
        "username": "newplumber",
        ...
    },
    "profile": {
        "_id": "...",
        "category": "plumbing",
        ...
    }
}
```

#### 🔹 4. POST Create Customer

- **URL:** `/api/customers`
- **Method:** `POST`
- **Description:** Create a new customer account

**✅ Example Request Body:**

```json
{
  "username": "customer6",
  "password": "pass123",
  "email": "customer6@example.com",
  "firstName": "Jake",
  "lastName": "Long",
  "city": "Montreal",
  "phone": "888-999-1111"
}
```

**✅ Example Response:**

```json
{
    "_id": "...",
    "username": "customer6",
    "role": "customer",
    ...
}
```

#### 🔹 5. GET All Customers (Admin Only)

- **URL:** `/api/admin/customers`
- **Method:** `GET`
- **Middleware Required:** `requireAdmin`
- **Description:** Admin-only endpoint to view all customers

**✅ Example Request:**

```bash
GET http://localhost:8080/api/admin/customers
```

**✅ Headers (if auth added):**

```
Authorization: Bearer <admin-token>
```

**✅ Example Response:**

```json
[
    {
        "_id": "...",
        "username": "customer1",
        "email": "customer1@example.com",
        ...
    },
    ...
]
```

#### 🔹 6. GET All Provider Profiles (Admin Only)

- **URL:** `/api/providers/admin/all`
- **Method:** `GET`
- **Middleware Required:** `requireAdmin`
- **Description:** Admin-only view of all providers + linked user info

**✅ Example Request:**

```bash
GET http://localhost:8080/api/providers/admin/all
```

**✅ Example Response:**

```json
[
    {
        "_id": "...",
        "category": "plumbing",
        "city": "Toronto",
        "user": {
            "username": "johnplumber",
            ...
        }
    }
]
```

#### 🔐 7. POST Admin Login (Basic Session Logic)

- **URL:** `/api/auth/admin/login`
- **Method:** `POST`
- **Description:** Login as admin and create a session for protected routes

**✅ Request Body:**

```json
{
  "username": "adminmaster",
  "password": "admin123"
}
```

**✅ Response:**

```json
{
  "message": "Admin logged in",
  "user": {
    "id": "...",
    "role": "admin",
    "username": "adminmaster"
  }
}
```
