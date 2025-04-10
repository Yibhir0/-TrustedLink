import express from 'express';
import {
    getAllBookings,
    getBookingsByCustomerId,
    getBookingsByProviderId,
    getBookingsByServiceId,
    addBooking,
    updateBooking,
    deleteBooking
} from '../controllers/BookingController.js';

const router = express.Router();

// Create a booking
router.post('/', addBooking);

// Get all bookings (e.g. admin use)
router.get('/admin', getAllBookings);

// Get bookings for a specific customer
router.get('/customer/:customerId', getBookingsByCustomerId);

// Get bookings for a specific provider
router.get('/provider/:providerId', getBookingsByProviderId);
// Get bookings for a specific service
router.get('/service/:serviceId', getBookingsByServiceId);

// Update a booking by ID
router.put('/:bookingId', updateBooking);

// Delete a booking by ID
router.delete('/admin/:bookingId', deleteBooking);

export default router;
