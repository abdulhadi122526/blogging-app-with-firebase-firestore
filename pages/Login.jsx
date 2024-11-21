import { Button, Card, Form } from "react-bootstrap"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app } from "../config/firebase/firebaseconfig";


const Login = () => {

  
  const [error, setError] = useState("")

  const email = useRef()
  const password = useRef()
  const navigate = useNavigate()
  
  const login =(e) =>{
    e.preventDefault();

   

    const auth = getAuth(app);
    signInWithEmailAndPassword(auth, email.current.value, password.current.value)
   
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log(user)
      navigate('/dashboard')
    
    
  })
  .catch((error) => {
    const errorCode = error.code;
    let errorMessage = error.message;
    console.log(errorCode , errorMessage);
    if(errorCode === "auth/invalid-email"){
      errorMessage = "Invalid email"
    }else if(errorCode === "auth/missing-password"){
      errorMessage = " Please enter your password"
    }else if(errorCode === "auth/invalid-credential"){
      errorMessage = "Incorrect password"
    }
    setError(errorMessage)
    
  });
  }

 



  return (
    <div className="bg-light" style={{paddingBottom: "140px"}}>

    <div className="page-header bg-white " style={{height: "70px" , marginTop: "90px"}}>
      <h2 className="pt-2 ms-5  ">Login Your Account</h2>
    </div>

    {/* form */}
    <div className="signup-form d-flex justify-content-center" style={{marginTop: "90px"}}>
      <Card style={{ width: '500px' }} className="border border-0 shadow">
        <Card.Body className="d-flex justify-content-center">
          <Form style={{marginTop: "30px"}} onSubmit={login}>
          <Form.Control type="email" placeholder="Email" style={{width: "300px"}}  className="mt-4" ref={email}/>
          <Form.Control type="Password" placeholder="Password" style={{width: "300px"}} className="mt-4" ref={password}/>
          <p style={{color: 'red' , marginLeft: "10px"}}>{error}</p>
          
          <Button type="submit" className="primary mt-4" style={{marginLeft: "35%", marginBottom: "30px"}}>Login</Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
    </div>
  )
}

export default Login;