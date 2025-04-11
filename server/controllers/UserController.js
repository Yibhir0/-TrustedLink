
import jwt from 'jsonwebtoken';


import User from '../models/User.js';
import PaymentCard from '../models/PaymentCard.js';

export const createCustomer = async (req, res) => {
    try {


        const userData = req.body;

        // Create the user with role = customer
        const user = await User.create({ ...userData, role: 'customer' });

        const card = {

            cardHolderName: userData.cardHolderName,
            cardNumber: userData.cardNumber,
            expiryMonth: userData.expiryMonth,
            expiryYear: userData.expiryYear,
            cvc: userData.cvc
        }

        // If card info is provided, create a PaymentCard linked to this user
        if (card) {
            await PaymentCard.create({
                user: user._id,
                ...card
            });
        }

        res.status(201).json(user);
    } catch (error) {
        console.error('Failed to create customer:', error);
        res.status(500).json({ error: 'Failed to create customer' });
    }
};


export const getAllCustomers = async (req, res) => {
    // if (req.user.role !== 'admin') return res.status(403).json({ error: 'Unauthorized' });
    const customers = await User.find({ role: 'customer' });
    res.json(customers);
};


const SECRET_KEY = 'mydevsecretkey'; // Replace with your actual secret key

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });

        if (!user || user.password !== password) {
            return res.status(401).json({ error: 'Invalid username or password' });
        }

        const payload = {
            _id: user._id,
            role: user.role,
            username: user.username,
        };

        const token = jwt.sign(payload, SECRET_KEY, { expiresIn: '1h' });

        res.json({
            message: 'Login successful',
            token,
            user: payload
        });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Server error' });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ error: 'Server error' });
    }
}

export const getCustomer = async (req, res) => {

    const { id } = req.params;

    try {
        // Fetch the user by ID
        const user = await User.findById(id).lean(); // lean() returns a plain object
        if (!user) {
            return res.status(404).json({ error: 'Customer not found' });
        }

        // Fetch the associated payment card
        const paymentCard = await PaymentCard.findOne({ user: id }).lean();

        // Combine and respond
        res.json({
            ...user,
            paymentCard: paymentCard || null
        });

    } catch (err) {
        console.error('Error fetching customer or payment card:', err);
        res.status(500).json({ error: 'Server error' });
    }
}
export const updateCustomer = async (req, res) => {
    const { id } = req.params;
    const {
        username,
        password,
        email,
        firstName,
        lastName,
        city,
        phone,
        profileImage,
        role,
        cardHolderName,
        cardNumber,
        expiryMonth,
        expiryYear,
        cvc
    } = req.body;

    try {
        // Update User data
        const updatedUser = await User.findByIdAndUpdate(
            id,
            {
                username,
                password, // hash if necessary
                email,
                firstName,
                lastName,
                city,
                phone,
                profileImage,
                role
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update PaymentCard where user == id
        const updatedCard = await PaymentCard.findOneAndUpdate(
            { user: id },
            {
                cardHolderName,
                cardNumber,
                expiryMonth,
                expiryYear,
                cvc
            },
            { new: true, upsert: true } // upsert in case it doesn't exist yet
        );

        return res.status(200).json({
            message: 'Customer and payment card updated successfully',
            user: updatedUser,
            paymentCard: updatedCard
        });
    } catch (error) {
        console.error('Error updating customer:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
