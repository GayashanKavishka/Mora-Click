const router = require('express').Router();
const {getItembyId,addSpecial,updateSpecialAvailable,deleteSpecial,updateSpaecialItem} = require('../controllers/specialcontroll.js');


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


router.post('/addspecial', async (req, res) => {
    try {
        const { canteen_id, name, price, image, description } = req.body;
        const result = await addSpecial(canteen_id, name, price, image, description);
        if(result.status === 201) return res.status(201).json({ message: 'Special added successfully' });
        if(result.status === 400) return res.status(400).json({ message: 'Special not added' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
});



router.put('/updateSpecialAvailable', async (req, res) => {
    try{
        const _id = req.query._id;
        const result = await updateSpecialAvailable(_id);
        if(result.status === 200) return res.status(200).json({ message : 'Special availability updated successfully' });
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
}
);

router.delete('/deleteSpecial', async (req, res) => {
    try{
        const _id = req.query._id;
        const result = await deleteSpecial(_id);
        if(result.status === 200) return res.status(200).json({ message : 'Special deleted successfully' });
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
});

router.put('/updateSpecial', async (req, res) => {
    try{
        const id = req.query._id;
        const data = req.body;
        const result = await updateSpaecialItem(data, id);
        if(result.status === 200) return res.status(200).json({ message : 'Special updated successfully' });
    }
    catch(error){
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
});


module.exports = router; 