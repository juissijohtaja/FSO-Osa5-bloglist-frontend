import React, { useState, useImperativeHandle } from 'react'
import blogService from '../services/blogs'

const Blog = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)
  //console.log('Blog props', props)

  const setBlogs = props.setBlogs
  const setNotification = props.setNotification
  const onClickTest = props.onClickTest


  //const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  const userName = () => {
    if (props.blog.user) {
      //console.log('props.blog.user', props.blog.user)
      console.log('props.blog.user.name', props.blog.user.name)
      return (props.blog.user.name)
    } else {
      return 'unknown'
    }
  }

  const updateBlog = async (newBlogObject, id) => {
    const newObject = newBlogObject
    try {
      await blogService.update(id, newObject)
      setBlogs(await blogService.getAll())

      const newNotification = {
        message: 'New like added!',
        style: 'success'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)

    } catch (exception) {
      const newNotification = {
        message: 'Like not added.',
        style: 'failure'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)
    }
  }

  const removeBlog = async (id) => {
    console.log('REMOVE id', id)
    if (window.confirm('Do you really want to remove this post?')) {
      try {
        await blogService.remove(id)
        setBlogs(await blogService.getAll())

        const newNotification = {
          message: 'Blog removed!',
          style: 'success'
        }
        setNotification( newNotification )
        setTimeout(() => {
          setNotification({ message: null, style: null })
        }, 5000)

      } catch (exception) {
        const newNotification = {
          message: 'Blog not removed.',
          style: 'failure'
        }
        setNotification( newNotification )
        setTimeout(() => {
          setNotification({ message: null, style: null })
        }, 5000)
      }
    }
  }

  const handleLike = async (event) => {
    event.preventDefault()

    console.log('I Like!')
    //console.log('event.target', event.target)
    const blog = props.blog
    //const updateBlog = props.updateBlog

    console.log('likes before', blog.likes)
    blog.likes += 1
    console.log('likes after', blog.likes)
    updateBlog(blog, blog.id)
  }

  const RemoveButton = () => {
    console.log('showRemoveButton', props.showRemoveButton)
    if (props.showRemoveButton) {
      return <p><button onClick={handleRemove}>Remove post</button></p>
    } else {
      return <div></div>
    }
  }

  const handleRemove = async (event) => {
    event.preventDefault()
    const blog = props.blog
    //const removeBlog = props.removeBlog
    console.log('props.blog.user.id', props.blog.user.id)

    console.log('Remove this!')
    console.log('event.target', event.target)
    removeBlog(blog.id)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    borderBottom: '1px dashed #cecece',
    marginBottom: 5,
  }
  const blogHeaderStyle = {
    cursor: 'pointer',
    backgroundColor: '#efefef',
    padding: '5px 10px'
  }
  const blogContentStyle = {
    padding: '5px 10px'
  }

  return (
    <div style={blogStyle} className='blogContentFull'>
      <div className='blogContent'>
        <div onClick={toggleVisibility} style={blogHeaderStyle} className='blogDefault'>
          <h3 className='blogTitle'>
            {props.blog.title}
          </h3>
          <p className='blogAuthor'>
            {props.blog.author}
          </p>
        </div>
      </div>
      <div style={showWhenVisible} className='blogMore' >
        <div onClick={toggleVisibility} style={blogContentStyle} >
          <p className='blogLikes'>{props.blog.likes} likes <button onClick={onClickTest? onClickTest : handleLike}>Like this</button></p>
          <p className='blogUrl'>
            Website: <a href={props.blog.url} target="_blank" rel="noopener noreferrer">{props.blog.url}</a> <br/>Added by: {userName()}
          </p>
          <RemoveButton />
        </div>
      </div>
    </div>
  )
})

export default Blog