import React from 'react'
import { useState } from 'react'
import Canteen_header from '../header/header'
import Canteen_Footer from '../footer/footer'
import './home.css'
import Menu from '../menu/menu'
import ProtectedCanteenRoute from '../../Auth/protectedCanteenRoutes'


const Home = () => {

  const [isOpen, setIsOpen] = useState(false); // Canteen state: false = closed, true = open

  const toggleCanteen = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <div>
      <ProtectedCanteenRoute/>
      <Canteen_header/>
      <div className = "he">
          <div className='mas'>
            <div><h3 className='h'>Check  your menu and update it before open the canteen </h3></div>
            <div className='box'>
                <div style={{marginTop:"6px"}}><h2 className = "tag" >Set your canteen : </h2></div>
                <button className='buttonOpenClose'
                  onClick={toggleCanteen}
                  style={{
                    backgroundColor: isOpen ? "green" : "red",
                  }}
                >
                  {isOpen ? "Open" : "Closed"}
                </button>
            </div>
        </div>
    </div>
      <Menu/>
      <Canteen_Footer/>
    </div>
  )
}

export default Home
