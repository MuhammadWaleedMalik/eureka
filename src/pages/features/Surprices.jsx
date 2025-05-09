import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // ✅ Import your hook here

const topic = {
  name: "EurekaAi",
  subdomain: "Surprise Generator",
};

const colors = {
  primary: "#ec4899", // Pink
  secondary: "#FFFFFF",
  text: "#000000",
};

const SurpriseAi = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [localError, setLocalError] = useState('');

  // ✅ Hook usage
  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleAsk = async () => {
    if (!question.trim()) {
      setLocalError('Please ask something about surprises!');
      return;
    }

    setLocalError('');
    setAnswer(''); // clear previous answer
    await fetchGroqResponse('Give a fun surprise idea for:', question);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  useEffect(() => {
    if (response) {
      const formatted = `**Q:** ${question}\n\n**A (by ${topic.name} AI):**\n${response}\n\n*This is a playful AI-generated surprise suggestion. For more fun, just keep asking!*`;
      setAnswer(formatted);
    }
  }, [response]);

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
          <p className="text-xl text-gray-600">Ask anything about planning or receiving surprises, gifts, pranks, or magical moments!</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter a surprise-related question or idea.</li>
            <li>Click “Ask AI”.</li>
            <li>Enjoy the surprise suggestion and copy it if you like!</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="question" className="block text-lg font-medium text-gray-700 mb-2">
            Ask something surprising:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="e.g. How do I surprise my best friend?"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
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
              {loading ? "Thinking..." : "Ask AI"}
            </motion.button>
          </div>
          {(localError || error) && <p className="mt-2 text-sm text-red-600">{localError || error}</p>}
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
                <h2 className="text-xl font-semibold">Surprise AI Says</h2>
                {answer && (
                  <CopyToClipboard text={answer} onCopy={handleCopy}>
                    <motion.button
                      className="px-4 py-2 text-sm rounded-md flex items-center"
                      style={{
                        backgroundColor: isCopied ? '#be185d' : colors.primary,
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
                    Generating fun idea...
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
          <h2 className="text-xl font-semibold mb-3">Sample Surprise Ideas</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>What's a creative birthday surprise for a movie lover?</li>
            <li>How can I prank my brother in a harmless way?</li>
            <li>What surprise gift could I give someone who loves space?</li>
            <li>Any magical ways to say "thank you"?</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SurpriseAi;
