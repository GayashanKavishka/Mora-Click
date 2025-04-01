const specials = require('../model/specialModel');
const mongo = require('mongoose');

const getItembyId = (canteen_id) => {
    return new Promise((resolve, reject) => {
        specials.find({ canteen_id: canteen_id }).then((data) => {
            return resolve({ status: 200, data });
        }).catch((err) => {
            return reject(err);
        })
    });
};


const addSpecial = (canteen_id, name, price, image, discription) => {

    
    return new Promise((resolve, reject) => {
        console.log("canteen_id",canteen_id);
        console.log("name",name);
        console.log("price",price);
        console.log("image",image);
        console.log("discription",discription)
        specials.create({
            canteen_id: canteen_id,
            name: name,
            price: price,
            image: image,
            description: discription
        }).then(() => {
            return resolve({ status: 201 });
        }).catch((err) => {
            return reject(err);
        });
    });

};


const updateSpecialAvailable = (_id) => {
    return new Promise((Resolve,Reject)=>{
    specials.findOne({_id:_id}).then((data)=>{
        specials.updateOne({_id:_id},{available:!data.available}).then((data)=>{
            return Resolve({status:200,data});
        }).catch((err)=>{
            return Reject(err);
        })
    })
    .catch((err)=>{
        return Reject(err);
    }
)


}
    )};


const deleteSpecial = (_id) => {
    return new Promise((Resolve , Reject)=>{
        specials.deleteOne({_id:_id}).then((data)=>{
            return Resolve({status:200,data});
        }).catch((err)=>{
            return Reject(err);
        })
    })
}


// const updateSpaecialItem = (data, id) => {
//     return new Promise((resolve, reject) => {
//         console.log("data",data);
//         console.log("id",id);


//         const updateFields = {
//             [`name`]: data.name,
//             [`price`]: data.price,
//             [`discription`]: data.discription,
//         };

//         if (data.image !== 'null') {
//             updateFields[`image`] = data.image;
//         }
//         specials.updateOne({ _id: id }, data).then((data) => {
//             console.log("data",data);
//             return resolve({ status: 200, data });
//         }).catch((err) => {
//             return reject(err);
//         });
//     });
// }

const updateSpaecialItem = (data, id) => {
    return new Promise((resolve, reject) => {
        console.log("data", data);
        console.log("id", id);

        let updateFields = {};

        if (data.name) updateFields["name"] = data.name;
        if (data.price) updateFields["price"] = data.price;
        if (data.description) updateFields["description"] = data.description;
        if (data.image && data.image !== 'null') updateFields["image"] = data.image;

        if (Object.keys(updateFields).length === 0) {
            return reject({ status: 400, message: "No fields to update" });
        }

        specials.updateOne({ _id: id }, { $set: updateFields })
            .then((result) => {
                console.log("Update Result", result);
                return resolve({ status: 200, data: result });
            })
            .catch((err) => {
                return reject(err);
            });
    });
};



module.exports ={
    getItembyId,
    addSpecial,
    updateSpecialAvailable,
    deleteSpecial,
    updateSpaecialItem
};