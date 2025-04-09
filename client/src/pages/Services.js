// Services.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import '../css/Services.css';

const Services = () => {
    const [services, setServices] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/services')
            .then(res => res.json())
            .then(data => setServices(data))
            .catch(err => console.error('Failed to fetch services:', err));
    }, []);

    const handleServiceClick = (category) => {
        navigate(`/providers/services/${category}`);
    };

    return (
        <div className="services-page">

            <section className="services-header">
                <h2>Available Services</h2>
                <p>Browse from our trusted categories of home services.</p>
            </section>

            <div className="services-grid">
                {services.map(service => (
                    <div
                        key={service._id}
                        className="service-card clickable"
                        onClick={() => handleServiceClick(service.category)}
                    >
                        <h3>{service.name}</h3>
                        <p>{service.description}</p>
                        <span className="badge">{service.category}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Services;