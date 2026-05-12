# 🌪️ Vortex Developer Community

Welcome to **Vortex**, a modern developer community platform designed to help developers **connect, collaborate, learn, and grow together**.

Vortex provides real-time communication, structured onboarding, personalized user profiles, and a scalable architecture built with cutting-edge technologies.

---

# 📌 Overview

**Vortex Developer Community** is a full-stack developer collaboration platform that enables:

* Secure authentication with JWT + refresh tokens
* Real-time developer chat using WebSockets
* Personalized onboarding experience
* Developer profile management
* Content sharing and collaboration features
* Scalable backend architecture using PostgreSQL

The platform is designed with **performance, scalability, and contributor friendliness** in mind.

---

# 🚀 Features

## 🔐 Authentication System

* JWT-based authentication
* Access & Refresh token flow
* CSRF protection enabled
* Secure cookie handling
* Persistent login sessions

## 🎯 Onboarding Flow

New users are guided through:

* Account setup
* Profile completion
* Skill selection
* Community personalization

This ensures a tailored experience from day one.

## 👤 User Profiles

Users can:

* Create developer profiles
* Add skills & interests
* Showcase projects
* Connect with community members

## 💬 Real-Time Chat (WebSockets)

Built using **Socket.io**

Supports:

* Instant messaging
* Live developer conversations
* Scalable event-based communication

## 📚 Content Management

Users can:

* Share posts
* Collaborate on ideas
* Explore developer discussions

---

# 💻 Tech Stack

## Frontend

* Next.js 19
* React 19
* Tailwind CSS
* Redux Toolkit
* TypeScript

## Backend

* Node.js
* Express.js
* TypeScript
* Socket.io
* PostgreSQL
* Drizzle ORM

## Security

* JWT Authentication
* Refresh Token Rotation
* CSRF Protection
* Secure HTTP-only Cookies

---

# 📂 Project Structure

```
vortex/
│
├── client/                  # Frontend (Next.js App)
│   ├── app/
│   ├── components/
│   ├── redux/
│   ├── hooks/
│   ├── services/
│   ├── utils/
│   └── styles/
│
├── server/                  # Backend (Express API)
│   ├── controllers/
│   ├── middleware/
│   ├── routes/
│   ├── services/
│   ├── db/
│   ├── sockets/
│   └── utils/
│
├── shared/                  # Shared types / utilities
│
├── .env.example
├── package.json
└── README.md
```

---

# ⚙️ Setup Instructions

## 1️⃣ Clone Repository

```
git clone https://github.com/AbhilashReddy1519/vortex.git
cd vortex
```

---

## 2️⃣ Install Dependencies

Install dependencies for both client and server:

```
npm install
```

or if using workspaces:

```
npm install --workspaces
```

---

## 3️⃣ Setup Environment Variables

Create `.env` file inside:

```
/server
/client
```

Example:

```
DATABASE_URL=
JWT_ACCESS_SECRET=
JWT_REFRESH_SECRET=
NEXT_PUBLIC_API_URL=
```

---

## 4️⃣ Run Development Server

Start backend:

```
npm run server
```

Start frontend:

```
npm run client
```

Or run both together:

```
npm run dev
```

---

# 🌐 Open Application

Visit:

```
http://localhost:3000
```

---

# 🔄 Authentication Flow

Vortex implements **secure dual-token authentication**

## Access Token

* Short-lived
* Stored securely
* Used for API requests

## Refresh Token

* Long-lived
* Stored in HTTP-only cookies
* Automatically refreshes session

## CSRF Protection

Ensures:

* Secure token validation
* Request authenticity
* Protection against malicious attacks

Flow Summary:

```
Login → Access Token Issued
      → Refresh Token Stored Securely
      → Auto Refresh When Expired
```

---

# 🎯 Onboarding Flow

After signup:

```
Create Account
   ↓
Profile Setup
   ↓
Skill Selection
   ↓
Community Personalization
   ↓
Dashboard Access
```

This ensures every developer gets a customized experience immediately.

---

# 🤝 Contributing Guidelines

We welcome contributors from all experience levels 💙

Follow these steps:

## 1️⃣ Fork Repository

Click **Fork**

---

## 2️⃣ Create Branch

```
git checkout -b feature/your-feature-name
```

---

## 3️⃣ Commit Changes

```
git commit -m "Added new feature"
```

---

## 4️⃣ Push Branch

```
git push origin feature/your-feature-name
```

---

## 5️⃣ Open Pull Request

Submit PR and describe your improvements clearly.

---

# 🧪 Development Best Practices

Before submitting PR:

* Run lint checks
* Ensure build passes
* Follow folder structure conventions
* Write clean commit messages

Example:

```
feat: added websocket notification handler
fix: resolved refresh token bug
refactor: optimized auth middleware
```

---

# 📝 License

This project is licensed under the **MIT License**

You are free to:

* Use
* Modify
* Distribute
* Contribute

See LICENSE file for details.

---

# 🌟 Vision of Vortex

Vortex is not just a project.

It is a **developer ecosystem in progress** designed to become:

* A collaboration hub
* A learning accelerator
* A portfolio enhancer
* A networking platform

Built by developers. For developers.
