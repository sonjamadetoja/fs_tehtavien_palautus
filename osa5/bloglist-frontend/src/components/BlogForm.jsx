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
          title: <input data-testid='title' type='text' value={newTitle} name='title' onChange={({ target }) => {setNewTitle(target.value)}} id='title-input' />
          author: <input data-testid='author' type='text' value={newAuthor} name='author' onChange={({ target }) => {setNewAuthor(target.value)}} id='author-input' />
          url: <input data-testid='url' type='text' value={newUrl} name='url' onChange={({ target }) => {setNewUrl(target.value)}} id='url-input' />
        <button type='submit'>save</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  addBlog: PropTypes.func.isRequired
}

export default BlogForm
