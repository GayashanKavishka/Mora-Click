import React from 'react'
import { useState ,useEffect } from 'react'
import './menu.css'
import axios from 'axios'
import placeholder from "../../assets/placeholderimage.png"
import Additem from '../additem/additem'


const Menu = ({canteenId}) => {


 const [main, setMain] = useState([]);
 const [short, setShort] = useState([]);
 const [drinks, setDrinks] = useState([]);

 const [trigger, setTrigger] = useState(false);

 const[mainTrigger, setMainTrigger] = useState(false);
 const[shortTrigger, setShortTrigger] = useState(false);
 const[drinksTrigger, setDrinksTrigger] = useState(false);


 const AddMainItem =()=>
 {
        setMainTrigger(true);
 }

const AddShortItem =()=>
{
    setShortTrigger(true);
}

const AddDrinksItem =()=>
{
    setDrinksTrigger(true);
}


    useEffect(() => {
        const fetchMenu = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/menu/getmenu?canteen_id=${canteenId}`);
                const menu = response.data.data[0];
                setMain(menu.main);
                setShort(menu.short_eat);
                setDrinks(menu.beverage);
            } catch (error) {
                console.error('Error fetching menu:', error);
            }
        };

        fetchMenu();
    }, []);


 const AddItem = () => {
        setTrigger(true);
    }  
 
const handleToggleDrinks = (Item) => {
    setDrinks(
        drinks.map((item) => {
            if (item.name === Item.name) {
                return { ...item, available: !item.available };
            }
            return item; 
        })
    );

    const it = drinks.find((item) => item.name === Item.name); 
    console.log(it.name);
    
    axios.put(`http://localhost:5000/menu/updateavailable?canteen_id=${canteenId}&catogery=beverage&meal_name=${it.name}`, {
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
};

const handleToggleShort = (Item) => {
    setShort(
        short.map((item) => {
            if (item.name === Item.name) {
                return { ...item, available: !item.available };
            }
            return item; 
        })
    );

    const it = short.find((item) => item.name === Item.name); 
    console.log(it.name);
    
    axios.put(`http://localhost:5000/menu/updateavailable?canteen_id=${canteenId}&catogery=short_eat&meal_name=${it.name}`, {
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });
};

const handleToggleMain =(Item) => {
    setMain(
        main.map((item) => {
            if (item.name === Item.name) {
                return { ...item, available: !item.available };
            }
            return item; 
        })
    );

    const it = main.find((item) => item.name === Item.name); 
    console.log(it.name);
    
    axios.put(`http://localhost:5000/menu/updateavailable?canteen_id=${canteenId}&catogery=main&meal_name=${it.name}`, {
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => {
        console.log(err);
    });


    
};


       
    
    




return (
    <div>
            <div className='main-meal'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold", textDecoration: "underline"}}>Main Meals</h1></div>
            {main.map((item, index) => (
                <div className='boxs' key={index}>
                    <div className='details'>
                        <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                        <div className='name'><h2>{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2>{"Rs."+item.price+".00"}</h2></div>
                        <div className='available'>
                            {/* <button className="available" style={{backgroundColor: item.available ? "green" : "red"}}>
                                {item.available ? "Available" : "Unavailable"}
                            </button> */}
                            <div className="toggle-switch">
                                <input
                                type="checkbox"
                                id ={`toggle-${item.name}`}
                                className="toggle-input"
                                checked={item.available}
                                onChange={() => handleToggleMain(item)}
                                />
                                <label htmlFor={`toggle-${item.name}`} className="toggle-label">
                                <span className={`toggle-slider ${item.available ? 'on' : 'off'}`}></span>
                                </label>
                            </div>
                            <br></br>
                            <lable className = "t" style = {{textTransform:'none'}}>{item.available ? "Available":"Unavailable"}</lable>
                        </div>
                    </div>
                    <div className='control-sec'>
                        <button className='edit'>Edit</button>
                        <button className='delete'>Delete</button>
                    </div>
                </div>
            ))}
            <div className='addButton'>
                <button className='add' onClick={AddMainItem}> + Add main meals</button>
            </div>
            <Additem trigger = {mainTrigger} type = {"main"} canteenId={canteenId} setTrigger ={setMainTrigger}  />
            </div>
            <div className="line">
                <hr/>
            </div>
            {/* <div cl</div>assN</div>ame='short'></div> */}
        <div className='short'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold",textDecoration: "underline"}} >Short Eats</h1></div>
                {short.map((item, index) => (
                    <div className='boxs' key={index}>
                        <div className='details'>
                            <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                            <div className='name'><h2>{item.name}</h2></div>
                            <div className='price' style={{textTransform:'none'}}><h2>{"Rs."+item.price+".00"}</h2></div>
                            <div className='available'>
                                {/* <button className="available" style={{backgroundColor: item.available ? "green" : "red"}}>
                                    {item.available ? "Available" : "Unavailable"}
                                </button> */}
                                <div className="toggle-switch">
                                <input
                                type="checkbox"
                                id ={`toggle-${item.name}`}
                                className="toggle-input"
                                checked={item.available}
                                onChange={() => handleToggleShort(item)}
                                />
                                <label htmlFor={`toggle-${item.name}`} className="toggle-label">
                                <span className={`toggle-slider ${item.available ? 'on' : 'off'}`}></span>
                                </label>
                                </div>
                                <br></br>
                                <lable className = "t" style = {{textTransform:'none'}}>{item.available ? "Available":"Unavailable"}</lable>
                            </div>
                        </div>
                        <div className='control-sec'>
                            <button className='edit'>Edit</button>
                            <button className='delete'>Delete</button>
                        </div>
                    </div>
                ))}
                <div className='addButton'>
                <button className='add' onClick={AddShortItem}> + Add short eats</button>
                </div>
                <Additem trigger = {shortTrigger} type = {"short_eat"} canteenId={canteenId} setTrigger ={setShortTrigger}  />
        </div>
        <div className="line">
                <hr/>
        </div>
        <div className='drinks'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold",textDecoration: "underline"}} >Drinks</h1></div>
            {drinks.map((item, index) => (
                <div className='boxs' key={index}>
                    <div className='details'>
                        <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                        <div className='name'><h2>{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2>{"Rs."+item.price+".00"}</h2></div>
                        <div className='available'>
                            <div className="toggle-switch">
                                <input
                                type="checkbox"
                                id ={`toggle-${item.name}`}
                                className="toggle-input"
                                checked={item.available}
                                onChange={() => handleToggleDrinks(item)}
                                />
                                <label htmlFor={`toggle-${item.name}`} className="toggle-label">
                                <span className={`toggle-slider ${item.available ? 'on' : 'off'}`}></span>
                                </label>
                            </div>
                            <br></br>
                            <lable className = "t" style = {{textTransform:'none'}}>{item.available ? "Available":"Unavailable"}</lable>
                
                        </div>
                    </div>
                    <div className='control-sec'>
                        <button className='edit'>Edit</button>
                        <button className='delete'>Delete</button>
                    </div>
                </div>
            ))}
            <div className='addButton'>
                <button className='add' onClick={AddDrinksItem}> + Add beverage</button>
            </div>
            <Additem trigger = {drinksTrigger} type = {"beverage"} canteenId={canteenId} setTrigger ={setDrinksTrigger}  />

        </div>
        <div className="line">
                <hr/>
        </div>
    </div>
  )
}

export default Menu
