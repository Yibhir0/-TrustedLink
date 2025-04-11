
import BookingList from '../components/BookingList';
import ServiceSelector from '../components/ServiceSelector';
import { useState } from 'react';
import '../css/Booking.css'; // ✅ Import the CSS styles
import { useAuth } from '../contexts/AuthProvider';



const BookingPage = () => {
    const { currentUser } = useAuth();
    const [selectedService, setSelectedService] = useState(null);

    if (!currentUser) return <div className="booking-page">Loading...</div>;

    return (
        <div className="booking-page">
            <div className="booking-page-wrapper">
                <div className="booking-header">
                    <h2>
                        {currentUser?.role === 'admin'
                            ? `📊 ${selectedService?.name || 'Service'} Bookings`
                            : '📅 Bookings'}
                    </h2>
                    {currentUser?.role === 'admin' && (
                        <div className="selector-wrapper">
                            <ServiceSelector onSelect={setSelectedService} />
                        </div>
                    )}
                </div>

                <div className="booking-list-wrapper">
                    <section className="booking-section">
                        {currentUser?.role === 'admin' && selectedService && (
                            <BookingList type="admin" id={selectedService._id} />
                        )}
                        {currentUser?.role !== 'admin' && (
                            <BookingList type={currentUser?.role} id={currentUser?._id} />
                        )}
                    </section>

                </div>
            </div>
        </div>
    );
};

export default BookingPage;