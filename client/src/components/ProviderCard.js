import React, { useState } from 'react';
import "../css/AdminDashboard.css";
import ConfirmModal from './ConfirmModal';

const ProviderCard = ({ provider, onDelete }) => {
    const [showConfirm, setShowConfirm] = useState(false);

    console.log("ProviderCard", provider);

    const handleDelete = () => {
        onDelete(provider._id);
    };
    return (
        <div className="admin-card">
            <img
                src={provider.profileImage || "https://i.pravatar.cc/100"}
                alt="Profile"
                className="card-avatar"
            />
            <div className="card-info">
                <h3>{provider?.user.firstName} {provider?.user.lastName}</h3>
                <p><strong>Email:</strong> {provider?.user.email}</p>
                <p><strong>Phone:</strong> {provider?.user.phone}</p>
                <p><strong>City:</strong> {provider.city}</p>
                <p><strong>Category:</strong> {provider.category}</p>
            </div>
            <button className="delete-btn" onClick={() => setShowConfirm(true)}>
                🗑 Delete
            </button>

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

export default ProviderCard;
