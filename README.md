
# Jobify Backend

This is the **backend API** for the Jobify project — a job-sharing platform that enables users to post, search, and manage job opportunities.  
It provides secure and scalable RESTful endpoints for use by the [Jobify Frontend](#jobify-frontend).

---

## ✨ Features

- 🔐 User authentication & authorization (JWT-based)
- 📮 Create, Read, Update, Delete (CRUD) job posts
- ⚙️ RESTful API built with Express.js
- 📁 MongoDB with Mongoose for data storage
- 📦 Input validation using  Zod
- 🧾 Error handling and logging middleware
- 🌍 CORS-enabled for cross-origin frontend access

---

## 🛠️ Tech Stack

- **Node.js** + **Express.js**
- **MongoDB** with **Mongoose**
- **JWT** for authentication
- **dotenv**, **helmet**, **cors**, etc. for security & environment management
- **Zod** for validation
- **Cloudinary & Multer**  for file uploads

---

## 🚀 Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/dan-kingo/jobify-api.git
cd jobify-api
````

### 2. Install dependencies

```bash
npm install
# or
yarn install
```

### 3. Create `.env` file

Create a `.env` file in the root directory with the following variables:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

> You can add any other variables you need based on features (e.g., Cloudinary keys, email config, etc.)

### 4. Run the development server

```bash
npm run dev
```

> Make sure MongoDB is running locally or connected to a cloud database like Atlas.

---

## 📁 Folder Structure

```
src/
├── controllers/       # Route logic
├── models/            # Mongoose schemas
├── routes/            # Express routes
├── middlewares/       # Auth, error handler, etc.
├── utils/             # Helpers/utilities
├── config/            # DB connection, constants
└── index.js           # Entry point
```

---

## 📬 API Endpoints (Sample)

| Method | Endpoint             | Description            |
| ------ | -------------------- | ---------------------- |
| POST   | `/api/auth/register` | Register a new user    |
| POST   | `/api/auth/login`    | Login with credentials |
| GET    | `/api/jobs`          | Get all jobs           |
| POST   | `/api/jobs`          | Create a job           |
| PUT    | `/api/jobs/:id`      | Update a job           |
| DELETE | `/api/jobs/:id`      | Delete a job           |

---

## ⚙️ Scripts

```bash
npm run dev        # Run with nodemon
npm run start      # Run in production
```

---

## 🔒 Security & Best Practices

* Environment variables managed via `.env`
* HTTP headers protected with `helmet`
* CORS configured for safe cross-origin access
* Passwords hashed using `bcryptjs`
* JWT-based token authentication

---


## 👨‍💻 Author

**Daniel Dejen**


---

## 🙌 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

