import { useState } from "react";
const API_URL = import.meta.env.VITE_REACT_APP_API_URL; 

const useRemoveCredits = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [credits, setCredits] = useState(null);

  const removeCredits = async () => {
    setLoading(true);
    setError(null);
    const token = localStorage.getItem("token");

    try {
      const response = await fetch(`${API_URL}/api/v1/user/remove`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      // Check if the response is OK
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // Parse the response as JSON
      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || "Failed to remove credits");
      }

      // Set the updated credits
      setCredits(data.credits);

      return data; // Return the response data for further use
    } catch (err) {
      console.error("Remove credits error:", err);
      setError(err.message || "An error occurred while removing credits");
    } finally {
      setLoading(false);
    }
  };

  return { removeCredits, loading, error, credits };
};

export default useRemoveCredits;