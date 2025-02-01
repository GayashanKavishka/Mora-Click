const router = require('express').Router();


const { getcanteen  , updateCanteenStatus,updatecanteen ,getAllCanteens} = require('../controllers/canteencontroll.js');



router.get('/getcanteen', async (req, res) => {
    try {
        const _id = req.query._id;
        const result = await getcanteen(_id);
        if(result.status === 200) return res.status(200).json({ data: result.data });
        if(result.status === 404) return res.status(404).json({ message: 'Canteen not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
}
);

router.get('/getallcanteens', async (req, res) => {
    try {
        const result = await getAllCanteens();
        if(result.status === 200) return res.status(200).json({ data: result.data });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'ERROR' });
    }
});


router.put('/updatecanteen', async (req, res) => {
    try {
        const canteen = req.body;
        const result = await updatecanteen(canteen);
        if(result.status === 200) return res.status(200).json({ message: 'Canteen updated successfully' });
        if(result.status === 404) return res.status(404).json({ message: 'Canteen not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: 'ERROR' });
    }
}
);

    


router.put('/updatecanteenstatus', async (req, res) => {
    try {
        const { _id, status } = req.body; // ✅ Get _id and status from request body
        
        
        if (!_id || status === undefined) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        const result = await updateCanteenStatus(_id, status);
        return res.status(result.status).json({ message: result.message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error', error });
    }
});



module.exports = router;




