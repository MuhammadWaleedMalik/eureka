import { useState } from "react";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL; // Read from environment variable

const useGoogle = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const authenticateWithGoogle = async (name, email) => {
    setLoading(true);
    setError(null);
  
    try {
      const response = await fetch(`${API_URL}/api/v1/user/new`, { // Use env variable
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google authentication failed");
      }

      // Set user and token on successful authentication
      setUser(data.user);
      setToken(data.token);

      return data; // Return the response data for further use
    } catch (err) {
      setError(err.message || "An error occurred during Google authentication");
    } finally {
      setLoading(false);
    }
  };

  return { authenticateWithGoogle, loading, error, user, token };
};

export default useGoogle;
