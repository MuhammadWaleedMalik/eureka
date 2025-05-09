import React, { useState } from 'react';
import { motion } from 'framer-motion';

const PrimeFactorization = () => {
  const [number, setNumber] = useState('');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const primeFactorize = (num) => {
    let factors = [];
    let divisor = 2;

    // Handle edge case for numbers less than 2
    if (num < 2) {
      setError('Please enter a number greater than or equal to 2.');
      return;
    }

    while (num >= divisor) {
      if (num % divisor === 0) {
        factors.push(divisor);
        num /= divisor;
      } else {
        divisor++;
      }
    }

    return factors;
  };

  const handleSubmit = () => {
    const num = parseInt(number);

    if (isNaN(num) || num <= 0) {
      setError('Please enter a valid positive number.');
      setResult('');
      return;
    }

    setError('');
    const factors = primeFactorize(num);
    setResult(factors.join(' × '));
  };

  return (
    <motion.div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg mx-auto bg-white text-black mt-24  p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Prime Factorization Calculator</h1>

        <div className="mb-4">
          <label htmlFor="number" className="block text-lg font-medium text-gray-700">Enter a Number:</label>
          <input
            type="number"
            id="number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="text-center mb-4">
          <motion.button
            onClick={handleSubmit}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            Find Prime Factors
          </motion.button>
        </div>

        {error && (
          <motion.div
            className="text-sm text-red-500 text-center mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p>{error}</p>
          </motion.div>
        )}

        {result && !error && (
          <motion.div
            className="text-xl font-semibold text-center text-gray-700 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg">Prime Factors: {result}</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default PrimeFactorization;
