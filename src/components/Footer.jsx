import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  // Internal website data array

  const website = {
      name: "EurekaAi",
     slogan: "GenAI for Math, ScienceTech, Society & Culture, Daily Life",
  };

  // Internal color array
  const colors = {
    primary: "#fd790f",
    secondary: "#FFFFFF",
    text: "#000000",
  };

  // Footer links data
  const footerLinks = [
   
    
    {
      title: "Products",
      links: [
        { text: "Home", url: "/" },
        { text: "Signup", url: "/signup" },
        { text: "Login", url: "/login" }
      ]
    },
    {
      title: "Resources",
      links: [
        { text: "Blog", url: "/blog" },
        { text: "Docs", url: "/docs" } ,
        { text: "About", url: "/aboutus" } ,

      ]
    },
    {
      title: "Legal",
      links: [
        { text: "Terms", url: "/terms" },
        { text: "Privacy", url: "/privacy" },
      ]
    }
  ];

  // Simple animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <footer 
      className="w-full"
      style={{ backgroundColor: colors.primary, color: colors.text }}
    >
      <div className="container mx-auto px-4 py-12">
        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {footerLinks.map((section, sectionIndex) => (
            <motion.div
              key={sectionIndex}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={fadeIn}
              transition={{ duration: 0.3, delay: sectionIndex * 0.1 }}
            >
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <motion.li
                    key={linkIndex}
                    whileHover={{ x: 3 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <a
                      href={link.url}
                      className="opacity-80 hover:opacity-100 transition-opacity"
                    >
                      {link.text}
                    </a>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="h-px bg-gray-600 mb-8"
          style={{ originX: 0 }}
        />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.2 }}
            className="mb-4 md:mb-0 text-center md:text-left"
          >
            <h2 className="text-2xl font-bold mb-1">{website.name}</h2>
            <p className="opacity-80">{website.slogan}</p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ delay: 0.3 }}
            className="flex gap-4 text-sm"
          >
            
            <Link href="/terms" className="opacity-80 hover:opacity-100">Terms</Link>
            <Link href="/privacy" className="opacity-80 hover:opacity-100">Privacy</Link>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeIn}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center opacity-70 text-sm"
        >
          © {new Date().getFullYear()} {website.name}. All rights reserved.
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;