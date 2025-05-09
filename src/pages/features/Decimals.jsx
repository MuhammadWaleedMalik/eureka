import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DecimalCalculation = () => {
  const [number1, setNumber1] = useState('');
  const [number2, setNumber2] = useState('');
  const [result, setResult] = useState(null);
  const [operation, setOperation] = useState('');

  const handleCalculation = (op) => {
    const num1 = parseFloat(number1);
    const num2 = parseFloat(number2);

    if (isNaN(num1) || isNaN(num2)) {
      setResult('Please enter valid numbers.');
      return;
    }

    let calcResult = 0;

    switch (op) {
      case '+':
        calcResult = num1 + num2;
        break;
      case '-':
        calcResult = num1 - num2;
        break;
      case '*':
        calcResult = num1 * num2;
        break;
      case '/':
        if (num2 === 0) {
          setResult('Cannot divide by zero.');
          return;
        }
        calcResult = num1 / num2;
        break;
      default:
        setResult('Unknown operation.');
        return;
    }

    setResult(calcResult.toFixed(2));
    setOperation(op);
  };

  return (
    <motion.div
      className="min-h-screen py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-orange-500 mb-6">Decimal Calculator</h1>

        <div className="mb-4">
          <label htmlFor="number1" className="block text-lg font-medium text-gray-700">Enter First Number:</label>
          <input
            type="number"
            id="number1"
            value={number1}
            onChange={(e) => setNumber1(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="number2" className="block text-lg font-medium text-gray-700">Enter Second Number:</label>
          <input
            type="number"
            id="number2"
            value={number2}
            onChange={(e) => setNumber2(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        <div className="flex justify-around mb-4">
          <button
            onClick={() => handleCalculation('+')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            +
          </button>
          <button
            onClick={() => handleCalculation('-')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            -
          </button>
          <button
            onClick={() => handleCalculation('*')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            *
          </button>
          <button
            onClick={() => handleCalculation('/')}
            className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition duration-300"
          >
            /
          </button>
        </div>

        <div className="mt-4">
          {result !== null && (
            <motion.div
              className="text-xl font-semibold text-center text-gray-700"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <p>Result: {result}</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DecimalCalculation;
