import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq';  // Import your custom hook

const topic = {
  name: "EurekaAi",
  subdomain: "Finance Advisor",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const FinanceAi = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  // Use your custom hook
  const { fetchGroqResponse, response, loading, error: hookError } = useGroq();

  const handleAsk = () => {
    if (!question.trim()) {
      setError('Please enter a finance-related question.');
      return;
    }

    setIsAnswering(true);
    setError('');
    setTimeout(() => {
      fetchGroqResponse('finance', question);  // Fetch AI response
    }, 1500);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  React.useEffect(() => {
    if (response) {
      const fakeAnswer = `**Q:** ${question}\n\n**A (by ${topic.name} AI):**\n${response}\n\n*Disclaimer: This is AI-generated information. For financial advice tailored to your situation, consult a certified financial advisor.*`;
      setAnswer(fakeAnswer);
      setIsAnswering(false);
    }

    if (hookError) {
      setError(hookError);  // If there's an error in the custom hook
      setIsAnswering(false);
    }
  }, [response, hookError, question]);

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
          <p className="text-xl text-gray-600">Ask about savings, investments, credit, or taxes.</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Type in your finance question below.</li>
            <li>Click “Ask AI” to get a response.</li>
            <li>Copy the answer for future reference if needed.</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Your finance question:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. Should I invest in mutual funds?"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
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
              {isAnswering || loading ? "Thinking..." : "Ask AI"}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {(answer || isAnswering || loading) && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">AI Response</h2>
                {answer && (
                  <CopyToClipboard text={answer} onCopy={handleCopy}>
                    <motion.button
                      className="px-4 py-2 text-sm rounded-md flex items-center"
                      style={{
                        backgroundColor: isCopied ? '#065F46' : colors.primary,
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
                {loading && !answer ? (
                  <div className="flex justify-center h-40 items-center text-gray-700">
                    Generating answer...
                  </div>
                ) : (
                  <div className="prose max-w-none">
                    {answer.split('\n').map((line, idx) => (
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
            <li>What’s the best way to save for retirement?</li>
            <li>Should I invest in stocks or real estate?</li>
            <li>How do credit scores work?</li>
            <li>Is a Roth IRA better than a 401(k)?</li>
            <li>How can I reduce my taxes legally?</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default FinanceAi;
