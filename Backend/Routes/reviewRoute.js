const router = require('express').Router();


const { addReview } = require('../controllers/reviewcontroller');
router.get('/getreview', async (req, res) => {});
router.put('/updatereview', async (req, res) => {});

router.post('/addreview', async (req, res) => {
    try {
        const result = await addReview(req.body);
        return res.status(result.status).json({ message: "Review added successfully", data: result.data });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});





module.exports = router;