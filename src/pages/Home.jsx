import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Calculator, Atom, Globe, Heart } from "lucide-react";

const website = {
  name: "EurekaAi",
  slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
  description:
    "Compute expert-level answers using Wolfram's breakthrough algorithms, knowledgebase and AI technology"
};

const categories = [
  {
    id: "mathematics",
    title: "Mathematics",
    subtitle: "Explore mathematical topics and solutions step by step.",
    color: "text-purple-600",
    bgColor: "bg-purple-100/80",
    borderColor: "border-purple-200",
    icon: <Calculator className="w-5 h-5 text-purple-600" />,
    subcategories: [
      { name: "Step-by-Step Solutions", path: "/math/step-by-step", popular: true },
      { name: "Elementary Math", path: "/math/elementary", popular: true },
      { name: "Algebra", path: "/math/algebra", popular: true },
      { name: "Plotting & Graphics", path: "/math/plotting", popular: false },
      { name: "Calculus & Analysis", path: "/math/calculus", popular: true },
      { name: "Geometry", path: "/math/geometry", popular: true },
      { name: "Differential Equations", path: "/math/differential-equations", popular: false },
      { name: "Statistics", path: "/math/statistics", popular: true },
    ]
  },
  {
    id: "science-tech",
    title: "Science & Technology",
    subtitle: "Learn, compute, and simulate science and engineering concepts.",
    color: "text-green-600",
    bgColor: "bg-green-100/80",
    borderColor: "border-green-200",
    icon: <Atom className="w-5 h-5 text-green-600" />,
    subcategories: [
      { name: "Units & Measures", path: "/science/units", popular: true },
      { name: "Physics", path: "/science/physics", popular: true },
      { name: "Chemistry", path: "/science/chemistry", popular: true },
      { name: "Engineering", path: "/science/engineering", popular: true },
      { name: "Computational Sciences", path: "/science/computational", popular: false },
      { name: "Earth Sciences", path: "/science/earth", popular: true },
      { name: "Materials", path: "/science/materials", popular: false },
      { name: "Transportation", path: "/science/transportation", popular: false },
    ]
  },
  {
    id: "society-culture",
    title: "Society & Culture",
    subtitle: "Analyze history, people, words, and global topics.",
    color: "text-red-600",
    bgColor: "bg-red-100/80",
    borderColor: "border-red-200",
    icon: <Globe className="w-5 h-5 text-red-600" />,
    subcategories: [
      { name: "History", path: "/society/history", popular: true },
      { name: "Food & Nutrition", path: "/society/food", popular: false },
      { name: "Political Geography", path: "/society/geography", popular: false },
      { name: "Money & Finance", path: "/society/money", popular: true },
      { name: "Dates & Times", path: "/society/dates", popular: true },
      { name: "Words & Linguistics", path: "/society/linguistics", popular: true },
      { name: "Arts & Media", path: "/society/arts", popular: false },
    ]
  },
  {
    id: "everyday-life",
    title: "Everyday Life",
    subtitle: "Manage health, hobbies, home, and surprises of daily life.",
    color: "text-pink-600",
    bgColor: "bg-pink-100/80",
    borderColor: "border-pink-200",
    icon: <Heart className="w-5 h-5 text-pink-600" />,
    subcategories: [
      { name: "Health & Wellness", path: "/daily/health", popular: true },
      { name: "Personal Finance", path: "/daily/personal-finance", popular: true },
      { name: "Surprises & Trivia", path: "/daily/surprises", popular: false },
      { name: "Entertainment", path: "/daily/entertainment", popular: true },
      { name: "Household Science", path: "/daily/household-science", popular: false },
      { name: "Household Math", path: "/daily/household-math", popular: false },
      { name: "Hobbies", path: "/daily/hobbies", popular: true },
      { name: "World & News", path: "/daily/world", popular: true },
    ]
  }
];

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <motion.h1
        className="text-4xl font-bold mb-2 text-center"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {website.name}
      </motion.h1>
      <motion.h2
        className="text-xl text-gray-600 text-center mb-8"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        {website.slogan}
      </motion.h2>
      <motion.p
        className="text-center text-gray-500 max-w-2xl mx-auto mb-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {website.description}
      </motion.p>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
        {categories.map((cat) => (
          <motion.div
            key={cat.id}
            className={`rounded-2xl border p-5 shadow-md ${cat.bgColor} ${cat.borderColor}`}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center gap-2 mb-3">
              {cat.icon}
              <h3 className={`text-lg font-semibold ${cat.color}`}>{cat.title}</h3>
            </div>
            <p className="text-sm text-gray-600 mb-4">{cat.subtitle}</p>
            <div className="flex flex-wrap gap-2">
              {cat.subcategories.map((sub) => (
                <Link
                  key={sub.path}
                  to={sub.path}
                  className="text-sm px-3 py-1 rounded-full border bg-white text-gray-700 hover:bg-gray-100"
                >
                  {sub.name}
                </Link>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
