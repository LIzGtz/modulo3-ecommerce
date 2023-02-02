const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env)

const express = require('express');
const app = express();
const initModels = require('./models/init.models');

initModels(); 

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome!'}));

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server up and running. Listening on port ${PORT}.`);
});