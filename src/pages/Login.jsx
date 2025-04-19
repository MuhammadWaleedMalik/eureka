import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useAuth } from "../contexts/AuthContext";
import { FcGoogle } from "react-icons/fc";
import { FiMail, FiLock } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase";
import useGoogle from "../hooks/useGoogle";
import useLogin from "../hooks/useLogin";

const Login = () => {
  const { t } = useTranslation();
  const { login } = useLogin();
  const { authenticateWithGoogle } = useGoogle();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Davinci Sky color scheme
  const colors = {
    accent: "#1A1A1A", // Dark gray
    error: "#FEE2E2" ,
    // Light red for error messages
    primary: "#F19154",
  secondary: "#FFFFFF",
  text: "#000000",
 background: "white", // Almost Black
  paragraph: "#A1A1AA", // Muted Gray
  };
  


  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const { displayName, email } = result.user;
      const response = await authenticateWithGoogle(displayName, email);
      
      // Store credentials and navigate
      localStorage.setItem("credits", response.user.credits);
      localStorage.setItem("token", response.token);
      navigate("/");
    } catch (error) {
      console.error("Google login failed:", error);
      setError("Failed to login with Google. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    
    if (!email || !password) {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      setLoading(true);
      
      // Admin login check (from page 2)
      if (email === "admin@newtonai.net" && password === "@Abc123456") {
        localStorage.setItem("Admin", "Done");
        navigate("/admin");
        return;
      }

      // Regular user login
      const response = await login(email, password);
      if (response !== undefined) {
        localStorage.removeItem("credits");
        localStorage.removeItem("token");
        localStorage.setItem("credits", response.user.credits);
        localStorage.setItem("token", response.token);
        navigate("/");
      } else {
        setError("Invalid email or password. Please try again.");
      }
    } catch (error) {
      console.error("Email login failed:", error);
      setError("Invalid email or password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center p-4 sm:p-8"
      style={{ backgroundColor: colors.background }}
    >
      <div className="w-full max-w-md">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
            Welcome to Davinci Sky
          </h1>
          <p className="text-gray-600">Sign in to access AI-powered visual tools</p>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="mb-6 p-3 rounded-lg text-center text-red-600 bg-red-100"
          >
            {error}
          </motion.div>
        )}

        {/* Login Form */}
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          onSubmit={handleEmailLogin}
          className="space-y-6"
        >
          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.primary }}>
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-3 py-3 text-black rounded-md border focus:ring-2 focus:ring-black focus:border-transparent"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.secondary
                }}
                placeholder="your@email.com"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <label className="block text-sm font-medium mb-1" style={{ color: colors.primary }}>
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-10 text-black py-3 rounded-md border focus:ring-2 focus:ring-black focus:border-transparent"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.secondary
                }}
                placeholder="••••••••"
                required
                disabled={loading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  </svg>
                ) : (
                  <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Submit Button */}
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className="w-full py-3 px-4 font-medium rounded-md transition-all flex items-center justify-center"
            style={{ 
              backgroundColor: colors.primary, 
              color: colors.secondary 
            }}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing In...
              </>
            ) : (
              "Sign In"
            )}
          </motion.button>
        </motion.form>

        {/* Divider */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="my-8 flex items-center"
        >
          <div className="flex-1 h-px bg-gray-800"></div>
          <span className="mx-4 text-sm text-gray-500">OR</span>
          <div className="flex-1 h-px bg-gray-800"></div>
        </motion.div>

        {/* Google Sign In */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleGoogleLogin}
          disabled={loading}
          className="w-full py-3 px-4 text-black border rounded-md flex items-center justify-center space-x-2"
          style={{ 
            borderColor: colors.border,
            backgroundColor: colors.secondary
          }}
        >
          <FcGoogle className="h-5 w-5" />
          <span>{loading ? "Signing In..." : "Continue with Google"}</span>
        </motion.button>

        {/* Sign Up Link */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-8 text-center text-sm"
        >
          <span className="text-gray-600">Don't have an account? </span>
          <Link 
            to="/signup" 
            className="font-medium hover:underline"
            style={{ color: colors.primary }}
          >
            Sign up
          </Link>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Login;