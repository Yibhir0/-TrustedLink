import Booking from '../models/Booking.js';
import User from '../models/User.js';
import Service from '../models/Service.js';

export const getAllBookings = async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('customerId')
            .populate('providerId')
            .populate('serviceId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings' });
    }
};

export const getBookingsByCustomerId = async (req, res) => {
    const { customerId } = req.params;
    try {
        const bookings = await Booking.find({ customerId })
            .populate('providerId')
            .populate('serviceId')
            .populate('customerId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings by customer' });
    }
};

export const getBookingsByProviderId = async (req, res) => {
    const { providerId } = req.params;
    try {
        const bookings = await Booking.find({ providerId })
            .populate('customerId')
            .populate('serviceId')
            .populate('providerId');
        ;
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings by provider' });
    }
};

export const getBookingsByServiceId = async (req, res) => {
    const { serviceId } = req.params;
    try {
        const bookings = await Booking.find({ serviceId })
            .populate('customerId')
            .populate('providerId')
            .populate('serviceId');
        res.json(bookings);
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch bookings by service' });
    }
};

export const addBooking = async (req, res) => {
    try {
        const newBooking = new Booking(req.body);
        await newBooking.save();
        res.status(201).json(newBooking);
    } catch (error) {
        res.status(400).json({ error: 'Failed to create booking', details: error.message });
    }
};

export const updateBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const updatedBooking = await Booking.findByIdAndUpdate(
            bookingId,
            { ...req.body, updatedAt: new Date() },
            { new: true }
        );
        if (!updatedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json(updatedBooking);
    } catch (error) {
        res.status(400).json({ error: 'Failed to update booking', details: error.message });
    }
};

export const deleteBooking = async (req, res) => {
    const { bookingId } = req.params;
    try {
        const deletedBooking = await Booking.findByIdAndDelete(bookingId);
        if (!deletedBooking) {
            return res.status(404).json({ error: 'Booking not found' });
        }
        res.json({ message: 'Booking deleted successfully', deletedBooking });
    } catch (error) {
        res.status(500).json({ error: 'Failed to delete booking', details: error.message });
    }
};

