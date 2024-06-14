import Person from './Person'

const List = ({peopleToShow, removePerson}) => {

    return (
      <div>
        {peopleToShow.map(person => 
        <Person key={person.name} name={person.name} number={person.number} removePerson={() => removePerson(person.id)} />)}
      </div>
    )
  }

export default List