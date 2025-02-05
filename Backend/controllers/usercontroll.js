const mongo = require('mongoose');
const moment = require('moment-timezone');
const user = require('../model/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userModel = require('../model/userModel');
const saltRounds = 10;


const registerUser = (obj) => {
    return new Promise((resolve, reject) => {
        // bcrypt.hash(obj.password, saltRounds, function (err, hash) {
        //     if (err) {
        //         return reject(err);
        //     }
        //     obj.password = hash;
        //     user.create(obj).then((data) => {
        //         return resolve({ status: 200, data });
        //     }).catch((err) => {
        //         return reject(err);
        //     })
        // });

        const{FName, LName, Email, Password, Role, DOB, PNumber, Gender, Depernment, Faculty} = obj;

        const encriptedPassword = bcrypt.hashSync(Password, saltRounds);



        try {
            const users = userModel.find({ e_mail: Email })
            .then((data) => {
                if (data.length > 0) {
                    return reject({ status: 409, message: "User already exists" });
                }
                else {
                    const newUser = new userModel({
                        _id: new mongo.Types.ObjectId(),
                        firstName: FName,
                        lastName: LName,
                        dob: DOB,
                        username: Email,
                        password: encriptedPassword,
                        role: Role,
                        faculty: Faculty,
                        e_mail: Email,
                        contact: PNumber,
                        gender: Gender,
                        depernment: Depernment
            });

            newUser.save()
            .then((data) => {
                return resolve({ status: 200, data });
            }).catch((err) => {
                return reject(err);
            }
            );

            console.log(users);
        }
        }).catch((err) => {
            return reject(err);
        });
        } 
    catch (err) {
        console.error(err);
    }

    });
}

// const loginUser = (obj) => {
//     return new Promise((resolve, reject) => {
//         user.findOne({ email: obj.email }).then((data) => {
//             if (!data) {
//                 return reject({ status: 404, message: "User not found" });
//             }
//             bcrypt.compare(obj.password, data.password, function (err, result) {
//                 if (err) {
//                     return reject(err);
//                 }
//                 if (result) {
//                     const token = jwt.sign({ email: data.email, id: data._id }, process.env.JWT_SECRET);
//                     return resolve({ status: 200, token });
//                 } else {
//                     return reject({ status: 401, message: "Invalid password" });
//                 }
//             });
//         }).catch((err) => {
//             return reject(err);
//         })
//     }
//     );
// }

// const getUserbyId = (id) => {
//     return new Promise((resolve, reject) => {
//         user.findById(id).then((data) => {
//             return resolve({ status: 200, data });
//         }).catch((err) => {
//             return reject(err);
//         })
//     }
//     );
// }

const getuser = (_id) => {
    return new Promise((resolve, reject) => {
        user.findOne({ _id: _id }).then((data) => {
            return resolve({ status: 200, data });
        }).catch((err) => {
            return reject(err);
        })
    }
    );
}

const updateUser =(_id,data) =>{
    return new Promise((resolve,reject)=>{
    const objectId = new mongo.Types.ObjectId(_id);

    user.findOne({ _id: objectId }).then((result) => {
        if (!result) {
            return reject({ status: 404, message: "User not found" });
        }
        console.log(data.password)
        const updateFields = {
            firstName: data.firstName,
            lastName: data.lastName,
            dob: data.dob,
            role: data.role,
            faculty: data.faculty,
            e_mail: data.e_mail,
            contact: data.contact
        };
        
        if(data.password){
            const encriptedPassword = bcrypt.hashSync(data.password, saltRounds);
            updateFields.password = encriptedPassword;
        }

        user.updateOne({ _id: objectId }, { $set: updateFields }).then((data) => {
            if (data.matchedCount === 0) {
                return resolve({ status: 404, message: "Update failed" });
            }
            return resolve({ status: 200, message: "User updated successfully", data });
        }).catch((err) => reject({ status: 500, message: "Database update failed", error: err }));
    });
}
)}

module.exports = {
    registerUser,
    getuser,
    updateUser
};

