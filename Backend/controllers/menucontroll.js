const menus = require('../model/menuModel');
const mongo = require('mongoose');
const moment = require('moment-timezone');


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
   

// const updateavailable = (canteen_id, category, meal_name) => {
//     return new Promise((resolve, reject) => {
//         const objectId = new mongo.Types.ObjectId(canteen_id);
//         console.log(objectId, category, meal_name);

//         // Find the current availability status of the meal
//         menus
//             .findOne({canteen_id: objectId })
//             .then((result) => {

//                 if (!result || !result[category]) {
//                     return reject({ status: 404, message: "Category not found" });
//                 }

                

//                 const item = result[category].find((meal) => meal.name === meal_name);
//                 if (!item) {
//                     return reject({ status: 404, message: "Meal not found" });
//                 }

//                 const currentAvailability = item.available;

//                 const sriLankaTime = moment().tz("Asia/Colombo").format("YYYY-MM-DD HH:mm:ss");

//                 // Update the availability by toggling its value
//                 menus
//                     .updateOne(
//                         { canteen_id: objectId, [`${category}.name`]: meal_name },
//                         {
//                             $set: {
//                                 [`${category}.$.available`]: !currentAvailability,
//                                 [`${category}.$.time_be_ua`]: sriLankaTime,
//                             },
//                         }
//                     )
//                     .then((data) => {
//                         if (data.matchedCount === 0) {
//                             return resolve({ status: 404, message: "Update failed" });
//                         }
//                         return resolve({ status: 200, message: "Availability updated successfully", data });
//                     })
//                     .catch((err) => reject({ status: 500, message: "Database update failed", error: err }));
//             })
//             .catch((err) => reject({ status: 500, message: "Database query failed", error: err }));
//     });
// };


const updateavailable = (canteen_id, category, _id) => {
    return new Promise((resolve, reject) => {
        const objectId = new mongo.Types.ObjectId(canteen_id);
        const mealId = new mongo.Types.ObjectId(_id);
        console.log(objectId, category, mealId);

        // Find the current availability status of the meal
        menus
            .findOne({ canteen_id: objectId })
            .then((result) => {
                if (!result || !result[category]) {
                    return reject({ status: 404, message: "Category not found" });
                }

                console.log(result[category][0]._id);

                

                const item = result[category].find((meal) => meal._id == _id);
                if (!item) {
                    return reject({ status: 404, message: "Meal not found" });
                }

                const currentAvailability = item.available;

                // Calculate the new availability status
                const newAvailability = !currentAvailability;

                // Build the update object based on the new status
                const updateFields = { [`${category}.$.available`]: newAvailability };

                // If the new status is 'unavailable', update `time_be_ua`
                if (!newAvailability) {
                    
                    formattedTime = moment().tz("Asia/Colombo").format("YYYY-MM-DD HH:mm:ss");
                    updateFields[`${category}.$.time_be_ua`] = formattedTime;
                }

                // Perform the update operation
                menus
                    .updateOne(
                        { canteen_id: objectId, [`${category}._id`]: _id },
                        { $set: updateFields }
                    )
                    .then((data) => {
                        if (data.matchedCount === 0) {
                            return resolve({ status: 404, message: "Update failed" });
                        }
                        return resolve({
                            status: 200,
                            message: "Availability updated successfully",
                            data,
                        });
                    })
                    .catch((err) =>
                        reject({ status: 500, message: "Database update failed", error: err })
                    );
            })
            .catch((err) =>
                reject({ status: 500, message: "Database query failed", error: err })
            );
    });
};

const updatefooditem =(data,canteen_id,category) =>{
    return new Promise((resolve,reject)=>{
        const objectId = new mongo.Types.ObjectId(canteen_id);
        const mealId = new mongo.Types.ObjectId(data._id);
        console.log("category",category);
        console.log("can_id",canteen_id);
        console.log("data",data);

        menus.findOne({canteen_id:objectId}).then((result)=>{
            if(!result || !result[category]){
                return reject({status:404,message:"Category not found"});
            }

            const item = result[category].find((meal)=>meal._id == data._id);
            if(!item){
                return reject({status:404,message:"Meal not found"});
            }

            const updateFields = {
                [`${category}.$.name`]: data.name,
                [`${category}.$.price`]: data.price,
                [`${category}.$.description`]: data.description,
            };

            if (data.image) {
                updateFields[`${category}.$.image`] = data.image;
            }

            menus.updateOne({canteen_id:objectId, [`${category}._id`]: data._id}, {$set: updateFields}).then((data)=>{
                if(data.matchedCount === 0){
                    return resolve({status:404,message:"Update failed"});
                }
                return resolve({status:200,message:"Meal updated successfully",data});
            }).catch((err)=>reject({status:500,message:"Database update failed",error:err}));
        }).catch((err) => reject({ status: 500, message: "Database update failed", error: err }));
    });
};

const deletefooditem= (data,canteen_id,category) =>{
    return new Promise((resolve,reject)=>{
        const objectId = new mongo.Types.ObjectId(canteen_id);
        const mealId = new mongo.Types.ObjectId(data._id);
        console.log("category",category);
        console.log("data",data);
        console.log("id",data._id);

        menus.findOne({canteen_id:objectId}).then((result)=>{
            if(!result || !result[category]){
                return reject({status:404,message:"Category not found"});
            }

            console.log(result[category]);

            const item = result[category].find((meal)=>meal._id == data._id);
            console.log(item);
            if(!item){
                return reject({status:404,message:"Meal not found"});
            }

            menus.updateOne({canteen_id:objectId, [`${category}._id`]: data._id}, {$pull: {[category]: {_id: data._id}}}).then((data)=>{
                if(data.matchedCount === 0){
                    return resolve({status:404,message:"Update failed"});
                }
                return resolve({status:200,message:"Meal updated successfully",data});
            }).catch((err)=>reject({status:500,message:"Database update failed",error:err}));
        }).catch((err) => reject({ status: 500, message: "Database update failed", error: err }));
    });
}

module.exports={
    getmenu,
    updateCanteenMenu,
    updateavailable,
    updatefooditem,
    deletefooditem
};