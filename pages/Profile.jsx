import {  getAuth, onAuthStateChanged,  updateProfile  } from "firebase/auth";
import { useEffect,  useRef,  useState } from "react";
import {   useNavigate } from "react-router-dom";
import { app, } from "../config/firebase/firebaseconfig";
import { Button, Card , Form} from "react-bootstrap";
import { BsFillPenFill } from "react-icons/bs";





const Profile = () => {
  const [profileName, setProfileName] = useState({})
  const [changeProfile , setChangeProfile] = useState()
  const navigate = useNavigate()
  const firstName =useRef()
  const lastName =useRef()
 
 
  

  let auth = getAuth(app);
  useEffect(()=>{
    onAuthStateChanged(auth, (user) => {
      if (user) {
       
        setProfileName({
          name: auth.currentUser.displayName,
          email: auth.currentUser.email,
          
        } )
        // ...
      } else {
        console.log("User is signed out");
        navigate('/login')
        
      }
    });

  }, []); 

    console.log(auth);
    
  const changeName =() =>{
    setChangeProfile(true)
    
  };
  const updateName = () =>{
    if( firstName.current.value && lastName.current.value){
    updateProfile(auth.currentUser, {
      displayName: firstName.current.value + lastName.current.value,
     
      
    }).then(() => {
      navigate("/profile")
      setChangeProfile(false)
      firstName.current.value =""
      lastName.current.value = ""
      
      
    }).catch((error) => {
      console.log("update nahi hoi", error);
      
    })
    return
  }
 
    
  }

 
  
    
  
  
  
  



  return (
    <>
    <div className="d-flex justify-content-center mt-5 ">


      <Card className="mb-3 border border-1 shadow pb-4" style={{width:"700px", marginTop: "120px"}}>
        <div className="">
          <Card.Img variant="top" className="mx-4 my-3 rounded-4 object-fit-cover shadow" style={{width: "200px" , height: "200px" }} src="https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg" />
        </div>
          <div className="profilechange mt-4 w-50 ms-4">
            {changeProfile ? <div>
              <Form onSubmit={updateName}>
                <Form.Control type="text" placeholder="Change first name" className="mb-3" ref={firstName}></Form.Control>
                <Form.Control type="text" placeholder="Change last name " className="mb-3" ref={lastName}></Form.Control>
                <Button className=" ms-1 mt-4 " type="submit"> Save Change</Button>
              </Form>
              </div>: <div className=" "> 
              <p className="ms-2 fs-5 fw-semibold">{profileName.name}</p>
              <p className="ms-2 fs-5 fw-semibold">{profileName.email}</p>
              <BsFillPenFill className="profilePen fs-5 mt-3 "  onClick={changeName}/>
                </div> }
          </div>   
            </Card>
    </div>
    
    </>
  )
}

export default Profile