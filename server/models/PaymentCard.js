import mongoose from 'mongoose';

const paymentCardSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cardHolderName: {
        type: String,
        required: true
    },
    cardNumber: {
        type: String,
        required: true
    },
    expiryMonth: {
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    expiryYear: {
        type: Number,
        required: true
    },
    cvc: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

const PaymentCard = mongoose.model('PaymentCard', paymentCardSchema);
export default PaymentCard;
