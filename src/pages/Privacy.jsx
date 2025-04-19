import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Privacy = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  const website = {
    name: "EurekaAi",
    slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
    colors: {
      primary: "#FFFFFF",
      secondary: "#5B9BFF",
      text: "#000000",
    },
  };

  useEffect(() => {
    const date = new Date().toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    setLastUpdated(date);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  const privacySections = [
    {
      title: "🔒 Information We Collect",
      content: "We collect data you provide directly, such as when you create an account or use EurekaAi's services. This may include your name, email, preferences, and usage data."
    },
    {
      title: "💾 How We Use Your Data",
      content: "We use your data to personalize your experience, provide AI-powered solutions, enhance our services, and communicate updates or offers relevant to you."
    },
    {
      title: "🔐 Data Protection & Security",
      content: "Your data is stored securely using encryption and modern security practices. We regularly monitor our systems to prevent unauthorized access or misuse."
    },
    {
      title: "📤 Sharing Information",
      content: "We do not sell your personal data. Limited data may be shared with trusted service providers solely for operational or security purposes."
    },
    {
      title: "📅 Changes to This Policy",
      content: "We may update this privacy policy occasionally. Any changes will be posted here, and your continued use of EurekaAi constitutes agreement to the revised terms."
    },
    {
      title: "📬 Contact Us",
      content: "If you have any questions, concerns, or feedback regarding our privacy practices, reach out to our support team via the Contact page."
    }
  ];

  return (
    <motion.div 
      className="max-w-5xl mx-auto bg-white mt-24 px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold mb-2 text-black">📜 Privacy Policy</h1>
        <p className="text-[#5B9BFF] mb-8">Last Updated: {lastUpdated}</p>
      </motion.div>

      <motion.div variants={containerVariants} className="space-y-8">
        {privacySections.map((section, index) => (
          <motion.div 
            key={index} 
            variants={itemVariants} 
            className="p-6 border-2 border-gray-300 rounded-2xl bg-gray-50 shadow-sm hover:shadow-md transition"
          >
            <h2 className="text-2xl font-bold mb-2 text-black">{section.title}</h2>
            <p className="text-black">{section.content}</p>
          </motion.div>
        ))}
      </motion.div>

      <motion.footer 
        variants={itemVariants}
        className="mt-16 pt-4 border-t border-gray-200"
      >
        <small className="text-black">
          © {website.name} | <span className="text-[#5B9BFF]">"{website.slogan}"</span>
        </small>
      </motion.footer>
    </motion.div>
  );
};

export default Privacy;
