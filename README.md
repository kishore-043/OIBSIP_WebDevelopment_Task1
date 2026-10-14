🍕 Pizza Delivery Website

A full-stack web application developed as part of my Web Development Internship at Oasis Infobyte (OIB-SIP).

📌 Project Overview

The Pizza Delivery Website is designed to display available pizzas and provide a simple shopping cart experience. It connects a React.js frontend with a Node.js and Express.js backend and uses MongoDB to store pizza information.

✨ Features

- 🍕 Display available pizzas with names and prices.
- 🔄 Fetch pizza data from the backend API.
- 🛒 Add pizzas to the shopping cart.
- ❌ Remove items from the cart.
- 💰 Calculate the total cart price dynamically.
- 🗄️ Store and retrieve pizza information using MongoDB.

🛠️ Technologies Used

Technology| Purpose
React.js| Frontend user interface
Vite| Frontend development environment
JavaScript| Application functionality
HTML & CSS| Structure and styling
Node.js| Backend runtime
Express.js| Backend API development
MongoDB| Database
Git & GitHub| Version control and repository hosting

📂 Project Structure

OIBSIP_WebDevelopment_Task1/
├── backend/
│   ├── server.js
│   ├── routes/
│   ├── models/
│   └── package.json
├── frontend/
│   ├── src/
│   ├── public/
│   ├── index.html
│   └── package.json
└── README.md

Note: Update the structure if your actual project folders or files differ.

⚙️ Installation and Setup

Prerequisites

- Node.js and npm
- MongoDB connection
- Git

1. Clone the Repository

git clone https://github.com/kishore-043/OIBSIP_WebDevelopment_Task1.git
cd OIBSIP_WebDevelopment_Task1

2. Configure and Start the Backend

cd backend
npm install

Create a ".env" file inside the backend folder:

MONGO_URI=your_mongodb_connection_string
PORT=5000

Start the backend server:

node server.js

3. Start the Frontend

Open a separate terminal from the project root:

cd frontend
npm install
npm run dev

Open the local URL displayed by Vite in your browser.

🧪 Project Testing

The project has been tested locally for pizza listing and cart management, including adding and removing items and calculating the cart total.

The checkout workflow requires separate verification before it can be considered fully functional.

🚀 Future Enhancements

- Complete the checkout and order placement workflow.
- Implement user authentication.
- Add order history and tracking.
- Integrate a secure payment gateway.
- Deploy the application online.

🔗 Project Links

- GitHub Repository: https://github.com/kishore-043/OIBSIP_WebDevelopment_Task1
- Project Demo Video: Add your LinkedIn video post URL here.
- Live Website: Add the deployed website URL if available.

🎓 Internship Details

- Organization: Oasis Infobyte
- Program: OIB-SIP Internship
- Domain: Web Development
- Task: Task 1
- Project Title: Pizza Delivery Website

👨‍💻 Author

Kishore T

Developed as a practical project to strengthen my full-stack web development skills and understanding of frontend-backend integration.

---

⭐ Thank you for visiting my project repository!
