import { Router } from 'express';
import { createProductHandler, getProductByIdHandler, getAllProductsHandler, updateProductQuantityHandler, placeOrderHandler, getOrdersByUserIdHandler } from '../controllers/productController';
import { verifyToken } from '../middleware/authMiddleware';

const router=Router();

router.post('/', verifyToken, createProductHandler);
router.get('/:id', verifyToken, getProductByIdHandler);
router.get('/', verifyToken, getAllProductsHandler);
router.put('/:id', verifyToken, updateProductQuantityHandler);
router.post('/order', verifyToken, placeOrderHandler);
router.get('/orders/:userId', verifyToken, getOrdersByUserIdHandler);

export default router;