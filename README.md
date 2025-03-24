# Portfolio Website

This is a personal portfolio website built using the MERN (MongoDB, Express.js, React.js, Node.js) stack. It showcases projects, experience, and social media profiles with a modern and interactive design.

## Features
- **User Profile Management**: Fetch and display user details dynamically.
- **Animated Components**: Uses Framer Motion for smooth animations.
- **Hover Effects**: Text and card animations for better UI/UX.
- **Tilted Card Effect**: Adds a 3D effect to images.
- **Dynamic Content**: Fetches user details from the backend.
- **Responsive Design**: Fully optimized for mobile and desktop views.

## Tech Stack
- **Frontend**: React.js, Tailwind CSS, Framer Motion
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JWT & Cookies (if applicable)
- **Cloudinary**: For store files

## Installation & Setup

### Prerequisites
Make sure you have the following installed:
- Node.js
- MongoDB
- npm or yarn

### Clone the Repository
```sh
git clone https://github.com/MIRZATAUFEEQ/PORTFOLIOMain.git
cd portfolio
```

### Backend Setup
```sh
cd backend
npm install
npm start
```

### Frontend Setup
```sh
cd frontend
npm install
npm run dev
```

## Environment Variables
Create a `.env` file in the backend directory and configure the following:
```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
VITE_BACKEND_URL=http://localhost:5000
```

## Usage
- Open `http://localhost:5173` in the browser.
- The portfolio dynamically fetches user details and displays them.
- Navigate through different sections like **About Me**, **Projects**, and **Contact**.
- Click on social media icons to open respective profiles.

## Deployment
To deploy the project, you can use platforms like:
- **Frontend**: Vercel / Netlify
- **Backend**: Render / Heroku
- **Database**: MongoDB Atlas

## Author
**Your Name** - [GitHub](https://github.com/MIRZATAUFEEQ) | [LinkedIn](https://www.linkedin.com/in/mirza-taufeeq-17166b223/)

## Contact
Feel free to reach out via:
-**LinkedIn**: - [LinkedIn](https://www.linkedin.com/in/mirza-taufeeq-17166b223/)
---
Feel free to contribute or suggest improvements!

