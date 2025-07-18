import { Request, Response } from 'express';
import { createProduct, getProductById, getAllProducts, updateProductQuantity, placeOrder, getOrdersByUserId } from '../services/productService';

export const createProductHandler = async (req: Request, res: Response) => {
    try {
        const productData=req.body;
        const product=await createProduct(productData);
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create product', error: error.message });
    }
}

export const getProductByIdHandler = async (req: Request, res: Response) => {
    try {
        const productId=parseInt(req.params.id);
        const product=await getProductById(productId);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get product', error: error.message });
    }
}

export const getAllProductsHandler = async (req: Request, res: Response) => {
    try {
        const products=await getAllProducts();
        res.status(200).json(products);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get products', error: error.message });
    }
}

export const updateProductQuantityHandler = async (req: Request, res: Response) => {
    try {
        const productId=parseInt(req.params.id);
        const quantity=parseInt(req.body.quantity);
        const product=await updateProductQuantity(productId, quantity);
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update product quantity', error: error.message });
    }
}

export const placeOrderHandler = async (req: Request, res: Response) => {
    try{
        const {userId, productId, quantity, address}=req.body;
        const order=await placeOrder(userId, productId, quantity, address);
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: 'Failed to place order', error: error.message });
    }
}

export const getOrdersByUserIdHandler = async (req: Request, res: Response) => {
    try{
        const userId=parseInt(req.params.userId);
        const orders=await getOrdersByUserId(userId);
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get orders', error: error.message });
    }
}