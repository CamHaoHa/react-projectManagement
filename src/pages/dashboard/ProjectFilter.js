//style

//react
// import { useState } from "react"
//component

const filterList = ['all', 'mine', 'development', 'design','marketing', 'sales']

export default function ProjectFilter({currentFilter,changeFilter}) {
  // const [currentFilter, setCurrentFilter] = useState('all')
  

  const handleClick = (newFilter) => {
    changeFilter(newFilter) 
    

  }

  
  return (
    <div className="project-filter">
      <nav>
        <p>Filter By:</p>
        {filterList.map( f => (
          <button key={f}
              onClick={() => handleClick(f)}
              className = {currentFilter === f ? 'active' : ''}>
                {f}
              </button>
        ))}
      </nav>
    </div>
  )
}
