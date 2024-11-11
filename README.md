# Bookshelf API
A simple Bookshelf API project created to fulfill the course submission for 
[Belajar Back-End Pemula dengan JavaScript](https://www.dicoding.com/academies/261-belajar-back-end-pemula-dengan-javascript) class.

## Table of Contents
- [Prerequisite](#prerequisite)
- [Installation](#installation)
- [Usage](#usage)

## Prerequisite
- node v20.17.0 or later.
- npm v10.8.2 or later.

## Installation
Clone this repository and install dependencies:

```bash
git clone https://github.com/Mzzqq/dicoding-backend-submission.git
cd dicoding-backend-submission
npm install
```

## Usage
The server runs on port 9000 by default.

1. Start the server
   - to start the server in production mode:
   ```bash
   npm start 
   ```
   - To start the server in development mode (auto-reloads on changes):
   ```bash
   npm run start-dev
   ```
   
2. Available Endpoints
Here are some example endpoints you might use:

- GET /books - Retrieves a list of all books.
  - Query Parameters:
    - ?name (optional): Filter books by name (case-insensitive).
    - ?reading (optional): Filter books based on reading status.
    - ?finished (optional): Filter books based on finished status.
- POST /books - Adds a new book to the collection.
- GET /books/{id} - Retrieves details of a specific book by ID.
- PUT /books/{id} - Updates details of a specific book by ID.
- DELETE /books/{id} - Removes a specific book by ID.

3. Example Request
To add a new book, send a POST request to 
http://localhost:9000/books with a JSON body:
```json
{
    "id": "Qbax5Oy7L8WKf74l",
    "name": "Buku A",
    "year": 2010,
    "author": "John Doe",
    "summary": "Lorem ipsum dolor sit amet",
    "publisher": "Dicoding Indonesia",
    "pageCount": 100,
    "readPage": 25,
    "finished": false,
    "reading": false,
    "insertedAt": "2021-03-04T09:11:44.598Z",
    "updatedAt": "2021-03-04T09:11:44.598Z"
}
```

4. Example Response
After adding a book, the server will respond with a JSON object:
```json
{
    "status": "success",
    "message": "Buku berhasil ditambahkan",
    "data": {
        "bookId": "1L7ZtDUFeGs7VlEt"
    }
}
```