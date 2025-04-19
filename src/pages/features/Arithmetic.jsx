import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // <-- Import your hook

const website = {
  name: "EurekaAi",
  slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const AICalculator = () => {
  const [prompt, setPrompt] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const {
    fetchGroqResponse,
    response: calculatedResult,
    loading: isCalculating,
    error,
  } = useGroq();

  const handleCalculate = async () => {
    if (!prompt.trim()) {
      setErrorMessage('Please enter a calculation');
      return;
    }
    setErrorMessage('');
    await fetchGroqResponse("Calculate:", prompt); // <--- Use API
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
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
            {website.name} AI Calculator
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter your arithmetic calculation (e.g., "5 + 3 * 2")</li>
            <li>Click "Calculate"</li>
            <li>View the AI-calculated result</li>
            <li>Copy to clipboard if needed</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            Enter your arithmetic calculation:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 5 * (3 + 2)"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleCalculate}
              disabled={isCalculating}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {isCalculating ? (
                <>
                  <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  Calculating...
                </>
              ) : (
                "Calculate"
              )}
            </motion.button>
          </div>
          {errorMessage && <p className="text-red-600 mt-2">{errorMessage}</p>}
          {error && <p className="text-red-500 mt-2">Error: {error}</p>}
        </motion.div>

        {calculatedResult && (
          <motion.div className="bg-white p-6 rounded-lg shadow-md" variants={itemVariants}>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Result</h3>
            <pre className="whitespace-pre-wrap text-gray-700 mb-4">{calculatedResult}</pre>
            <CopyToClipboard text={calculatedResult} onCopy={handleCopy}>
              <motion.button
                className="px-4 py-2 bg-orange-500 text-white rounded-md"
                variants={buttonVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
              >
                {isCopied ? "Copied!" : "Copy"}
              </motion.button>
            </CopyToClipboard>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default AICalculator;
