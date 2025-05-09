import React, { useState } from 'react';
import nerdamer from 'nerdamer';
import 'nerdamer/Solve';
import 'nerdamer/Calculus';
import { motion } from 'framer-motion';
import { CopyToClipboard } from 'react-copy-to-clipboard';

const website = {
  name: "EurekaAi",
  slogan: "Smart Differential Equation Solver",
};

const colors = {
  primary: "#fd790f",
  secondary: "#FFFFFF",
  text: "#000000",
};

const DifferentialEquationSolver = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSolve = () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setResult('');
    setTimeout(() => {
      try {
        const solution = nerdamer(`desolve(${input}, y, x)`).toString();
        setResult(solution);
      } catch (err) {
        setResult('❌ Unable to solve this equation. Try a simpler first-order ODE like dy/dx = x + y.');
      } finally {
        setIsLoading(false);
      }
    }, 800);
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
            {website.name} Differential Equation Solver
          </h1>
          <p className="text-xl text-gray-600">{website.slogan}</p>
        </motion.div>

        <motion.div className="bg-gray-50 p-6 rounded-lg mb-8 shadow-sm" variants={itemVariants}>
          <h2 className="text-2xl font-semibold text-black mb-4">Instructions</h2>
          <ul className="list-disc text-black pl-5 space-y-2">
            <li>Use first-order ODE format: <code>dy/dx = expression</code></li>
            <li>Example: <code>dy/dx = x + y</code></li>
            <li>Click “Solve” to get the general solution</li>
          </ul>
        </motion.div>

        <motion.div className="mb-8 space-y-4" variants={itemVariants}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="dy/dx = x + y"
            className="w-full px-4 py-3 border text-orange-500 border-gray-300 rounded-lg"
          />
          <motion.button
            onClick={handleSolve}
            disabled={isLoading}
            className="px-6 py-3 rounded-lg font-medium text-white"
            style={{ backgroundColor: colors.primary }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            {isLoading ? 'Solving...' : 'Solve'}
          </motion.button>
        </motion.div>

        {result && (
          <motion.div
            className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-black">Solution</h2>
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
            <li><code>dy/dx = x</code> → <code>y = (1/2)x^2 + C</code></li>
            <li><code>dy/dx = x + y</code> → solved with integrating factor</li>
            <li><code>dy/dx = sin(x)</code> → <code>y = -cos(x) + C</code></li>
          </ul>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default DifferentialEquationSolver;
