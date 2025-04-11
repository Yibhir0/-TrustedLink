import React from 'react';
import '../css/InvoicePage.css';

const InvoicePage = () => {
    // Hardcoded mock data
    const booking = {
        _id: '6543f2ab18293a17b25ed11f',
        createdAt: '2025-04-10T10:32:00Z',
        date: '2025-04-15',
        time: '14:00',
        status: 'success',
        price: 120,
        service: {
            name: 'Home Cleaning',
            description: 'Deep cleaning for 2-bedroom apartment'
        },
        customer: {
            firstName: 'Mocro',
            lastName: 'Mafia',
            email: 'mocromafia@example.com',
            phone: '514-445-1234',
            city: 'Montreal'
        },
        provider: {
            firstName: 'hassan',
            lastName: 'provider',
            email: 'hassan.provider@example.com',
            phone: '514-999-4321'
        }
    };

    const paymentCard = {
        cardHolderName: 'Mocro Mafia',
        cardNumber: '4242424242424242',
        expiryMonth: '08',
        expiryYear: '2026'
    };

    return (
        <div className="invoice-page">
            <div className="invoice-container">
                <header className="invoice-header">
                    <h1>🧾 Invoice</h1>
                    <p className="invoice-id">Invoice ID: INV-{booking._id.slice(-6).toUpperCase()}</p>
                    <p className="invoice-date">Date: {new Date(booking.createdAt).toLocaleDateString()}</p>
                </header>

                <section className="invoice-section">
                    <h2 className="section-title">👤 Customer Information</h2>
                    <div className="info-pair"><strong>Name:</strong> {booking.customer.firstName} {booking.customer.lastName}</div>
                    <div className="info-pair"><strong>Email:</strong> {booking.customer.email}</div>
                    <div className="info-pair"><strong>Phone:</strong> {booking.customer.phone}</div>
                    <div className="info-pair"><strong>City:</strong> {booking.customer.city}</div>
                </section>

                <hr className="invoice-divider" />

                <section className="invoice-section">
                    <h2 className="section-title">🧰 Booking Details</h2>
                    <div className="info-pair"><strong>Service:</strong> {booking.service.name}</div>
                    <div className="info-pair"><strong>Description:</strong> {booking.service.description}</div>
                    <div className="info-pair"><strong>Date:</strong> {new Date(booking.date).toLocaleDateString()}</div>
                    <div className="info-pair"><strong>Time:</strong> {booking.time}</div>
                    <div className="info-pair"><strong>Status:</strong> ✅ {booking.status}</div>
                    <div className="info-pair"><strong>Price:</strong> ${booking.price.toFixed(2)}</div>
                </section>

                <hr className="invoice-divider" />

                <section className="invoice-section">
                    <h2 className="section-title">👨‍🔧 Provider Information</h2>
                    <div className="info-pair"><strong>Name:</strong> {booking.provider.firstName} {booking.provider.lastName}</div>
                    <div className="info-pair"><strong>Email:</strong> {booking.provider.email}</div>
                    <div className="info-pair"><strong>Phone:</strong> {booking.provider.phone}</div>
                </section>

                <hr className="invoice-divider" />

                <section className="invoice-section">
                    <h2 className="section-title">💳 Payment Details</h2>
                    <div className="info-pair"><strong>Cardholder:</strong> {paymentCard.cardHolderName}</div>
                    <div className="info-pair"><strong>Card Number:</strong> **** **** **** {paymentCard.cardNumber.slice(-4)}</div>
                    <div className="info-pair"><strong>Expiry:</strong> {paymentCard.expiryMonth}/{paymentCard.expiryYear}</div>
                </section>

                <div className="invoice-actions">
                    <button className="download-btn">
                        📄 Download PDF
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InvoicePage;
