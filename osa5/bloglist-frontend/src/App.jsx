import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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

  const addBlog = async (event) => {
    event.preventDefault()

    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }

    try {
      const returnedBlog = await blogService.create(blogObject)
      setBlogs(blogs.concat(returnedBlog))
      setNewTitle('')
      setNewAuthor('')
      setNewUrl('')
      setNotificationMessage(`You successfully added blog ${blogObject.title}`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    } catch (exception) {
      setNotificationMessage(`Adding a blog failed. Please fill in all required fields properly.`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 5000)
    }
  }

  const blogForm = () => (
    <div>
      <form onSubmit={addBlog}>
        title: <input type='text' value={newTitle} name='title' onChange={({ target }) => {setNewTitle(target.value)}} />
        author: <input type='text' value={newAuthor} name='author' onChange={({ target }) => {setNewAuthor(target.value)}} />
        url: <input type='text' value={newUrl} name='url' onChange={({ target }) => {setNewUrl(target.value)}} />
        <button type='submit'>save</button>
      </form>
    </div>
  )

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
      <h2>create new</h2>
        <div>
          {blogForm()}
        </div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App