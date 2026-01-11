🛒 Cartify – Full-Stack E-Commerce Application

Cartify is a modern full-stack e-commerce web application that provides a smooth online shopping experience with product browsing, cart management, user authentication, and checkout functionality.
The project follows a clean frontend + backend architecture, making it scalable and easy to maintain.

🌐 Live Demo:
👉 https://cartify-iota-five.vercel.app

✨ Features

🛍️ Browse products with clean UI

🔍 Product details page

🛒 Add / remove products from cart

👤 User authentication (Login & Register)

🔐 Secure session handling

📦 Checkout flow

📱 Fully responsive design

⚡ Fast performance & optimized UI

🧑‍💻 Tech Stack
Frontend

React (Vite)

Tailwind CSS

Axios

React Router DOM

Context API (Auth & Cart)

Backend

Node.js

Express.js

MongoDB

Mongoose

JWT Authentication

RESTful APIs

Deployment

Frontend: Vercel

Backend: Render / Railway / Localhost

Database: MongoDB Atlas

📁 Folder Structure
Cartify-Ecommerce/
├── backend/
│   ├── config/              # Database & environment configuration
│   ├── controllers/         # Business logic for APIs
│   ├── middleware/          # Auth & error handling middleware
│   ├── models/              # MongoDB models (User, Product, Order)
│   ├── routes/              # API route definitions
│   ├── utils/               # Helper functions
│   ├── server.js            # Backend entry point
│   └── package.json
│
├── frontend/
│   ├── public/              # Static assets
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── context/         # Auth & Cart Context
│   │   ├── pages/           # App pages (Home, Login, Cart, etc.)
│   │   ├── services/        # API calls
│   │   ├── App.jsx          # Main app component
│   │   └── main.jsx         # App entry point
│   └── package.json
│
├── README.md
└── .gitignore

🚀 Getting Started (Local Setup)
1️⃣ Clone the Repository
git clone https://github.com/vmaniwork-alt/Cartify-Ecommerce.git
cd Cartify-Ecommerce

2️⃣ Backend Setup
cd backend
npm install


Create a .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_secret_key


Run backend:

npm run dev


Backend runs on:

http://localhost:5000

3️⃣ Frontend Setup
cd frontend
npm install
npm run dev


Frontend runs on:

http://localhost:5173

🔗 API Endpoints (Sample)
Method	Endpoint	Description
POST	/api/auth/register	User registration
POST	/api/auth/login	User login
GET	/api/products	Get all products
GET	/api/products/:id	Get single product
POST	/api/cart	Add item to cart
POST	/api/orders	Place order


(Add later for better GitHub showcase)

🧠 Learnings & Highlights

Clean separation of frontend & backend

Context API for global state

Secure authentication with JWT

Scalable folder architecture

Real-world e-commerce workflow

🤝 Contributing

Contributions are welcome!

Fork the repo

Create a new branch

git checkout -b feature/new-feature

Commit changes

Push and open a Pull Request

📄 License

This project is open-source and available under the MIT License.

👨‍💻 Author

Mani
GitHub: https://github.com/vmaniwork-alt
