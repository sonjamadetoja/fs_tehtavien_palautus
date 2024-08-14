import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notificationMessage, setNotificationMessage] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user))

      blogService.setToken(user.token)

      setUser(user)
      setUsername('')
      setPassword('')
      setNotificationMessage("You logged in successfully.")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage("Login failed. Wrong password or username.")
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('loggedInBlogUser')
    setNotificationMessage("You logged out successfully.")
    setTimeout(() => {
      setNotificationMessage(null)
    }, 5000)
  }

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility()
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNotificationMessage(`You successfully added blog ${blogObject.title}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      if (exception.response.data.error.includes('token expired')) {
        setNotificationMessage('Your session has expired. Please log in again.')
      } else {
        setNotificationMessage(`Adding a blog failed. Please fill in all required fields properly.`)
      }
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const updateBlog = async (changedBlog, user) => {
    try {
      const returnedBlog = await blogService.update(changedBlog)
      const updatedReturnedBlog = {...returnedBlog, user: user}
      const updatedBlogs = blogs.map(blog => blog.id === updatedReturnedBlog.id ? updatedReturnedBlog : blog)
      setBlogs(updatedBlogs)
    } catch (exception) {
      console.log('An error occurred. ', exception)
    }
  }

  const increaseLikes = async (blogId) => {
    const blog = blogs.find(blog => blog.id === blogId)
    const changedBlog = {...blog, likes: blog.likes+1, user: blog.user.id}
    await updateBlog(changedBlog, blog.user)
  }

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  const Notification = ({message}) => {
    if (message === null) {
      return null
    }

    return (
      <div className='notification'>
        {message}
      </div>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notificationMessage} />
        <LoginForm handleLogin={handleLogin} 
        username={username} setUsername={setUsername} 
        password={password} setPassword={setPassword} />
      </div>
    )
  } 

  return (
    <div>
      <Notification message={notificationMessage} />
      {user.name} is logged in. <button onClick={handleLogout}>logout</button>
        <div>
          {blogForm()}
        </div>
      <h2>blogs</h2>
      {blogs.sort((a, b) => (b.likes - a.likes)).map(blog =>
        <Blog key={blog.id} blog={blog} increaseLikes={increaseLikes} />
      )}
    </div>
  )
}

export default App