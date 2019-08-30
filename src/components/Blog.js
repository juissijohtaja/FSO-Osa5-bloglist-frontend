import React from 'react'
const Blog = ({ blog }) => (
  <div>
    <p>
      {blog.title} <br/>{blog.author} <br/>{blog.url}
    </p>
  </div>
)

export default Blog