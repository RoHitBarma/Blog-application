import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axiosClient.js'

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault(e)
    setError("")

    if (!title.trim() || !content.trim()) {
      setError("Title and content are required.");
      return;
    }

    try{
        setLoading(true)

        const res = await axiosClient.post("/posts", {
            title,
            description: content
        })

        const created = res.data.post || res.data
        const id = created._id || created.id
        console.log("Post Created: ", { title, content })
        if (id) {
            navigate(`/dashboard/posts/${id}`); // aage chal ke Post Detail page banayenge
        } else {
            navigate("/dashboard"); // fallback
        }
    }catch (err){
        console.error(err);
        setError(
            err?.response?.data?.message || "Failed to create post. Please try again."
        );
    } finally {
      setLoading(false);
    }

  }
  return (
    <div className='max-w-5xl mx-auto px-4'>
        <h1 className='text-2xl font-bold text-gray-900 mb-4 underline'>Create new Post</h1>
        <p className='text-sm text-gray-600 mb-6'>Write your blogs which can reach globally and cange the World</p>
        <form onSubmit={handleSubmit} className='space-y-4 bg-white rounded-2xl shadow p-6'>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Title
                </label>
                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)}
                    className='w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2
                    focus:ring-indigo-500' 
                    placeholder='e.g. How I started writing online'
                />
            </div>
            <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                    Content
                </label>
                <textarea 
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    rows={9}
                    className='w-full rounded border px-3 py-2 text-sm focus:outline-none focus:ring-2
                    focus:ring-indigo-500' 
                />
            </div>

            <button
                type="submit"
                disabled={loading}
                className="px-5 py-2.5 bg-indigo-600 text-white text-sm font-semibold rounded-full hover:bg-indigo-700 disabled:opacity-60"
            >
                {loading ? "Publishing..." : "Publish post"} 
            </button>
        </form>
    </div>
  )
}

export default CreatePost