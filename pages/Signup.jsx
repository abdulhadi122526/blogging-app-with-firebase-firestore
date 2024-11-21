import { Button, Card, Form } from "react-bootstrap"
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { app,  } from "../config/firebase/firebaseconfig";


const Signup = () => {
  const [error, setError] = useState();
  const [firsNnameError, setFirstNameError]= useState(" ")
  const [lastNameError, setLastNameError]= useState(" ")
  const [rePassError, setRePassError]= useState(" ")
 
  

  const email = useRef()
  const password = useRef()
  const rePassword = useRef()
  const firstName = useRef()
  const lastName = useRef()
  const navigate = useNavigate()
  
  
  const signup = async (e) => {
    e.preventDefault()
    if (!firstName.current.value) {
      setFirstNameError("Enter your first name")
      console.log(firsNnameError);
      
     
    }else if (!lastName.current.value){
      setLastNameError("Enter your last name")
      
    }else if (rePassword.current.value !== password.current.value){
      setRePassError("your repeat password is incorrect")
     return 
    }

   
   

    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, email.current.value, password.current.value, rePassword.current.value)
    .then((userCredential) => {
      const user = userCredential.user;
      
      updateProfile(user, {
        displayName: `${firstName.current.value} ${lastName.current.value}`
        
      })
      
      navigate("/login")
      console.log(user);
    })
    
    .catch((error) => {
        let errorMessage = error.message;
        const errorCode = error.code;
        if(errorCode === "auth/invalid-email"){
          errorMessage = "Invalid email address"
        }else if(errorCode === "auth/missing-email"){
          errorMessage = " missing email"
        }else if(errorCode === "auth/weak-password"){
          errorMessage = " Password should be at least 6 characters"
        }else if(errorCode === "auth/missing-password"){
          errorMessage = " Missing password"
        }
        
        setError(errorMessage)
        console.log(errorMessage)
        console.log(errorCode)
        
        
    });


        
    

  }
  





  return (
    <div className="bg-light" style={{paddingBottom: "30px"}}>

    <div className="page-header bg-white" style={{height: "70px" ,  marginTop: "90px"}}>
      <h2 className="pt-2 ms-5">Sign up Your Account</h2>
    </div>

    {/* form */}
    <div className="signup-form d-flex justify-content-center" style={{marginTop: "50px"}}>
      <Card style={{ width: '500px' }} className="border border-0 shadow">
        <Card.Body className="d-flex justify-content-center">
          <Form style={{marginTop: "30px"}} onSubmit={signup}>
          <Form.Control type="text" placeholder="First Name" style={{width: "300px"}}  id="firstName mt-4" ref={firstName}/>
          <p style={{color: 'red'  , marginLeft: "10px"}}>{firsNnameError}</p>   
          <Form.Control type="text" placeholder="First Name" style={{width: "300px"}}   className="mt-4" ref={lastName}/>
          <p style={{color: 'red'  , marginLeft: "10px"}}>{lastNameError}</p>  
          <Form.Control type="email" placeholder="Email" style={{width: "300px"}}  className="mt-4" ref={email} />
          <Form.Control type="Password" placeholder="Password" style={{width: "300px"}} className="mt-4" ref={password}/>
          <Form.Control type="Password" placeholder="Repeat Password" style={{width: "300px"}} className="mt-4" ref={rePassword}/>
          <p style={{color: 'red'  , marginLeft: "10px"}}>{rePassError}</p>  
          <p style={{color: 'red'}}>{error}</p>
          <Button type="submit" className="primary mt-4" style={{marginLeft: "35%", marginBottom: "30px"}}>Signup</Button>
          </Form>
          
        </Card.Body>
      </Card>
    </div>
    </div>
  )
}

export default Signup