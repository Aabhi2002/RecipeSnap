# RecipeSnap Backend

A Node.js + Express backend for the RecipeSnap AI cooking assistant application.

## Features

- Image upload and analysis using OpenAI Vision API (GPT-4o)
- Recipe generation based on identified ingredients
- Text-based ingredient input for recipe suggestions
- RESTful API endpoints

## Setup

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the backend directory with the following variables:

```
PORT=5000
OPENAI_API_KEY=your_openai_api_key_here
NODE_ENV=development
```

3. Start the development server:

```bash
npm run dev
```

## API Endpoints

### Health Check

- **GET** `/api/health`
- Returns server status

### Analyze Image

- **POST** `/api/recipes/analyze`
- Upload an image of ingredients to get recipe suggestions
- **Body**: Form data with `image` file
- **Response**:

```json
{
  "success": true,
  "identifiedIngredients": "List of identified ingredients",
  "recipes": "Generated recipe suggestions",
  "message": "Image analyzed successfully"
}
```

### Get Recipe Suggestions

- **POST** `/api/recipes/suggest`
- Get recipe suggestions from text input
- **Body**:

```json
{
  "ingredients": "tomatoes, onions, garlic, pasta"
}
```

- **Response**:

```json
{
  "success": true,
  "recipes": "Generated recipe suggestions",
  "message": "Recipe suggestions generated successfully"
}
```

## Models Used

- **Image Analysis**: GPT-4o (OpenAI Vision API)
- **Recipe Generation**: GPT-3.5-turbo

## Environment Variables

- `PORT`: Server port (default: 5000)
- `OPENAI_API_KEY`: Your OpenAI API key
- `NODE_ENV`: Environment (development/production)

## File Structure

```
backend/
├── src/
│   ├── controllers/
│   │   └── recipeController.js
│   └── routes/
│       └── recipeRoutes.js
├── uploads/                 # Temporary image storage
├── index.js                # Main server file
├── package.json
└── README.md
```
