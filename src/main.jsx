// import {  StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './Layout'
import Home from '../pages/Home'
import Login from '../pages/Login'
import Dashboard from '../pages/Dashboard'
import Singleblog from '../pages/Singleblog'
import Signup from '../pages/Signup'
import Profile from '../pages/Profile'
import ProtectedRoutes from '../component/ProtectedRoutes'
const router = createBrowserRouter([
  {
   path: "",
   element: <Layout/>,
   children:[
      {
        path:"",
        element: <Home/>
      },
      {
        path: "login",
        element: <Login/>
      },
      {
        path: "signup",
        element: <Signup/>
      },
      {
        path: "dashboard",
        element: <ProtectedRoutes Component={<Dashboard/>}/>
      },
      {
        path: "singleblog/:id",
        element:<Singleblog/> 
       
      },
      {
        path: "profile",
        element: <ProtectedRoutes Component={<Profile/>}/> 
      },
      {
        path: "*",
        element:<p className='text-2xl font-semibold text-center mt-9'>Page is not found</p>
      }
   ] 
  }, 
]
  

)

createRoot(document.getElementById('root')).render(
  
    <RouterProvider router={router} />
  
)
