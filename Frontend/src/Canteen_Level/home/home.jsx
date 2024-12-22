import React from 'react'
import { useState ,useEffect } from 'react'
import Canteen_header from '../header/header'
import Canteen_Footer from '../footer/footer'
import './home.css'
import Menu from '../menu/menu'
import ProtectedCanteenRoute from '../../Auth/protectedCanteenRoutes'
import { jwtDecode } from 'jwt-decode'
import axios from 'axios'


const Home = () => {

  const [isOpen, setIsOpen] = useState(false); // Canteen state: false = closed, true = open
  const [canteenId, setCanteenId] = useState(jwtDecode(localStorage.getItem('token')).canteen_id);
  const [usename, setUsername] = useState(jwtDecode(localStorage.getItem('token')).username);
  const [role, setRole] = useState(jwtDecode(localStorage.getItem('token')).role);


  const [canteenName, setCanteenName] = useState("");
  const [cover, setCover] = useState("");


  const toggleCanteen = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const getcanteen = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/canteen/getcanteen/?_id=${canteenId}`);
        console.log(response.data.data[0].name);
        setCanteenName(response.data.data[0].name);
        setCover(response.data.data[0].cover);
        console.log(canteenName);
        // const canteen = response.data.data[0];
        
      } catch (error) {
        console.error('Error fetching canteen:', error);
      }
    };

    getcanteen();
  }, [canteenId]);

  return (
    <div>
      <ProtectedCanteenRoute/>
      <Canteen_header canteenName={canteenName} />
      <div className = "he" style = {{ "backgroundImage": `url(${cover})`}}>
          <div className='mas'>
            <div><h3 className='h'>Cheack  your menu and update it before open the canteen </h3></div>
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
      <Menu canteenId = {canteenId}/>
      <Canteen_Footer/>
    </div>
  )
}

export default Home
