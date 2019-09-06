import React from 'react'

const BlogForm = ({ addBlogObject, handleBlogObjectChange, newBlogObject }) => {
  const title = newBlogObject.title
  const author = newBlogObject.author
  const url = newBlogObject.url
  return (
    <div>
      <form onSubmit={addBlogObject}>
        <p>title: <input
          name="title"
          value={title}
          onChange={handleBlogObjectChange}
        /></p>
        <p>author: <input
          name="author"
          value={author}
          onChange={handleBlogObjectChange}
        /></p>
        <p>url: <input
          name="url"
          value={url}
          onChange={handleBlogObjectChange}
        /></p>
        <button type="submit">save</button>
      </form>
    </div>
  )
}

export default BlogForm