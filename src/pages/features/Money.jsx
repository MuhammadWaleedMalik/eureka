import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq';  // Import your custom hook

const topic = {
  name: "EurekaAi",
  subdomain: "Money & Finance",
};

const colors = {
  primary: "#0f9d58", // Finance-themed green
  secondary: "#FFFFFF",
  text: "#000000",
};

const MoneyFinanceAi = () => {
  const [question, setQuestion] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');
  
  // Using the custom hook
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const handleAsk = () => {
    if (!question.trim()) {
      setError('Please enter a money or finance-related question.');
      return;
    }

    setIsAnswering(true);
    setError('');
    fetchGroqResponse('finance', question);  // Using fetchGroqResponse

    // Handle potential errors from the Groq API
    if (groqError) {
      setError(groqError);
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
          <p className="text-xl text-gray-600">Ask about savings, investing, budgeting, or financial history.</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Type a question about money or finance.</li>
            <li>Click “Ask AI.”</li>
            <li>Read the answer and copy it if needed.</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Ask about money or finance:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. What is compound interest?"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-600 focus:border-green-600"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleAsk}
              disabled={isAnswering || loading}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isAnswering || loading ? "Answering..." : "Ask AI"}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {(response || isAnswering || loading) && (
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
                        backgroundColor: isCopied ? '#0d9488' : colors.primary,
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
                {loading || isAnswering ? (
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
            <li>What is inflation and how does it affect savings?</li>
            <li>How does the stock market work?</li>
            <li>What is the difference between a Roth IRA and a 401(k)?</li>
            <li>How can I build a monthly budget?</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default MoneyFinanceAi;
