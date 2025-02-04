const mongoose = require("mongoose");
const raitings = require("../model/raitingModel");
const menue = require("../model/menuModel");

const addRaiting = (user_id, item_id, raite, type, canteen_id) => {
    console.log(user_id, item_id, raite, type, canteen_id);
  
    return new Promise(async (resolve, reject) => {
      try {
        // Convert IDs to ObjectId
        const u_id = new mongoose.Types.ObjectId(user_id);
        const i_id = new mongoose.Types.ObjectId(item_id);
        const c_id = new mongoose.Types.ObjectId(canteen_id);
  
        // Find existing rating
        const existingRating = await raitings.findOne({ user_id: u_id, item_id: i_id });
  
        if (existingRating) {
          // Update existing rating
          await raitings.updateOne({ user_id: u_id, item_id: i_id }, { $set: { raiting: raite } });
          console.log("Updated existing rating");
        } else {
          // Save new rating
          const newRating = new raitings({ user_id: u_id, item_id: i_id, raiting: raite });
          await newRating.save();
          console.log("Saved new rating");
        }
  
        // Calculate new average rating
        const allRatings = await raitings.find({ item_id: i_id });
        const sum = allRatings.reduce((acc, curr) => acc + curr.raiting, 0);
        const avg = sum / allRatings.length;
        console.log("New average rating:", avg);
  
        // Update rating in menu
        const updatedMenu = await menue.updateOne(
          { canteen_id: c_id, [`${type}._id`]: i_id }, // Find the menu by canteen_id and item_id
          { $set: { [`${type}.$.raiting`]: avg } }, // Update rating with average
          { new: true }
        );
  
        if (!updatedMenu) {
          console.log("Menu item not found");
          return reject({ status: 404, message: "Menu item not found" });
        }
  
        console.log("Updated menu:", updatedMenu);
        resolve({ status: 200, data: updatedMenu });
  
      } catch (error) {
        console.error("Error:", error);
        reject({ status: 500, error });
      }
    });
  };
  




module.exports = {
     addRaiting
}