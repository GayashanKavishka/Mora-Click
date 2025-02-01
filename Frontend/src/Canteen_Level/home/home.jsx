import React from 'react'
import { useState ,useEffect } from 'react'
import Canteen_header from '../header/header'
import Canteen_Footer from '../footer/footer'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import './home.css'
import Menu from '../menu/menu'




const Home = () => {

  const [isOpen, setIsOpen] = useState(false); // Canteen state: false = closed, true = open

  const[canteenid,setCanteenid] = useState(jwtDecode(localStorage.getItem('token')).canteen_id);
  const[canteenName , setCanteenName] = useState('');
  const [cover, setCover] = useState(false);

  const toggleCanteen = async () => {
    const newstatus = isOpen ? false : true; // Ensure true is sent when open
    try {
      const res = await axios.put(
        'http://localhost:5000/canteen/updatecanteenstatus',
        {
          _id: canteenid,
          status: newstatus, // This will be true when canteen is open
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (res.status === 200) {
        console.log("Canteen status updated:", newstatus);
        setIsOpen(newstatus);
      }
    } catch (err) {
      console.log("Error updating canteen status:", err);
    }
  };
  
  useEffect(() => {
    axios.get(`http://localhost:5000/canteen/getcanteen/?_id=${canteenid}`)
    .then((res) => {
      setCanteenName(res.data.data[0].name)
      setCover(res.data.data[0].cover)
      setIsOpen(res.data.data[0].open)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [canteenid]);



  return (
    <div>
      <Canteen_header   canteenName={canteenName} canteenId = {canteenid}/>
      <div className = "he" style={{backgroundImage: `url(${cover})`}}>
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
      <Menu canteenId={canteenid}  />
      <Canteen_Footer/>
    </div>
  )
}

export default Home
