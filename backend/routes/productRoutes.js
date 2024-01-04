import express from 'express';
import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/productModel.js';

const router = express.Router();

router.get('/', asyncHandler( async (req, res) => {
    console.log("?products route hit")
    const products = await Product.find({});
    res.json(products);

    console.log('Response sent from products')
}));

router.get('/:id', asyncHandler( async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(product) {
        return res.json(product);
    }

    res.status(404).json({message: 'Product not found'})
}))

export default router;