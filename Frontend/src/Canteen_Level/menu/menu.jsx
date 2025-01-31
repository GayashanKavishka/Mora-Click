import React from 'react'
import { useState ,useEffect,useRef } from 'react'
import { useLocation,useNavigate } from 'react-router-dom'
import './menu.css'
import axios from 'axios'
import placeholder from "../../assets/placeholderimage.png"
import Additem from '../additem/additem'
import Edititem from '../Fooditemedit/EditItem'
import DeleteConfirmation from '../deletionpopup/DeleteConfirmation'




const Menu = ({canteenId}) => {


 const [main, setMain] = useState([]);
 const [short, setShort] = useState([]);
 const [drinks, setDrinks] = useState([]);

 const [trigger, setTrigger] = useState(false);

 const[mainTrigger, setMainTrigger] = useState(false);
 const[shortTrigger, setShortTrigger] = useState(false);
 const[drinksTrigger, setDrinksTrigger] = useState(false);
 const[specialTrigger, setSpecialTrigger] = useState(false);
 const[fooditemeditTrigger, setFooditemeditTrigger] = useState(false);

 const [special, setSpecial] = useState([]);
 const [scrollPosition, setScrollPosition] = useState(0);
 const buttonRef = useRef(null);
 const[deleteItem, setdeleteItem] = useState('');

 const[deleteTrigger, setDeleteTrigger] = useState(true);

 const[selectedItem, setSelectedItem] = useState({
    _id: '',
    name: '',
    price: '',
    image: '',
    description: '',
 });


 const [selectedType, setSelectedType] = useState('');


 const navigate = useNavigate();

 const location = useLocation();

// var location = '';









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
        setSpecial(
            special.map((item) => {
                if (item.name === Item.name){
                     return { ...item, available: !item.available };
                }
                return item;
            }
        )

    );

    const it = special.find((item) => item.name === Item.name);
    console.log(it._id);


    axios.put(`http://localhost:5000/special/updateSpecialAvailable?_id=${it._id}`)
    .then((res) => {
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    }
    )   
 };

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

const updateSelectedItem = (item,type) => {
    return new Promise((resolve) => {
        setSelectedItem(item);
        setSelectedType(type);
        resolve();
    });
}

const deleteselecteditem = (item) => {
    return new Promise((resolve) => {
        setdeleteItem(item._id);
        resolve();
    });
}
// const editfooditem =(item)=>
// {
//     updateSelectedItem(item)
//     .then(()=>{
//         console.log("selected",selectedItem);
//         setFooditemeditTrigger(true);
//         setScrollPosition(window.scrollY);
//     }) 
//     // setSelectedItem(item);
//     // setFooditemeditTrigger(true);
//     // setScrollPosition(window.scrollY);
// }


const editfooditem = (item,type,id) => {
    // updateSelectedItem(item).then(() => {
    //     console.log("selected", selectedItem);  // This might log old data due to async state updates
    //     console.log("selectedType",selectedType);  // This will log the correct data
    //     setFooditemeditTrigger(true);
    //     setScrollPosition(window.scrollY);
    // });
    navigate('/editmenu', { state: { item: item, canteen_id: canteenId, category: type, scrolly: id } });
};

const deletefooditem = (item) => {
    deleteselecteditem(item);
    console.log("selected for delete", deleteItem);
    setTrigger(true); // Show the deletion confirmation popup
};

// const deleteconformation = () => {
//     return (
//       <>{deleteTrigger ? (
//         <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center z-50">
//         <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
//           <h1 className="text-xl font-semibold text-center mb-4">
//             Are you sure you want to delete this item?
//           </h1>
//           <div className="flex justify-around">
//             <button 
//               onClick={() => setDeleteTrigger(false)} 
//               className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 focus:outline-none"
//             >
//               Cancel
//             </button>
//             <button 
//               onClick={() => console.log('Confirmed')} 
//               className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600 focus:outline-none"
//             >
//               Confirm
//             </button>
//           </div>
//         </div>
//       </div>
//       ):(
//           ""
//       )} 
//       </>
//     );
//   };
  




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
            if (item._id === Item._id) {
                return { ...item, available: !item.available };
            }
            return item; 
        })
    );

    const it = drinks.find((item) => item._id === Item._id); 
    console.log(it._id);
    
    axios.put(`http://localhost:5000/menu/updateavailable?canteen_id=${canteenId}&catogery=beverage&_id=${it._id}`, {
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
            if (item._id === Item._id) {
                return { ...item, available: !item.available };
            }
            return item; 
        })
    );

    const it = short.find((item) => item._id === Item._id); 
    console.log(it._id);
    
    axios.put(`http://localhost:5000/menu/updateavailable?canteen_id=${canteenId}&catogery=short_eat&_id=${it._id}`, {
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
            if (item._id === Item._id) {
                return { ...item, available: !item.available };
            }
            return item; 
        })
    );

    const it = main.find((item) => item._id === Item._id); 
    console.log(it._id);
    
    axios.put(`http://localhost:5000/menu/updateavailable?canteen_id=${canteenId}&catogery=main&_id=${it._id}`)
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
                        <button className='edit' onClick={() => editfooditem(item,'main','main')}>Edit</button>
                        <Edititem trigger = {fooditemeditTrigger} type = {"main"} item = {selectedItem} scrolly= {"main"} canteenId={canteenId} setTrigger ={setFooditemeditTrigger}  />
                        <button className='delete' onClick={() => deletefooditem(item)}>Delete</button>
                        <DeleteConfirmation show={trigger} canteen_id={canteenId} deleteItem={deleteItem} scrolly= {"main"} type={'main'} onConfirm={() => console.log('Confirmed')} onCancel={() => setTrigger(false) } />
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
                            <button className='edit' onClick={() => editfooditem(item,'short_eat','short')}>Edit</button>
                            <Edititem trigger = {fooditemeditTrigger} type = {"short_eat"} item = {selectedItem} canteenId={canteenId} setTrigger ={setFooditemeditTrigger} scrolly= {"short"} />
                            <button className='delete' onClick={() => deletefooditem(item)} >Delete</button>
                            <DeleteConfirmation show={trigger} canteen_id={canteenId} deleteItem={deleteItem} scrolly= {"short"} type={'short_eat'} onConfirm={() => console.log('Confirmed')} onCancel={() => setTrigger(false) } />
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
                        <button className='edit' onClick={() => editfooditem(item,'beverage','beverage')}>Edit</button>
                        <Edititem trigger = {fooditemeditTrigger} type = {"beverage"} item = {selectedItem} canteenId={canteenId} setTrigger ={setFooditemeditTrigger} scrolly= {"main"} />
                        <button className='delete'  onClick={() => deletefooditem(item)} >Delete</button>
                        <DeleteConfirmation show={trigger} canteen_id={canteenId} deleteItem={deleteItem} scrolly= {"drink"} type={'beverage'} onConfirm={() => console.log('Confirmed')} onCancel={() => setTrigger(false) } />
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
                        <button className='edit' onClick={() => editfooditem(item,'special','special')}>Edit</button>
                        <button className='delete' onClick={() => deletefooditem(item)}>Delete</button>
                        <DeleteConfirmation show={trigger} canteen_id={canteenId} deleteItem={deleteItem} scrolly={"special"} type={'special'} onConfirm={() => console.log('Confirmed')} onCancel={() => setTrigger(false) } />
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