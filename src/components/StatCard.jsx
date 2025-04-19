import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, Atom, Globe, Home } from "lucide-react";

const categories = [
  {
    id: 'math',
    title: "Math & Calculations",
    subtitle: "Solve, visualize, and explore numbers and shapes.",
    color: "text-orange-600",
    bgColor: "bg-orange-50",
    borderColor: "border-orange-200",
    hoverBgColor: "hover:bg-orange-100",
    icon: <Calculator className="w-5 h-5 text-orange-600" />,
    subcategories: [
      { name: "Arithmetic Calculations", path: "/math/arithmetic", popular: true },
      { name: "Basic operations", path: "/math/basic-ops", popular: false },
      { name: "Percentages & ratios", path: "/math/percentages", popular: true },
      { name: "Fractions & decimals", path: "/math/fractions", popular: false },
      { name: "Number Theory", path: "/math/number-theory", popular: false },
      { name: "Prime factorization", path: "/math/prime-factors", popular: true },
    ]
  },
  {
    id: 'science',
    title: "Science & Technology",
    subtitle: "Compute, simulate, and analyze scientific phenomena.",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
    hoverBgColor: "hover:bg-blue-100",
    icon: <Atom className="w-5 h-5 text-blue-600" />,
    subcategories: [
      { name: "Physics", path: "/science/physics", popular: true },
      { name: "Electricity & circuits", path: "/science/electricity", popular: true },
      { name: "Chemistry", path: "/science/chemistry", popular: true },
      { name: "Biology", path: "/science/biology", popular: false },
    ]
  },
  {
    id: 'society',
    title: "Society & Culture",
    subtitle: "Explore cultural trends, historical data, and social insights.",
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
    hoverBgColor: "hover:bg-green-100",
    icon: <Globe className="w-5 h-5 text-green-600" />,
    subcategories: [
      { name: "Time & Date", path: "/society/time", popular: true },
      { name: "Historical dates", path: "/society/history", popular: false },
      { name: "Cultural Events", path: "/society/events", popular: true },
      { name: "Demographics", path: "/society/demographics", popular: false },
    ]
  },
  {
    id: 'daily',
    title: "Daily Life & Finance",
    subtitle: "Plan better, stay informed, and manage everyday needs.",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-200",
    hoverBgColor: "hover:bg-purple-100",
    icon: <Home className="w-5 h-5 text-purple-600" />,
    subcategories: [
      { name: "Currency Conversions", path: "/daily/currency", popular: true },
      { name: "Financial Calculations", path: "/daily/finance", popular: false },
      { name: "Health & Fitness", path: "/daily/health", popular: true },
      { name: "Nutrition", path: "/daily/nutrition", popular: false },
    ]
  }
];

const Categories = () => {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <motion.h2 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl font-bold text-gray-900 mb-8 text-center"
      >
        Explore Our Categories
      </motion.h2>

      <div className="grid grid-cols-1 gap-6">
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`rounded-lg shadow-sm border ${category.borderColor} overflow-hidden`}
          >
            <div className={`p-6 ${category.bgColor} flex flex-col md:flex-row gap-6`}>
              {/* Category Header */}
              <div className="flex-shrink-0">
                <div className={`p-3 rounded-lg bg-white ${category.borderColor} border inline-flex`}>
                  {category.icon}
                </div>
                <h3 className={`text-xl font-bold mt-3 ${category.color}`}>{category.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs">{category.subtitle}</p>
              </div>
              
              {/* Subcategories */}
              <div className="flex-grow">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {category.subcategories.map((subcat, subIndex) => (
                    <motion.div
                      key={subIndex}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: subIndex * 0.05 + 0.2 }}
                      whileHover={{ scale: 1.02 }}
                      className={`p-3 rounded-md border ${category.borderColor} ${category.hoverBgColor} transition-colors ${
                        subcat.popular ? `${category.bgColor} shadow-inner` : 'bg-white'
                      }`}
                    >
                      <Link to={subcat.path} className="block w-full h-full">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-900 font-medium text-sm">{subcat.name}</span>
                          {subcat.popular && (
                            <span className={`text-xs ${category.bgColor} ${category.color} px-2 py-1 rounded-full`}>
                              Popular
                            </span>
                          )}
                        </div>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Categories;