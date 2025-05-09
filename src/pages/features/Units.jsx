import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useGroq } from '../../hooks/useGroq'; // Import your custom hook

const website = {
  name: "EurekaAi",
  slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const units = {
  length: ['meters', 'kilometers', 'centimeters', 'inches', 'feet'],
  mass: ['grams', 'kilograms', 'pounds', 'ounces'],
  time: ['seconds', 'minutes', 'hours'],
};

const convertUnit = (value, from, to) => {
  // Dummy conversion logic – replace with a real library or logic
  if (from === to) return value;
  return (value * 2).toFixed(2); // placeholder conversion
};

const UnitConverter = () => {
  const { fetchGroqResponse, response, loading, error } = useGroq(); // Using your hook
  const [quantityType, setQuantityType] = useState('length');
  const [inputValue, setInputValue] = useState('');
  const [fromUnit, setFromUnit] = useState('meters');
  const [toUnit, setToUnit] = useState('kilometers');
  const [convertedValue, setConvertedValue] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [customError, setCustomError] = useState('');

  const handleConvert = async () => {
    if (!inputValue || isNaN(inputValue)) {
      setCustomError('Please enter a valid numeric value');
      return;
    }
    setCustomError('');
    const result = convertUnit(parseFloat(inputValue), fromUnit, toUnit);
    setConvertedValue(`${inputValue} ${fromUnit} = ${result} ${toUnit}`);

    // Optionally call the fetchGroqResponse function here if needed
    // You can modify the `taskType` and `prompt` based on the unit conversion or other logic
    await fetchGroqResponse('unit conversion', `${inputValue} ${fromUnit} to ${toUnit}`);
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
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl mb-4" style={{ color: colors.primary }}>
            {website.name} Units & Measurements
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Select a quantity type (e.g., Length, Mass, Time)</li>
            <li>Enter a value and choose units to convert from and to</li>
            <li>Click "Convert" to view result</li>
            <li>Copy the result if needed</li>
          </ol>
        </motion.div>

        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <label className="text-lg font-medium text-gray-700">Quantity Type:</label>
            <select
              value={quantityType}
              onChange={(e) => {
                const newType = e.target.value;
                setQuantityType(newType);
                setFromUnit(units[newType][0]);
                setToUnit(units[newType][1]);
              }}
              className="p-2 border rounded-md text-gray-700"
            >
              {Object.keys(units).map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
            <input
              type="number"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Enter value"
              className="flex-1 px-4 py-3 border text-orange-500 border-gray-300 rounded-lg"
            />
            <select
              value={fromUnit}
              onChange={(e) => setFromUnit(e.target.value)}
              className="p-2 border rounded-md text-gray-700"
            >
              {units[quantityType].map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
            <span className="text-xl">→</span>
            <select
              value={toUnit}
              onChange={(e) => setToUnit(e.target.value)}
              className="p-2 border rounded-md text-gray-700"
            >
              {units[quantityType].map((unit) => (
                <option key={unit} value={unit}>{unit}</option>
              ))}
            </select>
          </div>

          <motion.button
            onClick={handleConvert}
            className="px-6 py-3 rounded-lg font-medium text-black"
            style={{ backgroundColor: colors.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            Convert
          </motion.button>

          {customError && <p className="text-sm text-red-600">{customError}</p>}
        </div>

        <AnimatePresence>
          {convertedValue && (
            <motion.div 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex justify-between items-center mb-3">
                <h2 className="text-xl font-semibold">Conversion Result</h2>
                <CopyToClipboard text={convertedValue} onCopy={handleCopy}>
                  <motion.button
                    className="px-4 py-2 text-sm rounded-md"
                    style={{ backgroundColor: isCopied ? '#10B981' : colors.primary, color: 'white' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isCopied ? 'Copied!' : 'Copy'}
                  </motion.button>
                </CopyToClipboard>
              </div>
              <div className="p-6 bg-white border border-gray-200 rounded-lg text-black">
                <p className="text-lg">{convertedValue}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div className="bg-orange-50 p-6 rounded-lg border text-black border-orange-100">
          <h2 className="text-xl font-semibold mb-3">Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Double-check unit types (don’t convert mass to time!)</li>
            <li>Use simple numbers for clearer results</li>
            <li>Conversions are approximate — consult exact standards if needed</li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default UnitConverter;
