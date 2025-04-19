import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const website = {
  name: "CemedBidAi",
  slogan: "Gen AI Tender& Proposal writing & bid management",
   colors: {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000"
  }
};

const Explore = () => {
  const [hoveredItem, setHoveredItem] = useState(null);

  // Explore items data
  const exploreItems = [
    {
      id: 1,
      title: 'AI-Generated Bids',
      description: 'Create complete, customized bid documents instantly with AI-powered automation.',
      icon: '📝',
      link: '/ai-generated-bids',
      bgColor: 'bg-orange-50',
    },
    {
      id: 2,
      title: 'AI-Generated Tenders',
      description: 'Generate professional, industry-ready tender submissions tailored to your needs.',
      icon: '📄',
      link: '/ai-generated-tenders',
      bgColor: 'bg-green-50',
    },
    {
      id: 3,
      title: 'AI-Generated Proposals',
      description: 'Automatically draft client-winning proposals using intelligent content creation tools.',
      icon: '📑',
      link: '/ai-generated-proposals',
      bgColor: 'bg-blue-50',
    },
    {
      id: 4,
      title: 'Enhance Bids',
      description: 'Improve your existing bids with AI-driven suggestions, formatting, and scoring tips.',
      icon: '🚀',
      link: '/enhance-bids',
      bgColor: 'bg-purple-50',
    },
    {
      id: 5,
      title: 'Enhance Tenders',
      description: 'Refine and polish your tender documents with AI-powered quality checks.',
      icon: '🎯',
      link: '/enhance-tenders',
      bgColor: 'bg-yellow-50',
    },
    {
      id: 6,
      title: 'Enhance Proposals',
      description: 'Boost the impact of your proposals by enhancing clarity, tone, and persuasiveness.',
      icon: '💡',
      link: '/enhance-proposals',
      bgColor: 'bg-red-50',
    },
  
    
  ];
    
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3,
      }
    }
  };

  const itemVariants = {
    hidden: { 
      y: 40,
      opacity: 0,
      rotateX: -30
    },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: 0.5
      }
    },
    hover: {
      y: -10,
      scale: 1.03,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: {
        duration: 0.3,
        ease: "easeOut"
      }
    },
    tap: {
      scale: 0.98,
      transition: {
        duration: 0.1
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const subtitleVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.2,
        duration: 0.6,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    }
  };

  const iconVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.2,
      rotate: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10
      }
    }
  };

  const arrowVariants = {
    rest: { x: 0 },
    hover: { 
      x: 10,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 15
      }
    }
  };

  return (
    <div 
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-8"
      style={{ backgroundColor: website.colors.secondary }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div 
          initial="hidden"
          animate="visible"
          className="text-center mb-16"
        >
          <motion.h2 
            variants={titleVariants}
            className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl"
            style={{ color: website.colors.primary }}
          >
            {website.name} Features
          </motion.h2>
          <motion.p 
            variants={subtitleVariants}
            className="mt-5 max-w-3xl mx-auto text-xl text-gray-600"
          >
            {website.slogan}
          </motion.p>
        </motion.div>

        {/* Explore Items Grid */}
        <motion.div
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {exploreItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                variants={itemVariants}
                whileHover="hover"
                whileTap="tap"
                onHoverStart={() => setHoveredItem(item.id)}
                onHoverEnd={() => setHoveredItem(null)}
                className={`relative overflow-hidden rounded-2xl border border-gray-100 ${item.bgColor}`}
              >
                <Link to={item.link} className="block h-full">
                  <div className="px-6 py-8 h-full flex flex-col">
                    <motion.div
                      variants={iconVariants}
                      initial="rest"
                      animate={hoveredItem === item.id ? "hover" : "rest"}
                      className="text-4xl mb-6"
                    >
                      {item.icon}
                    </motion.div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-600 flex-grow">{item.description}</p>
                    <motion.div
                      className="mt-6 flex items-center"
                      style={{ color: website.colors.primary }}
                      variants={arrowVariants}
                      initial="rest"
                      animate={hoveredItem === item.id ? "hover" : "rest"}
                    >
                      <span className="text-sm font-medium">Explore feature</span>
                      <svg
                        className="ml-2 h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </motion.div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* CTA Section */}
      
      
      
      
      </div>
    </div>
  );
};

// Helper function to convert hex to rgb
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse r, g, b values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return `${r}, ${g}, ${b}`;
}

export default Explore;