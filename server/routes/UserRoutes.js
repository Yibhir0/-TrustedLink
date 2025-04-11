import express from 'express';
import {
    createCustomer,
    getAllCustomers,
    loginUser,
    deleteUser,
    getCustomer,
    updateCustomer

} from '../controllers/UserController.js';

const router = express.Router();

router.post('/customers', createCustomer);
router.get('/admin/customers', getAllCustomers); // needs admin check
router.post('/login', loginUser);
router.delete('/admin/customers/:id', deleteUser); // needs admin check
router.get('/customers/:id', getCustomer); // needs admin check
//update customer profile
router.put('/customers/:id', updateCustomer); // needs admin check

export default router;
