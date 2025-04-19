import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Make sure the path is correct

const website = {
  name: "EurekaAi",
  slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const BasicCalculation = () => {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('+');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  // 💡 Groq Hook
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const handleCalculate = () => {
    if (num1 === '' || num2 === '') {
      setError("Please enter both numbers");
      return;
    }

    setError('');
    let res = 0;
    const n1 = parseFloat(num1);
    const n2 = parseFloat(num2);

    switch (operation) {
      case '+':
        res = n1 + n2;
        break;
      case '-':
        res = n1 - n2;
        break;
      case '*':
        res = n1 * n2;
        break;
      case '/':
        res = n2 !== 0 ? n1 / n2 : 'Infinity';
        break;
      default:
        res = 'Invalid operation';
    }

    setResult(res);

    // 🧠 Send to Groq
    const taskType = "Explain this math operation:";
    const prompt = `${n1} ${operation} ${n2} = ${res}`;
    fetchGroqResponse(taskType, prompt);
  };

  return (
    <motion.div
      className="min-h-screen py-12 px-4 text-orange-500 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.secondary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-2xl mx-auto">
        <motion.div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: colors.primary }}>
            {website.name} Basic Calculator
          </h1>
          <p className="text-lg text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4" style={{ color: colors.text }}>
            Perform a Calculation
          </h2>

          <div className="flex space-x-4 mb-4">
            <input
              type="number"
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
              placeholder="First number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
            <select
              value={operation}
              onChange={(e) => setOperation(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg"
            >
              <option value="+">+</option>
              <option value="-">-</option>
              <option value="*">×</option>
              <option value="/">÷</option>
            </select>
            <input
              type="number"
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
              placeholder="Second number"
              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            />
          </div>

          <motion.button
            onClick={handleCalculate}
            className="w-full px-6 py-3 rounded-lg font-medium text-white"
            style={{ backgroundColor: colors.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Calculating & Fetching...' : 'Calculate'}
          </motion.button>

          {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        </motion.div>

        <AnimatePresence>
          {result !== null && (
            <motion.div
              className="bg-white text-black p-6 rounded-lg shadow-md mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-semibold mb-2">Result</h2>
              <p className="text-2xl font-bold">{result}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {response && (
            <motion.div
              className="bg-gray-100 text-black p-6 rounded-lg shadow-inner"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h3 className="text-lg font-semibold mb-2 text-orange-600">Groq Explanation</h3>
              <p className="whitespace-pre-line">{response}</p>
            </motion.div>
          )}
          {groqError && (
            <motion.p
              className="mt-3 text-sm text-red-600"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {groqError}
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BasicCalculation;
