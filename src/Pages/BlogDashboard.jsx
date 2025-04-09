import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Plus, X, Trash2, Edit, Search } from "lucide-react";
import FancyLoader from "../components/FancyLoader"

export default function BlogCards() {
  const [topics, setTopics] = useState([]);
  const [filteredTopics, setFilteredTopics] = useState([]); // Stores filtered results
  const role = localStorage.getItem("role")
  const [searchQuery, setSearchQuery] = useState(""); // Stores search input
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentTopic, setCurrentTopic] = useState({ id: null, title: "", description: "" });
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken") || "");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setAccessToken(localStorage.getItem("accessToken"));
  }, []);

  // Fetch all blog topics
  useEffect(() => {
    setLoading(true);
    axios
      .get("https://dsa-tracker-backend-oo1y.onrender.com/blog/get-all-blogs", {
        headers: { Authorization: `${accessToken}` },
      })
      .then((response) => {
        setLoading(false);
        setTopics(response.data);
        setFilteredTopics(response.data); // Initialize filtered topics
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching topics:", error)});
  }, [accessToken]);

  // Handle search input
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);

    // Filter topics based on search query
    const filtered = topics.filter((topic) => topic.title.toLowerCase().includes(query));
    setFilteredTopics(filtered);
  };

  // Open modal for adding a new topic
  const openAddModal = () => {
    setEditMode(false);
    setCurrentTopic({ id: null, title: "", description: "" });
    setShowModal(true);
  };

  // Open modal for editing a topic
  const openEditModal = (topic) => {
    setEditMode(true);
    setCurrentTopic({ id: topic._id, title: topic.title, description: topic.description });
    setShowModal(true);
  };

  // Handle input changes
  const handleChange = (e) => {
    setCurrentTopic({ ...currentTopic, [e.target.name]: e.target.value });
  };

  // Submit new or updated blog topic
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!currentTopic.title || !currentTopic.description) {
      alert("Please fill in all fields!");
      return;
    }
  
    try {
      if (editMode) {
        await axios.put(`https://dsa-tracker-backend-oo1y.onrender.com/blog/update-blog-by-id/${currentTopic.id}`, currentTopic, {
          headers: { Authorization: `${accessToken}` },
        });
  
        // Fetch updated topics from the server
        const response = await axios.get("https://dsa-tracker-backend-oo1y.onrender.com/blog/get-all-blogs", {
          headers: { Authorization: `${accessToken}` },
        });
  
        setTopics(response.data);
        setFilteredTopics(response.data); // Update filtered topics
      } else {
        const response = await axios.post("https://dsa-tracker-backend-oo1y.onrender.com/blog/create-blog", currentTopic, {
          headers: { Authorization: `${accessToken}` },
        });
  
        setTopics([...topics, response.data]);
        setFilteredTopics([...filteredTopics, response.data]);
      }
  
      setShowModal(false);
      setCurrentTopic({ id: null, title: "", description: "" });
    } catch (error) {
      console.error("Error saving blog topic:", error);
    }
  };
  

  // Delete blog topic
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this topic?")) return;

    try {
      await axios.delete(`https://dsa-tracker-backend-oo1y.onrender.com/blog/delete-blog/${id}`, {
        headers: { Authorization: `${accessToken}` },
      });

      setTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id));
      setFilteredTopics((prevTopics) => prevTopics.filter((topic) => topic._id !== id)); // Update search results
    } catch (error) {
      console.error("Error deleting topic:", error);
    }
  };

  // return <>{
  //   loading ? <FancyLoader /> : 
  //   <div className="min-h-screen dark:bg-black dark:text-white p-6 ">
  //     {/* Search Bar */}
  //     <div className="flex justify-between items-center mb-6">
  //       <div className="relative w-full max-w-md">
  //         <Search className="absolute left-3 top-3 dark:text-white w-5 h-5" />
  //         <input
  //           type="text"
  //           placeholder="Search topics..."
  //           value={searchQuery}
  //           onChange={handleSearch}
  //           className="w-full pl-10 pr-3 py-2 rounded dark:bg-black dark:text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
  //         />
  //       </div>
  //       {
  //         role === 'Admin' && <button onClick={openAddModal} className="p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition">
  //         <Plus className="text-white w-6 h-6" />
  //       </button>
  //       }
        
  //     </div>

  //     {/* Blog Topics */}
  //     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
  //       {filteredTopics.length > 0 ? (
  //         filteredTopics.map((topic) => (
  //           <div key={topic._id} className="dark:bg-gray-800 p-5 rounded-xl shadow-md relative">
  //             {
  //               role === 'Admin' && <button onClick={() => openEditModal(topic)} className="absolute top-3 right-12 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600">
  //               <Edit className="dark:text-white w-5 h-5" />
  //             </button>
  //             }
              
  //             {
  //               role === 'Admin' && <button onClick={() => handleDelete(topic._id)} className="absolute top-3 right-3 bg-red-500 p-2 rounded-full hover:bg-red-600">
  //               <Trash2 className="dark:text-white w-5 h-5" />
  //             </button>
  //             }

  //             <h2 className="text-xl font-semibold">{topic.title}</h2>
  //             <p className="dark:text-white mt-2">{topic.description}</p>

  //             {/* View All Button */}
  //             <button
  //               onClick={() => navigate(`/blog/topic/${topic._id}`)}
  //               className="mt-3 dark:text-white hover:underline"
  //             >
  //               View All Blogs →
  //             </button>
  //           </div>
  //         ))
  //       ) : (
  //         <p className="text-white text-center col-span-3">No topics found.</p>
  //       )}
  //     </div>

  //     {/* Modal for Adding/Editing Blog Topic */}
  //     {showModal && (
  //       <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-gray-100">
  //         <div className="dark:bg-gray-800 bg-gray-100 p-6 rounded-lg w-96">
  //           <div className="flex justify-between items-center mb-4">
  //             <h2 className="text-xl font-semibold">{editMode ? "Edit Blog Topic" : "Add New Blog Topic"}</h2>
  //             <button onClick={() => setShowModal(false)}>
  //               <X className="w-6 h-6 dark:text-white" />
  //             </button>
  //           </div>
  //           <form onSubmit={handleSubmit}>
  //             <input
  //               type="text"
  //               name="title"
  //               placeholder="Title"
  //               value={currentTopic.title}
  //               onChange={handleChange}
  //               className="w-full p-2 rounded bg-gray-700 text-white mb-3"
  //             />
  //             <textarea
  //               name="description"
  //               placeholder="Description"
  //               value={currentTopic.description}
  //               onChange={handleChange}
  //               className="w-full p-2 rounded bg-gray-700 text-white mb-3"
  //             ></textarea>
  //             <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
  //               {editMode ? "Update Topic" : "Add Topic"}
  //             </button>
  //           </form>
  //         </div>
  //       </div>
  //     )}
  //   </div>
  // }</>
  return <>
  {
    loading ? <FancyLoader /> : 
    <div className="min-h-screen dark:bg-black dark:text-white p-4 sm:p-6">
      {/* Search Bar */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 mb-6">
        <div className="relative w-full">
          <Search className="absolute left-3 top-3 dark:text-white w-5 h-5" />
          <input
            type="text"
            placeholder="Search topics..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full pl-10 pr-3 py-2 rounded dark:bg-black dark:text-white border border-gray-700 focus:outline-none focus:ring focus:ring-blue-500"
          />
        </div>
        {
          role === 'Admin' &&
          <button onClick={openAddModal} className="self-end sm:self-auto p-3 bg-blue-500 rounded-full hover:bg-blue-600 transition">
            <Plus className="text-white w-6 h-6" />
          </button>
        }
      </div>

      {/* Blog Topics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredTopics.length > 0 ? (
          filteredTopics.map((topic) => (
            <div key={topic._id} className="dark:bg-gray-800 p-5 rounded-xl shadow-md relative">
              {
                role === 'Admin' && <button onClick={() => openEditModal(topic)} className="absolute top-3 right-12 bg-yellow-500 p-2 rounded-full hover:bg-yellow-600">
                <Edit className="dark:text-white w-5 h-5" />
              </button>
              }
              
              {
                role === 'Admin' && <button onClick={() => handleDelete(topic._id)} className="absolute top-3 right-3 bg-red-500 p-2 rounded-full hover:bg-red-600">
                <Trash2 className="dark:text-white w-5 h-5" />
              </button>
              }

              <h2 className="text-xl font-semibold">{topic.title}</h2>
              <p className="dark:text-white mt-2">{topic.description}</p>

              {/* View All Button */}
              <button
                onClick={() => navigate(`/blog/topic/${topic._id}`)}
                className="mt-3 dark:text-white hover:underline"
              >
                View All Blogs →
              </button>
            </div>
          ))
        ) : (
          <p className="text-white text-center col-span-full">No topics found.</p>
        )}
      </div>

      {/* Modal for Adding/Editing Blog Topic */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="dark:bg-gray-800 bg-gray-100 p-6 rounded-lg w-full max-w-md mx-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">{editMode ? "Edit Blog Topic" : "Add New Blog Topic"}</h2>
              <button onClick={() => setShowModal(false)}>
                <X className="w-6 h-6 dark:text-white" />
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                name="title"
                placeholder="Title"
                value={currentTopic.title}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              />
              <textarea
                name="description"
                placeholder="Description"
                value={currentTopic.description}
                onChange={handleChange}
                className="w-full p-2 rounded bg-gray-700 text-white mb-3"
              ></textarea>
              <button type="submit" className="w-full bg-blue-500 p-2 rounded hover:bg-blue-600">
                {editMode ? "Update Topic" : "Add Topic"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  }
</>

}
