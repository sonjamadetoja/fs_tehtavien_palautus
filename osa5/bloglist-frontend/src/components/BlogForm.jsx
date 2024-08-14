import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ addBlog }) => {
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')

  const createBlog = (event) => {
    event.preventDefault()
    addBlog({
      title: newTitle,
      author: newAuthor,
      url: newUrl
    })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={createBlog}>
          title: <input type='text' value={newTitle} name='title' onChange={({ target }) => {setNewTitle(target.value)}} />
          author: <input type='text' value={newAuthor} name='author' onChange={({ target }) => {setNewAuthor(target.value)}} />
          url: <input type='text' value={newUrl} name='url' onChange={({ target }) => {setNewUrl(target.value)}} />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
