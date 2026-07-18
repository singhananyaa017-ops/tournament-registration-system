# Tournament Registration & Leaderboard System

A RESTful backend API for managing tournament registrations, score submissions, and leaderboards — built with Node.js, Express.js, and MongoDB (Mongoose).

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose ODM
- **Validation:** express-validator
- **Environment Management:** dotenv

## Architecture

This project follows a layered architecture for separation of concerns:

```
Routes → Validation → Controllers → Services → Models → Database
```

- **Routes** – define URL endpoints and map them to controllers
- **Validation** – checks incoming request data before it reaches business logic
- **Controllers** – handle HTTP request/response, delegate logic to services
- **Services** – contain business logic and rules
- **Models** – Mongoose schemas defining the database structure
- **Middlewares** – reusable logic (error handling, validation result checking)

## Folder Structure

```
tournament-registration-system/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── services/
│   ├── middlewares/
│   ├── validations/
│   ├── utils/
│   ├── constants/
│   ├── database/
│   └── app.js
│
├── server.js
├── .env
├── .gitignore
├── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB Atlas account (or local MongoDB instance)

### Installation

1. Clone the repository:
```bash
   git clone https://github.com/singhananyaa017-ops/tournament-registration-system.git
   cd tournament-registration-system
```

2. Install dependencies:
```bash
   npm install
```

3. Create a `.env` file in the root directory:
```
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
```

4. Start the server:
```bash
   npm run dev
```

   The server will run on `http://localhost:5000`

## API Endpoints

### 1. Register a Player

**POST** `/players`

**Request Body:**
```json
{
  "name": "Ananya Singh",
  "email": "ananya@example.com",
  "country": "India"
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Player registered successfully",
  "data": {
    "_id": "64a5e...",
    "name": "Ananya Singh",
    "email": "ananya@example.com",
    "country": "India",
    "createdAt": "...",
    "updatedAt": "..."
  }
}
```

**Error Responses:**
- `400` – Validation failed (missing fields / invalid email format)
- `409` – Email already registered

---

### 2. Create a Tournament

**POST** `/tournaments`

**Request Body:**
```json
{
  "name": "Summer Championship",
  "maxPlayers": 16
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Tournament created successfully",
  "data": {
    "_id": "64a5e...",
    "name": "Summer Championship",
    "maxPlayers": 16,
    "createdAt": "..."
  }
}
```

**Error Responses:**
- `400` – Validation failed (missing name / maxPlayers not greater than 0)

---

### 3. Register Player for Tournament

**POST** `/tournaments/:id/register`

**Request Body:**
```json
{
  "playerId": "64a5e..."
}
```

**Success Response (201):**
```json
{
  "success": true,
  "message": "Player registered for tournament successfully",
  "data": {
    "_id": "64a5e...",
    "tournament": "64a5e...",
    "player": "64a5e...",
    "createdAt": "..."
  }
}
```

**Error Responses:**
- `404` – Tournament or player not found
- `409` – Player already registered for this tournament
- `400` – Tournament capacity reached

---

### 4. Submit Player Score

**POST** `/tournaments/:id/score`

**Request Body:**
```json
{
  "playerId": "64a5e...",
  "score": 85
}
```

**Success Response (200):**
```json
{
  "success": true,
  "message": "Score submitted successfully",
  "data": {
    "_id": "64a5e...",
    "tournament": "64a5e...",
    "player": "64a5e...",
    "score": 85
  }
}
```

**Error Responses:**
- `404` – Tournament not found
- `403` – Player is not registered for this tournament
- `400` – Invalid score (must be ≥ 0)

*Note: Resubmitting a score for the same player/tournament updates the existing score rather than creating a duplicate.*

---

### 5. Get Leaderboard

**GET** `/tournaments/:id/leaderboard`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Leaderboard fetched successfully",
  "data": [
    {
      "rank": 1,
      "player": {
        "_id": "64a5e...",
        "name": "Ananya Singh",
        "email": "ananya@example.com",
        "country": "India"
      },
      "score": 95
    },
    {
      "rank": 2,
      "player": {
        "_id": "64a5e...",
        "name": "Second Player",
        "email": "second@example.com",
        "country": "UK"
      },
      "score": 50
    }
  ]
}
```

**Error Responses:**
- `404` – Tournament not found

---

### 6. Get Player Rank

**GET** `/tournaments/:id/player/:playerId`

**Success Response (200):**
```json
{
  "success": true,
  "message": "Player rank fetched successfully",
  "data": {
    "rank": 1,
    "player": {
      "_id": "64a5e...",
      "name": "Ananya Singh",
      "email": "ananya@example.com",
      "country": "India"
    },
    "score": 95
  }
}
```

**Error Responses:**
- `404` – Tournament not found, or player has no score recorded in this tournament

## Error Handling

All errors are handled by a centralized error-handling middleware that returns a consistent format:

```json
{
  "success": false,
  "message": "Error description here"
}
```

## Database Schema

**Player:** `name`, `email` (unique), `country`

**Tournament:** `name`, `maxPlayers`