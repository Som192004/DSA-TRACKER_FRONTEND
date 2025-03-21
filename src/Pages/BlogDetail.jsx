import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function BlogDetails() {
  const {topicId} = useParams();
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`https://dsa-tracker-backend-oo1y.onrender.com/blog/${topicId}/blog/${blogId}`)
      .then((response) => {
        setBlog(response.data);
      })
      .catch((error) => console.error("Error fetching blog:", error));
  }, [blogId]);

  return (
    <div className="min-h-screen p-6 dark:bg-black dark:text-white">
      <button onClick={() => navigate(-1)} className="mb-4 dark:text-white hover:underline">
        ← Back to Blogs
      </button>

      {blog ? (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
          <h1 className="text-3xl font-bold">{blog.name}</h1>
          <p className="text-gray-600 dark:text-gray-300 mt-4">{blog.content}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
