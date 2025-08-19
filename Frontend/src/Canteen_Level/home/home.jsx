// import React from 'react'
// import { useState ,useEffect } from 'react'
// import Canteen_header from '../header/header'
// import Canteen_Footer from '../footer/footer'
// import axios from 'axios'
// import { jwtDecode } from 'jwt-decode'
// import './home.css'
// import Menu from '../menu/menu'
// import { useNavigate } from 'react-router-dom'


// const Home = () => {

//   const [isOpen, setIsOpen] = useState(false); // Canteen state: false = closed, true = open

//   const[canteenid,setCanteenid] = useState(jwtDecode(localStorage.getItem('token')).canteen_id);
//   const[canteenName , setCanteenName] = useState('');
//   const [cover, setCover] = useState(false);

//   const navigate = useNavigate();

//   // const toggleCanteen = () => {
//   //   setIsOpen((prevState) => !prevState);
//   // };
//     const toggleCanteen = async () => {
//       const newstatus = isOpen ? false : true; // Ensure true is sent when open
//       try {
//         const res = await axios.put(
//           'http://localhost:5000/canteen/updatecanteenstatus',
//           {
//             _id: canteenid,
//             status: newstatus, // This will be true when canteen is open
//           },
//           {
//             headers: {
//               'Content-Type': 'application/json',
//             },
//           }
//         );
//         if (res.status === 200) {
//           console.log("Canteen status updated:", newstatus);
//           setIsOpen(newstatus);
//         }
//       } catch (err) {
//         console.log("Error updating canteen status:", err);
//       }
//   };

//   useEffect(() => {
//     axios.get(`http://localhost:5000/canteen/getcanteen/?_id=${canteenid}`)
//     .then((res) => {
//       setCanteenName(res.data.data[0].name)
//       setCover(res.data.data[0].cover)
//       setIsOpen(res.data.data[0].open)
//     })
//     .catch((err) => {
//       console.log(err);
//     });
//   }, [canteenid]);



//   return (
//     <div>
//       <Canteen_header   canteenName={canteenName} canteenId = {canteenid}/>
//       {/* <div className='flex justify-start items-center m-1 gap-1'>
//         <button onClick={()=> back()} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-left'></i></button>
//         <button onClick={()=> back()} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-right'></i></button>
//       </div> */}
//       <div className = "he" style={{backgroundImage: `url(${cover})`}}>
//           <div className='flex justify-start items-center m-2 p-2 gap-3 z-10 w-full  lg:hidden'>
//             <button onClick={() => navigate(-1)} className=' bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-left'></i></button>
//             <button onClick={() => navigate(1)} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9'>  <i class='fas fa-angle-right'></i></button>
//           </div>
//           <div className='mas'>
//             <div><h3 className='h'>Check  your menu and update it before open the canteen </h3></div>
//             <div className='box'>
//                 <div style={{marginTop:"6px"}}><h2 className = "tag" >Set your canteen : </h2></div>
//                 <button className='buttonOpenClose'
//                   onClick={toggleCanteen}
//                   style={{
//                     backgroundColor: isOpen ? "green" : "red",
//                   }}
//                 >
//                   {isOpen ? "Open" : "Closed"}
//                 </button>
//             </div>
//         </div>
//     </div>
//       <Menu canteenId={canteenid}  />
//       <Canteen_Footer/>
//     </div>
//   )
// }

// export default Home


import React, { useState, useEffect } from 'react';
import Canteen_header from '../header/header';
import Canteen_Footer from '../footer/footer';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import './home.css';
import Menu from '../menu/menu';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [isOpen, setIsOpen] = useState(false); // Canteen state: false = closed, true = open
  const [canteenid, setCanteenid] = useState(jwtDecode(localStorage.getItem('token')).canteen_id);
  const [canteenName, setCanteenName] = useState('');
  const [cover, setCover] = useState(false);

  const navigate = useNavigate();

  const toggleCanteen = async () => {
    const newstatus = isOpen ? false : true; // Ensure true is sent when open
    try {
      // const res = await axios.put(
      //   'http://localhost:5000/canteen/updatecanteenstatus',
      //   {
      //     _id: canteenid,
      //     status: newstatus, // This will be true when canteen is open
      //   },
      //   {
      //     headers: {
      //       'Content-Type': 'application/json',
      //     },
      //   }
      // );
      
      const [updateRes, notificationRes] = await Promise.all([
        axios.put('http://localhost:5000/canteen/updatecanteenstatus', {
          _id: canteenid,
          status: newstatus,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }),
        axios.post('http://localhost:5000/notification/send-canteen-status', {
          title: 'Canteen Status Update',
          body: `${jwtDecode(localStorage.getItem('token')).name} is now ${newstatus ? 'open' : 'closed'}.`,
        }),
      ]);


      // if (res.status === 200) {
      //   console.log("Canteen status updated:", newstatus);
      //   setIsOpen(newstatus);
      // }

      if (updateRes.status === 200 && notificationRes.status === 200) {
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
        setCanteenName(res.data.data[0].name);
        setCover(res.data.data[0].cover);
        setIsOpen(res.data.data[0].open);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [canteenid]);

  return (
    <div>
      <Canteen_header canteenName={canteenName} canteenId={canteenid} />
      <div className="he " style={{ backgroundImage: `url(${cover})` }}>
        <div className="flex justify-start items-center pt-1 pb-1 p-2 gap-3 z-10 w-full lg:hidden ">
          <button onClick={() => navigate(-1)} className="bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9">
            <i className="fas fa-angle-left"></i>
          </button>
          <button onClick={() => navigate(1)} className="bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100 w-9">
            <i className="fas fa-angle-right"></i>
          </button>
        </div>
        <div className="mas">
          <div><h3 className="h">Check your menu and update it before opening the canteen</h3></div>
          <div className="box">
            <div style={{ marginTop: "6px" }}>
              <h2 className="tag">Set your canteen: </h2>
            </div>
            {/* Slide toggle button for Open/Close */}
            <div className="flex items-center gap-2">
              <span className="text-gray-700 text-sm font-bold">{isOpen ? 'Open' : 'Closed'}</span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={isOpen}
                  onChange={toggleCanteen}
                />
                <div className={`w-11 h-6 rounded-full peer-checked:bg-green-500 ${isOpen ? 'bg-green-500' : 'bg-red-500'} peer-checked:after:translate-x-5 after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border after:rounded-full after:h-5 after:w-5 after:transition-all`}></div>
              </label>
            </div>
          </div>
        </div>
      </div>
      <Menu canteenId={canteenid} />
      <Canteen_Footer />
    </div>
  );
};

export default Home;

