import express from 'express';
import productRoutes from './routes/productRoutes.js'
import dotenv from 'dotenv';
import connectDB from './config/db.js';

dotenv.config()

const port = process.env.PORT || 5000;

connectDB(); // Connect to MongoDB

const app = express();

app.get('/', (req, res) => {
    res.send('get request response')
})

app.use('/api/products', productRoutes);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
})