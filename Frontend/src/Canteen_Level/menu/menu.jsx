import React from 'react'
import { useState ,useEffect,useRef } from 'react'
import { useLocation } from 'react-router-dom'
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
 const[specialTrigger, setSpecialTrigger] = useState(false);

 const [special, setSpecial] = useState([]);
 const [scrollPosition, setScrollPosition] = useState(0);
 const buttonRef = useRef(null);




 const location = useLocation();

// var location = '';


//  const special = [
//     {
//         name:"chicken buriyani",    
//         price:200,
//         available:true,
//         description:"chicken buriyani",
//     },

//  ]





const func = () => {
    if (location.state && location.state.scrolly) {
              console.log(location.state.scrolly);
              const button = document.getElementById(location.state.scrolly);
              if (button) {
                button.scrollIntoView({ behavior: 'smooth' });
                location.state.scrolly = null;
              }
    }
}

 const handleToggleSpecial = (Item) =>{
        special.map((item) => {
            if (item.name === Item.name) {
                 item.available = !Item.available;
            }
        }
    );

 }

 const AddSpecialItem =()=>{
    setSpecialTrigger(true);
    setScrollPosition(window.scrollY);
 }




 const AddMainItem =()=>
 {
        setMainTrigger(true);
        setScrollPosition(window.scrollY);
 }

const AddShortItem =()=>
{
    setShortTrigger(true);
    setScrollPosition(window.scrollY);
}

const AddDrinksItem =()=>
{
    setDrinksTrigger(true);
    setScrollPosition(window.scrollY);
}

const fetchMenu = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/menu/getmenu?canteen_id=${canteenId}`);
        const menu = response.data.data[0];
        setMain(menu.main);
        console.log(menu.main);
        setShort(menu.short_eat);
        setDrinks(menu.beverage);
    } catch (error) {
        console.error('Error fetching menu:', error);
    }
};


const fetchSpecial = async () => {
    try {
        const response = await axios.get(`http://localhost:5000/special/getItembyId?canteen_id=${canteenId}`);
        const spec = response.data.data;
        console.log(spec);
        setSpecial(spec);
        
    }
    catch (error) {
        console.error('Error fetching special:', error);
    }
}



    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch menu data
                await fetchMenu();
                await fetchSpecial();
    
                // Call func() after fetching
                func();
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        fetchData();
    }, []); // The empty dependency array ensures this runs only once when the component is mounted.
    



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
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold", textDecoration: "underline"}} id = "main">Main Meals</h1></div>
            {main.map((item, index) => (
                <div className='boxs' key={index}>
                    <div className='details'>
                        <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                        <div className='name'><h2 className = "name-h2">{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2 className = "name-h2" >{"Rs."+item.price+".00"}</h2></div>
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
                <button className='add' onClick={AddMainItem} > + Add main meals</button>
            </div>
            <Additem trigger = {mainTrigger} type = {"main"} canteenId={canteenId} setTrigger ={setMainTrigger} scrolly= {"main"} />
            </div>
            <div className="line">
                <hr/>
            </div>
            {/* <div cl</div>assN</div>ame='short'></div> */}
        <div className='short'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold",textDecoration: "underline"}}  id = "short">Short Eats</h1></div>
                {short.map((item, index) => (
                    <div className='boxs' key={index}>
                        <div className='details'>
                            <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                            <div className='name'><h2 className = "name-h2">{item.name}</h2></div>
                            <div className='price' style={{textTransform:'none'}}><h2 className = "name-h2">{"Rs."+item.price+".00"}</h2></div>
                            <div className='available'>
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
                <button className='add' onClick={AddShortItem} id = "short"> + Add short eats</button>
                </div>
                <Additem trigger = {shortTrigger} type = {"short_eat"} canteenId={canteenId} setTrigger ={setShortTrigger} scrolly= {"short"} />
        </div>
        <div className="line">
                <hr/>
        </div>
        <div className='drinks'>
            <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold",textDecoration: "underline"}}  id = "beverage" >Drinks</h1></div>
            {drinks.map((item, index) => (
        <div className='boxs' key={index} >
                    <div className='details'>
                        <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                        <div className='name'><h2 className = "name-h2">{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2 className = "name-h2" >{"Rs."+item.price+".00"}</h2></div>
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
            <Additem trigger = {drinksTrigger} type = {"beverage"} canteenId={canteenId} setTrigger ={setDrinksTrigger} scrolly= {"beverage"} />

        </div>
        <div className="line">
                <hr/>
        </div>
        <div className='main-meal'>
        <div><h1 style={{textAlign:"center",fontSize:"40px",fontWeight:"bold", textDecoration: "underline"}} id = "special" >Today's Specials</h1></div>
            {special.map((item, index) => (
                <div className='boxs' key={index}>
                    <div className='details'>
                        <div className="imgage"><img src = {!item.image? placeholder : item.image}></img></div>
                        <div className='name'><h2 className = "name-h2">{item.name}</h2></div>
                        <div className='price' style={{textTransform:'none'}}><h2 className = "name-h2" >{"Rs."+item.price+".00"}</h2></div>
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
                                onChange={() =>  handleToggleSpecial(item)}
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
                <button className='add' onClick={AddSpecialItem} ref ={buttonRef} > + Add Special Item</button>

            </div>
            <Additem trigger = {specialTrigger} type = {"specials"} canteenId={canteenId} setTrigger ={setSpecialTrigger} scrolly= {"special"}/>
        </div>
        </div>
  )
}

export default Menu
