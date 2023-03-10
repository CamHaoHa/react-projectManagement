//style
import './Sidebar.css';
import { NavLink } from 'react-router-dom';

//component
import DashBoardIcon from '../assets/dashboard_icon.svg';
import AddIcon from '../assets/add_icon.svg';
import Avatar from './Avatar'
import { useAuthContext } from '../hooks/useAuthContext';
//
export default function Sidebar() {
    const { user } = useAuthContext();
    return (
    <div className="sidebar">
        <div className="sidebar-content">
            <div className="user">
                <Avatar src={user.photoURL} />
                <p> Hey {user.displayName}</p>
            </div>
            <nav className="links">
                <ul>
                    <li>
                        <NavLink exact to="/">
                            <img src={DashBoardIcon} alt="dashboard icon" />
                            <span>DashBoard</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="create">
                            <img src={AddIcon} alt="add project icon" />
                            <span>New Project</span>
                        </NavLink>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
  )
}

