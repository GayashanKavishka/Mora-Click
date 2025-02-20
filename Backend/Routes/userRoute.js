const router = require('express').Router();
const {registerUser , getuser , updateUser,UpdateFCM} = require('../controllers/usercontroll.js');

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


module.exports = router;
