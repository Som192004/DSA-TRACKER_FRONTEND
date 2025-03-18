import { ArrowRight } from "lucide-react";

const BlogCard = ({ title, description }) => {
  return (
    <div className="bg-gray-900 text-white p-6 rounded-2xl shadow-lg w-80">
      <h2 className="text-xl font-bold">{title}</h2>
      <p className="text-gray-400 mt-2 text-sm">{description}</p>
      <a href="#" className="text-blue-400 flex items-center mt-4 hover:underline">
        View all <ArrowRight className="w-4 h-4 ml-1" />
      </a>
    </div>
  );
};

export default BlogCard;
