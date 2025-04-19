import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Docs = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  const website = {
    name: "EurekaAi",
    slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
    colors: {
      primary: "#FFFFFF",
      secondary: "#5B9BFF",
      text: "#000000",
    },
  };

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setLastUpdated(date);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const docsSections = [
    {
      title: "📖 Getting Started",
      content: "Learn how to navigate EurekaAi, explore categories, and use AI tools efficiently for math, science, cultural insights, and daily life."
    },
    {
      title: "🔍 Features Overview",
      content: "Detailed explanation of each EurekaAi feature — from AI-powered calculations and simulations to financial planning and time conversions."
    },
    {
      title: "🛠️ Using Math & Calculations",
      content: "Step-by-step instructions on solving arithmetic, geometry, and number theory problems using our intuitive AI-powered calculators."
    },
    {
      title: "⚛️ Science & Technology Tools",
      content: "A comprehensive guide to using EurekaAi's scientific tools for physics, chemistry, and engineering problems with real-time AI solutions."
    },
    {
      title: "🌐 Society & Culture Explorers",
      content: "Instructions for cultural trend analysis, date conversions, natural events lookups, and more, powered by AI insights."
    },
    {
      title: "💡 Everyday AI Helpers",
      content: "Discover how to manage daily tasks, finances, and planning using smart tools like currency converters, statistics engines, and calculators."
    },
    {
      title: "📬 Contact & Support",
      content: "How to reach us for support, provide feedback, or inquire about custom AI integrations."
    }
  ];

  return (
    <motion.div 
      className="max-w-5xl mx-auto bg-white mt-24 px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold mb-2 text-black">📚 Documentation</h1>
        <p className="text-[##5B9BFF] mb-8">Last Updated: {lastUpdated}</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-8">
        {docsSections.map((doc, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants} 
            className="p-6 border-2 border-gray-300 rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-bold mb-2 text-black">{doc.title}</h2>
            <p className="text-black">{doc.content}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer 
        variants={itemVariants}
        className="mt-16 pt-4 border-t border-gray-200"
      >
        <small className="text-black">
          © {website.name} | <span className="text-[##5B9BFF]">"{website.slogan}"</span>
        </small>
      </motion.footer>
    </motion.div>
  );
};

export default Docs;
