

const Person = ({name, number, removePerson}) => {
    const label = "delete"

    return (
      <p>
        {name} {number}
        <button onClick={removePerson}> {label} </button>
      </p>
    )
  }

export default Person