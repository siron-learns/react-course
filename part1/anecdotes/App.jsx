import React from 'react'
import { useState } from 'react'

function getRandomArbitrary(min, max) {
  // generate random number on [min, max]
  return Math.random() * (max - min) + min
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time ..The remaining 10 percent of the code accounts for the other 90 percent of development time',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil',
    'Debugging is twice as hard as writing code in the first place. Therefore, if you write code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is the same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
  
  // callbacks
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0, 0, 0, 0, 0, 0, 0, 0])

  // generate random number
  const updateAnecdote = () => {
    setSelected(Math.round(getRandomArbitrary(0, anecdotes.length)))
    console.log('Random number', selected)
  }

  // update votes state
  const copy = [...votes]
  copy[selected] += 1
  const voteHandler = () => {setVotes(copy)}

  // keep track of anecdote with most votes
  let maxVotes = Math.max(...votes)
  let maxVotesIndex = votes.findIndex( (val) => val === maxVotes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <button onClick={voteHandler}>vote</button>
      <button onClick={updateAnecdote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[maxVotesIndex]}</p>
      <p>has {maxVotes} votes</p>
    </div>
  )
}

export default App