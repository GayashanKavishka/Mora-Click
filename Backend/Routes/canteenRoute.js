const router = require('express').Router();


const { getcanteen  , updateCanteenStatus,updatecanteen ,} = require('../controllers/canteencontroll.js');



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

    


router.put('/updatecanteenstatus',)
async (req, res) => {
    try {
        const _id = req.query._id;
        const newStatus = req.body.status;
        const result = await updateCanteenStatus(_id, newStatus);
        if(result.status === 200) return res.status(200).json({ message: 'Canteen status updated successfully' });
        if(result.status === 404) return res.status(404).json({ message: 'Canteen not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
}




module.exports = router;




