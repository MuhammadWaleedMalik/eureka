import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Import your custom hook

const website = {
  name: "EurekaAi",
  slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const PercentageCalculator = () => {
  const [prompt, setPrompt] = useState('');
  const [calculatedResult, setCalculatedResult] = useState('');
  const [isCalculating, setIsCalculating] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  const { fetchGroqResponse, response, loading, error: hookError } = useGroq(); // Use the hook

  const handleCalculate = () => {
    if (!prompt.trim()) {
      setError('Please enter a percentage calculation');
      return;
    }

    setIsCalculating(true);
    setError('');
    
    // Call your fetchGroqResponse method from the custom hook
    fetchGroqResponse('percentage-calculation', prompt); 
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: {
      scale: 1.05,
      backgroundColor: `${colors.primary}E6`,
      transition: {
        duration: 0.2
      }
    },
    tap: { scale: 0.98 }
  };

  const loadingVariants = {
    start: {
      rotate: 0,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    },
    end: {
      rotate: 360,
      transition: {
        repeat: Infinity,
        duration: 1,
        ease: "linear"
      }
    }
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
        <motion.div
          className="text-center mb-12"
          variants={itemVariants}
        >
          <h1
            className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4"
            style={{ color: colors.primary }}
          >
            {website.name} Percentage Calculator
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div
          className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter your percentage calculation in the input (e.g., "20% of 150")</li>
            <li>Click "Calculate"</li>
            <li>View the AI-calculated result</li>
            <li>Copy to clipboard if needed</li>
          </ol>
        </motion.div>

        <motion.div
          className="mb-8"
          variants={itemVariants}
        >
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            Enter your percentage calculation:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="prompt"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 20% of 150"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleCalculate}
              disabled={isCalculating || loading}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {isCalculating || loading ? (
                <>
                  <motion.svg
                    className="animate-spin -ml-1 mr-2 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    variants={loadingVariants}
                    initial="start"
                    animate="end"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </motion.svg>
                  Calculating...
                </>
              ) : (
                'Calculate'
              )}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
          {hookError && <p className="mt-2 text-sm text-red-600">{hookError}</p>} {/* Display hook error */}
        </motion.div>

        <AnimatePresence>
          {(calculatedResult || isCalculating || loading) && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold text-black">Calculation Result</h2>
                {calculatedResult && (
                  <CopyToClipboard text={calculatedResult} onCopy={handleCopy}>
                    <motion.button
                      className="px-4 py-2 text-sm rounded-md flex items-center"
                      style={{
                        backgroundColor: isCopied ? '#10B981' : colors.primary,
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isCopied ? (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                          </svg>
                          Copy
                        </>
                      )}
                    </motion.button>
                  </CopyToClipboard>
                )}
              </div>

              <div className="border text-black border-orange-200 rounded-lg p-6 bg-white min-h-64 shadow-sm">
                {loading && !calculatedResult ? (
                  <div className="flex items-center justify-center h-64">
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: [1, 1.2, 1],
                          opacity: [0.7, 1, 0.7]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          ease: "easeInOut"
                        }}
                        className="text-4xl mb-4"
                        style={{ color: colors.primary }}
                      >
                        {website.name[0]}
                      </motion.div>
                      <p className="text-gray-500">Calculating...</p>
                    </div>
                  </div>
                ) : (
                  <div className="prose max-w-none text-black">
                    <p>{calculatedResult}</p>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default PercentageCalculator;
