import { useParams, useNavigate } from 'react-router-dom';
import { useState } from 'react';

import '../css/AddBooking.css';

const AddBooking = () => {
    const { providerId, serviceId, customerId } = useParams();
    const [date, setDate] = useState('');
    const [description, setDescription] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/bookings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    customerId,
                    providerId,
                    serviceId,
                    scheduledDate: date,
                    description,
                }),
            });

            if (response.ok) {
                alert('Booking created!');
                navigate('/'); // or redirect to profile/confirmation page
            } else {
                alert(' Booking failed');
            }
        } catch (error) {
            console.error(error);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="booking-page">
            <div className="booking-form-container">
                <h2 className="booking-title">Book Your Appointment</h2>
                <label>Date & Time</label>
                <input
                    type="datetime-local"
                    className="booking-input"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
                <label>Description</label>
                <textarea
                    className="booking-textarea"
                    placeholder="Describe your issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button className="booking-submit" onClick={handleSubmit}>Confirm Booking</button>
            </div>
        </div>
    );
};

export default AddBooking;
