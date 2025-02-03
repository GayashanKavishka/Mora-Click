const router = require('express').Router();


const { addReview,getReview } = require('../controllers/reviewcontroller');


router.put('/updatereview', async (req, res) => {});

router.post('/addreview', async (req, res) => {

    console.log(req.body);
    try {
        const result = await addReview(req.body);
        
        return res.status(result.status).json({ message: "Review added successfully", data: result.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.post('/getreview', async (req, res) => {
    try {
        const result = await getReview(req.body.canteenId);
        return res.status(result.status).json({ message: "Review fetched successfully", data: result.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});




module.exports = router;