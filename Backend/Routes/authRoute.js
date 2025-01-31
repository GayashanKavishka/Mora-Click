const router = require('express').Router();
const {login} = require('../controllers/authcontroll.js');



router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(username,password);
        const result = await login(username, password);
        if(result.status === 200) return res.status(200).json({ token: result.token, message: 'Login successful' });
        if(result.status === 401) return res.status(401).json({ message: 'Invalid password' });
        if(result.status === 404) return res.status(404).json({ message: 'User not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
}
);

router.get('/register', async (req, res) => {
    // try {
    //     const { firstName, lastName, dob, username, password, role, faculty, batch } = req.body;
    //     const user = new users({ firstName, lastName, dob, username, password, role, faculty, batch });
    //     await user.save();
    //     res.status(200).json({ message: 'User registered successfully' });
    // } catch (error) {
    //     res.status(400).json({ error });
    // }
});

router.put('/update', async (req, res) => {
    // try {
    //     const { username, password } = req.body;
    //     const user = users
    //
});

module.exports = router;


