const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
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

  return <Course course={course} />
}

const Course = (props) =>{

  return (
    <div>
      <h1>{props.course.name}</h1>
      {props.course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
      <h4>total of {props.course.parts.reduce((sum, cur) => sum = sum + cur.exercises, 0)} exercises</h4>
    </div>
  )
}

export default App