import React from 'react' 







const CreateBlogForm = (addBlogObject, handleBlogObjectChange) => (
    <form onSubmit={addBlogObject}>
      <p>title: <input
        name="title"
        value={newBlogObject.title}
        onChange={handleBlogObjectChange}
      /></p>
      <p>author: <input
        name="author"
        value={newBlogObject.author}
        onChange={handleBlogObjectChange}
      /></p>
      <p>url: <input
        name="url"
        value={newBlogObject.url}
        onChange={handleBlogObjectChange}
      /></p>
      <button type="submit">save</button>
    </form>
  )

  export default CreateBlogForm