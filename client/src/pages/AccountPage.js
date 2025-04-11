import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import Register from './Register';
import BookingList from '../components/BookingList';
import '../css/AccountPage.css';

const AccountPage = () => {
    const { currentUser } = useAuth();
    const [editing, setEditing] = useState(false);
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/users/customers/${currentUser._id}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if (!response.ok) throw new Error('Failed to fetch user data');
                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };
        fetchUserData();
    }, [currentUser._id]);

    if (loading) return <p className="loading-text">Loading user data...</p>;

    return (
        <main className="account-page">
            {!editing ? (
                <div className="account-container">
                    <section className="profile-section">
                        <div className="profile-header">
                            <img
                                src={userData.profileImage || 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'}
                                alt="User avatar"
                                className="avatar"
                            />
                            <div className="user-name">
                                <h2 className="user-fullname">{userData.firstName} {userData.lastName}</h2>
                            </div>
                        </div>

                        <div className="profile-details">
                            <div className="detail-item"><strong>📞 Phone:</strong> {userData.phone}</div>
                            <div className="detail-item"><strong>📧 Email:</strong> {userData.email}</div>
                            <div className="detail-item"><strong>🏙️ City:</strong> {userData.city}</div>
                        </div>

                        <hr className="section-divider" />

                        {userData.paymentCard && (
                            <div className="payment-section">
                                <h3 className="section-heading">💳 Payment Information</h3>
                                <div className="detail-item"><strong>Cardholder:</strong> {userData.paymentCard.cardHolderName}</div>
                                <div className="detail-item"><strong>Card Number:</strong> **** **** **** {userData.paymentCard.cardNumber.slice(-4)}</div>
                                <div className="detail-item"><strong>Expiry:</strong> {userData.paymentCard.expiryMonth}/{userData.paymentCard.expiryYear}</div>
                            </div>
                        )}

                        <div className="action-buttons">
                            <button className="edit-profile-btn" onClick={() => setEditing(true)}>
                                ✏️ Edit Account
                            </button>
                        </div>
                    </section>

                    <hr className="divider" />

                    <section className="booking-section">
                        <h3 className="section-heading">📅 Your Bookings</h3>
                        <BookingList type="customer" id={currentUser._id} />
                    </section>
                </div>
            ) : (
                <Register isEditing={true} userData={userData} setEditing={setEditing} />
            )}
        </main>
    );
};

export default AccountPage;
