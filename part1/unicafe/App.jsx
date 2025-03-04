import React from 'react'
import { useState } from 'react'

const Header = (props) => {
  // header 
  return (
    <div>
      <h1>{props.title}</h1>
      </div>
  )
}

const Button = (props) => {
  return (
    <div>
      <button onClick={props.onClick}>{props.text}</button>
    </div>
  )
}

const StatisticLine = (props) => {
  // display statistics 
  return (
    <div>
      <p>{props.text} {props.value}</p>
    </div>
  )
}

const Statistics = (props) => {
  // basic voting statistics
  const sumVotes = props.good + props.neutral + props.bad

  if (sumVotes == 0){
    // return when no feedback is given 
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  {  
    return (
      <div>
        <table>
          <tbody>
            <tr>
              <td>good</td>
              <td>{props.good}</td>
            </tr>
            <tr>
              <td>neutral</td>
              <td>{props.neutral}</td>
            </tr>
            <tr>
              <td>bad</td>
              <td>{props.bad}</td>
            </tr>
            <tr>
              <td>all</td>
              <td>{sumVotes}</td>
            </tr>
            <tr>
              <td>average</td>
              <td>{(props.good-props.bad)/sumVotes} </td>
            </tr>
            <tr>
              <td>positive %</td>
              <td>{props.good/sumVotes}</td>
            </tr>
            </tbody>
        </table>
      </div>
  )}
}

const App = () => {
  const title1 = 'give feedback'
  const title2 = 'statistics'
  const [countGood, setCountGood] = useState(0)
  const [countNeutral, setCountNeutral] = useState(0)
  const [countBad, setCountBad] = useState(0)

  const handleGoodClicks = () => {setCountGood(countGood + 1)}
  const handleBadClicks = () => {setCountBad(countBad + 1)}
  const handleNeutralClicks = () => {setCountNeutral (countNeutral + 1)}

  return (
    <div>
      <Header title={title1}/>
      <Button onClick={handleGoodClicks} text='good'/>
      <Button onClick={handleNeutralClicks} text='neutral'/>
      <button onClick={handleBadClicks}>bad</button>
      <Header title={title2} />
      <Statistics good={countGood} neutral={countNeutral} bad={countBad} />
    </div>

  )
}

export default App