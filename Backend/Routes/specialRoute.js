const router = require('express').Router();
const {getItembyId} = require('../controllers/specialcontroll.js');


router.get('/getItembyId', async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const result = await getItembyId(canteen_id);
        if(result.status === 200) return res.status(200).json({ data: result.data });
        if(result.status === 404) return res.status(404).json({ message: 'Special not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }

});


module.exports = router; 