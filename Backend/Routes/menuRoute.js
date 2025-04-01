const router = require('express').Router();
const {getmenu,updateCanteenMenu,updateavailable,updatefooditem,deletefooditem} = require('../controllers/menucontroll.js');
// const upload = require('../Service/upload.js');
// const cloudinary = require("../Service/upload.js")

const {upload,cloudinary} = require('../Service/upload.js');


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

// router.put('/updatecanteenmenu', upload.single("image"), async (req, res) => {
//     try {
//         const canteen_id = req.query.canteen_id;
//         const catogery = req.query.catogery;
//         const obj = req.body;
//         const imageURl = req.file?.secure_url; // ✅ Use Cloudinary URL properly
//         console.log("data",obj);
//         const result = await updateCanteenMenu(canteen_id, catogery, obj,imageURl);
//         console.log("Result:", result);
//         if(result.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
//         if(result.status === 404) return res.status(404).json({ message: 'Menu not found' });
//     } catch (error) {
//         console.log(error);
//         res.status(400).json({ error: "ERROR" });
//     }
// }
// );

router.put('/updatecanteenmenu', upload.single("image"), async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const catogery = req.query.catogery;
        const obj = req.body;
        // var  imageURL = ""; // ✅ Use Cloudinary URL properly

        console.log("Received Data:", obj);


        if(req.file !== undefined){
                cloudinary.uploader.upload(req.file.path
                    , async function (error, result) {
                        if (error) {
                            console.log(error);
                            console.log("Error in uploading image");
                        }
                        else{
                            console.log(result);
                            console.log(result.secure_url);
                            const imageURL = result.secure_url;
                            const Res = await updateCanteenMenu(canteen_id, catogery, obj, imageURL);
                            console.log("Result:", Res);
                            if (Res.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
                            if (Res.status === 404) return res.status(404).json({ message: 'Menu not found' });
                        }
                        
                    }
                );
    }
    else
    {
        const imageURL = req.file?.secure_url; // ✅ Use Cloudinary URL properly
        const Res = await updateCanteenMenu(canteen_id, catogery, obj, imageURL);
        console.log("Result:", Res);
        if (Res.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
        if (Res.status === 404) return res.status(404).json({ message: 'Menu not found' });
    }

        

        // const result = await updateCanteenMenu(canteen_id, catogery, obj, imageURL);
        // console.log("Result:", result);
        // if (result.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
        // if (result.status === 404) return res.status(404).json({ message: 'Menu not found' });
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});


router.put('/updateavailable', async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const catogery = req.query.catogery;
        const meal_name = req.query._id;
        const result = await updateavailable(canteen_id, catogery, meal_name);
        if(result.status === 200) return res.status(200).json({ message: 'Menu availability updated successfully' });
        if(result.status === 404) return res.status(404).json({ message: 'Menu not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
}
);

router.put('/updatefooditem', upload.single('image') ,async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const catogery = req.query.catogery;
        const obj = req.body;

        console.log("data in route",obj);
        
        if(req.file !== undefined){
           cloudinary.uploader.upload(req.file.path, async function (error, result) {
            if(error)
            {
                console.log(error);
            }
            else
            {
                obj.image = result.secure_url;
                const Res = await updatefooditem(obj, canteen_id, catogery);
                if(Res.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
                if(Res.status === 404) return res.status(404).json({ message: 'Menu not found' }); 
            }
        })
        }
        else{
            const result = await updatefooditem(obj, canteen_id, catogery);
            if(result.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
            if(result.status === 404) return res.status(404).json({ message: 'Menu not found' }); 
        }
        
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
}
);

router.delete('/deletefooditem', async (req, res) => {
    try {
        const canteen_id = req.query.canteen_id;
        const catogery = req.query.catogery;
        const obj = req.body;
        console.log("id",obj._id,catogery,canteen_id);
        console.log("data",obj);
        const result = await deletefooditem(obj, canteen_id, catogery);
        if(result.status === 200) return res.status(200).json({ message: 'Menu updated successfully' });
        if(result.status === 404) return res.status(404).json({ message: 'Menu not found' });
    } catch (error) {
        console.log(error);
        res.status(400).json({ error: "ERROR" });
    }
}
);

module.exports = router;;