import { Container } from "../components";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-600 dark:from-gray-900 dark:to-black relative overflow-hidden">
      {/* Background Animation */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1 }}
        className="absolute inset-0 bg-grid-white/[0.2] dark:bg-grid-black/[0.2] pointer-events-none"
      />

      <Container>
        <div className="text-center px-6">
          {/* Animated Text */}
          <TypeAnimation
            sequence={[
              "Track, Learn, and Ace DSA!",
              2000, 
              "The Ultimate DSA Prep Tool.",
              2000,
              "DSA TRACKER",
              3000
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg"
          />

        </div>
      </Container>
    </div>
  );
};

export default Home;
