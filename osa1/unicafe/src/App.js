import { useState } from 'react'

const Header = ({header}) => <h1> {header} </h1>
const Display = ({name, value}) => <div> {name} {value} </div>

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setToGood = newValue => {
    console.log(newValue)
    setGood(newValue)
  }

  const setToNeutral = newValue => {
    setNeutral(newValue)
  }

  const setToBad = newValue => {
    setBad(newValue)
  }

  return (
    <div>
      <Header header='give feedback' />
      <Button handleClick={() => setToGood(good+1)} text='good' />
      <Button handleClick={() => setToNeutral(neutral+1)} text='neutral' />
      <Button handleClick={() => setToBad(bad+1)} text='bad' />
      <Header header='statistics' />
      <Display name='good' value={good} />
      <Display name='neutral' value={neutral} />
      <Display name='bad' value={bad} />
      <Display name='all' value={good+neutral+bad} />
      <Display name='average' value={(good-bad)/good+neutral+bad} />
      <Display name='positive' value={good/(good+neutral+bad)} />
    </div>
  )
}

export default App