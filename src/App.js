import React, { useState, useEffect } from 'react'

// Components
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'

// Services
import blogService from './services/blogs'
import loginService from './services/login'

// Custom Hooks
import  { useField } from './hooks'

// Styles
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlogObject, setNewBlogObject] = useState(
    {
      title: '',
      author: '',
      url: '',
    }
  )
  //const [username, setUsername] = useState('')
  //const [password, setPassword] = useState('')
  const username = useField('text')
  const password = useField('password')
  const [user, setUser] = useState(null)
  const [ notification, setNotification ] = useState({ message: null, style: null })



  useEffect(() => {
    blogService
      .getAll()
      .then(initialBlogs => {
        setBlogs(initialBlogs)
      })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const rows = () => {
    console.log('blog', blogs)
    console.log('Joku username', user.username)
    const loggedUser = user.username
    return blogs.sort((a, b) => b.likes - a.likes).map(blog =>
    {
      console.log('BLOOOOG', blog)

      return(
        <Blog
          key={blog.id}
          blog={blog}
          setBlogs={setBlogs}
          setNotification={setNotification}
          showRemoveButton={loggedUser === blog.user.username}
        />
      )}
    )}

  const blogFormRef = React.createRef()

  const addBlogObject = async (event) => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    console.log('addBlog newBlogObject', newBlogObject.title)
    console.log('addBlog newBlogObject', newBlogObject.author)
    console.log('addBlog newBlogObject', newBlogObject.url)
    const blogObject = {
      title: newBlogObject.title,
      author: newBlogObject.author,
      url: newBlogObject.url,
    }
    console.log('blogObject', blogObject)
    const newNotification = {
      message: `New blog added: ${newBlogObject.title} by ${newBlogObject.author}`,
      style: 'success'
    }
    try {
      await blogService.create(blogObject)
      setBlogs(await blogService.getAll())
      setNewBlogObject({
        title: '',
        author: '',
        url: '',
      })
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)

    } catch (exception) {
      const newNotification = {
        message: 'Blog not created. Check input fields.',
        style: 'failure'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)
    }
  }

  const handleBlogObjectChange = (event) => {
    console.log({ [event.target.name]: event.target.value })
    setNewBlogObject({ ...newBlogObject, [event.target.name]: event.target.value })
    console.log('newBlogObject', newBlogObject)
  }

  console.log('render', blogs.length, 'blogs.length')

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style={footerStyle}>
        <br />
        <em>Blog app, Department of Computer Science 2019</em>
      </div>
    )
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      console.log('logging in...')
      const user = await loginService.login({
        username: username.value,
        password: password.value
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      username.reset()
      password.reset()
      const newNotification = {
        message: 'Login successful',
        style: 'success'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)
      console.log('login successful')

    } catch (exception) {
      const newNotification = {
        message: 'Wrong credentials',
        style: 'failure'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)
    }
  }

  const handleLogout = async () => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log('logging out...')
      setUser(null)
      const newNotification = {
        message: 'Logout successful',
        style: 'success'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)
      console.log('logout successful')
    } catch (exception) {
      const newNotification = {
        message: 'Logout error',
        style: 'failure'
      }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({ message: null, style: null })
      }, 5000)
    }
  }

  const blogObjectForm = () => {
    return (
      <div>
        <Togglable buttonLabel='Create new BLOG' ref={blogFormRef}>
          <BlogForm
            newBlogObject={newBlogObject}
            handleBlogObjectChange={handleBlogObjectChange}
            addBlogObject={addBlogObject}
          />
        </Togglable>
      </div>
    )
  }

  return (
    <div className='mainPage'>
      <h1>Blogit</h1>
      <Notification notification={notification} />

      {user === null ?
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password} /> :
        <div>
          <p>{user.name} logged in </p>
          <button onClick={() => handleLogout()}>Logout</button>
          <h2>Create new blog</h2>
          {blogObjectForm()}

          <h2 className='latestBlogs'>Latest blogs</h2>
          {rows()}
        </div>
      }
      <Footer />
    </div>
  )
}

export default App