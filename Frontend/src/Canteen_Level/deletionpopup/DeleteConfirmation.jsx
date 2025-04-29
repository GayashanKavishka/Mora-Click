import React from 'react';
import './DeleteConfirmation.css'; // Assuming you have CSS for styling
import axios from 'axios'
import { useNavigate } from 'react-router-dom';


const DeleteConfirmation = ({ show, deleteItem, onCancel,canteen_id,type,scrolly }) => {
  if (!show) return null;

  const navigation = useNavigate();
  
  const del = async () => {
    console.log(deleteItem);
    try {
      // const response = await axios.delete(`http://localhost:5000/menu/deletefooditem?canteen_id=${canteen_id}&catogery=${type}`,{
      //   data: {
      //     _id: deleteItem
      //   }
      // })
      // console.log(response.data);
      // Do something with the response

      if(type === "special"){
        axios.delete(`https://mora-click-7.onrender.com/special/deleteSpecial/?_id=${deleteItem}`)
        .then((response) => {
          console.log('Success:', response);
          // window.location.reload()
          navigation(0);
          navigation('/canteen/home',{state:{ scrolly: scrolly }});
        })
        .catch((error) => {
          console.error('Error:', error);
        });
        return
      }
      axios.delete(`https://mora-click-7.onrender.com/menu/deletefooditem?canteen_id=${canteen_id}&catogery=${type}`,{data:{_id:deleteItem}})
      .then((response) => {
        console.log('Success:', response);
        // window.location.reload()
        navigation(0);
        navigation('/canteen/home',{state:{ scrolly: scrolly }});
        
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div className="popup-overlay">
      <div className="popup">
        <h3>Confirm Deletion</h3>
        <p>Are you sure you want to delete this item?</p>
        <div className="popup-buttons">
          <button className="confirm-button" onClick={del}>Yes</button>
          <button className="cancel-button" onClick={onCancel}>No</button>
        </div>
      </div>
    </div>
  );
};



export default DeleteConfirmation;
