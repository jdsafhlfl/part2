import { useEffect, useState } from 'react'
import phoneServices from './services'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setFilter] = useState('')


  useEffect(() => {
    phoneServices.getPhonenote()
      .then(response => {
        setPersons(response.data)
      })
  }, [])

  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(p => p.name)
    const ifFind = names.includes(newName)
    if (ifFind === true) {
      const existPerson = persons.find(p => p.name === newName)
      if(existPerson.number === newNumber){
        alert(newName + ' is already added to phonebook')
      }else{
        if(window.confirm(newName+" is already added to phonebook, replace the old number with a new one?")){
          phoneServices.updatePhonenote(existPerson.id, {name:newName, number:newNumber})
                       .then(response =>{
                        setPersons(persons.map(p => p.id===existPerson.id? response.data : p))
                       })
        }
      }
    } else {
      const newPerson = { name: newName, number: newNumber }
      phoneServices.addPhonenote(newPerson)
        .then(response => {
          setPersons(persons.concat(response.data))
        })
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
      <Persons filterPersons={filterPersons} allPersons={persons} setPersons={setPersons} />
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

  const deletePerson = (name) => {
    if (window.confirm("Delete " + name+"?")) {
      const deletePerson = props.allPersons.find(p => p.name === name)
      const remainPerson = props.allPersons.filter(p => p.name !== name)
      phoneServices.deletePhonenote(deletePerson.id)
                   .then(()=>{
                    props.setPersons(remainPerson)
                   })
    }
  }

  return (
    props.filterPersons.map(p => <p key={p.name}>{p.name} {p.number} <button onClick={function () { deletePerson(p.name) }}>delete</button> </p>)
  )
}

export default App