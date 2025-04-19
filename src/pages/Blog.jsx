import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Blogs = () => {
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

  const blogPosts = [
    {
      title: "📐 Math & Calculations — Smart AI Tools",
      summary: "Learn how EurekaAi helps you solve tricky arithmetic, geometry, and number theory problems with real-time visualizations and explanations."
    },
    {
      title: "🔬 Science & Technology — Real-time Simulations",
      summary: "Discover how our AI tackles mechanics, electricity, thermodynamics, and chemistry problems — from balancing chemical equations to predicting reactions."
    },
    {
      title: "🌍 Society & Culture — Make Sense of the World",
      summary: "Explore cultural trends, historical data, time conversions, and natural events like sunrise, sunset, and moon phases — all powered by AI."
    },
    {
      title: "🏡 Daily Life & Finance — Everyday AI Helpers",
      summary: "Simplify daily decisions with AI currency converters, financial estimators, statistical tools, and probability calculators built for practical use."
    },
    {
      title: "🚀 Behind EurekaAi — Our Mission & Vision",
      summary: "A behind-the-scenes look at the purpose, tech stack, and future plans driving EurekaAi’s GenAI-powered knowledge platform."
    },
    {
      title: "🧪 AI Playground — Test Cutting-Edge Features",
      summary: "Play with experimental AI tools, visualizations, and simulations — stay ahead with the latest AI tech directly on EurekaAi."
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
        <h1 className="text-4xl font-bold mb-2 text-black">EurekaAi Blog & Insights</h1>
        <p className="text-[##5B9BFF] mb-8">Last Updated: {lastUpdated}</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-10">
        {blogPosts.map((post, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants} 
            className="p-6 bg-gray-50 rounded-2xl shadow-md hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold mb-2 text-black">{post.title}</h2>
            <p className="text-black">{post.summary}</p>
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

export default Blogs;
