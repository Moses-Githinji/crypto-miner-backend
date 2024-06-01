# Advanced Crypto Mining Web App

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies](#technologies)
- [Setup Instructions](#setup-instructions)
- [Backend API Endpoints](#backend-api-endpoints)
- [Frontend Components](#frontend-components)
- [Contributing](#contributing)
- [License](#license)

## Introduction
This project is an advanced cryptocurrency mining web application. It provides users with the ability to mine cryptocurrency, view mining statistics in real-time, manage their accounts, and receive payments. It also supports selling mined cryptocurrency directly from the platform. The application is built using modern web technologies to ensure high performance and an engaging user experience.

## Features
- User authentication and authorization
- Real-time mining statistics
- Payment gateway integration
- Cryptocurrency selling functionality
- Responsive design for web and mobile platforms
- Admin dashboard for managing users and monitoring mining activities
- Notifications for mining events and transactions

## Technologies
- **Frontend**: Next.js, Tailwind CSS, React Icons, Shadcn-ui, Socket.io
- **Backend**: Node.js, Express.js, Prisma, PostgreSQL, Socket.io
- **Authentication**: JSON Web Tokens (JWT)
- **Payments**: Integration with popular payment gateways (e.g., Stripe)
- **SMS Notifications**: Twilio

## Setup Instructions

### Prerequisites
- Node.js (>=14.x)
- PostgreSQL (>=12.x)

### Backend Setup

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/crypto-mining-app.git
   cd crypto-mining-app/backend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Set up the database:**
   - Create a PostgreSQL database.
   - Create a `.env` file in the `backend` directory and add the following:
     ```env
     DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DATABASE
     JWT_SECRET=your_jwt_secret
     TWILIO_ACCOUNT_SID=your_twilio_account_sid
     TWILIO_AUTH_TOKEN=your_twilio_auth_token
     TWILIO_PHONE_NUMBER=your_twilio_phone_number
     ```

4. **Run database migrations:**
   ```sh
   npx prisma migrate dev --name init
   ```

5. **Start the backend server:**
   ```sh
   npm run dev
   ```

### Frontend Setup

1. **Navigate to the frontend directory:**
   ```sh
   cd ../frontend
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Create a `.env.local` file in the `frontend` directory and add the following:**
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:5000
   ```

4. **Start the frontend server:**
   ```sh
   npm run dev
   ```

## Backend API Endpoints
Here are some key API endpoints available in the backend:

- **User Authentication**
  - `POST /register`: Register a new user
  - `POST /login`: Authenticate a user and return a JWT

- **Mining Operations**
  - `GET /mining/start`: Start mining for authenticated user
  - `GET /mining/stop`: Stop mining for authenticated user
  - `GET /mining/stats`: Retrieve mining statistics

- **Payments**
  - `POST /payments/initiate`: Initiate a payment
  - `POST /payments/confirm`: Confirm a payment

- **Admin Operations**
  - `GET /admin/users`: Retrieve all users
  - `GET /admin/stats`: Retrieve overall mining statistics

## Frontend Components
The frontend is organized into several key components:

- **Authentication**
  - `Login.js`: User login form
  - `Register.js`: User registration form

- **Dashboard**
  - `Dashboard.js`: Main dashboard for mining statistics
  - `Stats.js`: Displays real-time mining statistics
  - `Payments.js`: Manage payments and transactions
  - `SellCrypto.js`: Interface for selling mined cryptocurrency

- **Admin Dashboard**
  - `AdminDashboard.js`: Admin overview
  - `ManageUsers.js`: Admin interface for managing users
  - `AdminStats.js`: Admin interface for viewing overall statistics

## Contributing
Contributions are welcome! Please fork the repository and submit a pull request with your changes. Make sure to follow the coding standards and include appropriate tests.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

This README provides an overview of the advanced crypto-mining web app, along with setup instructions and details about its features and components. If you have any questions or issues, feel free to open an issue on GitHub.