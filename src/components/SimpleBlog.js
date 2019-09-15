import React from 'react'

const SimpleBlog = ({ blog, onClick }) => (
  <div className='blogContent'>
    <div className='blogTitle'>
      {blog.title}
    </div>
    <div className='blogAuthor'>
      {blog.author}
    </div>
    <div>
      blog has <span className='blogLikes'>{blog.likes}</span>{blog.likes} likes
      <button onClick={onClick}>like</button>
    </div>
  </div>
)

export default SimpleBlog