import {  getAuth, onAuthStateChanged, signOut,  } from "firebase/auth";
import { useEffect, useState } from "react"
import { Container, Nav } from "react-bootstrap"
import { Navbar } from "react-bootstrap"
import { Link, useLocation, } from "react-router-dom"
import { app } from "../config/firebase/firebaseconfig"






const NavBar = () => {
  const [isLoggedOut , setIsLoggedOut] = useState()
  const[userName , setUserName] = useState('');
  const location = useLocation()
  const auth = getAuth(app);
  console.log(location.pathname);

    // Track user state & display user name 
    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (user) {
          setUserName(user.displayName || "User"); 
          setIsLoggedOut(true);
        } else {
          setIsLoggedOut(false);
          setUserName("");
        }
      });
      return () => unsubscribe(); 
    }, [auth]);
  
    useEffect(()=>{
    // change navbar item base of location
      if(location.pathname === "/dashboard" || location.pathname === " "|| location.pathname ==="/profile" ){
        setIsLoggedOut(true)  
      } else if (location.pathname === "/login"){
        setIsLoggedOut(false) 
        return
      }
    },[location ])

    // sign out
    const logOut = () =>{
    signOut(auth).then(() => {
      console.log("Sign-out successful");
        
      }).catch((error) => {
        console.log(error);
        
      });
   }
  

    
    
  

 
 
  

  

  return (
    <>
       <Navbar expand="lg" style={{ backgroundColor: "#7749F8", height: "auto" }} className="position-fixed top-0 w-100 z-2">
      <Container>
        <Navbar.Brand href="/" className="text-white fs-3">Blogging App</Navbar.Brand>   
        {/* Toggle button for small screens */}
        <Navbar.Toggle aria-controls="navbar-responsive" />
        <Navbar.Collapse id="navbar-responsive" className="justify-content-end">
          <Nav>
            
          <Link className="text-white text-decoration-none ms-4 mt-2" to="/">
              Home
            </Link>
             {isLoggedOut?  <Link className="text-white text-decoration-none ms-4 mt-2" to="dashboard">
              Dashboard
            </Link> : false}
           
            {!isLoggedOut ? <Link className="text-white text-decoration-none ms-4 mt-2" to="login">
              Login
            </Link> : <Link className="text-white text-decoration-none ms-4 mt-2" to="login" onClick={logOut}>
              Logout
            </Link> }
            {!isLoggedOut ? <Link className="text-white text-decoration-none ms-4 mt-2" to="signup">
              Signup
            </Link> : false}
            {isLoggedOut && isLoggedOut ? <Link to="profile" className="text-light fs-5 text-decoration-none ms-4 mt-1 fw-light"> {userName}</Link> : null }
          </Nav>
        </Navbar.Collapse>
      </Container>
    
    </Navbar>

    
    </>
  )
}

export default NavBar