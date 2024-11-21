import { Outlet } from "react-router-dom"
import NavBar from "../component/Navbar"
import 'bootstrap/dist/css/bootstrap.min.css';



const Layout = () => {

  
  
  return (
    <div>
        
        <NavBar key={location.pathname}/>
        <Outlet/>
    </div>
  )
}

export default Layout