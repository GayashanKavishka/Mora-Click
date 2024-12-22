import React from 'react'
import { useState ,useEffect } from 'react'
import './menu.css'
import axios from 'axios'

const Menu = ({canteenId}) => {


 const [main, setMain] = useState([]);
 const [short, setShort] = useState([]);
 const [drinks, setDrinks] = useState([]);

    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/menu/getmenu?canteen_id=${canteenId}`);
                const menu = response.data.data[0];
                setMain(menu.main);
                setShort(menu.short_eat);
                setDrinks(menu.beverag);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);




return (
    <div>
            <div className='main-meal'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold", textDecoration: "underline"}}>Main Meals</h1></div>
            {main.map((item, index) => (
                <div className='boxs' key={index}>
                    <div className='details'>
                        <div className="imgage"><h1>image</h1></div>
                        <div className='name'><h2>{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2>{"Rs."+item.price+".00"}</h2></div>
                        <div className='available'>
                            <button className="available" style={{backgroundColor: item.available ? "green" : "red"}}>
                                {item.available ? "Available" : "Unavailable"}
                            </button>
                        </div>
                    </div>
                    <div className='control-sec'>
                        <button className='edit'>Edit</button>
                        <button className='delete'>Delete</button>
                    </div>
                </div>
            ))}
            <div className='addButton'>
                <button className='add'> + Add main meals</button>
            </div>
            </div>
            <div className="line">
                <hr/>
            </div>
            {/* <div cl</div>assName='short'></div> */}
        <div className='short'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold",textDecoration: "underline"}} >Short Eats</h1></div>
                {short.map((item, index) => (
                    <div className='boxs' key={index}>
                        <div className='details'>
                            <div className="imgage"><h1>image</h1></div>
                            <div className='name'><h2>{item.name}</h2></div>
                            <div className='price' style={{textTransform:'none'}}><h2>{"Rs."+item.price+".00"}</h2></div>
                            <div className='available'>
                                <button className="available" style={{backgroundColor: item.available ? "green" : "red"}}>
                                    {item.available ? "Available" : "Unavailable"}
                                </button>
                            </div>
                        </div>
                        <div className='control-sec'>
                            <button className='edit'>Edit</button>
                            <button className='delete'>Delete</button>
                        </div>
                    </div>
                ))}
                <div className='addButton'>
                <button className='add'> + Add short eats</button>
                </div>
        </div>
        <div className="line">
                <hr/>
        </div>
        <div className='drinks'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold",textDecoration: "underline"}} >Drinks</h1></div>
            {drinks.map((item, index) => (
                <div className='boxs' key={index}>
                    <div className='details'>
                        <div className="imgage"><h1>image</h1></div>
                        <div className='name'><h2>{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2>{"Rs."+item.price+".00"}</h2></div>
                        <div className='available'>
                            <button className="available" style={{backgroundColor: item.available ? "green" : "red"}}>
                                {item.available ? "Available" : "Unavailable"}
                            </button>
                        </div>
                    </div>
                    <div className='control-sec'>
                        <button className='edit'>Edit</button>
                        <button className='delete'>Delete</button>
                    </div>
                </div>
            ))}
            <div className='addButton'>
                <button className='add'> + Add beverage</button>
            </div>

        </div>
        <div className="line">
                <hr/>
        </div>
    </div>
  )
}

export default Menu
