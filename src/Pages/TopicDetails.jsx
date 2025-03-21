import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, X, Trash2, Edit } from "lucide-react";

export default function TopicDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [topic, setTopic] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentBlog, setCurrentBlog] = useState({ name: "", content: "" });
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role")

  // Fetch the topic and its blogs
  useEffect(() => {
    axios
      .get(`https://dsa-tracker-backend-oo1y.onrender.com/blog/get-blog-by-id/${id}`)
      .then((response) => {
        console.log(response.data);
        setTopic(response.data);
      })
      .catch((error) => console.error("Error fetching topic:", error));
  }, [id]);

  // Open modal for adding a blog
  const openAddModal = () => {
    setEditMode(false);
    setCurrentBlog({ name: "", content: "" });
    setShowModal(true);
  };

  // Open modal for editing a blog
  const openEditModal = (blog) => {
    setEditMode(true);
    setCurrentBlog({ ...blog });
    setShowModal(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    setCurrentBlog({ ...currentBlog, [e.target.name]: e.target.value });
  };

  // Submit blog (Add/Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentBlog.name || !currentBlog.content) {
      alert("Please fill in all fields!");
      return;
    }

    try {
      if (editMode) {
        // Update an existing blog
        await axios.put(`https://dsa-tracker-backend-oo1y.onrender.com/blog/${id}/blog/${currentBlog._id}`, currentBlog, {
          headers: { Authorization: accessToken },
        });

        setTopic((prev) => ({
          ...prev,
          blogs: prev.blogs.map((blog) => (blog._id === currentBlog._id ? { ...blog, ...currentBlog } : blog)),
        }));
      } else {
        // Add a new blog
        const response = await axios.post(`https://dsa-tracker-backend-oo1y.onrender.com/blog/add-blog/${id}/addBlog`, currentBlog, {
          headers: { Authorization: accessToken },
        });

        // Ensure response contains `_id`, `name`, `content`
        setTopic((prev) => ({
          ...prev,
          blogs: [...prev.blogs, response.data], // Append new blog
        }));
      }

      setShowModal(false);
      setCurrentBlog({ name: "", content: "" });
    } catch (error) {
      console.error("Error saving blog:", error);
    }
  };

  // Delete blog function
  const handleDelete = async (blogId) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`https://dsa-tracker-backend-oo1y.onrender.com/blog/${id}/blog/${blogId}`, {
        headers: { Authorization: accessToken },
      });

      // Remove the deleted blog from the UI
      setTopic((prev) => ({
        ...prev,
        blogs: prev.blogs.filter((blog) => blog._id !== blogId),
      }));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="min-h-screen dark:bg-black dark:text-white p-6">
      <button onClick={() => navigate("/blog")} className="mb-4 dark:text-white hover:underline">
        ← Back to Topics
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">{topic?.title || "Loading..."}</h1>
        {
          role === 'Admin' && <button onClick={openAddModal} className="p-3 bg-blue-500 rounded-full hover:bg-blue-600">
          <Plus className="text-white w-6 h-6" />
        </button>
        }
        
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  {topic?.blogs?.map((blog) => (
    <div key={blog._id} className="dark:bg-gray-800 bg-white p-5 rounded-xl shadow-md relative h-30 overflow-hidden flex flex-col justify-between">
      {/* Edit and Delete Buttons */}
      {
        role === 'Admin' && <div>
        <button onClick={() => openEditModal(blog)} className="absolute top-3 right-12 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600">
          <Edit className="text-white w-5 h-5" />
        </button>
        &&
        <button onClick={() => handleDelete(blog._id)} className="absolute top-3 right-3 bg-red-500 p-2 rounded-full hover:bg-red-600">
          <Trash2 className="text-white w-5 h-5" />
        </button>
      </div>
      }

      {/* Blog Name */}
      <h2 className="text-xl font-semibold">{blog.name || "Untitled Blog"}</h2>

      {/* Blog Content (Truncated) */}
      <p className="text-gray-400 mt-2 line-clamp-3">
        {blog.content.length > 100 ? blog.content.substring(0, 100) + "..." : blog.content}
      </p>

      {/* Read More Link */}
      <button
        onClick={() => navigate(`/blog/topic/${id}/${blog._id}`)}
        className="text-blue-400 hover:underline mt-2"
      >
        Read More →
      </button>
    </div>
  ))}
</div>


      {/* Modal for Adding/Editing Blog */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-100 bg-opacity-50">
          <div className="dark:bg-gray-800 bg-gray-100 p-6 rounded-lg w-96">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editMode ? "Edit Blog" : "Add New Blog"}</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6 dark:text-white" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Blog Name"
                value={currentBlog.name}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              />
              <textarea
                name="content"
                placeholder="Content"
                value={currentBlog.content}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              ></textarea>
              <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
                {editMode ? "Update Blog" : "Add Blog"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
