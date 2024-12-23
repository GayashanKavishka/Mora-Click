const router = require('express').Router();
const {getmenu,updateCanteenMenu,updateavailable} = require('../controllers/menucontroll.js');


router.get('/getmenu', async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const result = await getmenu(canteen_id);
        if(result.status === 200) return res.status(200).json({ data: result.data });
        if(result.status === 404) return res.status(404).json({ message: 'Menu not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error:"ERROR " });
    }
}
);

router.put('/updatecanteenmenu', async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const catogery = req.query.catogery;
        const obj = req.body;
        const result = await updateCanteenMenu(canteen_id, catogery, obj);
        if(result.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
        if(result.status === 404) return res.status(404).json({ message: 'Menu not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
}
);

router.put('/updateavailable', async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const catogery = req.query.catogery;
        const meal_name = req.query.meal_name;
        const result = await updateavailable(canteen_id, catogery, meal_name);
        if(result.status === 200) return res.status(200).json({ message: 'Menu availability updated successfully' });
        if(result.status === 404) return res.status(404).json({ message: 'Menu not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
}
);




module.exports = router;;