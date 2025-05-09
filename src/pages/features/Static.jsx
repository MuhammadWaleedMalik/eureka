import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq'; // Import the custom hook

const website = {
  name: "EurekaAi",
  slogan: "Step-by-step GenAI Calculator for Daily Life, Math, ScienceTech",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const calculateStatistics = (numbers) => {
  if (numbers.length === 0) return {};

  const mean = numbers.reduce((a, b) => a + b, 0) / numbers.length;

  const sorted = [...numbers].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  const median = sorted.length % 2 === 0
    ? (sorted[mid - 1] + sorted[mid]) / 2
    : sorted[mid];

  const frequency = {};
  sorted.forEach((num) => {
    frequency[num] = (frequency[num] || 0) + 1;
  });
  const maxFreq = Math.max(...Object.values(frequency));
  const mode = Object.keys(frequency).filter(key => frequency[key] === maxFreq).map(Number);

  const range = sorted[sorted.length - 1] - sorted[0];

  const variance = numbers.reduce((acc, num) => acc + Math.pow(num - mean, 2), 0) / numbers.length;
  const stdDev = Math.sqrt(variance);

  return { mean, median, mode, range, stdDev };
};

const Statistics = () => {
  const [input, setInput] = useState('');
  const [steps, setSteps] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  const [groqRequested, setGroqRequested] = useState(false);

  const { fetchGroqResponse, response: groqResponse, loading: groqLoading, error: groqError } = useGroq();

  const handleCalculate = () => {
    setSteps([]);
    setError('');
    setGroqRequested(false);

    const numberArray = input
      .split(',')
      .map(val => parseFloat(val.trim()))
      .filter(val => !isNaN(val));

    if (numberArray.length === 0) {
      setError('Please enter a valid list of numbers separated by commas.');
      return;
    }

    setIsCalculating(true);
    const result = calculateStatistics(numberArray);

    const stepList = [
      `Numbers: ${numberArray.join(', ')}`,
      `Mean = ${result.mean.toFixed(2)}`,
      `Median = ${result.median}`,
      `Mode = ${result.mode.join(', ')}`,
      `Range = ${result.range}`,
      `Standard Deviation ≈ ${result.stdDev.toFixed(2)}`
    ];

    let index = 0;
    const interval = setInterval(() => {
      setSteps((prev) => [...prev, stepList[index]]);
      index++;
      if (index >= stepList.length) {
        clearInterval(interval);
        setIsCalculating(false);
      }
    }, 1000);

    // Fire Groq response after all steps calculated
    setTimeout(() => {
      const summary = stepList.join('\n');
      fetchGroqResponse("Explain the following statistical results in simple terms:", summary);
      setGroqRequested(true);
    }, stepList.length * 1000 + 500);
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
            {website.name} – Step-by-Step Statistics Solver
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter a list of numbers separated by commas</li>
            <li>Click “Calculate”</li>
            <li>View the result step-by-step</li>
          </ol>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Enter Numbers:</label>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="e.g. 1, 2, 3, 4, 5"
            className="mb-4 w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
          />

          <motion.button
            onClick={handleCalculate}
            disabled={isCalculating}
            className="px-6 py-3 rounded-lg font-medium text-black"
            style={{ backgroundColor: colors.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {isCalculating ? 'Calculating...' : 'Calculate'}
          </motion.button>

          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>

        <AnimatePresence>
          {steps.length > 0 && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-semibold mb-3">Step-by-Step Output</h2>
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

        {groqRequested && (
          <div className="bg-gray-100 text-black p-6 rounded-lg mb-6 border border-gray-200">
            <h2 className="text-xl font-semibold mb-3">Explanation by AI</h2>
            {groqLoading && <p>Fetching AI explanation...</p>}
            {groqError && <p className="text-red-600">{groqError}</p>}
            {!groqLoading && !groqError && <p>{groqResponse}</p>}
          </div>
        )}

        <div className="bg-orange-50 p-6 rounded-lg border text-black border-orange-100">
          <h2 className="text-xl font-semibold mb-3">Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Separate values using commas (e.g., 4, 5, 8, 10)</li>
            <li>Results are rounded to two decimals</li>
            <li>Mode may return multiple values</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Statistics;
