import { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
import Notification from './components/Notification';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';
import {
  useNotificationDispatch,
  showNotification
} from './NotificationContext';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useNotificationDispatch();

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedInBlogUser', JSON.stringify(user));

      blogService.setToken(user.token);

      setUser(user);
      setUsername('');
      setPassword('');
      showNotification(dispatch, 'You logged in successfully.');
    } catch (exception) {
      showNotification(dispatch, 'Login failed. Wrong password or username.');
    }
  };

  const handleLogout = () => {
    setUser(null);
    window.localStorage.removeItem('loggedInBlogUser');
      showNotification(dispatch, 'You logged out successfully.');
  };

  const addBlog = async (blogObject) => {
    try {
      blogFormRef.current.toggleVisibility();
      const returnedBlog = await blogService.create(blogObject);
      setBlogs(blogs.concat(returnedBlog));
      showNotification(dispatch, `You successfully added blog ${blogObject.title}`);
    } catch (exception) {
      if (exception.response.data.error.includes('token expired')) {
        showNotification(dispatch, 
          'Your session has expired. Please log in again.',
        );
      } else {
        showNotification(dispatch, 
          'Adding a blog failed. Please fill in all required fields properly.'
        );
      }
    }
  };

  const updateBlog = async (changedBlog, user) => {
    try {
      const returnedBlog = await blogService.update(changedBlog);
      const updatedReturnedBlog = { ...returnedBlog, user: user };
      const updatedBlogs = blogs.map((blog) =>
        blog.id === updatedReturnedBlog.id ? updatedReturnedBlog : blog,
      );
      setBlogs(updatedBlogs);
    } catch (exception) {
      console.log('An error occurred. ', exception);
    }
  };

  const increaseLikes = async (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    await updateBlog(changedBlog, blog.user);
  };

  const handleRemove = async (blogId) => {
    try {
      await blogService.remove(blogId);
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId);
      setBlogs(updatedBlogs);
    } catch (exception) {
      console.log('An error occurred. ', exception);
    }
  };

  const blogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="create new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      </div>
    );
  };

  if (user === null) {
    return (
      <div>
        <Notification />
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
      </div>
    );
  }

  return (
    <div className="loggedIn">
      <Notification />
      {user.name} is logged in. <button onClick={handleLogout}>logout</button>
      <div>{blogForm()}</div>
      <h2>blogs</h2>
      {blogs
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            increaseLikes={increaseLikes}
            handleRemove={handleRemove}
            user={user}
          />
        ))}
    </div>
  );
};

export default App;
