import { useState, useCallback } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_REACT_APP_API_URL;

const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false); // default: false
  const [error, setError] = useState(null);

  const fetchUser = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_URL}/api/v1/user/get`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(true); // or setUser(response.data.user[0]) if you want actual user data
      localStorage.removeItem("credits");
      localStorage.setItem("credits", response.data.user[0].credits);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  return { user, loading, error, refetchUser: fetchUser };
};

export default useGetUser;
