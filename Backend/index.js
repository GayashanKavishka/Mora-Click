const express = require('express');
const path = require('path');
const cors = require('cors');
const bcryot = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const db = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());




app.listen(process.env.PORT, () => {
    console.log('Server is running on port 5000');
});