import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const Terms = () => {
  const [lastUpdated, setLastUpdated] = useState("");

  const website = {
    name: "EurekaAi",
    slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
    colors: {
      primary: "#FFFFFF",
      secondary: "#4F46E5", // Updated to a modern deep purple/indigo tone
      text: "#000000",
    }
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

  return (
    <motion.div 
      className="max-w-4xl mx-auto bg-white mt-24 px-4 py-12"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <h1 className="text-4xl font-bold mb-2 text-black">Terms of Service</h1>
        <p className="text-[#4F46E5] mb-8">Last Updated: {lastUpdated}</p>
      </motion.div>

      {/* Intro */}
      <motion.div variants={itemVariants} className="mb-12">
        <p className="text-black">
          Welcome to <span className="font-bold">{website.name}</span> ("we," "our," or "us").
          By using our AI-powered math, science, culture, and life tools, you agree to these Terms of Service.
        </p>
      </motion.div>

      {/* Terms Sections */}
      <motion.div variants={containerVariants} className="space-y-12">
        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">1. Acceptance of Terms</h2>
          <p className="text-black">
            By accessing <span className="font-bold">{website.name}</span> (the "Service"), you confirm that you accept these Terms 
            and comply with all applicable laws. If you disagree, do not use the Service.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">2. Service Description</h2>
          <p className="text-black">
            {website.name} offers intelligent tools to solve problems and explore ideas across topics like:
            <span className="font-bold"> Mathematics, Science & Technology, Society & Culture, and Daily Life</span>. 
            These tools include interactive AI for calculations, simulations, analysis, and general inquiry. Outputs are suggestions and visualizations — users remain responsible for how content is interpreted and used.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">3. User Responsibilities</h2>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Provide accurate and complete input when using tools.</li>
            <li>Verify AI-generated results before application in real-life scenarios.</li>
            <li>Do not use the platform for illegal or harmful purposes.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">4. Privacy & Data Use</h2>
          <p className="text-black">
            Your usage data is protected as outlined in our <a href="#" className="text-[#4F46E5] hover:underline">Privacy Policy</a>.
            While we may use anonymous input data to improve our AI models, we do not claim ownership of your input or content generated via the platform.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">5. Limitation of Liability</h2>
          <p className="text-black mb-2">
            {website.name} is not liable for:
          </p>
          <ul className="list-disc pl-6 space-y-2 text-black">
            <li>Consequences from misuse or misinterpretation of results.</li>
            <li>Errors or omissions in mathematical, scientific, or cultural insights.</li>
            <li>External use of shared or exported content.</li>
          </ul>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">6. Changes to Terms</h2>
          <p className="text-black">
            We reserve the right to update these Terms at any time. Continued use of the Service after updates means you agree to the new Terms.
          </p>
        </motion.section>

        <motion.section variants={itemVariants}>
          <h2 className="text-2xl font-bold mb-4 text-black border-b-2 border-[#4F46E5] pb-2">7. Contact</h2>
          <p className="text-black">
            Have questions or feedback? Reach out at <span className="text-[#4F46E5]">support@{website.name.toLowerCase()}.com</span>.
          </p>
        </motion.section>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        variants={itemVariants}
        className="mt-16 pt-4 border-t border-gray-200"
      >
        <small className="text-black">
          © {website.name} | <span className="text-[#4F46E5]">"{website.slogan}"</span>
        </small>
      </motion.footer>
    </motion.div>
  );
};

export default Terms;
