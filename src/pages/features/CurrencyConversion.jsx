import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq';

const topic = {
  name: "CurrencyAI",
  subdomain: "Currency Converter",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const CurrencyConverter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [isConverting, setIsConverting] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [error, setError] = useState('');

  // Groq hook integration
  const [query, setQuery] = useState('');
  const { fetchGroqResponse, response, loading: aiLoading, error: aiError } = useGroq();

  const handleConvert = async () => {
    if (!amount || isNaN(amount) || amount <= 0) {
      setError('Please enter a valid amount.');
      return;
    }
    setIsConverting(true);
    setError('');

    try {
      const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`);
      const data = await response.json();
      const rate = data.rates[toCurrency];
      const convertedValue = (amount * rate).toFixed(2);
      setConvertedAmount(convertedValue);
    } catch (err) {
      setError('Error fetching conversion rates. Please try again later.');
    }
    setIsConverting(false);
  };

  const handleCopy = () => {
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleGroqSubmit = () => {
    fetchGroqResponse("Explain this currency conversion: ", query);
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
          <p className="text-xl text-gray-600">Convert between various currencies instantly.</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold mb-4 text-black">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Enter the amount you wish to convert.</li>
            <li>Select the currency to convert from and the currency to convert to.</li>
            <li>Click “Convert” to see the result.</li>
            <li>Copy the result if you want to save it.</li>
          </ol>
        </motion.div>

        <motion.div className="mb-8">
          <label htmlFor="amount" className="block text-lg font-medium text-gray-700 mb-2">Amount:</label>
          <div className="flex space-x-4">
            <input
              type="number"
              id="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 100"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              style={{ outline: 'none' }}
            />
            <motion.button
              onClick={handleConvert}
              disabled={isConverting}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isConverting ? "Converting..." : "Convert"}
            </motion.button>
          </div>
          {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </motion.div>

        <motion.div className="flex space-x-4 mb-8">
          <div className="w-full">
            <label htmlFor="fromCurrency" className="block text-lg font-medium text-gray-700 mb-2">From Currency:</label>
            <select
              id="fromCurrency"
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
          <div className="w-full">
            <label htmlFor="toCurrency" className="block text-lg font-medium text-gray-700 mb-2">To Currency:</label>
            <select
              id="toCurrency"
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="GBP">GBP</option>
              <option value="INR">INR</option>
              <option value="JPY">JPY</option>
              <option value="AUD">AUD</option>
            </select>
          </div>
        </motion.div>

        <AnimatePresence>
          {convertedAmount && !isConverting && (
            <motion.div
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Converted Amount</h2>
                <CopyToClipboard text={convertedAmount} onCopy={handleCopy}>
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
              </div>
              <div className="border border-gray-200 rounded-lg p-6 bg-white text-black shadow-sm">
                <p className="text-lg">
                  {amount} {fromCurrency} = {convertedAmount} {toCurrency}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="bg-gray-50 p-6 rounded-lg border text-black border-gray-100 mb-8">
          <h2 className="text-xl font-semibold mb-3">Sample Conversions</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>100 USD to EUR</li>
            <li>200 GBP to INR</li>
            <li>50 JPY to USD</li>
          </ul>
        </motion.div>

        {/* Groq AI Feature */}
        <motion.div className="bg-white border p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-black">Ask CurrencyAI</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="e.g. Why is USD stronger than EUR?"
              className="flex-1 px-4 py-3 border text-gray-800 border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <motion.button
              onClick={handleGroqSubmit}
              disabled={aiLoading}
              className="px-6 py-3 rounded-lg font-medium text-white"
              style={{ backgroundColor: colors.primary }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {aiLoading ? "Thinking..." : "Ask AI"}
            </motion.button>
          </div>
          {aiError && <p className="mt-2 text-sm text-red-600">{aiError}</p>}
          {response && (
            <div className="mt-4 border p-4 rounded-lg text-black bg-gray-50">
              <h3 className="font-semibold mb-2">AI Response:</h3>
              <p>{response}</p>
            </div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};

export default CurrencyConverter;
