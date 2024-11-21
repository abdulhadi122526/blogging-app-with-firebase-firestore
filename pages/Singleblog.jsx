import { collection, query, where } from "firebase/firestore";
import { db } from "../config/firebase/firebaseconfig";
import { Link, useParams } from "react-router-dom";
import {  getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import {  Card, Spinner } from "react-bootstrap";

const Singleblog = () => {
  const [singleUser , setSingleUser] = useState([])
  const [profilePic, setProfilePic] = useState({})
  const [loading , setLoading]= useState(false)
  const {id} = useParams()
  console.log(id);
  
  
  useEffect(()=>{
    const blogArr = [];
    const q = query(collection(db, "blogs"), where("uid", "==", id));

    const singleUserData = ()=>{
      
      getDocs(q) 
      .then((querySnapshot)=>{
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          blogArr.push({ ...doc.data()})
          setSingleUser(blogArr)
          setProfilePic(doc.data())
          setLoading(true)
          
          console.log(doc.data());
        }) ;
        
      }).catch((err)=>{
        console.log(err);
        
      })
      
      console.log(profilePic);
      
    
      
     
    
    }
    
    
    
    singleUserData()


  },[])



 



  return (
    <>

          
           
        
              
            

          
          
          {!loading && !loading ? <div className="d-flex justify-content-center" style={{marginTop: "100px"}}> <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
            </Spinner> </div>:  <div className=" d-flex justify-content-center" style={{marginTop: "100px"}}>
          <p className="fs-2 fw-semibold ms-2 ">{`${profilePic.UserName}'s blogs`}</p>
          </div>}
           {singleUser && singleUser.map((item , index )=>{
             return <div key={index} className=" container mt-5 d-flex justify-content-center" style={{gap: "70px"}}>
            
          <div className="col-lg-10  mt-2" >
          <Card className=" mb-3 border border-1">
          <div className="d-flex">
            <Card.Img variant="top" className="m-2 rounded-4 object-fit-cover shadow" style={{width: "100px" , height: "100px" }} src="https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg" />
            <Card.Title className="mt-4 fs-3 "> {item.Title} <br /> <span className="fs-6 text-bg-text" style={{color: "gray"}}>{item.UserName} - {item.timeStamp} </span></Card.Title>             
          </div>
          <div className=" my-3">
            <Card.Body className="fs-5">{item.Description}</Card.Body>
          <Link to={"/"} className=" bg-transparent text-primary border border-0 fs-6 ms-3 text-decoration-none" >Go to Home page</Link>
          </div>
        </Card>
        </div>
        
           
        
        </div>

      })}

    
    </>
          
        
          
         
    
    
  )
}

export default Singleblog