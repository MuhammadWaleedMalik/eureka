import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Adjust path if needed

const website = {
  name: "EurekaAi",
  slogan: "Step-by-step GenAI Calculator for Daily Life, Math, ScienceTech",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const Algebra = () => {
  const [prompt, setPrompt] = useState('');
  const [steps, setSteps] = useState([]);
  const [isCopied, setIsCopied] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const { fetchGroqResponse, response, loading, error } = useGroq();

  const handleCalculate = async () => {
    if (!prompt.trim()) {
      setErrorMsg('Please enter an algebraic expression');
      return;
    }

    setErrorMsg('');
    setSteps([]);

    await fetchGroqResponse(
      'Solve this algebra expression step by step in simple explanation:',
      prompt
    );
  };

  // Populate steps one by one when `response` is ready
  React.useEffect(() => {
    if (response) {
      const lines = response.split('\n').filter(line => line.trim());
      let index = 0;
      const interval = setInterval(() => {
        setSteps(prev => [...prev, lines[index]]);
        index++;
        if (index >= lines.length) clearInterval(interval);
      }, 1000);
    }
  }, [response]);

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
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: colors.primary }}>
            {website.name} – Step-by-Step Algebra Solver
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter your algebraic equation (e.g., 2x + 4 = 8)</li>
            <li>Click “Calculate” to view step-by-step results</li>
            <li>Copy the result if needed</li>
          </ol>
        </div>

        <div className="mb-8">
          <label htmlFor="prompt" className="block text-lg font-medium text-gray-700 mb-2">
            Enter Algebraic Expression:
          </label>
          <div className="flex space-x-4">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="e.g. 2x + 4 = 8"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleCalculate}
              disabled={loading}
              className="px-6 py-3 rounded-lg font-medium text-black"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {loading ? 'Calculating...' : 'Calculate'}
            </motion.button>
          </div>
          {errorMsg && <p className="mt-2 text-sm text-red-600">{errorMsg}</p>}
          {error && <p className="mt-2 text-sm text-red-600">Error: {error}</p>}
        </div>

        <AnimatePresence>
          {steps.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Step-by-Step Output</h2>
                <CopyToClipboard text={steps.join('\n')} onCopy={handleCopy}>
                  <motion.button
                    className="px-4 py-2 text-sm rounded-md"
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
              </div>

              <div className="border text-black border-gray-200 rounded-lg p-6 bg-white min-h-64 shadow-sm">
                {steps.map((step, i) => (
                  <motion.p
                    key={i}
                    className="mb-2"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.2 }}
                  >
                    {step}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-orange-50 p-6 rounded-lg border text-black border-orange-100">
          <h2 className="text-xl font-semibold mb-3">Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use standard algebraic format: 2x + 3 = 7</li>
            <li>Include "x" or other variables properly</li>
            <li>Don’t write in words or mixed symbols</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Algebra;
