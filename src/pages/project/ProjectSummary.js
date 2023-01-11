//style

//react
import { useHistory } from 'react-router-dom';

//component
import Avatar from '../../components/Avatar'
import { useAuthContext } from '../../hooks/useAuthContext'
import { useFirestore } from '../../hooks/useFirestore';

export default function ProjectSummary({project}) {
    const {user} = useAuthContext();
    const {deleteDocument} = useFirestore('projects');
    const history = useHistory()
    console.log(`user uid herer`, user)
    console.log(`project created by id`, project.createdBy.id)
    const handleClick = () => {
        deleteDocument(project.id)
        history.pushState('/')
    }


  return (
    <div>
    <div className='project-summary'>
        <h2 className='page-title'>{project.name}</h2>
        <p>By: {project.createdBy.displayName}</p>
        <p className='due-date'>
            Project due by {project.dueDate.toDate().toDateString()}
        </p>
        <p className='details'>
            {project.details}
        </p>
        <h4>Project assigned to:</h4>
        <div className='assigned-users'>
            {project.assignedUsersList.map(user =>(
                <div key={user.id}>
                    <Avatar src={user.photoURL}/>
                </div>
            ))}
            
        </div>
        </div>
        {user.uid === project.createdBy.id && (
            <button className='btn' onClick={handleClick}> Mark As Complete</button>
        )}
        </div>
  )
}
