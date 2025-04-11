import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    providerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    serviceId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Service',
        required: true
    },
    status: {
        type: String,
        enum: ['requested', 'accepted', 'completed', 'approved', 'rejected', 'cancelled', 'success'],
        default: 'requested',
        required: true
    },
    scheduledDate: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        required: true
    },
    updatedAt: {
        type: Date,
        default: Date.now,
        required: true
    }
});

// Optional: Add a pre-save hook to automatically update `updatedAt`
bookingSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Booking = mongoose.model('Booking', bookingSchema);
export default Booking;
