# Bokrecensionsplattform

En webbapplikation för att söka efter böcker via **Google Books API**, läsa recensioner och skapa egna recensioner efter inloggning.

## Funktioner
- **Sök böcker** via Google Books API
- **Visa bokdetaljer** inklusive recensioner
- **Användarhantering** (registrering & inloggning)
- **CRUD-funktionalitet** för recensioner:
  - Skapa
  - Läsa
  - Uppdatera
  - Ta bort

## Teknologier
- **Backend:** Node.js, Express, MongoDB, Mongoose
- **Frontend:** React
- **Autentisering:** JSON Web Token (JWT)

## Installation
1. Klona detta repo:
   ```bash
   git clone https://github.com/ditt-användarnamn/ditt-repo.git
   cd ditt-repo
   ```
2. Installera beroenden:
   ```bash
   npm install
   ```
3. Skapa en **.env**-fil och lägg till:
   ```env
   MONGO_URI=din-mongodb-url
   JWT_SECRET=din-hemliga-nyckel
   GOOGLE_BOOKS_API_KEY=din-api-nyckel
   ```
4. Starta servern:
   ```bash
   npm start
   ```

## API Endpoints
- **Hämta alla recensioner för en bok:**
  ```http
  GET /reviews/book/:bookId
  ```
- **Hämta en specifik recension:**
  ```http
  GET /reviews/:id
  ```
- **Skapa en recension:**
  ```http
  POST /reviews
  ```
- **Uppdatera en recension:**
  ```http
  PUT /reviews/:id
  ```
- **Ta bort en recension:**
  ```http
  DELETE /reviews/:id
  ```

## Kom igång
- Registrera en användare
- Logga in för att skriva och hantera recensioner
- Sök böcker och läs recensioner

## Förbättringar & TODOs
- Implementera bättre felhantering
- Lägg till användarprofilsidor
- Förbättra UI i frontend

