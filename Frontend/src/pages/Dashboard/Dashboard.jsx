import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosClient from "../../api/axiosClient.js"

const Dashboard = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await axiosClient.get("/v1/posts");

        // backend response structure:
        // res.data.data = blogs array
        setPosts(res.data.data);
      } catch (err) {
        console.error("Error fetching posts:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchPosts();
  }, []);


  const handleLike = async (id) => {
    try {
      const res = await axiosClient.put(`/v1/posts/like/${id}`);

      // updated blog backend se aayega
      const updatedPost = res.data.data;

      setPosts((prev) =>
        prev.map((post) =>
          post._id === id ? updatedPost : post
        )
      );
    } catch (err) {
      console.error("Like error:", err);
    }
  };


  if (loading) {
    return <div className="p-6">Loading posts...</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">

      {/* Posts */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <div
            key={post._id}
            className="bg-white rounded-xl shadow-md p-5 hover:shadow-lg transition cursor-pointer"
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-2">
              {post.title}
            </h2>

            <p className="text-gray-600 text-sm mb-4">
              {post.description}
            </p>

            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>✍ {post.userReference?.username}</span>
              <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            </div>


            {/* LIKE BUTTON */}
            <div className="mt-4 flex justify-between items-center">
              <button
                onClick={() => handleLike(post._id)}
                className="text-sm px-3 py-1 border rounded hover:bg-gray-100"
              >
                Like {post.like?.length || 0}
              </button>

              <button
                onClick={() =>
                  navigate(`/dashboard/posts/${post._id}`)
                }
                className="text-indigo-600 text-sm hover:underline"
              >
                Read →
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
