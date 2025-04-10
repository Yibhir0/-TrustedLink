// ProviderProfilePage.jsx
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../css/ProviderDetail.css';

import { useAuth } from '../contexts/AuthProvider';

import { useNavigate } from 'react-router-dom';

// inside your component:

const ProviderDetail = () => {
    const { id } = useParams();
    const [provider, setProvider] = useState(null);

    const navigate = useNavigate();
    const { currentUser } = useAuth();

    useEffect(() => {
        fetch(`http://localhost:8080/api/providers/${id}`)
            .then(res => res.json())
            .then(data => setProvider(data))
            .catch(err => console.error('Error fetching provider:', err));
    }, [id]);

    const handleBookClick = () => {

        const loggedInCustomerId = currentUser?._id; // replace with real logged-in customer ID
        navigate(`/book/${provider.user._id}/${provider?.service}/${loggedInCustomerId}`); // replace with real customer ID
    };

    if (!provider) return <div>Loading...</div>;



    return (
        <div className="profile-page">

            <div className="profile-container">
                <div className="profile-card">
                    <div className="profile-header">
                        <img src={provider.user.profileImage || 'https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250'} alt="Profile" className="profile-img" />
                        <div>
                            <h2>{provider.user.firstName} {provider.user.lastName}</h2>
                            <p className="profile-bio">{provider.bio}. {provider.user.bio}.</p>
                        </div>
                        <button className="book-button" onClick={handleBookClick}>📅 Book</button>
                    </div>

                    <div className="profile-details">
                        <p><strong>Email:</strong> {provider.user.email}</p>
                        <p><strong>Phone:</strong> {provider.user.phone}</p>
                        <p><strong>City:</strong> 📍 {provider.city}</p>
                        <p><strong>Category:</strong> {provider.category}</p>
                        <p><strong>Hourly Rate:</strong> 💵 ${provider.hourlyRate}</p>
                        <p><strong>Rating:</strong> ⭐ {provider.rating}</p>
                        <p><strong>Years of Experience:</strong> {provider.yearsOfExperience} years</p>
                        <p><strong>Status:</strong> <span className={`status ${provider.isVerified ? 'verified' : 'not-verified'}`}>
                            {provider.isVerified ? 'Verified' : 'Not Verified'}</span></p>
                    </div>

                    <div className="work-gallery">
                        {provider.workImages?.map((url, idx) => (
                            <img key={idx} src={url} alt={`Work ${idx + 1}`} className="work-img" />
                        ))}
                    </div>


                </div>
            </div>
        </div>
    );
};

export default ProviderDetail;
