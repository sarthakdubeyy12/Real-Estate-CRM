CRM System Backend

📌 Project Overview

This is the backend of a CRM (Customer Relationship Management) system designed to help real estate agencies and agents efficiently manage clients, properties, leads, and tasks. It supports role-based authentication with Admin, Agent, and Client roles, allowing tailored access and operations for each user type.

The backend is built with Node.js, Express, and MongoDB, with Redis for caching and session management. It also integrates with Cloudinary for media storage and can optionally use Twilio/WhatsApp API for reminders.

⸻

🛠 Tech Stack
	•	Backend Framework: Node.js + Express
	•	Database: MongoDB (primary), Redis (cache)
	•	Authentication: JWT (role-based)
	•	Media Storage: Cloudinary (for property images and videos)
	•	Extras: Twilio/WhatsApp API for task reminders




🔹 Features

1. Authentication
	•	Role-based authentication: Admin, Agent, Client
	•	Secure password hashing with bcrypt
	•	JWT token for protected routes

2. User Management (Admin)
	•	Create, read, update, delete users
	•	Assign roles to users

3. Client Management
	•	Agents can add, update, and view their clients
	•	Clients have budgets and preferences

4. Property Management
	•	Agents can add, update, and manage properties
	•	Property images are stored in Cloudinary

5. Lead Management
	•	Track lead stages: New → Contacted → Site Visit → Negotiation → Closed/Lost
	•	Assign leads to agents and link with clients & properties

6. Task Management
	•	Agents can create tasks for clients and leads
	•	Task reminders via email/WhatsApp (optional Twilio integration)
	•	Track task status: Pending / Completed

7. Extras
	•	Redis caching for frequently accessed data
	•	Cloudinary integration for media (images/videos)
	•	Role-based protected APIs


## ⚡ Installation

1. Clone the repo and navigate to the server folder:
```bash
git clone <your-repo-url>
cd CRM/server

2.	Install dependencies:
npm install

3.	Create a .env file in the server folder with the following variables:
PORT=5001
MONGO_URI=<your_mongodb_uri>
JWT_SECRET=<your_jwt_secret>
REDIS_HOST=localhost
REDIS_PORT=6379
CLOUDINARY_CLOUD_NAME=<your_cloud_name>
CLOUDINARY_API_KEY=<your_api_key>
CLOUDINARY_API_SECRET=<your_api_secret>
TWILIO_SID=<your_twilio_sid>
TWILIO_AUTH_TOKEN=<your_twilio_auth_token>
TWILIO_PHONE_NUMBER=<your_twilio_phone_number>


4.	Start the server:
npm run dev
