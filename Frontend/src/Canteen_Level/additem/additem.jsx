import React from 'react'
import{useState} from 'react'
import { useNavigate ,useLocation} from 'react-router-dom'
import axios from 'axios'
import './additem.css'

const Additem = ({trigger,setTrigger,type,canteenId,scrolly}) => {

  const navigate = useNavigate();
  const location = useLocation();

  const close = () => {
     setTrigger(false);
  }


  const [data, setData] = useState({
    name: '',
    price: '',
    image: '',
    description: ''
  });


  const ImgTo64base=(img)=>{
    
      const reader = new FileReader();
      reader.readAsDataURL(img);
      reader.onload = () => {
        setData({...data, image: reader.result});
      }
  }

  const AddItem = (e) => {
    e.preventDefault();
    console.log(data);
    if(type ==='specials'){
      //Logic to add special items
      axios.post(`http://localhost:5000/special/addspecial`,{
        canteen_id:canteenId,
        name:data.name,
        price:data.price,
        image:data.image,
        description:data.description
        }).then((res) => {
          console.log(res);
          // setTrigger(false);
          navigate('/canteen/home',{state:{ scrolly: scrolly }})

        }
        ).catch((err) => {
          console.log(err);
        });
        }
    else{
      axios.put(`http://localhost:5000/menu/updatecanteenmenu?canteen_id=${canteenId}&catogery=${type}`, data)
      .then((res) => {
        console.log(res);
        // setTrigger(false);
        navigate('/canteen/home' ,{state:{ scrolly: scrolly }})
      })
      .catch((err) => {
        console.log(err);
      });
    }
    
  }




  return (trigger) ?(
    <div className='additem'>
        <div className = 'additem-container'>
            <div className='additem-content'>
                <div className='additem-header'>
                    <h2>Add {type} Item</h2>
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
                            onChange={(e) => setData({...data, description: e.target.value})}
                            />
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='additem-btn' onClick={AddItem}>Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  ):("")
}

export default Additem
