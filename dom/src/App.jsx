import { useState } from 'react'
import './App.css'
import Header from './components/Header/Header'
import Home from './components/Home/Home'
import Footer from './components/Footer/Footer'
import About from './components/About/About'
import { Outlet } from 'react-router-dom'
import Login from './components/Login/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <Header/>
     <Outlet/>
     <Footer/>
    </>
  )
}

export default App
