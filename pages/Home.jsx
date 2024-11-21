
import { collection, getDocs } from "firebase/firestore";
import { app, db } from "../config/firebase/firebaseconfig";
import { useEffect, useState } from "react";
import { Button, Card, Spinner } from "react-bootstrap";
import { getAuth } from "firebase/auth";
import { useNavigate } from "react-router-dom";
const Home = () => {
  const [allData , setAllData] = useState([])
  const dataArr = [];
  const [loading , setLoading ] = useState(false)
  const [error , setError] = useState(true)

// fetch data from firebase
  useEffect(()=>{
  const getAllData = async ()=>{
    
  try {
      const querySnapshot = await getDocs(collection(db, "blogs"));
      querySnapshot.forEach((doc) => {
        dataArr.push(doc.data())
        setAllData(dataArr)
        console.log(dataArr);
        
      });
    } catch (error) {
      console.log(error);
      setError(false)
    } finally{
      setLoading(true)
    }
  }
  console.log(allData);
  
  getAllData()
},[])

// see user blog btn
const auth = getAuth(app)

  // navigate
  const navigate = useNavigate()

const singleUserBlog = (item) =>{
  if(!auth.currentUser){
    console.log("user login nahi hai");
    
  }
  console.log("user login hai" , item);
  navigate(`/singleblog/${item.uid}`)
}
    


  return (
    <>
        <div className="page-header bg-white " style={{height: "70px"}}>
        <h2 className="pt-3 ms-5 ">All Blogs</h2>
        </div>
           {/* blog card */}
           {!loading && !loading ? <div className="d-flex justify-content-center mt-5"> <Spinner animation="border" role="status" size="lg">
            <span className="visually-hidden">Loading...</span>
            </Spinner> </div> : null}
            {!error && <h1 className="text-center">Internal server error!</h1>}
         {allData && allData.map((item , index )=>{
          return <div key={index} className="mt-5">
            <div className="d-flex justify-content-center row  mt-2" >
        <Card className="w-75 mb-3 border border-1 shadow">
          <div className="d-flex">
            <Card.Img variant="top" className="m-2 rounded-4 object-fit-cover shadow" style={{width: "100px" , height: "100px" }} src="https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg" />
            <Card.Title className="mt-3 ms-2 fs-3 "> {item.Title} <br /> <span className="fs-6 text-bg-text" style={{color: "gray"}}>{item.UserName} - {item.timeStamp} </span></Card.Title> 
            
          </div>
          <Card.Body>{item.Description}</Card.Body>
          <div className="  my-3">
          <Button className=" bg-transparent text-primary border border-0 fs-6" onClick={()=>{singleUserBlog(item)}}>See all blogs of {item.UserName}</Button>
          
          </div>
          
        </Card>
      </div>
        
          </div>
         })}         
         
        
        
    
    
    </>
  )
}

export default Home