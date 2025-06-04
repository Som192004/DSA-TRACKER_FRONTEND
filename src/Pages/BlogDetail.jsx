import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const { topicId, blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dsa-tracker-backend-oo1y.onrender.com/blog/${topicId}/blog/${blogId}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [blogId, topicId]);

  return (
    <div className="w-full p-4 sm:p-6 dark:bg-black dark:text-white">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 text-sm sm:text-base dark:text-white hover:underline"
      >
        ← Back to Blogs
      </button>

      {blog ? (
        <div className="bg-white dark:bg-gray-800 p-4 sm:p-6 rounded-lg shadow-lg max-w-full sm:max-w-2xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold break-words">{blog.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4 text-base sm:text-lg leading-relaxed break-words">
            {blog.content}
          </p>
        </div>
      ) : (
        <p className="text-center text-gray-500 dark:text-gray-300">Loading...</p>
      )}
    </div>
  );
}
