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

const PhysicsAssistant = () => {
  const [question, setQuestion] = useState('');
  const [error, setError] = useState('');
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq(); // Destructure from the hook

  const handleAsk = async () => {
    if (!question.trim()) {
      setError('Please enter a physics question');
      return;
    }

    setError(''); // Clear any previous errors

    // Call the fetchGroqResponse function
    await fetchGroqResponse("Physics question:", question);
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
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: colors.primary }}>
            {website.name} Physics Assistant
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Ask any physics-related question (e.g., "What is Newton's second law?")</li>
            <li>Click "Ask AI"</li>
            <li>View the AI-generated answer</li>
            <li>Copy it if needed</li>
          </ol>
        </motion.div>

        <div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Ask a physics question:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is the speed of light?"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleAsk}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-black flex items-center"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Thinking...' : 'Ask AI'}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <AnimatePresence>
          {(response || loading) && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">AI Response</h2>
                {response && (
                  <CopyToClipboard text={response} onCopy={handleCopy}>
                    <motion.button
                      className="px-4 py-2 text-sm rounded-md flex items-center"
                      style={{ 
                        backgroundColor: isCopied ? '#10B981' : colors.primary,
                        color: 'white'
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {isCopied ? 'Copied!' : 'Copy'}
                    </motion.button>
                  </CopyToClipboard>
                )}
              </div>

              <div className="border text-black border-gray-200 rounded-lg p-6 bg-white min-h-64 shadow-sm">
                {loading ? (
                  <div className="flex items-center justify-center h-64">
                    <motion.div
                      animate={{ scale: [1, 1.2, 1], opacity: [0.7, 1, 0.7] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                      className="text-4xl mb-4"
                      style={{ color: colors.primary }}
                    >
                      {website.name[0]}
                    </motion.div>
                    <p className="text-gray-500 ml-2">Thinking...</p>
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {response.split('\n').map((paragraph, i) => (
                      <p key={i}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="bg-orange-50 p-6 rounded-lg border text-black border-orange-100">
          <h2 className="text-xl font-semibold mb-3">Tips for Asking Questions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Be specific (e.g., "Explain conservation of energy")</li>
            <li>Avoid vague or non-physics questions</li>
            <li>You can ask about formulas, theories, and laws</li>
            <li>Use simple language for better results</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PhysicsAssistant;
