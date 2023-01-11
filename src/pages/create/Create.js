//style
import './Create.css'

//react
import {useEffect, useState} from 'react'
import Select from 'react-select'
import { useHistory } from 'react-router-dom'
//components
import {useCollection} from '../../hooks/useCollection'
import {useAuthContext} from '../../hooks/useAuthContext'
import { timestamp } from '../../firebase/config'
import {useFirestore} from '../../hooks/useFirestore'
//options for project categories
const categories = [
  {value:'development', label: 'Development'},
  {value:'design', label: 'Design'},
  {value:'sales', label: 'Sales'},
  {value:'marketing', label: 'Marketing'},
]

export default function Create() {
  //fetch users from firebase
  const {documents } = useCollection('users')
  const {addDocument, response} = useFirestore('projects')
  const history = useHistory()
  const {user} = useAuthContext()
  //user initial state
  const [users, setUsers] = useState([])
  //form fields values
  const [name, setName ] = useState('')
  const [details, setDetails] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [category, setCategory] = useState('')
  const [assignedUsers, setAssignedUsers] = useState([])
  // error state 
  const [formError, setFormError] = useState(null)

  // create user values for react-select
  useEffect(() => {
    if(documents) {
      setUsers(documents.map(user => {
        return {
          value: {...user, id:user.id},
          label: user.displayName
        }
      }))
    }
  }, [documents])
  //form submit function
  const handleSubmit = async(e) => {
    e.preventDefault()
    setFormError(null)
    if(!category) {
      setFormError('Please select a project category')
      return
    }

    if(assignedUsers.length < 1) {
      setFormError('Please assign the project to at least one user')
      return
    }

    //
     const assignedUsersList = assignedUsers.map(user =>{
      return {
        displayName: user.value.displayName,
        photoURL: user.value.photoURL,
        id: user.value.id
      }
     })
    //

    const createdBy = {
      displayName: user.displayName,
      photoURL: user.photoURL,
      id: user.uid
    }

    //
    const project = {
      name,
      details,
      assignedUsersList,
      category: category.value,
      dueDate: timestamp.fromDate(new Date(dueDate)),
      createdBy,
      comments:[]
    }
    await addDocument(project)
    console.log(project)
    console.log(response)
    if(!response.error){
      history.push('/')
    }
  }
  return (
    <div className='create-form'>
      <h2 className='page-title'>Create a new Project</h2>
      <form onSubmit={handleSubmit}>
        {/* project name input  */}
        <label>
          <span>Project name:</span>
          <input 
            required
            type='text'
            onChange={(e) => setName(e.target.value)}
            value={name}
            />
        </label>

        {/* project details input   */}
        <label>
          <span>Project details:</span>
          <textarea 
            required
            onChange={(e)=> setDetails(e.target.value)}
            value={details}
            ></textarea>
        </label>
        
        {/* project due date  */}
        <label>
          <span>Set Due date:</span>
          <input 
            required
            type='date'
            onChange={(e)=> setDueDate(e.target.value)}
            value={dueDate}
            />
        </label>

        {/* project category  */}
        <label>
          <span>Project Category:</span>
          <Select
            onChange={(option)=> setCategory(option)}
            options = {categories}
            />
        </label>

        {/* project assign to which user  */}
        <label>
          <span>Assign to:</span>
          <Select
            onChange={(option)=> setAssignedUsers(option)}
            options = {users}
            isMulti
            />  
        </label>
        
        <button className='btn'>Add Project</button>

        {formError && <p className='error'>{formError}</p>}
      </form>
    </div>
  )
}
