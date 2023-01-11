//style
import './App.css'
//react
import { BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
//component
import Dashboard from './pages/dashboard/Dashboard'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'
import Create from './pages/create/Create'
import Project from './pages/project/Project'
import Navbar from './components/Navbar'
import Sidebar from './components/Sidebar'
import OnlineUsers from './components/OnlineUsers';
import { useAuthContext } from './hooks/useAuthContext';
//
function App() {
  const {authIsReady, user} = useAuthContext();
  return (
    <div className="App">
      {authIsReady && (<BrowserRouter>
      {user && <Sidebar />}
      <div className="container">
        
        <Navbar />
        <Switch>
            <Route exact path="/">
              {user &&<Dashboard />}
              {!user && <Redirect to ="/login" />}
            </Route>
            <Route path="/create">
              {user && <Create />}
              {!user && <Redirect to ="/login" />}
            </Route>
            <Route path="/login">
              {user && <Redirect to="/" />}
              {!user && <Login />}
            </Route>
            <Route path="/signup">
              {user && <Redirect to="/" />}
              {!user && <Signup />}
            </Route>
            <Route path="/projects/:id">
              {user && <Project />}
              {!user && <Redirect to ="/login" />}
            </Route>
          </Switch>
      </div>
      {user && <OnlineUsers />}
      </BrowserRouter>)}
    </div>
  );
}

export default App
//pages

//dashboard

//login

//signup

//create

//project