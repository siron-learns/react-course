import { useState, useEffect } from 'react'
import axios from 'axios'
import noteService from './services/notes'
import './index.css'

const Number = (props) => {
  return(
    <div>
      {props.names.map(x => <p key={Math.random()}>{x.name} {x.number} <button onClick={() => props.handler(x.id)}>delete</button></p>)}
    </div>
  )
}

const Notification = ({ message }) => {
  if (message === null){
    return null
  }

  return (
    <div className='error'>
      {message}
    </div>
  )
}


const App = () => {
  // main App
  const [persons, setPersons] = useState([]) 
  const [persons2, setPersons2] = useState([]) // used as backup for searching
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [search, setSearch] = useState('')
  const [message, setMessage] = useState('')

  // fetching data from server
  const Hook = () => {
    noteService
      .getAll()
      .then(response => {
        console.log('promise fulfilled')
        setPersons(response.data)
        setPersons2(response.data)
      }
    )
  }
  useEffect(Hook, [])

  // handler to add name and number
  const addNameNumber = (event) => {
    event.preventDefault()
    const names = persons.map(x => x.name)
    const personObject = {
      name: newName,
      number: newNumber,
    }
    if (names.includes(newName)){
      alert(`${newName} is already added to phonebook, replace the old number with a new one?`)
      const index = persons.findIndex(x => x.name === newName)
      updatePerson(persons[index].id)
    }
    else {
      // push new object to server
      axios
      .post('http://localhost:3001/persons', personObject)
      .then(response => {
        console.log(response)
        setPersons(persons.concat(personObject))
        setMessage(`Added ${newName}`)
    })
    }
  }

  // delete data from server
  const deleteNote = (id) => {
    const ids = persons.map(person => person.id)
    const names = persons.map(person => person.name)
    const index = ids.findIndex(x => x === String(id))
    // window to confirm
    confirm(`Delete ${names[index]} ?`)
    noteService.del(id).then(() => {
      console.log(`Deleted name/number with id ${id}`)
      persons.slice(index, 1)
      console.log('AFTEE DELETING', persons)
      setPersons(persons)
    })
  }

  // update data on server
  const updatePerson = (id) => {
    const person = persons.find(person => person.id === id)
    const changedPerson = {...person, number: newNumber}
    console.log('CHANGED PERSON', changedPerson)
    noteService
      .update(id, changedPerson)
      .then(response => {
        setPersons(persons.map(person => person.id === id ? response.data: person))
    })
  }

  // handler to filter search
  const addFilteredSearch = (event) => {
    event.preventDefault()
    const names = persons2.map(x => x.name)
    const newPersons = []
    for (let i=0; i<persons2.length; ++i){
      if(names[i].toLowerCase().includes(search.toLowerCase())){
        newPersons.push(persons2[i])
      }
    }
    setPersons(newPersons)
  }

  // set new name
  const handleNameChange = (event) => {
    // event.preventDefault()
    setNewName(event.target.value)
  }

  // set new number
  const handleNumberChange = (event) => {
    // event.preventDefault()
    setNewNumber(event.target.value)
  }

  // set search filter
  const handleFilter = (event) => {
    //event.preventDefault()
    setSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <form onSubmit={addFilteredSearch}>
        <div>
          filter shown with <input value={search} onChange={handleFilter}></input>
        </div>
      </form>
      <h2>add a new</h2>
      <form onSubmit={addNameNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
        <Number names={persons} handler={deleteNote}/>
    </div>
  )
}

export default App