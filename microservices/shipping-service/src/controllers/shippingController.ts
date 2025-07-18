import { Request, Response } from 'express';
import { createShipping, updateShippingStatus } from '../services/shippingService';

export const createShippingHandler = async (req: Request, res: Response) => {
    try{
        const { orderId, address } = req.body;
        const shipping = await createShipping(orderId, address);
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ message: 'Failed to create shipping', error: error.message });
    }
}

export const updateShippingStatusHandler = async (req: Request, res: Response) => {
    try{
        const { shippingId, status } = req.body;
        const shipping = await updateShippingStatus(shippingId, status);
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update shipping status', error: error.message });
    }
}