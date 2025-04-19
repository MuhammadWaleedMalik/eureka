import React from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

// Color Scheme
const colors = {
  primary: "#ff12a4", // Deep Purple
  secondary: "#C05898", // Light Purple
  background: "#09090B", // Almost Black
  text: "#E2E8F0", // Light Gray
  paragraph: "#A1A1AA", // Muted Gray
};

const NotFound = () => {
  const { t } = useTranslation();

  return (
    <div
      className="w-full min-h-screen flex flex-col items-center justify-center px-6 py-24"
      style={{ backgroundColor: colors.background }}
    >
      {/* 404 Text */}
      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-9xl font-bold mb-4"
        style={{ color: colors.primary }}
      >
        404
      </motion.h1>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-4xl font-bold mb-4"
        style={{ color: colors.text }}
      >
        {t("Page Not Found")}
      </motion.h2>

      {/* Description */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="text-lg text-center mb-8"
        style={{ color: colors.paragraph }}
      >
        {t("The page you're looking for doesn't exist or has been moved.")}
      </motion.p>

      {/* Back to Home Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Link
          to="/"
          className="px-8 py-3 font-bold rounded-lg transition-all"
          style={{ backgroundColor: colors.primary, color: colors.background }}
        >
          {t("Back to Home")}
        </Link>
      </motion.div>
    </div>
  );
};

export default NotFound;