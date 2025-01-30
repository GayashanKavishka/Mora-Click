import React, { useEffect } from 'react'
import{useState} from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import axios from 'axios'
import './EditItem.css'

const Edititem = ({trigger,setTrigger,item,canteenId,type,scrolly}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const close = () => {
     setTrigger(false);
  }


  // const [data, setData] = useState({
  //   // id:item._id,
  //   // name: item.name,  
  //   // price: item.price,
  //   // image: item.image,
  //   // description: item.description,
  //   item
  // });

  const [data, setData] = useState(item);


  // const [data, setData] = useState({
  //   id: item?._id || '',   // Use optional chaining and default values
  //   name: item?.name || '',
  //   price: item?.price || '',
  //   image: item?.image || '',
  //   description: item?.description || '',
  // });
  


  const ImgTo64base=(img)=>{
    
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setData({...data, image: reader.result});
      }
  }


  useEffect(()=>{
    console.log("item",data);
  })

  useEffect(() => {
    setData(item);
}, [item]);



  
  const AddItem = (e) => {
    e.preventDefault();
    // console.log(data);
    // if(type ==='specials'){
    //   //Logic to add special items
    //   axios.post(`http://localhost:5000/special/addspecial`,{
    //     canteen_id:canteenId,
    //     name:data.name,
    //     price:data.price,
    //     image:data.image,
    //     description:data.description
    //     }).then((res) => {
    //       console.log(res);
    //       // setTrigger(false);
    //       navigate('/canteen/home',{state:{ scrolly: scrolly }})

    //     }
    //     ).catch((err) => {
    //       console.log(err);
    //     });
    //     }
    // else{
    //   axios.put(`http://localhost:5000/menu/updatecanteenmenu?canteen_id=${canteenId}&catogery=${type}`, data)
    //   .then((res) => {
    //     console.log(res);
    //     // setTrigger(false);
    //     navigate('/canteen/home' ,{state:{ scrolly: scrolly }})
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
    // }

    // console.log("data",item); \
    
    console.log("data",data);

    axios.put(`http://localhost:5000/menu/updatefooditem?canteen_id=${canteenId}&catogery=${type}`, data)
    .then((res) => {
      console.log(res);
      navigate('/canteen/home' ,{state:{ scrolly: scrolly }})
      // close();
    })
    .catch((err) => {
      console.log(err);
    });
  }




  return (trigger) ?(
    <div className='additem'>
        <div className = 'additem-container'>
            <div className='additem-content'>
                <div className='additem-header'>
                    <h2>Edit Item</h2>
                    <button className='close' style = {{color:"red"}} onClick={close}>X</button>
                </div>
                <div className='additem-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input 
                            type='text' 
                            id='name' 
                            name='name' 
                            placeholder='Enter Name'
                            value={data.name}
                            onChange={(e) => setData({...data, name: e.target.value})}

                            
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='price'>Price</label>
                            <input 
                            type='text' 
                            id='price' 
                            name='price' 
                            placeholder='Enter Price'
                            value={data.price}
                            onChange={(e) => setData({...data, price: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='image'>Image</label>
                            <input
                             type='file' 
                             id='image' 
                             name='image'
                             onChange={(e) => {ImgTo64base(e.target.files[0])}}
                             />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <textarea 
                            id='description' 
                            name='description' 
                            placeholder='Enter Description'
                            value={data.description}
                            onChange={(e) => setData({...data, description: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='additem-btn' onClick={AddItem}>Save</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  ):("")
}

export default Edititem
