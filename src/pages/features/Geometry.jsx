import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useGroq } from '../../hooks/useGroq';  // Assuming the hook is saved in 'useGroq.js'

const website = {
  name: "EurekaAi",
  slogan: "Step-by-step GenAI Calculator for Daily Life, Math, ScienceTech",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const geometryFormulas = {
  Circle: (r) => ({
    area: Math.PI * r * r,
    perimeter: 2 * Math.PI * r,
  }),
  Square: (s) => ({
    area: s * s,
    perimeter: 4 * s,
  }),
  Rectangle: (l, w) => ({
    area: l * w,
    perimeter: 2 * (l + w),
  }),
  Triangle: (b, h) => ({
    area: 0.5 * b * h,
    perimeter: 'Needs all 3 sides',
  }),
};

const Geometry = () => {
  const [shape, setShape] = useState('Circle');
  const [input1, setInput1] = useState('');
  const [input2, setInput2] = useState('');
  const [steps, setSteps] = useState([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [error, setError] = useState('');
  
  const { fetchGroqResponse, response, loading, error: groqError } = useGroq();

  const handleCalculate = () => {
    setSteps([]);
    setError('');

    const val1 = parseFloat(input1);
    const val2 = parseFloat(input2);

    if (isNaN(val1) || (shape === 'Rectangle' || shape === 'Triangle') && isNaN(val2)) {
      setError('Please provide valid numeric input(s).');
      return;
    }

    setIsCalculating(true);

    let result = {};
    let stepList = [];

    switch (shape) {
      case 'Circle':
        stepList.push(`Radius = ${val1}`);
        result = geometryFormulas.Circle(val1);
        stepList.push(`Area = π × r² = ${result.area.toFixed(2)}`);
        stepList.push(`Perimeter = 2 × π × r = ${result.perimeter.toFixed(2)}`);
        break;
      case 'Square':
        stepList.push(`Side = ${val1}`);
        result = geometryFormulas.Square(val1);
        stepList.push(`Area = side² = ${result.area.toFixed(2)}`);
        stepList.push(`Perimeter = 4 × side = ${result.perimeter.toFixed(2)}`);
        break;
      case 'Rectangle':
        stepList.push(`Length = ${val1}, Width = ${val2}`);
        result = geometryFormulas.Rectangle(val1, val2);
        stepList.push(`Area = length × width = ${result.area.toFixed(2)}`);
        stepList.push(`Perimeter = 2 × (length + width) = ${result.perimeter.toFixed(2)}`);
        break;
      case 'Triangle':
        stepList.push(`Base = ${val1}, Height = ${val2}`);
        result = geometryFormulas.Triangle(val1, val2);
        stepList.push(`Area = 0.5 × base × height = ${result.area.toFixed(2)}`);
        stepList.push(`Perimeter = ${result.perimeter}`);
        break;
      default:
        setError('Unsupported shape.');
        return;
    }

    let index = 0;
    const interval = setInterval(() => {
      setSteps((prev) => [...prev, stepList[index]]);
      index++;
      if (index >= stepList.length) {
        clearInterval(interval);
        setIsCalculating(false);
      }
    }, 1000);

    // Call the Groq API with the calculated steps for additional info or advice
    fetchGroqResponse('Geometry Calculation', `Shape: ${shape}, Steps: ${stepList.join(', ')}`);
  };

  const getInputLabels = () => {
    switch (shape) {
      case 'Circle':
        return ['Radius'];
      case 'Square':
        return ['Side'];
      case 'Rectangle':
        return ['Length', 'Width'];
      case 'Triangle':
        return ['Base', 'Height'];
      default:
        return [];
    }
  };

  return (
    <motion.div
      className="min-h-screen mt-24 text-orange-500 py-12 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: colors.secondary }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold mb-4" style={{ color: colors.primary }}>
            {website.name} – Step-by-Step Geometry Solver
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </div>

        <div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-black mb-4">How to Use</h2>
          <ol className="list-decimal text-black pl-5 space-y-2">
            <li>Select a shape</li>
            <li>Enter the required measurements</li>
            <li>Click “Calculate” to view step-by-step results</li>
          </ol>
        </div>

        <div className="mb-8">
          <label className="block text-lg font-medium text-gray-700 mb-2">Select Shape:</label>
          <select
            className="mb-4 w-full px-4 py-2 border rounded-lg text-orange-500"
            value={shape}
            onChange={(e) => {
              setShape(e.target.value);
              setInput1('');
              setInput2('');
              setSteps([]);
            }}
          >
            <option>Circle</option>
            <option>Square</option>
            <option>Rectangle</option>
            <option>Triangle</option>
          </select>

          {getInputLabels().map((label, idx) => (
            <div key={idx} className="mb-4">
              <label className="block text-sm text-gray-700 mb-1">{label}</label>
              <input
                type="number"
                value={idx === 0 ? input1 : input2}
                onChange={(e) => (idx === 0 ? setInput1(e.target.value) : setInput2(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                placeholder={`Enter ${label}`}
              />
            </div>
          ))}

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

        {/* Groq response output */}
        {response && (
          <div className="bg-orange-50 p-6 rounded-lg mb-8 shadow-sm">
            <h2 className="text-xl font-semibold mb-3">Groq Response</h2>
            <p>{response}</p>
          </div>
        )}

        <div className="bg-orange-50 p-6 rounded-lg border text-black border-orange-100">
          <h2 className="text-xl font-semibold mb-3">Tips</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li>Use proper numerical values</li>
            <li>For triangle perimeter, use all sides (future feature)</li>
            <li>Results are rounded to two decimals</li>
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default Geometry;
