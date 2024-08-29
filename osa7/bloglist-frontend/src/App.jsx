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
import { useQuery, useQueryClient, useMutation } from '@tanstack/react-query';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  const blogFormRef = useRef();
  const dispatch = useNotificationDispatch();
  const queryClient = useQueryClient()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedInBlogUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      const blogs = queryClient.getQueryData({ queryKey: ['blogs'] })
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.concat(newBlog))
    },
    onError: (error) => {
      if (error.response.data.error.includes('token expired')) {
        showNotification(dispatch, 
          'Your session has expired. Please log in again.',
        );
      } else {
        showNotification(dispatch, 
          'Adding a blog failed. Please fill in all required fields properly.'
        );
      }
    }
  })

  const updateBlogMutation = useMutation({
    mutationFn: blogService.update,
    onSuccess: (changedBlog, user) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
      queryClient.setQueryData({ queryKey: ['blogs'] }, blogs.map((blog) => blog.id === changedBlog.id ? { ...changedBlog, user: user } : blog))
    },
    onError: (error) => {
      console.log('An error occurred. ', error);
    }
  })

  const removeBlogMutation = useMutation({
    mutationFn: blogService.remove,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    },
    onError: (error) => {
      console.log('An error occurred. ', error);
    }
  })

  const result = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false
  })

  console.log(JSON.parse(JSON.stringify(result)))

  if (result.isLoading) {
    return <div>Loading data...</div>
  }

  const blogs = result.data

  const addBlog = (blogObject) => {
    blogFormRef.current.toggleVisibility();
    newBlogMutation.mutate(blogObject)
    showNotification(dispatch, `You successfully added blog ${blogObject.title}`);
  };

  const increaseLikes = (blogId) => {
    const blog = blogs.find((blog) => blog.id === blogId);
    const changedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id };
    updateBlogMutation.mutate(changedBlog, blog.user)
  };

  const handleRemove = (blogId) => {
    removeBlogMutation.mutate(blogId)
  };

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
