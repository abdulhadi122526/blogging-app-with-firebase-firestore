import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc,  getDocs,   doc, updateDoc, query, where,   } from "firebase/firestore"; 
import { deleteDoc   } from "firebase/firestore"; 
import { useEffect, useRef, useState,  } from "react";
import { useNavigate } from "react-router-dom";
import { app,  auth,  db } from "../config/firebase/firebaseconfig";
import { Button, Card, FloatingLabel, Form, Spinner } from "react-bootstrap";









const Dashboard = () => {
  const title = useRef()
  const description = useRef()
  const [dataArr, setDataArr] = useState([])
  const [loading , setLoading] = useState(false)
  const currentDate = new Date();
  const timeInMs = currentDate.getTime(); 
  const readableDate = currentDate.toLocaleDateString(); 
  const readableTime = currentDate.toLocaleTimeString(); 
  const readableDateTime = currentDate.toLocaleString()
  
 
 
  const navigate = useNavigate()

  useEffect(()=>{
    const auth = getAuth(app);
    onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(uid );
      
      // ...
    } else {
      console.log("User is signed out");
      navigate('/login')
    }
    });

    
    
  }, []);
  
  // blog data
  const sendData  = async () => {
    
      
    console.log(title.current.value);
    console.log(description.current.value);
    const auth = getAuth(app);
    let user = auth.currentUser;

    if(user){
      
      try {
        const docRef = await addDoc(collection(db, `blogs` ), {
          Title : title.current.value,
          Description : description.current.value,
          timeStamp: readableDateTime,
          uid: auth.currentUser.uid,
          UserName: auth.currentUser.displayName,
        });
        
        
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }

    }else{ 
      console.log("no user log in");
     }

    
   
    console.log(dataArr);

    title.current.value =""
    description.current.value =""
  }

  
  // delete blog

  const deleteDocument = async (id) => {
    try {
      const docRef = doc(db, "blogs" , id);
      await deleteDoc(docRef); 
      console.log("Document deleted with ID: ", id);
      setDataArr(dataArr.filter(item => item.id !== id)); 
    } catch (e) {
      console.error("Error deleting document: ", e);
    }
  };
  // edit document
  const editDoc = async (id )=>{
  const editTitle = prompt("Title")
  const editDescription = prompt("Description")
  

  try {
    const docRef = doc(db, "blogs", id);
    
    await updateDoc(docRef, {
      Title: editTitle,
      Description: editDescription, 
    });

    console.log("Document updated with ID: ", id);

    setDataArr(dataArr.map(item => 
      item.id === id ? { ...item, Title: editTitle, Description: editDescription,  } : item
    ));
     
   } catch (e) {
     console.error("Error adding document: ", e);
   }
  }

  // fetching blogs

  useEffect (()=>{
  
    
    const fetchUserBlogs = async () => {
        let user = auth.currentUser;
          if(user){
          try {
            
            const q = query(
              collection(db, "blogs"),
              where("uid", "==", user.uid) 
            );
            const querySnapshot = await getDocs(q);
    
            const blogs = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setDataArr(blogs); 

            
            
          } catch (error) {
            console.error("Error fetching blogs: ", error);
          } finally{
            setLoading(true)
          }
        }else{
          console.log("np user logged in");
          
        }
      };
      fetchUserBlogs()
    },[])







  return (
    <>
      <div className="d-flex justify-content-center" style={{marginTop: "100px"}}>
          <Card  className="w-75 border border-1 shadow">
          <Card.Body className="">
          <FloatingLabel
          controlId="floatingTextarea"
          label="Title"
          className="mb-3 "
        >
          <Form.Control as="textarea" placeholder="Title" ref={title}/>
        </FloatingLabel>
        <FloatingLabel controlId="floatingTextarea2" label="What's your mind">
          <Form.Control 
            minLength="100"
            maxLength='5000'
            ref={description}
            as="textarea"
            placeholder="What's your mind"
            style={{ height: '100px' }}
          />
        </FloatingLabel>
        <Button className="mt-3" onClick={sendData} >Publish blog</Button> 
        
          </Card.Body>
          </Card>
      </div>
      <h2 className="mt-sm-5 " style={{marginLeft: "180px"}}>My Blogs</h2>
          {!loading && !loading ? <div className="d-flex justify-content-center"> <Spinner animation="border" role="status" size="lg">
          <span className="visually-hidden">Loading...</span>
          </Spinner> </div> : null}
        {dataArr && dataArr.sort((a, b) => b.time - a.time) .map((item) =>{
          return  <div key={item.id}>
          <div className="d-flex justify-content-center row  mt-4" >
            <Card className="w-75 mb-3 border border-1">
              <div className="d-flex">
                <Card.Img variant="top" className="m-2 rounded-4 object-fit-cover shadow" style={{width: "100px" , height: "100px" }} src="https://t3.ftcdn.net/jpg/06/33/80/44/360_F_633804450_DWH5bj77LdDwlCSvMcqy6qVk4j9kchT3.jpg" />
                <Card.Title className="mt-3 ms-2 fs-3 "> {item.Title} <br /> <span className="fs-6 text-bg-text" style={{color: "gray"}}>{item.UserName} - {item.timeStamp} </span></Card.Title> 
                
              </div>
              <Card.Body>{item.Description}</Card.Body>
              <div className="  my-3">
              <Button className=" bg-transparent text-primary border border-0 fs-6" onClick={()=>{deleteDocument(item.id)}}> Delete</Button>
              <Button className=" bg-transparent text-primary border border-0 fs-6" onClick={()=>{editDoc(item.id)}}>Edit</Button>
              </div>
              
            </Card>
          </div>
          
          </div>
        })}

        {/* modal */}
        
    </>
  )
}

export default Dashboard