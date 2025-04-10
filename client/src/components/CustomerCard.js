import React, { useState } from 'react';
import '../css/CustomerCard.css';
import ConfirmModal from './ConfirmModal';

const CustomerCard = ({ customer, onDelete }) => {

    const [showConfirm, setShowConfirm] = useState(false);
    return (
        <div className="admin-card">
            <img
                src={customer.profileImage || 'https://i.pravatar.cc/100'}
                alt="Customer"
                className="card-avatar"
            />
            <div className="card-info">
                <h3>{customer.firstName} {customer.lastName}</h3>
                <p><strong>Email:</strong> {customer.email}</p>
                <p><strong>Phone:</strong> {customer.phone}</p>
                <p><strong>City:</strong> {customer.city}</p>
            </div>
            <button className="delete-btn" onClick={() => setShowConfirm(true)}>
                🗑 Delete
            </button>

            {showConfirm && (
                <ConfirmModal
                    message="Are you sure you want to delete this booking?"
                    onConfirm={onDelete}
                    onCancel={() => setShowConfirm(false)}
                />
            )}
        </div>
    );
};

export default CustomerCard;
