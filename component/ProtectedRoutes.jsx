import { onAuthStateChanged } from 'firebase/auth';
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { auth } from '../config/firebase/firebaseconfig';
import { Spinner } from 'react-bootstrap';


const ProtectedRoutes = (props) => {
    const [user, setUser] = useState(false);


      // use navigate 
      const navigate = useNavigate()
      useEffect(() => {
          onAuthStateChanged(auth, (user) => {
              if (user) {
                  setUser(true)
                  return
              }
              navigate('/login')
          })
      }, [])

    return (
        user ? props.Component :  <div className="d-flex justify-content-center"><Spinner animation="border" size="lg" /> </div>
    )
}

export default ProtectedRoutes;