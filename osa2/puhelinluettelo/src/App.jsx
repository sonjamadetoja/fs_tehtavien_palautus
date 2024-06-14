import { useState, useEffect } from 'react'
import Contact from './components/Contact'
import Filter from './components/Filter'
import List from './components/List'
import contactService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [searchCondition, setSearchCondition] = useState('')

  useEffect(() => {
    contactService
    .getAll()
    .then((initialPersons) => {
      setPersons(initialPersons)
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
      const replace = window.confirm(`${newName} is already added to phone book. Would you like to replace the old number with a new one?`)
      if (replace) {
        const person = persons.find(p => p.name === newName)
        const changedPerson = {...person, number: newNumber}
        updatePerson(changedPerson)
      }
    } else {
      const personObject = {
        name: newName,
        number: newNumber
      }
      contactService
      .create(personObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const updatePerson = (personObject) => {
    contactService
    .update(personObject)
      .then(returnedPerson =>{
        setPersons(persons.map(person => person.id !== returnedPerson.id ? person : returnedPerson))
        setNewName('')
        setNewNumber('')
      })
  }

  const removePerson = (id) => {
    const name = persons.find(person => person.id === id).name
    if (window.confirm(`Delete ${name}?`)) {
      contactService
      .remove(id)
        .then(deletedPerson => {
          setPersons(persons.filter(person => {
            return person.id !== deletedPerson.id
          }))
        })
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
        <List peopleToShow={peopleToShow} removePerson={removePerson} />
    </div>
  )

}

export default App