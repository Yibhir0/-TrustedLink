import express from 'express';
import { updatePaymentCard } from '../controllers/PaymentCardController';

const router = express.Router();

// PATCH /api/payment-cards/:cardId - update card details
router.patch('/:cardId', updatePaymentCard);

export default router;
