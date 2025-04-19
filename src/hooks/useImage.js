import { useState } from "react";
import useRemoveCredits from "./useRemoveCredit"; // Import the remove credits hook
import { useNavigate } from "react-router-dom"; // Import for navigation

const API_KEY = "67c96d35-07d5-41ee-b05b-36642110eea5";

export function useImage() {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { removeCredits } = useRemoveCredits(); // Destructure removeCredits
  const navigate = useNavigate(); // Initialize navigation

  const generateImage = async (text) => {
    if (!text) return;

    // Check localStorage for token count
    const tokenCount = parseInt(localStorage.getItem("token") || "0", 10);
    if (tokenCount < 5) {
      navigate("/pricing");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("https://api.deepai.org/api/text2img", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": API_KEY,
        },
        body: JSON.stringify({ text }),
      });

      const data = await response.json();

      if (data.output_url) {
        setImageUrl(data.output_url);

        // Call useRemoveCredits only if image generation is successful
        await removeCredits();
      } else {
        throw new Error("Failed to generate image");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { imageUrl, generateImage, loading, error };
}
