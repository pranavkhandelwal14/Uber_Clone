# Users API — Register Endpoint

## Endpoint

- **URL:** `/users/register`
- **Method:** `POST`
- **Description:** Create a new user account. The endpoint validates input, hashes the password, stores the user, and returns a JWT authentication token and the created user object.

## Request Body

Content-Type: `application/json`

Example:

```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "john.doe@example.com",
  "password": "secret123"
}
```

Fields and requirements:

- `fullname.firstname` (string) — required. Minimum length: 3 characters.
- `fullname.lastname` (string) — optional. Minimum length: 3 characters when provided.
- `email` (string) — required. Must be a valid email address.
- `password` (string) — required. Minimum length: 6 characters.

Validation rules implemented in `user.routes.js`:

- `body('email').isEmail()` — returns 400 if invalid.
- `body('fullname.firstname').isLength({ min: 3 })` — returns 400 if too short.
- `body('password').isLength({ min: 6 })` — returns 400 if too short.

If validation fails, the endpoint responds with HTTP `400 Bad Request` and a JSON payload like:

```json
{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    }
  ]
}
```

## Successful Response

- **Status:** `201 Created`
- **Body:** JSON object containing the JWT `token` and the created `user` object.

Example success response:

```json
{
  "token": "<jwt-token>",
  "user": {
    "_id": "6423...",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

Notes:

- The password is hashed on the server before saving (see `user.model.js` static `hashPassword`). The returned `user` object should not include the raw password.
- A JWT is issued using `user.generateAuthToken()` (see `user.model.js`); ensure `process.env.JWT_SECRET` is set in your environment.

## Possible Error Status Codes

- `400 Bad Request` — input validation failed (see above).
- `409 Conflict` — email already in use (may be returned by the database if a unique index violation is detected).
- `500 Internal Server Error` — unexpected server or database error.

## Example responses (what the client receives)

- Successful registration (HTTP/1.1 201 Created)

```http
HTTP/1.1 201 Created
Content-Type: application/json

{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "6423abcdef1234567890abcd",
    "fullname": {
      "firstname": "John",
      "lastname": "Doe"
    },
    "email": "john.doe@example.com",
    "socketId": null
  }
}
```

- Validation error (HTTP/1.1 400 Bad Request)

```http
HTTP/1.1 400 Bad Request
Content-Type: application/json

{
  "errors": [
    {
      "msg": "First name must be at least 3 characters long",
      "param": "fullname.firstname",
      "location": "body"
    },
    {
      "msg": "Invalid Email",
      "param": "email",
      "location": "body"
    }
  ]
}
```

- Conflict error (example when email already exists) (HTTP/1.1 409 Conflict)

```http
HTTP/1.1 409 Conflict
Content-Type: application/json

{
  "error": "Email already in use"
}
```

These examples show the full HTTP status line and response body the client will receive.

## Example curl

```bash
curl -X POST http://localhost:3000/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullname": { "firstname": "John", "lastname": "Doe" },
    "email": "john.doe@example.com",
    "password": "secret123"
  }'
```

## Where to look in the code

- Route + validation: `Backend/routes/user.routes.js`
- Controller (validation handling, hashing & token): `Backend/controllers/user.controller.js`
- Model (schema, hashPassword, generateAuthToken): `Backend/models/user.model.js`
- Service (user creation): `Backend/services/user.service.js`

If you want, I can also add example Postman collection snippets or update other endpoints the same way.