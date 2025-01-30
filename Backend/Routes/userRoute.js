const router = require('express').Router();
const {registerUser} = require('../controllers/usercontroll.js');

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

module.exports = router;
