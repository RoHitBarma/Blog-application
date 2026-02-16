import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axiosClient from '../../api/axiosClient.js'

const EditPost = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchPost() {
            try{
               const res = await axiosClient.get(`/posts/${id}`) 
               setTitle(res.data.data.title)
               setContent(res.data.data.description)
            }catch(err){
                console.log(err)
            } finally {
                setLoading(false);
            }
        }

        fetchPost()
    }, [id])

    async function handleSave(e) {
        e.preventDefault();

        if (!title.trim() || !content.trim()) {
            alert("Title and content required");
            return;
        }

        // 🔸 For now just console.log (replace with axios PUT later)
        console.log("UPDATE POST", { id, title, content });

        // After successful update → navigate back to detail
        try {
            await axiosClient.put(`/v1/posts/update/${id}`, {
                title,
                description: content,
            });

            navigate("/dashboard"); // 👈 important
        } catch (err) {
            console.log(err);
            alert("Failed to update post");
        }
    }

    if (loading) return <div className="p-6 text-center">Loading post...</div>;
    
    return (
        <div className='max-w-3xl mx-auto px-4 py-10'>
            <div className="text-2xl font-bold mb-4">Edit Post</div>

            <form onSubmit={handleSave}>
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <input
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Post title..."
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Content</label>
                    <textarea
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        rows={10}
                        className="w-full border rounded px-3 py-2"
                        placeholder="Write your post..."
                    />
                </div>

                <div className="flex items-center gap-3">
                    <button
                        type="submit"
                        className="px-5 py-2 bg-indigo-600 text-white rounded"
                    >
                        Save changes
                    </button>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="px-4 py-2 border rounded"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    )
}

export default EditPost