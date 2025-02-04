// const users = require('../model/userModel');
// const canteens = require('../model/canteenModel');
// const jwt = require('jsonwebtoken');



// const login =(username, password) => {
//     return new Promise((resolve,reject)=>{
//         Promise.all([
//             users.find({ username: username }),
//             canteens.find({ username: username })
//         ]).then(([userData, canteenData]) => {
//             if (userData.length > 0) {
//             const user = userData[0];

//             if (user.password === password) {
//                 const token = jwt.sign({ username: user.username, role: user.role }, process.env.Secret_Key, { expiresIn: '1h' });
            
//                 return resolve({ status: 200, token});
//             } else {
//                 return resolve({ status: 401, message: "Invalid password" });
//             }
//             } else if (canteenData.length > 0) {
//             const canteen = canteenData[0];
//             if (canteen.password === password) {
//                 const token = jwt.sign({ username: canteen.username, role: "canteen" ,canteen_id : canteen._id}, process.env.Secret_Key, { expiresIn: '1h' });
//                 return resolve({ status: 200, token });
//             } else {
//                 return resolve({ status: 401, message: "Invalid password" });
//             }
//             } else {
//             return resolve({ status: 404, message: "User not found" });
//             }
//         }).catch((err) => {
//             console.log("error", err);
//             return reject(err);
//         });
//     }
//     // return new Promise((resolve, reject) => {
//     //         users.find({username:username}).then((data) => {
//     //             console.log(data);
//     //             if(data.length > 0){
//     //                 const token = jwt.sign({username: data.username, role: data.role,password:data.password},process.env.Secret_Key,{expiresIn: '1h'});
//     //                 console.log(token);
//     //                 console.log(data[0].password);
//     //                 if(data[0].password === password){
//     //                     console.log("password matched");
//     //                     return resolve({ status: 200, token });
//     //                 }
//     //                   else{
//     //                       return resolve({ status: 401, message: "Invalid_password" });
//     //                   }
//     //           }
//     //           else{
//     //               return resolve({status: 404, message: "User not found"});
//     //           }
//     //         }).catch((err) => { console.log("error",err) }
//     //         );
//     // }
//     );
// }

// const logout =(token)=>{
//     return new Promise((resolve, reject) => {
//         jwt.verify(token, "12345", (err, data) => {
//             if(err) return resolve({status: 401, message: "Invalid token"});
//             return resolve({status: 200, message: "Logout successful"});
//         });
//     });
// }
            


// module.exports = {
//     login
// };
       

        




const users = require('../model/userModel');
const canteens = require('../model/canteenModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const login = (username, password) => {
    return new Promise((resolve, reject) => {
        Promise.all([
            users.findOne({ username: username }),
            canteens.findOne({ username: username })
        ]).then(async ([user, canteen]) => {
            console.log(user,canteen)
            if (user) {
                const passwordMatch = await bcrypt.compare(password, user.password);
                console.log(passwordMatch)
                if (passwordMatch) {
                    const token = jwt.sign(

                       

                        { username: user.e_mail, role: user.role ,user_id : user._id , name : user.firstName, user._id,ID:user._id }, 

                        process.env.Secret_Key, 
                        { expiresIn: '1h' }
                    );
                    return resolve({ status: 200, token });
                } else {
                    return resolve({ status: 401, message: "Invalid password" });
                }
            } else if (canteen) {
                // const passwordMatch = await bcrypt.compare(password, canteen.password);
                // console.log(passwordMatch)
                if (canteen.password === password) {
                    const token = jwt.sign(
                        { username: canteen.username, role: "canteen", canteen_id: canteen._id }, 
                        process.env.Secret_Key, 
                        { expiresIn: '1h' }
                    );
                    return resolve({ status: 200, token });
                } else {
                    return resolve({ status: 401, message: "Invalid password" });
                }
            } else {
                return resolve({ status: 404, message: "User not found" });
            }
        }).catch((err) => {
            console.error("Login error:", err);
            return reject(err);
        });
    });
};

const logout = (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.Secret_Key, (err) => {
            if (err) return resolve({ status: 401, message: "Invalid token" });
            return resolve({ status: 200, message: "Logout successful" });
        });
    });
};

module.exports = {
    login,
    logout
};
