import BlogCard from "./BlogCard";

const BlogPage = () => {
  const blogData = [
    { title: "Arrays", description: "Fundamental data structure for storing elements of the same type." },
    { title: "Introduction to DSA", description: "Primer on Data Structures and Algorithms." },
    { title: "Binary Search", description: "Efficient searching algorithm for sorted arrays." },
    { title: "Binary Search Tree", description: "Hierarchical data structure with efficient search, insertion, and deletion operations." },
    { title: "Binary Tree", description: "Tree data structure where each node has at most two children." },
    { title: "Bit Manipulation", description: "Manipulating individual bits to perform operations." }
  ];

  return (
    <div className="bg-black min-h-screen p-10 text-white">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {blogData.map((blog, index) => (
          <BlogCard key={index} title={blog.title} description={blog.description} />
        ))}
      </div>
    </div>
  );
};

export default BlogPage;
