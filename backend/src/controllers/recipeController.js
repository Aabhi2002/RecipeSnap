const asyncHandler = require("express-async-handler");
const OpenAI = require("openai");
const fs = require("fs");
const path = require("path");

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @desc    Analyze image and get recipe suggestions
// @route   POST /api/recipes/analyze
// @access  Public
const analyzeImageAndGetRecipes = asyncHandler(async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No image file provided" });
    }

    const imagePath = req.file.path;
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString("base64");

    // Use OpenAI Vision API to analyze the image
    const visionResponse = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [
        {
          role: "user",
          content: [
            {
              type: "text",
              text: "Analyze this image of ingredients and identify all the food items you can see. List them clearly and concisely.",
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Image}`,
              },
            },
          ],
        },
      ],
      max_tokens: 300,
    });

    const identifiedIngredients = visionResponse.choices[0].message.content;

    // Generate recipe suggestions based on identified ingredients
    const recipeResponse = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful cooking assistant. Generate 2-3 simple, practical recipe suggestions based on the ingredients provided. For each recipe, include: recipe name, brief description, ingredients needed, and simple step-by-step instructions. Keep it concise and practical.",
        },
        {
          role: "user",
          content: `Based on these ingredients: ${identifiedIngredients}, suggest some recipes I can make.`,
        },
      ],
      max_tokens: 800,
    });

    const recipes = recipeResponse.choices[0].message.content;

    // Clean up uploaded file
    fs.unlinkSync(imagePath);

    res.json({
      success: true,
      identifiedIngredients,
      recipes,
      message: "Image analyzed successfully",
    });
  } catch (error) {
    console.error("Error analyzing image:", error);

    // Clean up file if it exists
    if (req.file && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    res.status(500).json({
      success: false,
      message: "Error analyzing image",
      error: error.message,
    });
  }
});

// @desc    Get recipe suggestions from text input
// @route   POST /api/recipes/suggest
// @access  Public
const getRecipeSuggestions = asyncHandler(async (req, res) => {
  try {
    const { ingredients } = req.body;

    if (!ingredients || ingredients.trim() === "") {
      return res.status(400).json({ message: "Please provide ingredients" });
    }

    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful cooking assistant. Generate 2-3 simple, practical recipe suggestions based on the ingredients provided. For each recipe, include: recipe name, brief description, ingredients needed, and simple step-by-step instructions. Keep it concise and practical.",
        },
        {
          role: "user",
          content: `Based on these ingredients: ${ingredients}, suggest some recipes I can make.`,
        },
      ],
      max_tokens: 800,
    });

    const recipes = response.choices[0].message.content;

    res.json({
      success: true,
      recipes,
      message: "Recipe suggestions generated successfully",
    });
  } catch (error) {
    console.error("Error generating recipes:", error);
    res.status(500).json({
      success: false,
      message: "Error generating recipe suggestions",
      error: error.message,
    });
  }
});

module.exports = {
  analyzeImageAndGetRecipes,
  getRecipeSuggestions,
};
