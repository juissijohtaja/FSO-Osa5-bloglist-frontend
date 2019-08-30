import React, { useState, useEffect } from 'react' 
import Blog from './components/Blog'
import Notification from './components/Notification'
//import CreateBlogForm from './components/createblogform'
import blogService from './services/blogs'
import loginService from './services/login' 
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
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [ notification, setNotification ] = useState({message: null, style: null})


  
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
    
  const rows = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      blog={blog}
    />
  )

  const addBlogObject = async (event) => {
    event.preventDefault()
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
      await blogService
        .create(blogObject)
        .then(returnedBlog => {
          setBlogs(blogs.concat(returnedBlog))
          setNewBlogObject({
            title: '',
            author: '',
            url: '',
          })
        })
        setNotification( newNotification )
        setTimeout(() => {
          setNotification({message: null, style: null})
        }, 5000)

    } catch (exception) {
      const newNotification = { 
        message: `Blog not created. Check input fields.`,
        style: 'failure'
       }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({message: null, style: null})
      }, 5000)
    }    
  }

  const handleBlogObjectChange = (event) => {
    console.log({ [event.target.name]: event.target.value })
    setNewBlogObject({...newBlogObject, [event.target.name]: event.target.value})
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
        username, password,
      })
      
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      const newNotification = { 
        message: `Login successful`,
        style: 'success'
       }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({message: null, style: null})
      }, 5000)
      console.log('login successful')

    } catch (exception) {
      const newNotification = { 
        message: `Wrong credentials`,
        style: 'failure'
       }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({message: null, style: null})
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    try {
      window.localStorage.removeItem('loggedBlogappUser')
      console.log('logging out...')
      setUser(null)
      const newNotification = { 
        message: `Logout successful`,
        style: 'success'
       }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({message: null, style: null})
      }, 5000)
      console.log('logout successful')
    } catch (exception) {
      const newNotification = { 
        message: `Logout error`,
        style: 'failure'
       }
      setNotification( newNotification )
      setTimeout(() => {
        setNotification({message: null, style: null})
      }, 5000)
    }
  }

  const loginForm = () => (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )

  const blogObjectForm = () => (
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

  return (
    <div>
      <h1>Blogit</h1>
      <Notification notification={notification} />

      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in </p>
          <button onClick={() => handleLogout()}>Logout</button>
          <h2>Create new blog</h2>
          {blogObjectForm()}
          
          <h2>Blogs</h2>
          {rows()}
        </div>
      }
      <Footer />
    </div>
  )
}

export default App