import { Router } from 'express';
import { createShippingHandler, getShippingAllHandler, updateShippingStatusHandler } from '../controllers/shippingController';

const router=Router();

router.post('/', createShippingHandler);
router.put('/:id', updateShippingStatusHandler);
router.get('/', getShippingAllHandler);


export default router;