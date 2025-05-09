import React from "react";
import { motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const Pricing = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "Basic",
      price: "$25",
      frequency: "/month",
      description: "Perfect for learners getting started",
      features: [
        "Step-by-step math solutions (basic)",
        "General science simulations",
        "Explore basic history & culture",
        "Health & wellness tips",
        "Limited access to Everyday Life tools",
        "Community support",
        "Standard resolution results"
      ],
      cta: "Get Started",
      route: "/pricing/basic",
      featured: false
    },
    {
      id: "standard",
      name: "Standard",
      price: "$50",
      frequency: "/month",
      description: "Ideal for students and educators",
      features: [
        "Full access to all math topics (Algebra, Calculus, Geometry)",
        "Advanced science & engineering tools",
        "Society & culture exploration tools",
        "Daily life assistant tools (health, finance, etc.)",
        "Priority response",
        "Standard enhancements",
        "Community support"
      ],
      cta: "Popular Choice",
      route: "/pricing/standard",
      featured: true
    },
    {
      id: "premium",
      name: "Premium",
      price: "$99",
      frequency: "/month",
      description: "Best for professionals, educators & researchers",
      features: [
        "Unlimited math step-by-step solutions",
        "Full simulation access (all science fields)",
        "Detailed insights into global society & culture topics",
        "Advanced Everyday Life assistance (entertainment, trivia, finance)",
        "High-priority support",
        "Advanced enhancements & analytics",
        "Early access to new tools"
      ],
      cta: "Go Premium",
      route: "/pricing/premium",
      featured: false
    }
  ];
  

  return (
    <div className="w-full px-6 sm:px-10 lg:px-12 py-24 flex flex-col items-center bg-gray-50">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <h1 className="text-5xl font-extrabold mb-4 text-gray-900">Eureka AI</h1>
        <h2 className="text-3xl font-semibold text-gray-600">
          Choose the plan that fits your creative workflow
        </h2>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full flex flex-col md:flex-row justify-center gap-8 max-w-7xl mx-auto"
      >
        {plans.map((plan, index) => (
          <motion.div
            key={plan.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className={`flex-1 border rounded-xl p-6 flex flex-col ${
              plan.featured
                ? "border-indigo-500 ring-2 ring-indigo-500 bg-white transform md:-translate-y-2"
                : "border-gray-200 bg-white"
            }`}
          >
            {plan.featured && (
              <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-bl-lg rounded-tr-xl">
                Most Popular
              </div>
            )}
            <h3 className="text-xl font-bold text-gray-900">{plan.name}</h3>
            <div className="my-4">
              <span className="text-4xl text-red-600 font-bold">{plan.price}</span>
              <span className="text-gray-500">{plan.frequency}</span>
            </div>
            <p className="text-gray-600 mb-6">{plan.description}</p>
            
            <ul className="space-y-3 mb-8 flex-grow">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <FiCheck className="mt-1 mr-2 flex-shrink-0 text-indigo-500" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>
            
            <button
              onClick={() => navigate(plan.route)}
              className={`w-full py-3 px-4 rounded-lg font-medium ${
                plan.featured
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "bg-indigo-50 text-indigo-700 hover:bg-indigo-100"
              }`}
            >
              {plan.cta}
            </button>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Pricing;