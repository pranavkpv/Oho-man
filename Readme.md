# 🛠️ OHO Man

**OHO Man** is a full-stack service marketplace platform that connects customers with local service providers. Users can browse services, book providers, track their bookings, and rate completed work — while providers manage their jobs, availability, and incoming requests from a dedicated dashboard.

---

## ✨ Features

### For Users
- Browse available services with images and pricing
- View provider profiles with ratings and availability
- Book a service provider in one click
- Track bookings by status — Pending, In Progress, Completed
- Rate providers after a completed booking

### For Providers
- Toggle online/offline availability in real time
- View and manage incoming job requests
- Move jobs through status stages — Pending → In Progress → Completed
- Switch between User and Provider roles seamlessly

### General
- JWT-based authentication with access & refresh tokens
- Role-based dashboards (User / Provider)
- Responsive UI built with React + Tailwind CSS

---

## 🧱 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React, TypeScript, Vite, Tailwind CSS, shadcn/ui |
| Backend | Node.js, Express.js |
| Database | MongoDB (Mongoose) |
| Auth | JWT (Access + Refresh tokens) |
| Validation | Zod, React Hook Form |
| Routing | React Router DOM |

---

## 📁 Project Structure

```
Oho-man/
├── frontend/         # React + Vite client
│   ├── src/
│   │   ├── api/          # Axios service calls
│   │   ├── components/   # Shared UI components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Route-level page components
│   │   ├── types/        # TypeScript type definitions
│   │   ├── utils/        # Token helpers, utilities
│   │   └── validation/   # Zod schemas
│   └── .env
│
└── backend/          # Express REST API
    ├── controllers/      # Route handler logic
    ├── middleware/       # Auth, error handling
    ├── models/          # Mongoose schemas
    ├── routes/          # API route definitions
    └── .env
```

---

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18+
- [MongoDB](https://www.mongodb.com/) running locally or a connection URI
- npm

---

### 1. Clone the Repository

```bash
git clone https://github.com/pranavkpv/Oho-man.git


---

### 2. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at **http://localhost:5173**

---

### 3. Backend Setup

Open a new terminal and from the project root:

```bash
cd backend
npm install
```

Create a `.env` file in the `backend/` directory:

```env
PORT=5000

MONGO_URI=mongodb://127.0.0.1:27017/ohoman

JWT_ACCESS_SECRET=access_secret_key
JWT_REFRESH_SECRET=refresh_secret_key

ACCESS_TOKEN_EXPIRES=15m
REFRESH_TOKEN_EXPIRES=7d

FRONTEND_URL=http://localhost:5173
```

Start the backend server:

```bash
npm run dev
```

The API will be available at **http://localhost:5000/api**

---

## 🔑 Environment Variables

### Frontend (`frontend/.env`)

| Variable | Description |
|---|---|
| `VITE_API_BASE_URL` | Base URL for all API requests |

### Backend (`backend/.env`)

| Variable | Description |
|---|---|
| `PORT` | Port the Express server runs on |
| `MONGO_URI` | MongoDB connection string |
| `JWT_ACCESS_SECRET` | Secret key for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret key for signing refresh tokens |
| `ACCESS_TOKEN_EXPIRES` | Access token expiry duration (e.g. `15m`) |
| `REFRESH_TOKEN_EXPIRES` | Refresh token expiry duration (e.g. `7d`) |
| `FRONTEND_URL` | Allowed CORS origin for the frontend |

---

## 📡 API Overview

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login and receive tokens |
| POST | `/api/auth/switch-role` | Switch between user/provider role |
| GET | `/api/services` | Get all available services |
| GET | `/api/services/:id/providers` | Get providers for a service |
| POST | `/api/bookings` | Create a new booking |
| GET | `/api/bookings/my` | Get current user's bookings |
| PATCH | `/api/bookings/:id/status` | Update booking status (provider) |
| POST | `/api/ratings` | Submit a rating for a provider |
| PATCH | `/api/users/active` | Toggle provider availability |

---

## 🖼️ Pages

| Page | Route | Description |
|---|---|---|
| Register | `/register` | Create a new account (user or provider) |
| Login | `/login` | Sign in to your account |
| Home | `/home` | Role-based dashboard |
| Services | `/home` (user) | Browse all available services |
| Provider List | `/users/:serviceId` | View providers for a selected service |
| My Bookings | `/home` (user) | Track your bookings |
| Jobs | `/home` (provider) | View available jobs |
| My Work | `/home` (provider) | Manage your active and completed work |

---

## 👤 Roles

### User
- Can browse services and book providers
- Can view and track their bookings
- Can rate providers after job completion

### Provider
- Can toggle availability (online/offline)
- Can accept and manage bookings
- Can switch back to the User role at any time

Both roles are available to a single account — users can register as a provider during sign-up or switch roles from the navbar.

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

1. Fork the repo
2. Create a feature branch — `git checkout -b feature/your-feature`
3. Commit your changes — `git commit -m 'Add some feature'`
4. Push to the branch — `git push origin feature/your-feature`
5. Open a Pull Request

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👨‍💻 Author

Built by [pranavkpv](https://github.com/pranavkpv)