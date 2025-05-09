import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq';  // Import your custom hook

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
  const [answer, setAnswer] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  // Use the custom hook
  const { response, loading, error: groqError, fetchGroqResponse } = useGroq();

  const handleSubmit = async () => {
    if (!question.trim()) {
      setError('Please enter a chemistry question');
      return;
    }

    setError('');

    try {
      // Call the fetchGroqResponse with the task type and question
      await fetchGroqResponse('chemistryTask', question);

      if (groqError) {
        setAnswer('Error fetching chemistry explanation. Please try again.');
      } else {
        setAnswer(response);
      }
    } catch (err) {
      setAnswer('Error fetching chemistry explanation. Please try again.');
    }
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

        <motion.div 
          className="mb-8"
          variants={itemVariants}
        >
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Enter your chemistry question:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Explain Le Chatelier's principle"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleSubmit}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: colors.primary }}
              variants={buttonVariants}
              initial="rest"
              whileHover="hover"
              whileTap="tap"
            >
              {loading ? (
                <>Analyzing...</>
              ) : (
                'Analyze'
              )}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {(answer || loading) && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Chemistry Solution</h2>
                {answer && (
                  <CopyToClipboard text={answer} onCopy={handleCopy}>
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
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"></path>
                        </svg>
                      )}
                      {isCopied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </CopyToClipboard>
                )}
              </div>

              <div className="border text-black border-gray-200 rounded-lg p-6 bg-white min-h-64 shadow-sm">
                {loading && !answer ? (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-500">Analyzing chemistry question...</p>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {answer.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
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

export default ChemistryAssistant;
