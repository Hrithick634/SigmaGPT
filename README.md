🚀 SigmaGPT

SigmaGPT is a full-stack AI-powered chat application built using the MERN stack and integrated with OpenAI’s GPT API. It allows users to create multiple chat threads, view conversation history, and interact with an intelligent assistant through a modern, responsive UI.

✨ Features

💬 AI Chat Interface using OpenAI GPT models

🧵 Multiple Chat Threads with persistent history

🗑 Create, Switch & Delete Conversations

⚡ Real-time responses with smooth UX

🌙 Dark-themed UI with custom scrollbar

🧠 Markdown & Code Highlighting for AI responses

🔐 Secure environment variables using .env

🛠 Tech Stack
Frontend

React (Vite)

Context API

CSS (Custom Dark Theme)

React Markdown + Syntax Highlighting

Backend

Node.js

Express.js

MongoDB Atlas

Mongoose

OpenAI API

📁 Project Structure
SigmaGPT/
│
├── Backend/
│   ├── routes/
│   ├── models/
│   ├── utils/
│   ├── server.js
│   └── .env (ignored)
│
├── Frontend/
│   ├── components/
│   ├── context/
│   ├── App.jsx
│   └── main.jsx
│
├── .gitignore
└── README.md

🚀 Getting Started
1️⃣ Clone the Repository
git clone https://github.com/Hrithick634/SigmaGPT.git
cd SigmaGPT

2️⃣ Backend Setup
cd Backend
npm install
npm start


Server will run on:

http://localhost:8080

3️⃣ Frontend Setup
cd Frontend
npm install
npm run dev


Frontend will run on:

http://localhost:5173

📡 API Endpoints
Method	Endpoint	Description
GET	/api/thread	Fetch all chat threads
GET	/api/thread/:id	Fetch messages of a thread
POST	/api/chat	Send message to GPT
DELETE	/api/thread/:id	Delete a thread
