import React, { useState , useEffect } from 'react';
import { useParams,useNavigate } from 'react-router-dom';
import axios from 'axios';
import './account.css'; // Add styles for better presentation
import user from '../../assets/user.png';
import { toast } from 'react-toastify';

const EditAccount = () => {
  const [canteenName, setCanteenName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPhoto, setCoverPhoto] = useState(null);

  const { id: canteenId } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`https://mora-click-7.onrender.com/canteen/getcanteen/?_id=${canteenId}`)
    .then((res) => {
      setUsername(res.data.data[0].username)
      setPassword(res.data.data[0].password)
      setCoverPhoto(res.data.data[0].cover)
      setCanteenName(res.data.data[0].name)
    })
    .catch((err) => {
      console.log(err);
    });
    console.log(canteenId);
  }, [canteenId]);


  const handleProfilePictureChange = (e) => {
    if (e.target.files[0]) {
      setProfilePicture(URL.createObjectURL(e.target.files[0]));
      console.log("ObjectURL",e.target.files[0]);
    }
  };

  const handleCoverPhotoChange = (e) => {
    if (e.target.files[0]) {
    //   setCoverPhoto(URL.createObjectURL(e.target.files[0]));
      const file = e.target.files[0];
      
      const reader = new FileReader();

      reader.readAsDataURL(file);

      reader.onload = () => {
            setCoverPhoto(reader.result);
     };

      console.log("ObjectURL",e.target.files[0]);
      console.log("CoverPhoto",coverPhoto);
    }
  };

  const handleSave = () => {
    console.log({ canteenName, username, password, profilePicture, coverPhoto });
    axios.put('https://mora-click-7.onrender.com/canteen/updatecanteen', {
        _id: canteenId,
        name: canteenName,
        username : username,
        password : password,
        cover: coverPhoto,
    }).then((res) => {
        toast.success('Account updated successfully',{autoClose: 2000});
        setTimeout(() => {
          navigate(`/canteen/account/${canteenId}`);
        },2000);
    }).catch((err) => {
      console.log(err);
    });
  };


  const back=()=>{
    navigate(`/canteen/home`);
  }

  return (
   <body className='edit-account-container'>
    <div className="edit-account">
      <div className="cover-photo" style={{ backgroundImage: `url(${coverPhoto || 'https://via.placeholder.com/800x200'})` }}>
        <input type="file" accept="image/*" onChange={handleCoverPhotoChange} className="cover-input" />
        <div className="profile-picture-container">
        <div className="profile-picture-wrapper">
          <img
            // src={profilePicture || {user}}
            src = {profilePicture? profilePicture:user}
            alt="Profile"
            className="profile-picture"
          />
          <label htmlFor="profile-input" className="update-label">Update Picture
          <input type="file" id = "profile-input"accept="image/*" onChange={handleProfilePictureChange} className="profile-input" />
            </label>
        </div>
        </div>
      </div>
      <div className="account-details">
        <div className="form-group">
          <label>Canteen Name</label>
          <input
            type="text"
            value={canteenName}
            onChange={(e) => setCanteenName(e.target.value)}
            placeholder="Enter canteen name"
          />
        </div>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter username"
          />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
          />
        </div>
        <button className="save-button" onClick={handleSave}>
          Save Changes
        </button>
      </div>
      <div className='flex justify-end items-center m-5 mt-2'>
        <button onClick={()=> back()} className='bg-orange-500 p-2 rounded-lg font-bold text-white hover:bg-orange-700 hover:transition hover:duration-100'> Home <i class='fas fa-angle-double-left'></i></button>
      </div>
    </div>
    </body> 
  );
};

export default EditAccount;
