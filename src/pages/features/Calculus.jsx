import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';
import 'nerdamer/Calculus';
import { useGroq } from '../../hooks/useGroq'; // adjust path if needed

const website = {
  name: "EurekaAi",
  slogan: "Your Personal Calculus Companion",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const CalculusSolver = () => {
  const [input, setInput] = useState('');
  const [operation, setOperation] = useState('derivative');
  const [result, setResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [lowerBound, setLowerBound] = useState('');
  const [upperBound, setUpperBound] = useState('');

  const { fetchGroqResponse, response, loading: groqLoading } = useGroq();
  const [isLoading, setIsLoading] = useState(false);

  const handleCalculate = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult('');

    try {
      let output;
      if (operation === 'derivative') {
        output = nerdamer(`diff(${input}, x)`).toString();
      } else if (operation === 'integral') {
        if (!lowerBound || !upperBound) {
          output = nerdamer(`integrate(${input}, x)`).toString() + ' + C';
        } else {
          output = nerdamer(`defint(${input}, x, ${lowerBound}, ${upperBound})`).evaluate().text();
        }
      }
      setResult(output);
    } catch (e) {
      // Fall back to Groq AI
      await fetchGroqResponse(operation === 'derivative' ? "Find the derivative of" : "Calculate the integral of", input);
      setResult(response || '❌ Invalid expression');
    } finally {
      setIsLoading(false);
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

  return (
    <motion.div
      className="min-h-screen mt-24 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.secondary }}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div className="text-center mb-12" variants={itemVariants}>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: colors.primary }}>
            {website.name} Calculus Solver
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-black mb-4">Instructions</h2>
          <ul className="list-disc text-black pl-5 space-y-2">
            <li>Enter a function of <code>x</code> (e.g., <code>x^2</code>, <code>sin(x)</code>)</li>
            <li>Select an operation: Derivative or Integral</li>
            <li>For definite integrals, set bounds</li>
            <li>Click “Calculate” to get the result</li>
          </ul>
        </motion.div>

        <motion.div className="mb-8 space-y-4" variants={itemVariants}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. x^2 + 3x"
            className="w-full px-4 py-3 border text-orange-500 border-gray-300 rounded-lg"
          />
          <div className="flex flex-wrap gap-4">
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="px-4 py-2 border rounded-lg"
            >
              <option value="derivative">Derivative</option>
              <option value="integral">Integral</option>
            </select>

            {operation === 'integral' && (
              <>
                <input
                  type="text"
                  value={lowerBound}
                  onChange={(e) => setLowerBound(e.target.value)}
                  placeholder="Lower bound (optional)"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-40"
                />
                <input
                  type="text"
                  value={upperBound}
                  onChange={(e) => setUpperBound(e.target.value)}
                  placeholder="Upper bound (optional)"
                  className="px-4 py-2 border border-gray-300 rounded-lg w-40"
                />
              </>
            )}
            <motion.button
              onClick={handleCalculate}
              disabled={isLoading || groqLoading}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              {(isLoading || groqLoading) ? 'Calculating...' : 'Calculate'}
            </motion.button>
          </div>
        </motion.div>

        {result && (
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-black">Result</h2>
              <CopyToClipboard text={result} onCopy={handleCopy}>
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
            <pre className="text-black text-lg whitespace-pre-wrap">{result}</pre>
          </motion.div>
        )}

        <motion.div className="bg-orange-50 p-6 rounded-lg border border-orange-100 text-black" variants={itemVariants}>
          <h2 className="text-xl font-semibold mb-3">Examples</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Derivative of <code>x^3 + 2x</code> → <code>3x^2 + 2</code></li>
            <li>Integral of <code>sin(x)</code> → <code>-cos(x) + C</code></li>
            <li>Definite Integral of <code>x</code> from 0 to 3 → <code>4.5</code></li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CalculusSolver;
