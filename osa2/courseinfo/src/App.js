const Course = ({course}) =>
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>

const Header = ({ name }) => <h1>{name}</h1>

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => {return accumulator + part.exercises}, 0)
  return (
    <p>Number of exercises {total}</p>
  )
}

const Part = ({ part }) => 
  <p>{part.name} {part.exercises}</p>

const Content = ({ parts }) => 
    <div>
        {parts.map(part =>
          <Part key={part.id}
            part={part}
          />
          )}
    </div>

const App = () => {
  const course = {
    name: 'Half Stack application development',
    id: 1,
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return (
    <div>
      <Course course={course} />
    </div>
  )
}

export default App
