import { Request, Response } from 'express';
import { createShipping, getShippingAll, updateShippingStatus } from '../services/shippingService';

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
        const { status } = req.body;
        const shippingId=parseInt(req.params.id);
        const shipping = await updateShippingStatus(shippingId, status);
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ message: 'Failed to update shipping status', error: error.message });
    }
}

export const getShippingAllHandler = async (req: Request, res: Response) => {
    try{
        const shipping = await getShippingAll();
        res.status(200).json(shipping);
    } catch (error) {
        res.status(500).json({ message: 'Failed to get all shipping', error: error.message });
    }
}