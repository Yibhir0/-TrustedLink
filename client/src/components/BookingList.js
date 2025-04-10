
import { useEffect, useState } from 'react';
import BookingCard from './BookingCard';

import '../css/Booking.css';

const BookingList = ({ type, id }) => {

    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (!type || !id) return; // Ensure type and id are defined
        let url = 'http://localhost:8080/api/bookings';
        if (type === 'provider') url += `/provider/${id}`;
        else if (type === 'customer') url += `/customer/${id}`;
        else if (type === 'admin') url += `/service/${id}`;

        fetch(url)
            .then(res => res.json())
            .then(setBookings)
            .catch(console.error);

    }, [type, id]);



    const handleDelete = (id) => {

        fetch(`http://localhost:8080/api/bookings/admin/${id}`, { method: 'DELETE' }).then(res => {
            if (res.ok) {
                setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== id));
            } else {
                console.error('Failed to delete booking');
            }
        })
            .catch(console.error)

            ;

    };

    const handleStatusChange = (newStatus, id) => {
        fetch(`http://localhost:8080/api/bookings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ status: newStatus }),
        })

            .then((res) => {
                if (res.ok) {
                    setBookings((prevBookings) =>
                        prevBookings.map((booking) =>
                            booking._id === id ? { ...booking, status: newStatus } : booking
                        )
                    );
                } else {
                    console.error('Failed to update booking status');
                }
            })
            .catch(console.error);
    };

    return (
        <div className="booking-list">
            {bookings.length === 0 ? (
                <p className="booking-list-empty">No bookings found.</p>
            ) : (
                bookings.map((booking) => (
                    <div key={booking._id} className="booking-card-wrapper">

                        <BookingCard booking={booking} role={type} onDelete={handleDelete} onUpdate={handleStatusChange} />

                    </div>
                ))
            )}
        </div>
    );
};

export default BookingList;
