const dotenv = require('dotenv');
dotenv.config();

// console.log(process.env)

const express = require('express');
const app = express();
const initModels = require('./models/init.models');
const authRoutes = require('./routes/auth.routes');
const productsRoutes = require('./routes/products.routes');
const cartRoutes = require('./routes/cart.routes');

initModels(); 

app.use(express.json());

app.get('/', (req, res) => res.status(200).json({ message: 'Welcome!'}));

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/products', productsRoutes);
app.use('/api/v1/cart', cartRoutes);

const PORT = process.env.PORT;

app.listen(PORT, () => {
    console.log(`Server up and running. Listening on port ${PORT}.`);
});