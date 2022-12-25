import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')


  useEffect( () => {
    axios.get('http://localhost:3001/persons')
         .then(response => {
          setPersons(response.data)
         })
  },[])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    const ifFind = names.includes(newName)
    if (ifFind === true) {
      alert(newName + ' is already added to phonebook')
    } else {
      setPersons(persons.concat({ name: newName, number: newNumber }))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) => {
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) => {
    setFilter(event.target.value)
  }

  const filterPersons = persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filterName} function={handleFilter} />
      <h2>Add a new</h2>
      <PersonForm name={newName} num={newNumber} nameFunc={handleNewName} numFunc={handleNewNumber} subFunc={addPerson} />
      <h2>Numbers</h2>
      <Persons filterPersons={filterPersons} />
    </div>
  )
}

const Filter = (props) => {
  return (
    <div>
      filter shown with
      <input value={props.value} onChange={props.function} />
    </div>
  )
}

const PersonForm = (props) => {
  return (
    <form onSubmit={props.subFunc}>
      <div>
        name: <input value={props.name} onChange={props.nameFunc} />
      </div>
      <div>
        number: <input value={props.num} onChange={props.numFunc} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const Persons = (props) => {
  return (
    props.filterPersons.map(p => <p key={p.name}>{p.name} {p.number}</p>)
  )
}

export default App