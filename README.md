# 🍳 RecipeSnap - AI Cooking Assistant

RecipeSnap is an AI-powered cooking assistant that helps you discover delicious recipes based on ingredients you have in your fridge. Simply upload a photo of your ingredients or type them in, and get personalized recipe suggestions powered by OpenAI's advanced AI models.
![image](https://github.com/user-attachments/assets/9a94c226-8aba-4eb8-88aa-027a438fc5b0)


## ✨ Features

### 🤖 AI-Powered Analysis

- **Image Recognition**: Upload photos of ingredients for automatic identification using OpenAI Vision API (GPT-4o)
- **Recipe Generation**: Get personalized recipe suggestions using GPT-3.5-turbo
- **Smart Suggestions**: AI analyzes your ingredients and suggests practical, achievable recipes

### 📱 User-Friendly Interface

- **Dual Input Methods**: Upload images or manually type ingredients
- **Image Preview**: See your uploaded image before analysis
- **Real-time Feedback**: Loading states and success/error notifications
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🎨 Modern UI/UX

- **Clean Design**: Minimalist interface with transparent background
- **Scrollable Results**: Fixed-height recipe section with smooth scrolling
- **Visual Feedback**: Clear status indicators and progress feedback
- **Intuitive Navigation**: Tab-based interface for easy switching between input methods

## 🏗️ Project Structure

```
receipe_snap/
├── backend/                 # Node.js + Express API
│   ├── src/
│   │   ├── controllers/     # API route handlers
│   │   └── routes/          # Express routes
│   ├── uploads/             # Temporary image storage
│   ├── package.json
│   └── index.js            # Main server file
├── frontend/               # React + TypeScript UI
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Application pages
│   │   ├── config/         # API configuration
│   │   └── utils/          # Utility functions
│   ├── package.json
│   └── index.html
└── README.md              # This file
```

## 🚀 Quick Start

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)

### 1. Clone the Repository

```bash
git clone <repository-url>
cd receipe_snap
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp env.template .env

# Edit .env file and add your OpenAI API key
# .env file should contain:
# PORT=5000
# OPENAI_API_KEY=your_openai_api_key_here
# NODE_ENV=development
```

### 3. Frontend Setup

```bash
# Navigate to frontend directory (from root)
cd frontend

# Install dependencies
npm install

# Optional: Create environment file for custom API URL
cp env.template .env
# Default API URL is http://localhost:5000/api
```

### 4. Start Development Servers

**Terminal 1 - Backend:**

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

**Terminal 2 - Frontend:**

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

### 5. Access the Application

Open your browser and navigate to `http://localhost:5173`

## 📦 Dependencies

### Backend Dependencies

| Package               | Version      | Purpose                         |
| --------------------- | ------------ | ------------------------------- |
| express               | ^5.1.0       | Web framework                   |
| cors                  | ^2.8.5       | Cross-origin resource sharing   |
| dotenv                | ^16.5.0      | Environment variable management |
| multer                | ^1.4.5-lts.1 | File upload handling            |
| openai                | ^4.67.3      | OpenAI API integration          |
| axios                 | ^1.7.9       | HTTP client                     |
| express-async-handler | ^1.2.0       | Async error handling            |

### Frontend Dependencies

| Package                        | Version | Purpose             |
| ------------------------------ | ------- | ------------------- |
| react                          | ^18.3.1 | UI library          |
| typescript                     | ~5.7.2  | Type safety         |
| @mantine/core                  | ^6.0.21 | UI components       |
| @mantine/notifications         | ^6.0.21 | Notification system |
| @fortawesome/react-fontawesome | ^0.2.2  | Icons               |
| axios                          | ^1.9.0  | HTTP client         |
| react-router-dom               | ^6.30.0 | Routing             |
| vite                           | ^6.3.1  | Build tool          |

## 🔧 Configuration

### Backend Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Required
OPENAI_API_KEY=your_openai_api_key_here

# Optional
PORT=5000
NODE_ENV=development
```

### Frontend Environment Variables

Create a `.env` file in the `frontend/` directory (optional):

```env
# Optional - defaults to http://localhost:5000/api
VITE_API_URL=http://localhost:5000/api
```

## 📡 API Endpoints

### Health Check

- **GET** `/api/health`
- Returns server status

### Analyze Image

- **POST** `/api/recipes/analyze`
- Upload image for ingredient analysis and recipe suggestions
- **Body**: FormData with `image` file
- **Response**: JSON with identified ingredients and recipes

### Get Recipe Suggestions

- **POST** `/api/recipes/suggest`
- Get recipes from text input
- **Body**: `{ "ingredients": "comma, separated, ingredients" }`
- **Response**: JSON with recipe suggestions

## 🎯 Usage Guide

### 1. Image Upload Method

1. Click the "Upload Image" tab
2. Select an image of your ingredients
3. Preview the image to confirm selection
4. Click "Analyze Image & Get Recipes"
5. View AI-generated recipe suggestions

### 2. Text Input Method

1. Click the "Type Ingredients" tab
2. Enter your ingredients in the text area
3. Click "Get Recipe Suggestions"
4. View AI-generated recipe suggestions

### 3. Recipe Results

- **Identified Ingredients**: Shows what the AI detected in your image
- **Recipe Suggestions**: 2-3 practical recipes with ingredients and instructions
- **Scrollable Content**: Recipe section has fixed height with smooth scrolling

## 🛠️ Development

### Backend Development

```bash
cd backend
npm run dev    # Start with nodemon for auto-reload
npm start      # Start production server
```

### Frontend Development

```bash
cd frontend
npm run dev    # Start development server
npm run build  # Build for production
npm run preview # Preview production build
```

### Code Structure

**Backend:**

- `index.js` - Express server setup
- `src/controllers/recipeController.js` - Business logic
- `src/routes/recipeRoutes.js` - API routes and file upload

**Frontend:**

- `src/pages/public/recipe-snap.tsx` - Main application component
- `src/config/api.ts` - API configuration
- `src/main.tsx` - Application entry point

## 🔒 Security & Best Practices

- **Environment Variables**: Sensitive data stored in `.env` files
- **File Validation**: Only image files accepted for upload
- **File Size Limits**: 5MB maximum file size
- **Automatic Cleanup**: Uploaded files automatically deleted after processing
- **Error Handling**: Comprehensive error handling with user-friendly messages

## 🚀 Deployment

### Backend Deployment

1. Set environment variables on your hosting platform
2. Install dependencies: `npm install`
3. Start server: `npm start`

### Frontend Deployment

1. Build the application: `npm run build`
2. Deploy the `dist/` folder to your hosting platform
3. Set `VITE_API_URL` to your backend URL

## 🐛 Troubleshooting

### Common Issues

**Backend not starting:**

- Check if OpenAI API key is set in `.env`
- Ensure port 5000 is not in use
- Verify all dependencies are installed

**Frontend not connecting to backend:**

- Check if backend is running on port 5000
- Verify CORS is enabled
- Check browser console for errors

**Image upload failing:**

- Ensure file is an image format (jpg, png, etc.)
- Check file size is under 5MB
- Verify OpenAI API key has sufficient credits

**Recipe generation errors:**

- Check OpenAI API key validity
- Verify internet connection
- Check OpenAI service status

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:

- Check the troubleshooting section above
- Review the API documentation
- Check OpenAI API status and limits

---

**Built with ❤️ using React, TypeScript, Node.js, and OpenAI**
