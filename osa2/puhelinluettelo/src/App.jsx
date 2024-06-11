import { useState } from 'react'

const Person = ({name, number}) => {
  return (
    <p>{name} {number}</p>
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
      <div>filter shown with 
        <input value={searchCondition} onChange={handleSearchChange}/>
      </div>
      <h2>add new</h2>
      <form onSubmit={addPerson}>
        <div>nimi: <input value={newName} onChange={handleNameChange}/></div>
        <div>numero: <input value={newNumber} onChange={handleNumberChange}/></div>
        <div><button type="submit">add</button></div>
      </form>
      <h2>Numbers</h2>
      <div>
        {peopleToShow.map(person => 
        <Person key={person.name} name={person.name} number={person.number} />)}
      </div>
    </div>
  )

}

export default App