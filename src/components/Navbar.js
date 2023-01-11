//style
import './Navbar.css'
//react
import { Link, } from 'react-router-dom'
//component
import Temple from '../assets/temple.svg'
import {useLogout} from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'
//
export default function Navbar() {
  const {logout, isPending} = useLogout()
  const {user}= useAuthContext()
  return (
    <nav className='navbar'>
        <ul>
            <li className='logo'>
                <Link to='/'>
                  <img src={Temple}
                     alt='dojo-logo'
                     />
                     <span>The Dojo</span>
                </Link>
                     
            </li>

            {!user && (<> 
                <li><Link to='login'>Login</Link></li>
                <li><Link to='signup'>Signup</Link></li>
            </>)}

            {user && (<li>
                {!isPending && <button className='btn'
                        onClick={logout}
                        >Logout</button>}
                {isPending && <button className='btn'disabled
                        >Loading...</button>}
                        

            </li>)}
        </ul>
    </nav>
  )
}
