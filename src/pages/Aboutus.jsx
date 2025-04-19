import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const AboutUs = () => {
  const colors = {
    primary: "#F19154",
    secondary: "#FFFFFF",
    text: "#000000",
    paragraph: "#A1A1AA",
  };

  const sectionVariant = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 70, delay: 0.3 },
    },
  };

  const fadeVariant = {
    hidden: { opacity: 0 },
    visible: (i) => ({
      opacity: 1,
      transition: { delay: i * 0.3 },
    }),
  };

  return (
    <div className="min-h-screen bg-white pt-24 pb-16 px-6 md:px-20">
      {/* Page Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16"
      >
        <h1
          className="text-5xl font-bold mb-4"
          style={{ color: colors.text }}
        >
          About <span style={{ color: colors.primary }}>EurekaAi</span>
        </h1>
        <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto">
          Discover who we are, what we do, and why we’re passionate about
          transforming text into Bids , Tenders , Proposals .
        </p>
      </motion.div>

      {/* Mission Statement */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="flex flex-col md:flex-row items-center gap-8 mb-24"
      >
        <motion.img
          src="/images/logo.jpg "
          alt="Mission"
          className="rounded-2xl w-full md:w-1/2 object-cover shadow-xl"
          whileHover={{ scale: 1.03 }}
        />
        <div className="md:w-1/2">
          <h2
            className="text-3xl font-bold mb-4"
            style={{ color: colors.text }}
          >
            Our Mission
          </h2>
          <p className="text-lg leading-relaxed text-[#A1A1AA]">
            At EurekaAi, we believe creativity should be accessible to everyone.
            Our AI-powered platform enables creators, marketers, educators, and
            storytellers to turn simple text prompts into beautiful  engaging
            Solutins 
        
          </p>
        </div>
      </motion.section>

      {/* Our Team */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-24"
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: colors.text }}
        >
          Meet Our Team
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Jane Doe", role: "CEO", image: "https://www.columbuspm.org/wp-content/uploads/2015/09/team-member-sample.jpg" },
            { name: "John Smith", role: "CTO", image: "https://stormproperty.com/wp-content/uploads/2020/02/josh.jpg" },
            { name: "Ella Watson", role: "Lead Designer", image: "https://stormproperty.com/wp-content/uploads/2020/02/Marie-kotter.jpg" },
          ].map((member, index) => (
            <motion.div
              custom={index}
              variants={fadeVariant}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              key={index}
              className="bg-white p-6 rounded-2xl shadow-xl text-center hover:scale-105 transition-transform"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1" style={{ color: colors.text }}>
                {member.name}
              </h3>
              <p className="text-[#A1A1AA]">{member.role}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Core Values */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-24"
      >
        <h2
          className="text-3xl font-bold mb-8 text-center"
          style={{ color: colors.text }}
        >
          Our Core Values
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {[
            {
              title: "Innovation",
              description:
                "We’re obsessed with pushing boundaries and building cutting-edge AI solutions that empower creators.",
            },
            {
              title: "Accessibility",
              description:
                "Our tools are made for everyone — no fancy equipment, skills, or budget required.",
            },
            {
              title: "Collaboration",
              description:
                "We work closely with users, communities, and partners to continually improve our platform.",
            },
            {
              title: "Integrity",
              description:
                "Transparency, honesty, and fairness shape everything we do, from product design to customer service.",
            },
          ].map((value, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.02 }}
              className="p-6 rounded-xl shadow-lg bg-white border border-gray-200"
            >
              <h4 className="text-xl font-semibold mb-2" style={{ color: colors.primary }}>
                {value.title}
              </h4>
              <p className="text-[#A1A1AA] text-base">{value.description}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Call To Action */}
      <motion.section
        variants={sectionVariant}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="text-center"
      >
        <h2
          className="text-3xl font-bold mb-6"
          style={{ color: colors.text }}
        >
          Join Our Journey 🚀
        </h2>
        <p className="text-lg text-[#A1A1AA] max-w-2xl mx-auto mb-8">
          Whether you’re a creator, entrepreneur, educator, or hobbyist — we’d love
          to have you with us! Explore EurekaAI today and bring your stories to life
          with us.
        </p>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <Link
            to="/signup"
            className="inline-block px-8 py-4 rounded-full font-semibold text-white"
            style={{ backgroundColor: colors.primary }}
          >
            Get Started Now
          </Link>
        </motion.div>
      </motion.section>
    </div>
  );
};

export default AboutUs;
