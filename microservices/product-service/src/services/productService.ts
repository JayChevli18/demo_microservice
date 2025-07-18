import { Product } from '../models/Product';
import { AppDataSource } from '../config/db';
import axios from 'axios';
import { Order } from '../models/Order';
import { publishOrderToQueue } from '../messagequeue/orderQueue';

export const createProduct = async (productData: Product) => {
    const product = new Product();
    product.name = productData.name;
    product.description = productData.description;
    product.price = productData.price;
    product.quantity = productData.quantity;
    product.imageUrl = productData.imageUrl;

    await AppDataSource.getRepository(Product).save(product);
    return product;
}

export const getProductById= async (productId: number) => {
    const product=await AppDataSource.getRepository(Product).findOne({ 
        where: { id: productId } 
    });
    if(!product){
        throw new Error('Product not found');
    }
    return product;
}

export const getAllProducts = async () => {
    const products=await AppDataSource.getRepository(Product).find();
    return products;
}

export const placeOrder = async (userId: number, productId: number, quantity: number, address: string) => {
    const product=await AppDataSource.getRepository(Product).findOne({ 
        where: { id: productId } 
    });
    if(!product){
        throw new Error('Product not found');
    }
    const order=new Order();
    order.product=product;
    order.quantity=quantity;
    order.price=product.price*quantity;
    order.userId=userId;
    await AppDataSource.getRepository(Order).save(order);

    product.quantity=product.quantity - quantity;
    await AppDataSource.getRepository(Product).save(product);
    
    await publishOrderToQueue(order, address);

    return order;
}

export const updateProductQuantity = async (productId: number, quantity: number) => {
    const product=await AppDataSource.getRepository(Product).findOne({ 
        where: { id: productId } 
    });
    if(!product){
        throw new Error('Product not found');
    }
    product.quantity=product.quantity - quantity;
    await AppDataSource.getRepository(Product).save(product);
}

export const getOrdersByUserId = async (userId: number) => {
    const orders=await AppDataSource.getRepository(Order).find({ 
        where: { userId: userId } 
    });
    return orders;
}