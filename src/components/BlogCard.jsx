import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5 } }
};

const BlogCard = ({ title, description }) => {
  return (
    <motion.div 
      className="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white p-6 rounded-2xl shadow-lg w-80 transition-colors"
      variants={cardVariants}
    >
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-600 dark:text-gray-400 mt-2 text-sm">{description}</p>
      <a href="#" className="text-blue-500 dark:text-blue-400 flex items-center mt-4 hover:underline">
        View all <ArrowRight className="w-4 h-4 ml-1" />
      </a>
    </motion.div>
  );
};

export default BlogCard;
