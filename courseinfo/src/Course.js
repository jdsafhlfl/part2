const Course = (props) =>{

    return (
      <div>
        <h2>{props.course.name}</h2>
        {props.course.parts.map(part => <p key={part.id}>{part.name} {part.exercises}</p>)}
        {/* already finished exercise 2.3 using reduce function */}
        <h4>total of {props.course.parts.reduce((sum, cur) => sum = sum + cur.exercises, 0)} exercises</h4>
      </div>
    )
  }

export default Course