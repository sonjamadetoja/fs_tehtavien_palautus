import { useState } from 'react'

const Header = ({header}) => <h1> {header} </h1>
const StatisticLine = ({text, value}) => <div> {text} {value} </div>

const Button = ({handleClick, text}) => {
  return (
  <button onClick={handleClick}>
    {text}
  </button>
  )
}

const Statistics = ({good, bad, neutral}) => {
  if (good+neutral+bad > 0) {
    return (
      <div>
        <StatisticLine text='good' value={good} />
        <StatisticLine text='neutral' value={neutral} />
        <StatisticLine text='bad' value={bad} />
        <StatisticLine text='all' value={good+neutral+bad} />
        <StatisticLine text='average' value={(good-bad)/good+neutral+bad} />
        <StatisticLine text='positive' value={good/(good+neutral+bad)} />
      </div>
    )
  }
  return (
    <div>No statistics given</div>
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
      <Statistics good={good} bad={bad} neutral={neutral} />
    </div>
  )
}

export default App