# 🛒 FreshMart – Grocery Delivery Web Application

FreshMart is a full-stack **grocery delivery web application** that allows customers to browse groceries, manage their cart, place orders, make online payments, and track delivery-related updates.

The project also includes **Admin** and **Delivery Boy** functionality for managing products, orders, users, and deliveries.

## 🌐 Live Project

👉 **Live Demo:** https://freshmart-brown.vercel.app/

---

## 📌 About the Project

FreshMart is designed as a real-world grocery delivery platform.

A customer can:

- Create an account and log in
- Sign in using Google
- Browse grocery products
- Add products to the cart
- Manage cart items
- Place an order
- Make payment using Stripe
- Provide/select a delivery location
- Get location information using latitude and longitude
- Receive OTP/email verification
- Get real-time delivery/order updates

The system also provides separate functionality for **Admin** and **Delivery Boys**.

---

## ✨ Main Features

### 👤 Customer

- User registration and login
- Password hashing for secure authentication
- Google OAuth login
- Email/OTP verification
- Browse grocery products
- Add/remove products from cart
- Update product quantity
- Place orders
- Stripe online payment
- Payment success/failure handling
- Delivery address/location support
- Real-time order/delivery updates

### 🚚 Delivery Boy

- Delivery boy authentication
- View assigned deliveries
- Receive delivery/order updates
- Update delivery status
- Real-time communication with the application using Socket.IO

### 🛠️ Admin

- Admin authentication
- Manage grocery products
- Manage users
- Manage orders
- Manage delivery assignments
- View order/payment information
- Dashboard charts and statistics using Recharts

---

## 🧰 Tech Stack

| Technology | Purpose |
|---|---|
| **Next.js** | Frontend and application framework |
| **React** | Building UI components |
| **TypeScript** | Type-safe development |
| **Tailwind CSS** | Styling and responsive UI |
| **Node.js** | Backend runtime |
| **MongoDB** | Database |
| **Mongoose** | MongoDB data modeling |
| **Socket.IO** | Real-time communication |
| **Stripe** | Online payments |
| **Google OAuth 2.0** | Google login |
| **Axios** | API requests |
| **bcryptjs** | Password hashing |
| **Nodemailer** | Email/OTP delivery |
| **React Leaflet** | Interactive maps |
| **Recharts** | Admin dashboard charts |
| **Gemini API** | AI-powered message/suggestion functionality |
| **Vercel** | Frontend deployment |
| **Render** | Backend deployment |

---

## 🏗️ Project Architecture

```text
                    ┌─────────────────────┐
                    │      FreshMart      │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        👤 Customer       🛠️ Admin        🚚 Delivery Boy
              │                │                │
              └────────────────┼────────────────┘
                               │
                               ▼
                         Next.js / API
                               │
                ┌──────────────┼──────────────┐
                │              │              │
                ▼              ▼              ▼
             MongoDB        Stripe        Socket.IO
                │              │              │
                ▼              ▼              ▼
             Database       Payments      Real-time Updates
```

---

## 💳 Stripe Payment Integration

FreshMart uses **Stripe** for online payments.

### Payment flow

```text
Customer
   ↓
Add products to cart
   ↓
Checkout
   ↓
Create Stripe payment
   ↓
Stripe processes payment
   ↓
Payment success / failure
   ↓
Stripe Webhook
   ↓
Verify payment event
   ↓
Update order/payment status
```

Stripe webhooks are used so the backend can receive payment events from Stripe and update the application accordingly.

For local webhook testing, Stripe CLI can forward events to the local webhook endpoint.

Example:

```bash
stripe listen --forward-to localhost:3000/api/user/stripe/webhook
```

> Keep Stripe secret keys and webhook secrets inside environment variables. Never commit them to GitHub.

---

## 🔄 Real-Time Communication

FreshMart uses **Socket.IO** for real-time communication.

It is useful for features such as:

- Delivery assignment updates
- Order status updates
- Delivery boy updates
- Real-time communication between connected users

### Socket flow

```text
User
  ↓
Socket Connection
  ↓
Unique Socket/User ID
  ↓
Server
  ↓
Real-time Event
  ↓
Customer / Delivery Boy / Admin
```

Server-side package:

```bash
npm install socket.io
```

Client-side package:

```bash
npm install socket.io-client
```

---

## 📍 Location & Maps

FreshMart supports location-based delivery functionality.

### Reverse Geocoding

Latitude and longitude can be converted into a readable:

```text
Latitude + Longitude
        ↓
Reverse Geocoding
        ↓
Street / Area / Place
```

**React Leaflet** is used for map-related UI.

---

## 🔐 Authentication & Security

The application includes:

- Password hashing using `bcryptjs`
- Google OAuth 2.0 login
- Email/OTP verification using Nodemailer
- Protected application routes
- Environment variables for sensitive credentials
- Stripe webhook verification
- Server-side API validation

Sensitive values such as:

```text
DATABASE_URL
STRIPE_SECRET_KEY
STRIPE_WEBHOOK_SECRET
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
EMAIL credentials
GEMINI_API_KEY
```

should be stored in environment variables and should **never be committed to GitHub**.

---

## 📦 Important Packages

Some important packages used in the project include:

```text
next
react
typescript
mongoose
socket.io
socket.io-client
axios
bcryptjs
stripe
nodemailer
react-leaflet
recharts
```

The project uses `package-lock.json` to keep installed package versions consistent.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

```bash
cd FreshMart
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create environment variables

Create a `.env.local` file and add the required values.

Example:

```env
MONGODB_URI=your_mongodb_connection_string

STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_WEBHOOK_SECRET=your_stripe_webhook_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret

GEMINI_API_KEY=your_gemini_api_key

EMAIL_USER=your_email
EMAIL_PASSWORD=your_email_password
```

> The exact variable names should match the ones used in your project code.

### 4. Start the application

```bash
npm run dev
```

Then open:

```text
http://localhost:3000
```

---

## 🧪 Stripe Local Testing

Run the FreshMart application first.

Then start Stripe CLI:

```bash
stripe listen --forward-to localhost:3000/api/user/stripe/webhook
```

Stripe CLI will provide a webhook signing secret.

Add that secret to your environment variables:

```env
STRIPE_WEBHOOK_SECRET=your_webhook_secret
```

Keep the Stripe webhook listener running while testing payments locally.

---

## 📊 Admin Dashboard

The Admin dashboard provides management and monitoring functionality.

It can include:

- Product management
- Order management
- User management
- Delivery management
- Payment information
- Charts and statistics

**Recharts** is used for displaying dashboard charts.

---

## 🌍 Deployment

The project is designed with separate frontend and backend deployment.

```text
Frontend  → Vercel
Backend   → Render
Database  → MongoDB
Payments  → Stripe
```

### Frontend

Deploy the Next.js application on **Vercel**.

### Backend

Deploy the backend/server application on **Render**.

### Database

Use **MongoDB** for storing:

- Users
- Products
- Orders
- Payments
- Delivery assignments
- Other application data

After deployment, make sure the production environment variables are configured correctly.

---

## 🔗 Useful Project Links

| Resource | Link |
|---|---|
| 🌐 Live Website | `YOUR_LIVE_PROJECT_LINK` |
| 💻 GitHub Repository | `YOUR_GITHUB_REPOSITORY_URL` |
| 🎨 Frontend | `YOUR_FRONTEND_URL` |
| ⚙️ Backend API | `YOUR_BACKEND_URL` |

---

## 🧩 Important Project Concepts

### API Communication

Axios is used to communicate between the frontend and backend.

```text
Frontend
   ↓
Axios Request
   ↓
Backend API
   ↓
MongoDB
   ↓
API Response
   ↓
Frontend
```

### Middleware

Middleware is used to process requests before they reach protected server routes, such as authentication and authorization checks.

### Package Version Locking

`package-lock.json` records exact dependency versions so that the same dependency versions can be installed consistently.

---

## 📝 Example User Flow

```text
1. User opens FreshMart
        ↓
2. User signs up / logs in
        ↓
3. User browses groceries
        ↓
4. User adds products to cart
        ↓
5. User selects delivery location
        ↓
6. User proceeds to checkout
        ↓
7. User completes Stripe payment
        ↓
8. Stripe webhook verifies the payment
        ↓
9. Order is created/updated
        ↓
10. Delivery is assigned
        ↓
11. Delivery status is updated in real time
        ↓
12. Customer receives the order
```

---

## 🎯 Project Goal

The main goal of FreshMart is to build a practical grocery delivery platform with:

- Secure authentication
- Online payment processing
- Location-based delivery support
- Real-time communication
- Admin management
- Delivery management
- Responsive and user-friendly UI

---

## 👩‍💻 Developer

**Samruddhi Bichpuriya**

Full Stack / MERN & Next.js Developer

---

## 📄 License

This project is developed for learning, portfolio, and demonstration purposes.
