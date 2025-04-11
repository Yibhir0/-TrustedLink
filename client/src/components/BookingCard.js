import '../css/Booking.css';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';
import ReviewModal from './ReviewModal';
import { useNavigate } from 'react-router-dom';

const BookingCard = ({ booking, role, onDelete, onUpdate }) => {

    const [showConfirm, setShowConfirm] = useState(false);
    const [showReviewModal, setShowReviewModal] = useState(false);
    const navigate = useNavigate();

    const handleDelete = () => {
        onDelete(booking._id);
    };

    const handleStatusChange = (newStatus) => {

        onUpdate(newStatus, booking._id);

    };

    const handleViewInvoice = (booking) => {
        navigate('/invoice');
    };

    const handleReviewSubmit = async ({ rating, comment }) => {


        try {
            const res = await fetch('http://localhost:8080/api/reviews', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    rating,
                    comment,
                    providerId: booking.providerId._id,
                    customerId: booking.customerId._id,
                    bookingId: booking._id,
                }),
            });

            if (!res.ok) {
                throw new Error('Failed to submit review');
            }

            const data = await res.json();
            console.log(" Review submitted successfully:", data);
            alert("Thanks for your feedback!");
            handleStatusChange('success');
        } catch (error) {
            console.error("Failed to submit review:", error);
            alert("There was an error submitting your review. Please try again.");
        }
    };

    return (
        <div className="booking-card">
            <p><strong>Service:</strong> {booking.serviceId?.name || '—'}</p>
            <p><strong>Provider:</strong> {booking.providerId?.firstName || '—'}</p>
            <p><strong>Customer:</strong> {booking.customerId?.firstName || '—'}</p>
            <p><strong>Scheduled:</strong> {new Date(booking?.scheduledDate).toLocaleString()}</p>
            <p><strong>Description:</strong> {booking?.description}</p>

            <p>
                <strong>Status:</strong>{' '}
                <span className={`status-chip status-${booking.status}`}>
                    {booking.status}
                </span>
            </p>

            <div className="booking-actions">
                {role === 'admin' && (
                    <button className="delete-btn" onClick={() => setShowConfirm(true)}>
                        🗑 Delete
                    </button>
                )}

                {role === 'provider' && booking.status === 'requested' && (
                    <>
                        <button onClick={() => handleStatusChange('accepted')}>
                            ✅ Accept
                        </button>
                        <button
                            className="secondary-btn"
                            onClick={() => handleStatusChange('rejected')}
                        >
                            ❌ Reject
                        </button>
                    </>
                )}

                {role === 'provider' && booking.status === 'accepted' && (
                    <button onClick={() => handleStatusChange('completed')}>
                        ✔️ Mark Completed
                    </button>
                )}

                {role === 'customer' && booking.status === 'approved' && (
                    <button className="approve-btn" onClick={() => setShowReviewModal(true)}>
                        ✍️ Leave a Review
                    </button>
                )}



                {role === 'customer' && booking.status === 'completed' && (
                    <button className="approve-btn" onClick={() => handleStatusChange('approved')}>
                        👍 Approve
                    </button>
                )}

                {role === 'customer' && booking.status === 'requested' && (
                    <button
                        className="secondary-btn"
                        onClick={() => handleStatusChange('cancelled')}
                    >
                        🚫 Cancel
                    </button>
                )}

                {role === 'customer' && booking.status === 'success' && (
                    <button
                        className="secondary-btn"
                        onClick={() => handleViewInvoice()}
                    >
                        🧾 Invoice
                    </button>
                )}
            </div>
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this booking?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
            {showReviewModal && (
                <ReviewModal
                    isOpen={showReviewModal}
                    onClose={() => setShowReviewModal(false)}
                    onSubmit={handleReviewSubmit}
                />
            )}
        </div>
    );
};

export default BookingCard;
