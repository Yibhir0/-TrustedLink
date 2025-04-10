import PaymentCard from '../models/PaymentCard.js';

export const updatePaymentCard = async (req, res) => {
    try {
        const { cardId } = req.params;
        const updates = req.body;

        const updatedCard = await PaymentCard.findByIdAndUpdate(
            cardId,
            {
                $set: {
                    cardNumber: updates.cardNumber,
                    cardHolderName: updates.cardHolderName,
                    expiryMonth: updates.expiryMonth,
                    expiryYear: updates.expiryYear
                }
            },
            { new: true }
        );

        if (!updatedCard) {
            return res.status(404).json({ error: 'Payment card not found' });
        }

        res.status(200).json(updatedCard);
    } catch (err) {
        console.error('Error updating payment card:', err);
        res.status(500).json({ error: 'Failed to update payment card' });
    }
};
