import React, { useState } from "react";
import {
  Container,
  Title,
  Text,
  Paper,
  Group,
  Button,
  FileInput,
  Textarea,
  Loader,
  Alert,
  Divider,
  Stack,
  Card,
  Badge,
  Image,
  Box,
  ScrollArea,
  rem,
  useMantineTheme,
  // BackgroundImage,
  // Overlay,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUpload,
  // faImage,
  faUtensils,
  faExclamationCircle,
  faTimes,
  faCamera,
  faList,
} from "@fortawesome/free-solid-svg-icons";
import { notifications } from "@mantine/notifications";
import axios from "axios";
import { API_CONFIG, ENDPOINTS } from "../../config/api";

interface RecipeResponse {
  success: boolean;
  identifiedIngredients?: string;
  recipes: string;
  message: string;
  error?: string;
}

const RecipeSnap: React.FC = () => {
  const theme = useMantineTheme();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [textIngredients, setTextIngredients] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecipeResponse | null>(null);
  const [activeTab, setActiveTab] = useState<"image" | "text">("image");

  const handleFileChange = (file: File | null) => {
    setSelectedFile(file);

    if (file) {
      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const clearImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      notifications.show({
        title: "Error",
        message: "Please select an image first",
        color: "red",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append("image", selectedFile);

      const response = await axios.post<RecipeResponse>(
        `${API_CONFIG.BASE_URL}${ENDPOINTS.RECIPES.ANALYZE}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResult(response.data);
      notifications.show({
        title: "Success",
        message: "Image analyzed successfully!",
        color: "green",
      });
    } catch (error: unknown) {
      console.error("Error analyzing image:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to analyze image"
        : "Failed to analyze image";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleTextSubmit = async () => {
    if (!textIngredients.trim()) {
      notifications.show({
        title: "Error",
        message: "Please enter some ingredients",
        color: "red",
      });
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await axios.post<RecipeResponse>(
        `${API_CONFIG.BASE_URL}${ENDPOINTS.RECIPES.SUGGEST}`,
        {
          ingredients: textIngredients,
        }
      );

      setResult(response.data);
      notifications.show({
        title: "Success",
        message: "Recipe suggestions generated!",
        color: "green",
      });
    } catch (error: unknown) {
      console.error("Error generating recipes:", error);
      const errorMessage = axios.isAxiosError(error)
        ? error.response?.data?.message || "Failed to generate recipes"
        : "Failed to generate recipes";
      notifications.show({
        title: "Error",
        message: errorMessage,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const formatRecipes = (recipesText: string) => {
    // Simple formatting to make recipes more readable
    const sections = recipesText.split(/(?=\d+\.|\*\*|Recipe \d+|##)/);
    return sections.map((section, index) => (
      <div key={index} style={{ marginBottom: "1rem" }}>
        {section.trim()}
      </div>
    ));
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: `linear-gradient(135deg, #0f2027, #203a43, #2c5364)`,
        padding: "2rem 0",
      }}
    >
      <Container size="lg">
        <Stack spacing="xl">
          {/* Header */}
          <Paper
            className="card"
            sx={{
              marginBottom: "2rem", // Add spacing below the header
            }}
          >
            <div style={{ textAlign: "center" }}>
              <Title
                order={1}
                className="header-title"
              >
                ✨ FlavorFusion
              </Title>
              <Text className="header-sub">
                Your Ingredients, Infinite Recipes. Unleash Your Inner Chef!
              </Text>
            </div>
          </Paper>

          {/* Tab Selection */}
          <Group position="center" spacing="md">
            <Button
              onClick={() => setActiveTab("image")}
              size="lg"
              radius="xl"
              className="button button-gradient"
              leftIcon={<FontAwesomeIcon icon={faCamera} />}
            >
              Upload Image
            </Button>
            <Button
              onClick={() => setActiveTab("text")}
              size="lg"
              radius="xl"
              className="button button-gradient"
              leftIcon={<FontAwesomeIcon icon={faList} />}
            >
              Enter Text
            </Button>
          </Group>

          {/* Image Upload Section */}
          {activeTab === "image" && (
            <Paper className="card">
              <Stack spacing="md">
                <Title order={3} color="white" align="center">
                  Upload Image
                </Title>
                <FileInput
                  label={
                    <Text size="lg" weight={700} color="white" sx={{ textAlign: 'center', marginBottom: '1rem' }}>
                      📸 Click here to upload your image or drag and drop
                    </Text>
                  }
                  icon={<FontAwesomeIcon icon={faUpload} />}
                  value={selectedFile}
                  onChange={handleFileChange}
                  accept="image/*"
                  sx={{
                    ".mantine-FileInput-placeholder": {
                      color: theme.colors.gray[5],
                    },
                    ".mantine-FileInput-input": {
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.18)",
                      fontSize: "1.1rem",
                      padding: "1rem",
                      textAlign: "center",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.1)",
                        borderColor: "rgba(255, 255, 255, 0.3)",
                      }
                    },
                    ".mantine-FileInput-label": {
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: "white",
                      textAlign: "center",
                      marginBottom: "1rem"
                    }
                  }}
                />
                {imagePreview && (
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      maxWidth: "400px",
                      margin: "auto",
                      "&::before": {
                        content: "''",
                        display: "block",
                        paddingTop: "75%", // 4:3 Aspect Ratio
                      },
                    }}
                  >
                    <Image
                      src={imagePreview}
                      alt="Image preview"
                      radius="md"
                      sx={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    <Button
                      onClick={clearImage}
                      variant="filled"
                      color="red"
                      radius="xl"
                      sx={{
                        position: "absolute",
                        top: "0.5rem",
                        right: "0.5rem",
                        zIndex: 1,
                        opacity: 0.8,
                        "&:hover": { opacity: 1 },
                      }}
                    >
                      <FontAwesomeIcon icon={faTimes} />
                    </Button>
                  </Box>
                )}
                <Button
                  onClick={handleImageUpload}
                  loading={loading}
                  className="button button-gradient"
                  leftIcon={<FontAwesomeIcon icon={faUtensils} />}
                >
                  Analyze Image & Get Recipes
                </Button>
              </Stack>
            </Paper>
          )}

          {/* Text Input Section */}
          {activeTab === "text" && (
            <Paper className="card">
              <Stack spacing="md">
                <Title order={3} color="white" align="center">
                  Enter Ingredients
                </Title>
                <Textarea
                  label="List your ingredients, separated by commas or new lines"
                  placeholder="e.g., Chicken, Rice, Broccoli, Soy Sauce"
                  value={textIngredients}
                  onChange={(event) => setTextIngredients(event.currentTarget.value)}
                  minRows={4}
                  autosize
                  sx={{
                    ".mantine-Textarea-input": {
                      background: "rgba(255, 255, 255, 0.05)",
                      color: "white",
                      borderColor: "rgba(255, 255, 255, 0.18)",
                    },
                    ".mantine-Textarea-label": {
                      color: "white",
                    },
                    ".mantine-Textarea-placeholder": {
                      color: theme.colors.gray[5],
                    },
                  }}
                />
                <Button
                  onClick={handleTextSubmit}
                  loading={loading}
                  className="button button-gradient"
                  leftIcon={<FontAwesomeIcon icon={faUtensils} />}
                >
                  Get Recipes
                </Button>
              </Stack>
            </Paper>
          )}

          {/* Results Section */}
          {result && (
            <Paper className="card">
              <Stack spacing="md">
                <Title order={3} color="white" align="center">
                  Your Recipes
                </Title>
                {result.identifiedIngredients && (
                  <Card
                    shadow="sm"
                    radius="md"
                    p="sm"
                    sx={{
                      background: "rgba(255, 255, 255, 0.08)",
                      border: "1px solid rgba(255, 255, 255, 0.15)",
                      backdropFilter: "blur(8px)",
                      WebkitBackdropFilter: "blur(8px)",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        transform: "translateY(-2px)",
                        boxShadow: `0 6px 12px rgba(0, 0, 0, 0.25)`,
                      },
                    }}
                  >
                    <Text size="sm" color="dimmed" mb="xs">
                      Identified Ingredients:
                    </Text>
                    <Group spacing="xs">
                      {result.identifiedIngredients
                        .split(",")
                        .map((ingredient, index) => (
                          <Badge
                            key={index}
                            variant="filled"
                            color="teal"
                            sx={{
                              background: `linear-gradient(45deg, ${theme.colors.teal[7]}, ${theme.colors.cyan[5]})`,
                              fontWeight: 500,
                            }}
                          >
                            {ingredient.trim()}
                          </Badge>
                        ))}
                    </Group>
                  </Card>
                )}

                {result.success ? (
                  <ScrollArea h={rem(400)} pr="md">
                    <Text
                      component="div"
                      color="white"
                      sx={{ lineHeight: 1.6, whiteSpace: "pre-wrap" }}
                    >
                      {formatRecipes(result.recipes)}
                    </Text>
                  </ScrollArea>
                ) : (
                  <Alert
                    icon={<FontAwesomeIcon icon={faExclamationCircle} />}
                    title="Error"
                    color="red"
                    variant="filled"
                  >
                    {result.message || "An unknown error occurred."}
                  </Alert>
                )}
              </Stack>
            </Paper>
          )}

          {loading && (
            <Paper
              shadow="xl"
              p="xl"
              radius="lg"
              sx={{
                background: `rgba(255, 255, 255, 0.1)`,
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.2)",
                textAlign: "center",
                transition: "all 0.3s ease-in-out",
                "&:hover": {
                  transform: "translateY(-5px)",
                  boxShadow: theme.shadows.xl,
                },
              }}
            >
              <Stack align="center" spacing="md">
                <Loader size="xl" color="blue" />
                <Text size="lg" weight={500} className="loading-pulse" color="white">
                  {activeTab === "image" ? "Analyzing your image..." : "Generating recipes..."}
                </Text>
              </Stack>
            </Paper>
          )}
        </Stack>
      </Container>
    </Box>
  );
};

export default RecipeSnap;
