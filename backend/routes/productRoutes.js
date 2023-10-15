import express from 'express';
// import products from '../data/Products.js';
import { getProducts, getProductById } from '../controllers/productControllers.js';
const router = express.Router();

router.route('/').get(getProducts);
router.route('/:id').get(getProductById);

export default router;