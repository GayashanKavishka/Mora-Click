import React from 'react'
import { useState ,useEffect } from 'react'
import Canteen_header from '../header/header'
import Canteen_Footer from '../footer/footer'
import axios from 'axios'
import { jwtDecode } from 'jwt-decode'
import './home.css'
import Menu from '../menu/menu'
import ProtectedCanteenRoute from '../../Auth/protectedCanteenRoutes'
import { useNavigate } from 'react-router-dom'


const Home = () => {

  const [isOpen, setIsOpen] = useState(false); // Canteen state: false = closed, true = open

  const[canteenid,setCanteenid] = useState(jwtDecode(localStorage.getItem('token')).canteen_id);
  const[canteenName , setCanteenName] = useState('');
  const [cover, setCover] = useState(false);

  const navigate = useNavigate();

  const toggleCanteen = () => {
    setIsOpen((prevState) => !prevState);
  };

  useEffect(() => {
    axios.get(`http://localhost:5000/canteen/getcanteen/?_id=${canteenid}`)
    .then((res) => {
      setCanteenName(res.data.data[0].name)
      setCover(res.data.data[0].cover)
    })
    .catch((err) => {
      console.log(err);
    });
  }, [canteenid]);



  return (
    <div>
      <Canteen_header   canteenName={canteenName} canteenId = {canteenid}/>
      {/* <div className='flex justify-start items-center m-1 gap-1'>
        <button onClick={()=> back()} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-left'></i></button>
        <button onClick={()=> back()} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-right'></i></button>
      </div> */}
      <div className = "he" style={{backgroundImage: `url(${cover})`}}>
          <div className='flex justify-start items-center m-2 p-2 gap-3 z-10 w-full  lg:hidden'>
            <button onClick={() => navigate(-1)} className=' bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-left'></i></button>
            <button onClick={() => navigate(1)} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-right'></i></button>
          </div>
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
