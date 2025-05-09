import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Make sure the path is correct

const topic = {
  name: "EurekaAi",
  subdomain: "Biology",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const BiologyAi = () => {
  const [question, setQuestion] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleAsk = async () => {
    if (!question.trim()) {
      setErrorMessage('Please enter a biology-related question.');
      return;
    }
    setErrorMessage('');
    await fetchGroqResponse('Answer this biology question:', question);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

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
          <p className="text-xl text-gray-600">Ask anything related to biology – from cells to ecosystems!</p>
        </motion.div>

        <motion.div className="bg-green-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter a biology-related question in the field below.</li>
            <li>Click "Ask AI".</li>
            <li>Review the AI-generated explanation.</li>
            <li>Click "Copy" if you'd like to save it.</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Enter your question:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What does DNA do?"
              className="flex-1 px-4 py-3 border text-green-600 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
          {errorMessage && <p className="mt-2 text-sm text-red-600">{errorMessage}</p>}
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
                        backgroundColor: isCopied ? '#10B981' : colors.primary,
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
                  <div className="flex justify-center h-40 items-center text-green-600">
                    Thinking...
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

        <motion.div className="bg-green-50 p-6 rounded-lg border text-black border-green-100">
          <h2 className="text-xl font-semibold mb-3">Tips for Better Questions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Ask about biological terms like mitosis, respiration, or DNA.</li>
            <li>Be specific: e.g. "What is the function of chloroplasts?"</li>
            <li>Use it for studying, research, or curiosity!</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BiologyAi;
