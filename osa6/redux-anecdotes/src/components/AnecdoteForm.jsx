import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdoteService'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  
  const addAnecdote = async (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    dispatch(createAnecdote(newAnecdote))
    dispatch(notificationChange(`You added '${anecdote}'`))
    setTimeout(() => {dispatch(notificationReset())}, 5000)
  }
  
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote' /></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm