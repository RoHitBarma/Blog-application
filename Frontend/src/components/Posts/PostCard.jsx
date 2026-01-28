import React from 'react'
import { useNavigate } from 'react-router-dom'

const PostCard = ({post}) => {
 const navigate = useNavigate()
  return (
    <article 
        className='bg-white border rounded-xl p-4 shadow-sm hover:shadow-md cursor-pointer'
        onClick={() => navigate(`/posts/${post.id || post._id}`)}
    >
        <h3 className='text-lg font-semibold'>{post.title}</h3>
        <p className="text-sm text-gray-500">By {post.authorName || post.author}</p>
        <p className="text-gray-700 mt-2 line-clamp-3">{post.excerpt || (post.content || "").slice(0,160)}</p>
    </article>
  )
}

export default PostCard