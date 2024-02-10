import React from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import { Outlet } from 'react-router-dom'

const App = () => {
  return (
    <>
      <Header/>

      <main className="p-8 min-h-[90vh]">
        <Outlet/>
      </main>
      
      <Footer/>
    </>
  )
}

export default App