🍕 Pizza Delivery Website

A full-stack Pizza Delivery Website developed as part of my Web Development Internship at Oasis Infobyte (OIB-SIP).

📌 Project Overview

This project provides a web interface for browsing available pizzas and managing a shopping cart. It uses React.js for the frontend, Node.js and Express.js for the backend, and MongoDB for storing pizza details.

✨ Features

- Display available pizzas with their names and prices.
- Fetch pizza data from the backend API.
- Add pizzas to the shopping cart.
- Remove items from the cart.
- Calculate the total cart price dynamically.
- Store and retrieve pizza information using MongoDB.

🛠️ Technologies Used

- Frontend: React.js, Vite, JavaScript, HTML, CSS
- Backend: Node.js, Express.js
- Database: MongoDB
- Tools: Visual Studio Code, Git, GitHub

📂 Project Structure

pizza-delivery
├── backend
│   ├── server.js
│   ├── routes
│   ├── models
│   └── .env
├── frontend
│   ├── src
│   ├── public
│   ├── package.json
│   └── index.html
└── README.md

Note: The structure above is illustrative. Adjust it to match the actual files in your repository.

⚙️ Installation and Setup

1. Clone the repository

git clone YOUR_GITHUB_REPOSITORY_URL
cd YOUR_REPOSITORY_FOLDER

2. Start the backend

cd backend
npm install

Configure the backend ".env" file with your MongoDB connection string and port:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the backend:

node server.js

3. Start the frontend

Open a separate terminal:

cd frontend
npm install
npm run dev

Open the local URL displayed by Vite in your browser.

Important: Never upload database passwords, API keys, or other secrets to a public repository.

🧪 Testing

The project has been developed and tested locally. Pizza listings and cart add/remove operations are available, with the cart total calculated dynamically.

🚀 Future Improvements

- Implement a complete checkout workflow.
- Add customer authentication and order history.
- Integrate a secure payment gateway.
- Deploy the application online.

🔗 Project Links

- GitHub Repository: YOUR_GITHUB_REPOSITORY_URL
- Project Demo Video: YOUR_LINKEDIN_VIDEO_URL
- Live Website: Add your deployed URL if available.

🎓 Internship Details

- Organization: Oasis Infobyte
- Program: OIB-SIP Internship
- Domain: Web Development
- Project: Pizza Delivery Website

👨‍💻 Author

Kishore T

Built as a hands-on project to strengthen my full-stack web development skills.

---

⭐ Thank you for visiting my project repository!
