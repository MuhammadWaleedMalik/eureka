import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import useRegister from "../hooks/useRegister";

const SignUp = () => {
  const { t } = useTranslation();
  const { register, isloading } = useRegister();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [formError, setFormError] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
 

  // Davinci Sky color scheme
  const colors = {
    accent: "#1A1A1A", // Dark gray
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000",
    background: "white", // Almost Black
    paragraph: "#A1A1AA", // Muted Gray
    border: "#F19154",
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError("");
    setError("");

    if (!email || !password) {
      setFormError("Please fill in all fields");
      return;
    }

   

    try {
      const response = await register(email, password);
      if (response !== undefined) {
        alert("Signed up successfully!");
        navigate("/login");
      } else {
        setFormError("Email already exists or internal error occurred");
      }
    } catch (err) {
      setFormError(err.message || "Failed to create an account");
      setError(err.message);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex justify-center items-center px-6 py-12"
      style={{ backgroundColor: colors.background }}
    >
      <div
        className="w-full max-w-md p-8 rounded-xl shadow-lg"
        style={{ 
          backgroundColor: colors.secondary,
          border: `1px solid ${colors.border}`
        }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-center mb-8"
        >
          <h1
            className="text-3xl font-bold mb-2"
            style={{ color: colors.primary }}
          >
            Join Eureka AI
          </h1>
          <p className="text-gray-600">
            Create your account to unlock AI-powered visual creativity
          </p>
        </motion.div>

        {(formError || error) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded"
          >
            {formError || error}
          </motion.div>
        )}

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="space-y-6"
        >
         

          {/* Email Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" style={{ color: colors.primary }}>
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
                className="block w-full text-black pl-10 pr-3 py-3 rounded-md border focus:ring-2 focus:ring-black focus:border-transparent"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.secondary,
                  color: colors.primary
                }}
                placeholder="Enter your email"
                required
                disabled={isloading}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-1">
            <label className="block text-sm font-medium" style={{ color: colors.primary }}>
              Password
            </label>
            <div className="relative">
              <div className="absolute text-black inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full text-black pl-10 pr-10 py-3 rounded-md border focus:ring-2 focus:ring-black focus:border-transparent"
                style={{ 
                  borderColor: colors.border,
                  backgroundColor: colors.secondary
                }}
                placeholder="Create a password"
                required
                disabled={isloading}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FiEyeOff className="text-gray-400 hover:text-gray-600" />
                ) : (
                  <FiEye className="text-gray-400 hover:text-gray-600" />
                )}
              </button>
            </div>
          </div>

          

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ duration: 0.2 }}
            type="submit"
            disabled={isloading}
            className="w-full py-3 px-4 text-lg font-semibold rounded-md transition-all flex items-center justify-center"
            style={{ 
              backgroundColor: colors.primary, 
              color: colors.secondary 
            }}
          >
            {isloading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Account...
              </>
            ) : (
              "Create Account"
            )}
          </motion.button>
        </motion.form>

        <p className="text-center mt-6 text-sm" style={{ color: colors.text }}>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold hover:underline"
            style={{ color: colors.primary }}
          >
            Sign in
          </Link>
        </p>

        <div className="mt-8 text-center text-xs text-gray-500">
          By creating an account, you agree to our{" "}
          <Link to="/terms" className="underline hover:text-gray-700">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="underline hover:text-gray-700">
            Privacy Policy
          </Link>
          .
        </div>
      </div>
    </motion.div>
  );
};

export default SignUp;