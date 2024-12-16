const express = require('express');
const path = require('path');
const cors = require('cors');
const bcryot = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();

app.use(cors());
app.use(express.json());


app.listen(5000, () => {
    console.log('Server is running on port 5000');
});