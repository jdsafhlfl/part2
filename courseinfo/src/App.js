import Course from "./Course"

const App = () => {
  const courses = [
    {
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (
    <div>
      <h1>Web development curriculum</h1>
      {courses.map(course => <Course course={course} key={course.id}/>)}
    </div>
  )
}

// const Course = (props) =>{

//   return (
//     <div>
//       <h2>{props.course.name}</h2>
//       {props.course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
//       {/* already finished exercise 2.3 using reduce function */}
//       <h4>total of {props.course.parts.reduce((sum, cur) => sum = sum + cur.exercises, 0)} exercises</h4>
//     </div>
//   )
// }

export default App