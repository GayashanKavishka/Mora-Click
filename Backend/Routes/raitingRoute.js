const router = require("express").Router();
const {addRaiting,addSpecialRaiting} = require('../controllers/raitingControll')



router.post("/add",async(req,res)=>{
    const {user_id,item_id,raite,type,canteen_id} = req.body
    const result  = await addRaiting(user_id,item_id,raite,type,canteen_id);
    if(result.status === 200 ) return res.status(200).json({data:result.data})
    if(result.status === 400) return res.status(400).json({message:"error"})


})

router.post("/addspecial",async(req,res)=>{
    const {user_id,item_id,raite} = req.body
    const result  = await addSpecialRaiting(user_id,item_id,raite);
    if(result.status === 200 ) return res.status(200).json({data:result.data})
    if(result.status === 400) return res.status(400).json({message:"error"})
})


router.get('/get',async(req,res)=>{

})

router.put('/get',async(req,res)=>{
    
})


module.exports = router;