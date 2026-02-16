// import { useNavigate, useParams } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../../Context/AuthContext"
// import axiosClient from "../../api/axiosClient";

// const PostDetails = () => {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [post, setPost] = useState(null);
//   const [loading, setLoading] = useState(true);
//   // const {user} = useContext(AuthContext)

//   // const post = {
//   //   id,
//   //   title: "How I started writing online",
//   //   description:
//   //     "Yeh sirf dummy content hai. Baad me backend se aayega.",
//   //   author: "Rohit Sharma",
//   //   date: "2025-01-10",
//   //   likes: 2, 
//   // };

//   useEffect(() => {
//     async function fetchPost() {
//       try{
//         const res = await axiosClient.get(`/v1/posts/${id}`);
//         setPost(res.data.data);
//       } catch (err) {
//         console.log(err)
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchPost()
//   }, [id])

//   if (loading) return <div>Loading...</div>;
//   if (!post) return <div>Post not found</div>;

//   const handleDelete = () => {
//     const confirmDelete = window.confirm(
//       "Are you sure you want to delete this post?"
//     );

//     if (!confirmDelete) return;

//     // 🔴 Later backend call yaha ayega
//     // await axiosClient.delete(`/posts/${id}`);

//     console.log("Post deleted:", id);

//     // Redirect after delete
//     navigate("/dashboard");
//   };

//   return (
//     <div className="max-w-3xl mx-auto px-4 py-8">
//       {/* Header */}
//       <div className="flex justify-between items-center mb-6">
//         <div>
//           <h1 className="text-3xl font-bold mb-2">{post.title}</h1>
//           <p className="text-sm text-gray-500 mb-2">
//             {post.author} • {post.date}
//           </p>
//           <p>Likes: {post.likes}</p>
//         </div>

//         <div className="flex gap-2">
//           <button
//             onClick={() => navigate(`/dashboard/posts/${id}/edit`)}
//             className="px-3 py-1 border rounded"
//           >
//             Edit
//           </button>

//           <button
//             onClick={handleDelete}
//             className="px-3 py-1 border border-red-500 text-red-500 rounded"
//           >
//             Delete
//           </button>
//         </div>
//       </div>

//       <div className="text-gray-700 leading-relaxed">
//         {post.content}
//       </div>

//       <button
//         onClick={() => navigate("/dashboard")}
//         className="mt-6 text-indigo-600 hover:underline"
//       >
//         ← Back to Dashboard
//       </button>
//     </div>
//   );
// };

// export default PostDetails;

import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import axiosClient from "../../api/axiosClient";
import { AuthContext } from "../../Context/AuthContext";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await axiosClient.get(`/posts/${id}`);
        setPost(res.data.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (!post) return <div>Post not found</div>;

  const isOwner = user && post.userReference?._id === user._id;

  const handleDelete = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await axiosClient.delete(`/v1/posts/delete/${id}`);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to delete post");
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-bold mb-2">{post.title}</h1>

          <p className="text-sm text-gray-500 mb-1">
            ✍ {post.userReference?.username}
          </p>

          <p className="text-xs text-gray-400">
            {new Date(post.publishDate).toLocaleDateString()}
          </p>

          <p className="text-sm mt-2">
            ❤️ {post.like?.length || 0} likes
          </p>
        </div>

        {/* Edit/Delete only for owner */}
        {isOwner && (
          <div className="flex gap-2">
            <button
              onClick={() => navigate(`/dashboard/posts/${id}/edit`)}
              className="px-3 py-1 border rounded text-sm"
            >
              Edit
            </button>

            <button
              onClick={handleDelete}
              className="px-3 py-1 border border-red-500 text-red-500 rounded text-sm"
            >
              Delete
            </button>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="text-gray-700 leading-relaxed whitespace-pre-line">
        {post.description}
      </div>

      <button
        onClick={() => navigate("/dashboard")}
        className="mt-6 text-indigo-600 hover:underline"
      >
        ← Back to Dashboard
      </button>
    </div>
  );
};

export default PostDetails;
