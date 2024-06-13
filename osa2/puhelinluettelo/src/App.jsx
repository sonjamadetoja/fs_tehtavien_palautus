import { useState, useEffect } from 'react'
import axios from 'axios'
import Contact from './components/Contact'
import Filter from './components/Filter'
import List from './components/List'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCondition, setSearchCondition] = useState('')

  useEffect(() => {
    axios
    .get('http://localhost:3001/persons')
    .then((response) => {
      setPersons(response.data)
    })
  }, [])

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