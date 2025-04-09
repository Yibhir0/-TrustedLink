// ProviderProfileList.jsx
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

import '../css/ProviderProfile.css';

const ProviderProfile = () => {
    const { category } = useParams();
    const [providers, setProviders] = useState([]);
    const navigate = useNavigate();

    console.log(providers);

    const handleProviderClick = (id) => {
        navigate(`/providers/${id}`);
    };
    useEffect(() => {
        fetch(`http://localhost:8080/api/providers/service/${category}`)
            .then(res => res.json())
            .then(data => setProviders(data))
            .catch(err => console.error('Error fetching providers:', err));

    }, [category]);

    return (
        <div className="provider-page">

            <div className="provider-header">
                <h2>{category.charAt(0).toUpperCase() + category.slice(1)} Providers</h2>
                <p>Explore top-rated professionals in the {category} category.</p>
            </div>

            <div className="provider-grid">
                {providers.map(provider => (
                    <div key={provider._id} className="provider-card">
                        <h3>{provider.user.firstName} {provider.user.lastName}</h3>
                        <p className="bio">{provider.bio}</p>
                        <div className="details">
                            <div className="info-column">
                                <span className="rate"> 💵 {provider.hourlyRate}/hr</span>
                                <span className="location">📍 {provider.city}</span>
                            </div>
                            <div className="info-column">
                                <span className={`verified ${provider.isVerified ? 'verified-yes' : 'verified-no'}`}>
                                    {provider.isVerified ? 'Verified' : 'Not Verified'}
                                </span>
                                <span className="rating">⭐ {provider.rating}</span>
                            </div>
                        </div>
                        <button
                            onClick={() => handleProviderClick(provider._id)}
                            className="view-profile-btn"
                        >
                            View Profile
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};


export default ProviderProfile;
