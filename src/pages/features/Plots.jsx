import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // adjust path as needed

const website = {
  name: "EurekaAi",
  slogan: "Graph Plotter for Elementary Math Exploration",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const GraphPlotter = () => {
  const [expression, setExpression] = useState('');
  const [localError, setLocalError] = useState('');
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handlePlot = () => {
    if (!expression.trim()) {
      setLocalError('Please enter a math expression');
      return;
    }

    setLocalError('');
    fetchGroqResponse("Plot the graph for this expression:", expression);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, when: "beforeChildren" }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: `${colors.primary}E6`,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.98 }
  };

  return (
    <motion.div
      className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: colors.primary }}>
            {website.name} Graph Plotter
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Type a math function with <code>x</code> (like <code>x^2</code>, <code>sin(x)</code>, etc.)</li>
            <li>Click "Plot"</li>
            <li>Output will be generated using LLM</li>
            <li>You may copy the response</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="expression" className="block text-lg font-medium text-gray-700 mb-2">
            Enter function to plot:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="expression"
              value={expression}
              onChange={(e) => setExpression(e.target.value)}
              placeholder="e.g. x^2 or sin(x)"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handlePlot}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? 'Loading...' : 'Plot'}
            </motion.button>
          </div>
          {localError && <p className="mt-2 text-sm text-red-600">{localError}</p>}
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {response && (
            <div className="mt-4 p-4 bg-orange-100 text-black rounded-lg">
              <h3 className="font-semibold mb-2">LLM Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </motion.div>

        <motion.div
          className="bg-orange-50 p-6 rounded-lg border text-black border-orange-100"
          variants={itemVariants}
        >
          <h2 className="text-xl font-semibold mb-3">Tips for Best Results</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use <code>x</code> as the variable (e.g., <code>x^2 + 3x - 1</code>)</li>
            <li>Functions like <code>sin(x)</code>, <code>cos(x)</code>, <code>sqrt(x)</code> are supported</li>
            <li>Use parentheses for grouping: <code>(x + 2)^2</code></li>
            <li>This version uses an LLM to explain/describe graph results</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default GraphPlotter;
