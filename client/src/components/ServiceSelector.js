import { useEffect, useState } from 'react';
import '../css/Booking.css';


const ServiceSelector = ({ onSelect }) => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('http://localhost:8080/api/services')
            .then(res => res.json())
            .then(setServices)
            .catch(console.error);
    }, []);

    return (
        <div className="service-card-selector">
            <h3>Select a Service</h3>
            <div className="service-card-grid">
                {services.map(service => (
                    <div
                        key={service._id}
                        className="service-card"
                        onClick={() => onSelect(service)}
                    >
                        <h4>{service.name}</h4>
                        <p className="service-category">Category: <strong>{service.category}</strong></p>
                        <p className="service-description">{service.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ServiceSelector;