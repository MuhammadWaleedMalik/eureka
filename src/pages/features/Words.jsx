import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Import the useGroq hook

const topic = {
  name: "EurekaAi",
  subdomain: "Words & Linguistics",
};

const colors = {
  primary: "#10b981", // Emerald green
  secondary: "#FFFFFF",
  text: "#000000",
};

const WordsLinguisticsAi = () => {
  const [question, setQuestion] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const handleAsk = () => {
    if (!question.trim()) {
      setError('Please enter a linguistics-related question.');
      return;
    }

    setError('');
    fetchGroqResponse('Linguistics', question); // Call the useGroq hook to fetch the answer
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
          <p className="text-xl text-gray-600">Ask about language origins, grammar rules, or word meanings.</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Type a question related to words or linguistics.</li>
            <li>Click “Ask AI.”</li>
            <li>Review and optionally copy the response.</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Ask about a word, grammar, or linguistic topic:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is the origin of the word 'robot'?"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleAsk}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {loading ? "Answering..." : "Ask AI"}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

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
                {loading && !response ? (
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
            <li>What’s the origin of the word “pandemic”?</li>
            <li>What is the passive voice in grammar?</li>
            <li>How do dialects evolve?</li>
            <li>What is phonetics vs phonology?</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default WordsLinguisticsAi;
