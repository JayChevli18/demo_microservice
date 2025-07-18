import { Router } from 'express';
import { createShippingHandler, updateShippingStatusHandler } from '../controllers/shippingController';

const router=Router();

router.post('/', createShippingHandler);
router.put('/:id', updateShippingStatusHandler);

export default router;