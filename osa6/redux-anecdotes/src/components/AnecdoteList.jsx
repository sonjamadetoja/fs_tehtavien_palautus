import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
import { notificationChange, notificationReset } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotesToShow = state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.trim().toLowerCase()))
    return anecdotesToShow
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    const votedAnecdote = anecdotes.find(a => a.id === id)
    dispatch(addVote(votedAnecdote))
    dispatch(notificationChange(`You voted for '${votedAnecdote.content}'`))
    setTimeout(() => {dispatch(notificationReset())}, 5000)
  }

  return (
    <div>
      {anecdotes
      .sort((a, b) => b.votes - a.votes)
      .map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList
