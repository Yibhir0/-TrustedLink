import Review from '../models/Review.js';
import Booking from '../models/Booking.js';
import User from '../models/User.js';
import ProviderProfile from '../models/ProviderProfile.js';


// GET all reviews for a provider (with customer info)
export const getReviewsByProvider = async (req, res) => {
    try {
        const { providerId } = req.params;

        // find userId in the Provider collection
        const providerProfile = await ProviderProfile.findOne({
            _id: providerId
        });

        const user = await User.findById(providerProfile.user._id);

        if (!user) return res.status(404).json({ error: 'Provider not found' });


        const reviews = await Review.find({ providerId: user._id })
            .populate('customerId', 'firstName lastName email city profileImage');


        res.json(reviews);
    } catch (err) {
        res.status(500).json({ error: 'Failed to fetch reviews' });
    }
};



// POST a new review
export const createReview = async (req, res) => {
    try {
        const { bookingId, rating, comment } = req.body;



        // Optional: Ensure the booking exists and belongs to the customer & provider
        const booking = await Booking.findById(bookingId);

        if (!booking) return res.status(404).json({ error: 'Booking not found' });
        const customerId = booking.customerId;
        const providerId = booking.providerId;

        const review = await Review.create({
            bookingId,
            providerId,
            customerId,
            rating,
            comment,
        });

        res.status(201).json(review);
    } catch (err) {
        res.status(500).json({ error: 'Failed to create review' });
    }
};
