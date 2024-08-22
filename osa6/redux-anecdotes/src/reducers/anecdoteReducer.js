import { createSlice } from "@reduxjs/toolkit"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    increaseVotes(state, action) {
      const id = action.payload
      const anecdoteToVoteFor = state.find(a => a.id === id) 
      const anecdoteVotedFor = {
        ...anecdoteToVoteFor, votes: anecdoteToVoteFor.votes + 1
      }
      return state.map(anecdote => anecdote.id !== id ? anecdote : anecdoteVotedFor)
    },
    setAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { createAnecdote, increaseVotes, setAnecdotes } = anecdoteSlice.actions
export default anecdoteSlice.reducer
