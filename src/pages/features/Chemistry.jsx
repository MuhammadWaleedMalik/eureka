import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // adjust path as necessary

const website = {
  name: "EurekaChem",
  slogan: "AI for Chemical Reactions, Equations, and Molecular Analysis",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const ChemistryAssistant = () => {
  const [question, setQuestion] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [localError, setLocalError] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleSubmit = async () => {
    if (!question.trim()) {
      setLocalError('Please enter a chemistry question');
      return;
    }
    setLocalError('');
    await fetchGroqResponse("Chemistry AI:", question);
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
            {website.name} Chemistry Assistant
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div
          className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm"
          variants={itemVariants}
        >
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter your chemistry question (e.g., "Balance this equation: H₂ + O₂ → H₂O")</li>
            <li>Click "Analyze"</li>
            <li>View the AI-generated chemistry solution</li>
            <li>Copy to clipboard if needed</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8" variants={itemVariants}>
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Enter your chemistry question:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Explain Le Chatelier's Principle"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-300"
            />
            <motion.button
              onClick={handleSubmit}
              className="px-6 py-2 text-white rounded-md"
              style={{ backgroundColor: colors.primary }}
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Analyze"}
            </motion.button>
          </div>
          {localError && <p className="text-red-500 mt-2">{localError}</p>}
          {error && <p className="text-red-500 mt-2">{error}</p>}
        </motion.div>

        {response && (
          <motion.div
            className="bg-white border border-gray-200 p-6 rounded-lg shadow-md relative"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">AI Response:</h3>
              <CopyToClipboard text={response} onCopy={handleCopy}>
                <button className="text-sm text-blue-600 hover:underline">
                  {isCopied ? "Copied!" : "Copy"}
                </button>
              </CopyToClipboard>
            </div>
            <pre className="whitespace-pre-wrap text-gray-800">{response}</pre>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ChemistryAssistant;
