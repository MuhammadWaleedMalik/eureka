// // app/page.tsx
// 'use client';

// import { useState, useEffect } from 'react';
// import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
// import { 
//   Calculator, 
//   Atom, 
//   Globe, 
//   Home,
//   ChevronRight,
//   Search,
//   Menu,
//   X,
//   Download,
//   Share2,
//   Star,
//   Zap,
//   GraduationCap,
//   BarChart2
// } from 'lucide-react';

// import { Link } from 'react-router-dom';

// const HomePage = () => {
//   // Website data
//   const website = {
//     name: "Wolfram|Alpha",
//     slogan: "Computational Intelligence™",
//     description: "Compute expert-level answers using Wolfram's breakthrough algorithms, knowledgebase and AI technology"
//   };

//   const categories = [
//     {
//       id: 'math',
//       title: "Math & Calculations",
//       subtitle: "Solve, visualize, and explore numbers and shapes.",
//       color: "text-indigo-600",
//       bgColor: "bg-indigo-100/80",
//       borderColor: "border-indigo-200",
//       icon: <Calculator className="w-5 h-5 text-indigo-600" />,
//       subcategories: [
//         { name: "Arithmetic Calculations", popular: true },
//         { name: "Basic operations", popular: false },
//         { name: "Percentages & ratios", popular: true },
//         { name: "Fractions & decimals", popular: false },
//         { name: "Number Theory", popular: false },
//         { name: "Prime factorization", popular: true },
//         { name: "Divisibility check", popular: false },
//         { name: "Modular arithmetic", popular: false },
//         { name: "Geometry", popular: true },
//         { name: "Areas & perimeters", popular: false },
//         { name: "Volumes of 2D & 3D shapes", popular: true },
//         { name: "Angle calculations", popular: false }
//       ]
//     },
//     {
//       id: 'science',
//       title: "Science & Technology",
//       subtitle: "Compute, simulate, and analyze scientific phenomena.",
//       color: "text-emerald-600",
//       bgColor: "bg-emerald-100/80",
//       borderColor: "border-emerald-200",
//       icon: <Atom className="w-5 h-5 text-emerald-600" />,
//       subcategories: [
//         { name: "Physics", popular: true },
//         { name: "Mechanics (motion, force, energy)", popular: false },
//         { name: "Electricity & circuits", popular: true },
//         { name: "Thermodynamics (heat, temperature)", popular: false },
//         { name: "Chemistry", popular: true },
//         { name: "Balance chemical equations", popular: false },
//         { name: "Element data & periodic table", popular: true },
//         { name: "Reaction types & analysis", popular: false }
//       ]
//     },
//     {
//       id: 'society',
//       title: "Society & Culture",
//       subtitle: "Explore cultural trends, historical data, and social insights.",
//       color: "text-amber-600",
//       bgColor: "bg-amber-100/80",
//       borderColor: "border-amber-200",
//       icon: <Globe className="w-5 h-5 text-amber-600" />,
//       subcategories: [
//         { name: "Time & Date", popular: true },
//         { name: "Time zone conversions", popular: false },
//         { name: "Date arithmetic (days between dates)", popular: true },
//         { name: "Historical dates lookup", popular: false },
//         { name: "Natural Events", popular: true },
//         { name: "Sunrise & sunset times", popular: false },
//         { name: "Moon phases", popular: true }
//       ]
//     },
//     {
//       id: 'daily',
//       title: "Daily Life & Finance",
//       subtitle: "Plan better, stay informed, and manage everyday needs.",
//       color: "text-rose-600",
//       bgColor: "bg-rose-100/80",
//       borderColor: "border-rose-200",
//       icon: <Home className="w-5 h-5 text-rose-600" />,
//       subcategories: [
//         { name: "Currency Conversions", popular: true },
//         { name: "Live exchange rates", popular: false },
//         { name: "Conversion calculators", popular: true },
//         { name: "Financial Calculations", popular: false },
//         { name: "Interest rates", popular: true },
//         { name: "Loan & investment estimators", popular: false },
//         { name: "Statistics & Data", popular: true },
//         { name: "Descriptive statistics", popular: false },
//         { name: "Hypothesis testing", popular: true },
//         { name: "Probability distributions", popular: false }
//       ]
//     }
//   ];

  
//   // UI State
//   const [activeCategory, setActiveCategory] = useState(null);
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [scrolled, setScrolled] = useState(false);

//   // Scroll effects
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 50);
//     };
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   // Animation configs
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     show: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.3
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     show: { y: 0, opacity: 1, transition: { type: 'spring', stiffness: 300 } }
//   };

//   const cardHoverVariants = {
//     hover: { 
//       y: -8,
//       boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
//     }
//   };

//   return (
  
//   <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
  
  
  
  
//       <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
//         {/* Hero Section */}
//         <motion.section 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           transition={{ duration: 0.6 }}
//           className="max-w-4xl mx-auto text-center mb-16"
//         >
//           <motion.div
//             drag
//             dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
//             whileHover={{ scale: 1.1, rotate: [0, -5, 5, -5, 0] }}
//             whileTap={{ scale: 0.95 }}
//             className="w-24 h-24 rounded-full bg-gradient-to-r from-orange-500 to-red-500 shadow-xl flex items-center justify-center mx-auto mb-8 cursor-grab active:cursor-grabbing"
//           >
//             <span className="text-white text-2xl font-bold">W|A</span>
//           </motion.div>
          
//           <motion.h1 
//             initial={{ y: -20, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-800 mb-4"
//           >
//             {website.name}
//           </motion.h1>
          
//           <motion.p 
//             initial={{ y: -10, opacity: 0 }}
//             animate={{ y: 0, opacity: 1 }}
//             transition={{ delay: 0.3 }}
//             className="text-xl md:text-2xl text-gray-600 italic mb-6 flex items-center justify-center"
//           >
//             <Zap className="w-6 h-6 text-amber-500 mr-2" />
//             {website.slogan}
//             <Zap className="w-6 h-6 text-amber-500 ml-2" />
//           </motion.p>
          
//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.4 }}
//             className="text-gray-500 max-w-2xl mx-auto mb-8 text-lg"
//           >
//             {website.description}
//           </motion.p>
          
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.5 }}
//             className="max-w-xl mx-auto relative"
//           >
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               placeholder="Enter what you want to calculate or know about..."
//               className="w-full px-6 py-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent shadow-sm"
//             />
//             <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-indigo-600 text-white p-2 rounded-full hover:bg-indigo-700 transition-colors">
//               <Search className="w-5 h-5" />
//             </button>
//           </motion.div>
//         </motion.section>

//         {/* Categories Section */}
//         <motion.section 
//           variants={containerVariants}
//           initial="hidden"
//           animate="show"
//           className="max-w-7xl mx-auto"
//         >
//           <motion.h2 
//             variants={itemVariants}
//             className="text-3xl font-bold text-center text-gray-800 mb-12 flex items-center justify-center"
//           >
//             <BarChart2 className="w-8 h-8 text-indigo-600 mr-3" />
//             Explore by Category
//             <GraduationCap className="w-8 h-8 text-indigo-600 ml-3" />
//           </motion.h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//             {categories.map((category) => (
//               <motion.div
//                 key={category.id}
//                 variants={itemVariants}
//                 whileHover="hover"
//                 initial="hidden"
//                 animate="show"
//                 // variants={cardHoverVariants}
//                 className={`bg-white rounded-xl shadow-md overflow-hidden border-t-4 ${category.borderColor} transition-all duration-300 hover:border-indigo-300`}
//                 onMouseEnter={() => setActiveCategory(category.id)}
//                 onMouseLeave={() => setActiveCategory(null)}
//               >
//                 <div className="p-6">
//                   <div className="flex items-start mb-4">
//                     <motion.div
//                       animate={{
//                         rotate: activeCategory === category.id ? 10 : 0,
//                         scale: activeCategory === category.id ? 1.1 : 1
//                       }}
//                       className={`p-3 rounded-lg ${category.bgColor} mr-4 shadow-inner`}
//                     >
//                       {category.icon}
//                     </motion.div>
//                     <div>
//                       <h3 className={`text-lg font-bold ${category.color}`}>{category.title}</h3>
//                       <p className="text-sm text-gray-600 mt-1 flex items-center">
//                         {category.id === 'math' && <Calculator className="w-4 h-4 mr-1 text-indigo-600" />}
//                         {category.id === 'science' && <Atom className="w-4 h-4 mr-1 text-emerald-600" />}
//                         {category.id === 'society' && <Globe className="w-4 h-4 mr-1 text-amber-600" />}
//                         {category.id === 'daily' && <Home className="w-4 h-4 mr-1 text-rose-600" />}
//                         {category.subtitle}
//                       </p>
//                     </div>
//                   </div>
                  


//                 <ul className="space-y-2">
//                   {category.subcategories.slice(0, 5).map((subcat, index) => (
//                     <motion.li
//                       key={index}
//                       whileHover={{ x: 5 }}
//                       className="flex items-center text-sm text-gray-700 hover:text-gray-900 cursor-pointer group"
//                     >
//                       <Link 
//                         href={`/${category.id}/${subcat.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`}
//                         className="flex items-center w-full"
//                       >
//                         <motion.span 
//                           className="mr-2 inline-block"
//                           animate={{
//                             rotate: activeCategory === category.id ? 90 : 0
//                           }}
//                         >
//                           <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-indigo-500 transition-colors" />
//                         </motion.span>
//                         <span className="flex-1 truncate">
//                           {subcat.name}
//                           {subcat.popular && (
//                             <span className="ml-2 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full inline-flex items-center">
//                               <Star className="w-3 h-3 mr-1" /> Popular
//                             </span>
//                           )}
//                         </span>
//                       </Link>
//                     </motion.li>
//                   ))}
//                 </ul>
                            
//                 </div>
                
//                 <motion.div 
//                   className="p-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center"
//                   initial={{ opacity: 0 }}
//                   animate={{ opacity: 1 }}
//                 >
//                   <span className="text-xs text-gray-500">More in {category.title}</span>
//                   <motion.button
//                     whileHover={{ x: 3 }}
//                     whileTap={{ scale: 0.95 }}
//                     className="text-indigo-600 text-sm font-medium flex items-center"
//                   >
//                     View all 
//                     <ChevronRight className="w-4 h-4 ml-1" />
//                   </motion.button>
//                 </motion.div>
//               </motion.div>
//             ))}
//           </div>
//         </motion.section>
//       </div>
//     </div>
//   );
// };

// export default HomePage;































































































import { motion } from "framer-motion";
import { useState } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import { Calculator, Atom, Globe, Home } from "lucide-react";
import Categories from "../components/StatCard";

const website = {
  name: "EurekaAi",
  slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
  description: "Compute expert-level answers using Wolfram's breakthrough algorithms, knowledgebase and AI technology"
};

const categories = [
  {
    id: 'math',
    title: "Math & Calculations",
    subtitle: "Solve, visualize, and explore numbers and shapes.",
    color: "text-orange-600",
    bgColor: "bg-orange-100/80",
    borderColor: "border-orange-200",
    icon: <Calculator className="w-5 h-5 text-orange-600" />,
    subcategories: [
      { name: "Arithmetic Calculations", path: "/math/arithmetic", popular: true },
      { name: "Basic operations", path: "/math/basic-ops", popular: false },
      { name: "Percentages & ratios", path: "/math/percentages", popular: true },
      { name: "Fractions & decimals", path: "/math/fractions", popular: false },
    ]
  },
  {
    id: 'science',
    title: "Science & Technology",
    subtitle: "Compute, simulate, and analyze scientific phenomena.",
    color: "text-orange-600",
    bgColor: "bg-orange-100/80",
    borderColor: "border-orange-200",
    icon: <Atom className="w-5 h-5 text-orange-600" />,
    subcategories: [
      { name: "Physics", path: "/science/physics", popular: true },
      { name: "Electricity & circuits", path: "/science/electricity", popular: true },
    ]
  },
  {
    id: 'society',
    title: "Society & Culture",
    subtitle: "Explore cultural trends, historical data, and social insights.",
    color: "text-orange-600",
    bgColor: "bg-orange-100/80",
    borderColor: "border-orange-200",
    icon: <Globe className="w-5 h-5 text-orange-600" />,
    subcategories: [
      { name: "Time & Date", path: "/society/time", popular: true },
      { name: "Historical dates", path: "/society/history", popular: false },
    ]
  },
  {
    id: 'daily',
    title: "Daily Life & Finance",
    subtitle: "Plan better, stay informed, and manage everyday needs.",
    color: "text-orange-600",
    bgColor: "bg-orange-100/80",
    borderColor: "border-orange-200",
    icon: <Home className="w-5 h-5 text-orange-600" />,
    subcategories: [
      { name: "Currency Conversions", path: "/daily/currency", popular: true },
      { name: "Financial Calculations", path: "/daily/finance", popular: false },
    ]
  }
];

const CategoryPage = ({ categoryId }) => {
  const category = categories.find(c => c.id === categoryId);
  const navigate = useNavigate();

  if (!category) {
    navigate("/");
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex items-center gap-3 mb-6">
        {category.icon}
        <h2 className={`text-2xl font-bold ${category.color}`}>{category.title}</h2>
      </div>
      <p className="text-gray-700 mb-8">{category.subtitle}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {category.subcategories.map((subcat, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className={`p-4 rounded-lg border ${category.borderColor} hover:shadow-md transition-all ${subcat.popular ? 'bg-orange-50' : 'bg-white'}`}
          >
            <Link to={subcat.path} className="block">
              <div className="flex items-center justify-between">
                <span className="text-gray-900 font-medium">{subcat.name}</span>
                {subcat.popular && (
                  <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                    Popular
                  </span>
                )}
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const Homee = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const navigate = useNavigate();

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
    navigate(`/category/${categoryId}`);
  };

  const handleBackToCategories = () => {
    setSelectedCategory(null);
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-white p-6">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-6xl mx-auto text-center py-16"
      >
        <motion.h1 
          className="text-5xl md:text-6xl font-bold text-gray-900 mb-4"
          whileHover={{ scale: 1.02 }}
        >
          {website.name}
        </motion.h1>
        <motion.p 
          className="text-xl md:text-2xl text-orange-600 font-medium mb-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          {website.slogan}
        </motion.p>
        <motion.p 
          className="text-lg text-gray-600 max-w-3xl mx-auto mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          {website.description}
        </motion.p>
      </motion.section>

      {/* Main Content */}
    
    
        <Categories/>
    
    </div>
  );
};

export default Homee;