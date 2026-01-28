import React from 'react'
import PostCard from './PostCard'

const PostList = ({posts = []}) => {
  if(!posts || posts.length == 0){
    return <div className="text-gray-500">No posts yet.</div>;
  }
  return (
    <div className='grid gap-4'>
        {posts.map((p) => (
            <PostCard key={p.id || p._id} post={p} />
        ))}
    </div>
  )
}

export default PostList