import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq';  // Import the useGroq hook

const topic = {
  name: "EurekaAi",
  subdomain: "Household Science Advisor",
};

const colors = {
  primary: "#10b981", // Emerald green
  secondary: "#ffffff",
  text: "#000000",
};

const HouseholdAi = () => {
  const [question, setQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();  // Destructure the hook

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Please enter a household science-related question.');
      return;
    }

    setIsAnswering(true);
    setError('');

    try {
      await fetchGroqResponse('household science advice', question);  // Fetch the response using the hook
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setIsAnswering(false);
    }
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <motion.div
      className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.secondary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold sm:text-5xl mb-4" style={{ color: colors.primary }}>
            {topic.name} – {topic.subdomain}
          </h1>
          <p className="text-xl text-gray-600">Ask about home cleaning, kitchen science, eco-living, or DIY tips!</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Type your household science question below.</li>
            <li>Click “Ask AI”.</li>
            <li>Review and copy the suggestion.</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Your question:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How do I naturally deodorize my fridge?"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleAsk}
              disabled={isAnswering}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnswering ? "Thinking..." : "Ask AI"}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {(response || isAnswering) && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">AI Advice</h2>
                {response && (
                  <CopyToClipboard text={response} onCopy={handleCopy}>
                    <motion.button
                      className="px-4 py-2 text-sm rounded-md flex items-center"
                      style={{
                        backgroundColor: isCopied ? '#059669' : colors.primary,
                        color: 'white',
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isCopied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </CopyToClipboard>
                )}
              </div>
              <div className="border border-gray-200 rounded-lg p-6 bg-white text-black shadow-sm">
                {isAnswering && !response ? (
                  <div className="flex justify-center h-40 items-center text-gray-700">
                    Generating answer...
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {response.split('\n').map((line, idx) => (
                      <p key={idx}>{line}</p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="bg-gray-50 p-6 rounded-lg border text-black border-gray-100">
          <h2 className="text-xl font-semibold mb-3">Sample Questions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>What’s the best way to clean tile grout naturally?</li>
            <li>How do I remove odors from clothes without washing?</li>
            <li>Can baking soda unclog a sink?</li>
            <li>What are energy-saving tips for the kitchen?</li>
            <li>How do I make my own surface cleaner?</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default HouseholdAi;
