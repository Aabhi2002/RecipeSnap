# RecipeSnap Frontend

A React + TypeScript frontend for the RecipeSnap AI cooking assistant application.

## Features

- **Image Upload**: Upload photos of ingredients for AI analysis
- **Text Input**: Type ingredients manually for recipe suggestions
- **AI-Powered**: Uses OpenAI Vision API and GPT models for intelligent recipe generation
- **Modern UI**: Built with Mantine UI components and FontAwesome icons
- **Responsive Design**: Works on desktop and mobile devices

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the development server:

```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

Create a `.env` file in the frontend directory (optional):

```
VITE_API_URL=http://localhost:5000/api
```

## Usage

### RecipeSnap Page

Navigate to `/recipe-snap` to access the AI cooking assistant:

1. **Upload Image**: Click "Upload Image" tab and select a photo of your ingredients
2. **Type Ingredients**: Click "Type Ingredients" tab and manually enter your ingredients
3. **Get Recipes**: Click the analyze button to get AI-generated recipe suggestions

## API Integration

The frontend communicates with the backend API at:

- `POST /api/recipes/analyze` - Image analysis and recipe generation
- `POST /api/recipes/suggest` - Text-based recipe suggestions

## Tech Stack

- **React 18** with TypeScript
- **Mantine UI** for components
- **FontAwesome** for icons
- **Axios** for API calls
- **React Router** for navigation
- **Vite** for build tooling

## Project Structure

```
frontend/src/
├── components/          # Reusable UI components
├── pages/
│   ├── public/
│   │   └── recipe-snap.tsx  # Main RecipeSnap page
│   └── protected/       # Authenticated pages
├── config/
│   └── api.ts          # API configuration
├── routes/             # React Router setup
├── styles/             # Global styles
└── utils/              # Utility functions
```

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default tseslint.config({
  extends: [
    // Remove ...tseslint.configs.recommended and replace with this
    ...tseslint.configs.recommendedTypeChecked,
    // Alternatively, use this for stricter rules
    ...tseslint.configs.strictTypeChecked,
    // Optionally, add this for stylistic rules
    ...tseslint.configs.stylisticTypeChecked,
  ],
  languageOptions: {
    // other options...
    parserOptions: {
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from "eslint-plugin-react-x";
import reactDom from "eslint-plugin-react-dom";

export default tseslint.config({
  plugins: {
    // Add the react-x and react-dom plugins
    "react-x": reactX,
    "react-dom": reactDom,
  },
  rules: {
    // other rules...
    // Enable its recommended typescript rules
    ...reactX.configs["recommended-typescript"].rules,
    ...reactDom.configs.recommended.rules,
  },
});
```
