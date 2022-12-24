import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    const ifFind = names.includes(newName)
    if (ifFind === true){
      alert(newName + ' is already added to phonebook')
    }else{
      setPersons(persons.concat({name:newName, number:newNumber}))
    }
    setNewName('')
    setNewNumber('')
  }

  const handleNewName = (event) =>{
    setNewName(event.target.value)
  }

  const handleNewNumber = (event) =>{
    setNewNumber(event.target.value)
  }

  const handleFilter = (event) =>{
    setFilter(event.target.value)
  }

  const filterPersons = persons.filter(p => p.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with    
        <input value={filterName} onChange={handleFilter} />
      </div>
      <h2>add a new</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleNewName} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNewNumber} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {filterPersons.map(p => <p key={p.name}>{p.name} {p.number} </p>)}
    </div>
  )
}

export default App