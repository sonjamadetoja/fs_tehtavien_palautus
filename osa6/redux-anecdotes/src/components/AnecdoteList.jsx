import { useSelector, useDispatch } from 'react-redux'
import { increaseVotes } from '../reducers/anecdoteReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    const anecdotesToShow = state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.trim().toLowerCase()))
    return anecdotesToShow
  })
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(increaseVotes(id))
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
