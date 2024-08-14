import { useState } from "react"

const Blog = ({ blog, increaseLikes, handleRemove, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 3,
    border: 'solid',
    borderWidth: 2,
    marginBottom: 5
  }

  const [detailVisibility, setDetailVisibility] = useState(false)

  const hideWhenDetailsVisible = { display: detailVisibility ? 'none' : '' }
  const showWhenDetailsVisible = { display: detailVisibility ? '' : 'none'}

  const toggleDetailVisibility = () => {
    setDetailVisibility(!detailVisibility)
  }

  const handleRemoveClick = () => {
    if (window.confirm(`Do you want to remove the blog \"${blog.title}\"?`)) {
      handleRemove(blog.id)
    }
  }

  const showRemoveButton = blog.user.username === user.username

  return (
  <div style={blogStyle}>
    {blog.title} {blog.author}

    <button onClick={toggleDetailVisibility} style={hideWhenDetailsVisible}>view</button>
    <button onClick={toggleDetailVisibility} style={showWhenDetailsVisible} >hide</button>

    <div style={showWhenDetailsVisible}>
      {blog.url} <br />
      likes {blog.likes} <button onClick={() => increaseLikes(blog.id)}>like</button> <br />
      {blog.user.name} <br />
      {showRemoveButton
      ? <button onClick={() => handleRemoveClick()}>remove</button>
      : null
      }
    </div>
  </div>  
)}

export default Blog
