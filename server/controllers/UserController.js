import User from '../models/User.js';

export const createCustomer = async (req, res) => {
    const user = await User.create({ ...req.body, role: 'customer' });
    res.status(201).json(user);
};

export const getAllCustomers = async (req, res) => {
    // if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    const customers = await User.find({ role: 'customer' });
    res.json(customers);
};
