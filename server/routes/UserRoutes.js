import express from 'express';
import { createCustomer, getAllCustomers } from '../controllers/UserController.js';

const router = express.Router();

router.post('/customers', createCustomer);
router.get('/admin/customers', getAllCustomers); // needs admin check

export default router;
