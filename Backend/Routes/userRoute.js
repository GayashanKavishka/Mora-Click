const router = require('express').Router();


//-----

const jwt = require('jsonwebtoken');
const user = require('../model/userModel');

const {registerUser , getuser , updateUser,UpdateFCM} = require('../controllers/usercontroll.js');
const userModel = require('../model/userModel');
const  mongo  = require('mongoose');
;

router.post('/insertUser', async (req, res) => {
    try {
        const obj = req.body;
        const result = await registerUser(obj);
        if(result.status === 200) return res.status(200).json({ data: result.data });
        if(result.status === 409) return res.status(409).json({ message: 'User already exists' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
});

router.get('/getuser', async (req, res) => {
    try {
        const _id = req.query._id;
        const result = await getuser(_id);
        if(result.status === 200) return res.status(200).json({ data: result.data });
        if(result.status === 404) return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
});

router.put('/updateuser', async (req, res) => {
    try {
        const _id = req.query._id;
        const data = req.body;
        const result = await updateUser(_id, data);
        if(result.status === 200) return res.status(200).json({ message: 'User updated successfully', data: result.data });
        if(result.status === 404) return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
});

router.post('/addFCM', async (req, res) => {
    try {
        const _id = req.body._id;
        const FCMToken = req.body.FCMToken;
        console.log(_id);
        console.log(FCMToken);
        const result = await UpdateFCM(_id, FCMToken);
        if(result.status === 200) return res.status(200).json({ message: 'FCM Token updated successfully', data: result.data });
        if(result.status === 404) return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
});


router.get('/verify/:token', async (req, res) => {
    try {
      const decoded = jwt.verify(req.params.token, process.env.Secret_Key);
    //   const user = await User.findOne({ e_mail: decoded.email, verificationToken: req.params.token });
  
    //   if (!user) return res.status(400).send('Invalid verification link.');
  
      // Mark user as verified and save the verification time

      console.log("decoded token",decoded);

      const user = new userModel({
                              _id: new mongo.Types.ObjectId(),
                              firstName: decoded.firstName,
                              lastName: decoded.lastName,
                              dob: decoded.dob,
                              username: decoded.username,
                              password: decoded.password,
                              role: decoded.role,
                              faculty: decoded.faculty,
                              e_mail: decoded.e_mail,
                              contact: decoded.contact,
                              gender: decoded.gender,
                              depernment: decoded.depernment
                  });
      user.verified = true;
      user.verifiedAt = new Date();
      user.verificationToken = null; // Remove the verification token

      console.log("user",user)
      await user.save();
  
      res.status(200).send('Email verified successfully! Redirecting...');
    } catch (err) {
      console.log(err);
      res.status(400).send('Verification link is invalid or expired.');
    }
  });
  


module.exports = router;
