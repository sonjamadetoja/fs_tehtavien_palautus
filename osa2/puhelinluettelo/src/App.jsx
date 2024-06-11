import { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
  )
}

const Filter = ({searchCondition, handleSearchChange}) => {
  return (
    <div>filter shown with 
      <input value={searchCondition} onChange={handleSearchChange}/>
    </div>
  )
}

const Contact = ({addPerson, newName, handleNameChange, newNumber, handleNumberChange}) => {
  return (
    <form onSubmit={addPerson}>
    <div>name: <input value={newName} onChange={handleNameChange}/></div>
    <div>number: <input value={newNumber} onChange={handleNumberChange}/></div>
    <div><button type="submit">add</button></div>
  </form>
  )
}

const List = ({peopleToShow}) => {
  return (
    <div>
      {peopleToShow.map(person => 
      <Person key={person.name} name={person.name} number={person.number} />)}
    </div>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCondition, setSearchCondition] = useState('')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleSearchChange = (event) => {
    setSearchCondition(event.target.value)
  }

  const addPerson = (event) => {
    event.preventDefault()
    if (persons.some(p => p.name === newName)) {
      const msg = `${newName} on jo lisätty puhelinluetteloon`
      alert(msg)
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  const peopleToShow = persons.filter(p => p.name.toLowerCase().includes(searchCondition.trim().toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
        <Filter searchCondition={searchCondition} handleSearchChange={handleSearchChange} />
      <h2>Add new</h2>
        <Contact addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />
      <h2>Numbers</h2>
        <List peopleToShow={peopleToShow} />
    </div>
  )

}

export default App