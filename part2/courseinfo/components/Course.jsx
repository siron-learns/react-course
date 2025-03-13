const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    {props.parts.map (part => <Part key = {part.id} part={part}/>)}
  </div>
)

const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = (props) => {
  const exercises = props.parts.map(part => part.exercises)
  return (
    <div>
      total of {exercises.reduce((x, y) => x + y, 0)} exercises
    </div>
  )
}

const Course = (props) => {
  return (
    <div>
      <Header course={props.course.name}/>
      <Content parts={props.course.parts}/>
      <Total parts={props.course.parts} />
    </div>
  )
}

export default Course