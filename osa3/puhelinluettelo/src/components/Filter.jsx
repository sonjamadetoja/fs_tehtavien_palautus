const Filter = ({searchCondition, handleSearchChange}) => {
    return (
      <div>filter shown with 
        <input value={searchCondition} onChange={handleSearchChange}/>
      </div>
    )
  }

  export default Filter