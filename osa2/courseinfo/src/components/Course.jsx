const Course = ({course}) =>
    <div>
    <Header name={course.name} />
    <Content parts={course.parts} />
    <Total parts={course.parts} />
    </div>

const Header = ({ name }) => <h2>{name}</h2>

const Total = ({ parts }) => {
  const total = parts.reduce((accumulator, part) => {return accumulator + part.exercises}, 0)
  return (
    <p><b>Total of {total} exercises</b></p>
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

export default Course