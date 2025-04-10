import '../css/Booking.css';
import { useState } from 'react';
import ConfirmModal from './ConfirmModal';


const BookingCard = ({ booking, role, onDelete, onUpdate }) => {

    const [showConfirm, setShowConfirm] = useState(false);

    const handleDelete = () => {
        onDelete(booking._id);
    };

    const handleStatusChange = (newStatus) => {
        onUpdate(newStatus, booking._id);

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
            </div>
            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this booking?"
                    onConfirm={handleDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default BookingCard;
