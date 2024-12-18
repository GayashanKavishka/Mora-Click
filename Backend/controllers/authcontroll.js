const users = require('../model/userModel');
const jwt = require('jsonwebtoken');



const login =(username, password) => {
    return new Promise((resolve, reject) => {
            users.find({username:username}).then((data) => {
                console.log(data);
                if(data.length > 0){
                    const token = jwt.sign({username: data.username, role: data.role,password:data.password},process.env.Secret_Key,{expiresIn: '1h'});
                    console.log(token);
                    console.log(data[0].password);
                    if(data[0].password === password){
                        console.log("password matched");
                        return resolve({ status: 200, token });
                    }
                      else{
                          return resolve({ status: 401, message: "Invalid_password" });
                      }
              }
              else{
                  return resolve({status: 404, message: "User not found"});
              }
            }).catch((err) => { console.log("error",err) }
            );
    }
    );
}

const logout =(token)=>{
    return new Promise((resolve, reject) => {
        jwt.verify(token, "12345", (err, data) => {
            if(err) return resolve({status: 401, message: "Invalid token"});
            return resolve({status: 200, message: "Logout successful"});
        });
    });
}
            


module.exports = {
    login
};
       

        




