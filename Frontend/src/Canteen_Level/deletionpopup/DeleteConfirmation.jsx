import React from 'react';
import './DeleteConfirmation.css'; // Assuming you have CSS for styling
import axios from 'axios'


const DeleteConfirmation = ({ show, deleteItem, onCancel,canteen_id,type }) => {
  if (!show) return null;
  
  const del = async () => {
    console.log(deleteItem);
    try {
      const response = await axios.delete(`http://localhost:5000/menu/deletefooditem?canteen_id=${canteen_id}&catogery=${type}`, {
        _id : deleteItem
      });
      console.log(response.data);
      // Do something with the response
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
