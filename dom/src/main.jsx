import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, createBrowserRouter, createRoutesFromChildren, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import Home from './components/Home/Home.jsx'
import About from './components/About/About.jsx'
import Contact from './components/Contract/Contact.jsx'
import Login from './components/Login/Login.jsx'
import Signup from './components/Signup.jsx'


const router = createBrowserRouter([
  {
    path: '/',
    element:<App/>,
    children: [
      {
        path:"",
        element:<Home/>
      },
      {
        path:"about",
        element:<About/>
      },
      {
        path:"contact",
        element:<Contact/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"signup",
        element:<Signup/>
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
