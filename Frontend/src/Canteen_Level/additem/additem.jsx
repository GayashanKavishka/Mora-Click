import React from 'react'
import './additem.css'

const Additem = ({trigger,setTrigger}) => {

  const close = () => {
     setTrigger(false);
  }


  return (trigger) ?(
    <div className='additem'>
        <div className = 'additem-container'>
            <div className='additem-content'>
                <div className='additem-header'>
                    <h2>Add Item</h2>
                    <button className='close' style = {{color:"red"}} onClick={close}>X</button>
                </div>
                <div className='additem-body'>
                    <form>
                        <div className='form-group'>
                            <label htmlFor='name'>Name</label>
                            <input type='text' id='name' name='name' placeholder='Enter Name'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='price'>Price</label>
                            <input type='text' id='price' name='price' placeholder='Enter Price'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='image'>Image</label>
                            <input type='file' id='image' name='image'/>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='description'>Description</label>
                            <textarea id='description' name='description' placeholder='Enter Description'/>
                        </div>
                        <div className='form-group'>
                            <button type='submit' className='additem-btn'>Add Item</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
  ):("")
}

export default Additem
