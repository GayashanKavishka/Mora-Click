const menus = require('../model/menuModel');
const mongo = require('mongoose');


const getmenu = (canteen_id)=>{
    return new Promise((resolve,reject)=>{
        const objectId = new mongo.Types.ObjectId(canteen_id);
        console.log(objectId);
        menus.find({canteen_id:objectId}).then((data)=>{
            return resolve({status:200,data});
        }).catch((err)=>{
            return reject(err);
        })
    });
};

const updateCanteenMenu =(canteen_id,catogery,obj)=>
    {
        return new Promise((resolve,reject)=>{
            objectId = new mongo.Types.ObjectId(canteen_id);
            console.log(objectId,catogery,obj);
            menus.updateOne({canteen_id:objectId},{$push:{[catogery]:obj}}).then((data)=>{
                return resolve({status:200,data});
            }).catch((err)=>{
                return reject(err);
            })
        });
    }
   

const updateavailable = (canteen_id, category, meal_name) => {
    return new Promise((resolve, reject) => {
        const objectId = new mongo.Types.ObjectId(canteen_id);
        console.log(objectId, category, meal_name);

        // Find the current availability status of the meal
        menus
            .findOne({canteen_id: objectId })
            .then((result) => {

                if (!result || !result[category]) {
                    return reject({ status: 404, message: "Category not found" });
                }

                

                const item = result[category].find((meal) => meal.name === meal_name);
                if (!item) {
                    return reject({ status: 404, message: "Meal not found" });
                }

                const currentAvailability = item.available;

                // Update the availability by toggling its value
                menus
                    .updateOne(
                        { canteen_id: objectId, [`${category}.name`]: meal_name },
                        {
                            $set: {
                                [`${category}.$.available`]: !currentAvailability,
                            },
                        }
                    )
                    .then((data) => {
                        if (data.matchedCount === 0) {
                            return resolve({ status: 404, message: "Update failed" });
                        }
                        return resolve({ status: 200, message: "Availability updated successfully", data });
                    })
                    .catch((err) => reject({ status: 500, message: "Database update failed", error: err }));
            })
            .catch((err) => reject({ status: 500, message: "Database query failed", error: err }));
    });
};


module.exports={
    getmenu,
    updateCanteenMenu,
    updateavailable
};