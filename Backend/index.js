const express = require('express');
const path = require('path');
const cors = require('cors');
const bcryot = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./config/db');
const users = require('./model/userModel');

const app = express();
const bodyParser = require('body-parser');

//++++++++++++++++

// const cloudinary = require('cloudinary').v2;


app.use(bodyParser.json({ limit: '10mb' })); // Adjust the limit as needed
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(cors());
app.use(express.json());


// const func = async (users) => {
//      const a = await users.find({username:"john.doe"}).then((data) => {
//            console.log(data);
//     }).catch((err) => { console.log(err) }
//     );
// }

// func(users);



// cloudinary configuration

// cloudinary.config({
//     cloud_name:"dwk2uss1k",
//     secure:true,
// })

// const url = cloudinary.url('Rice_and_curry_a5fmes',
//     {
//         transformation:[
//             {
//                 fetch_format :'auto'

//             },
//             {
//                 quality:'auto'
//             }
//         ]
//     }
// );

// console.log(url);


const authRouter = require('./Routes/authRoute');
app.use('/auth', authRouter);

const menuRouter = require('./Routes/menuRoute');
app.use('/menu', menuRouter);

const canteenRouter = require('./Routes/canteenRoute');
app.use('/canteen', canteenRouter);

const specialRouter = require('./Routes/specialRoute');
app.use('/special', specialRouter);

const userRouter = require('./Routes/userRoute');
app.use('/user', userRouter);

const reviewRouter = require('./Routes/reviewRoute');
app.use('/review', reviewRouter);

const raitingRouter = require('./Routes/raitingRoute')
app.use('/raiting',raitingRouter);

const notification = require('./Routes/notificationRouter');
app.use('/notification',notification);

app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});