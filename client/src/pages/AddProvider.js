import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/AddProvider.css';


const AddProvider = ({ onProviderAdded }) => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        phone: '',
        city: '',
        userBio: '',
        profileImage: '',
        category: 'plumbing',
        hourlyRate: '',
        isVerified: false,
        profileBio: '',
        rating: '',
        yearsOfExperience: '',
        workImages: ['', ''],
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleWorkImageChange = (index, value) => {
        const newImages = [...formData.workImages];
        newImages[index] = value;
        setFormData({ ...formData, workImages: newImages });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();


        // Debugging line

        const payload = {
            userData: {
                username: formData.username,
                password: formData.password,
                email: formData.email,
                firstName: formData.firstName,
                lastName: formData.lastName,
                role: 'provider',
                phone: formData.phone,
                city: formData.city,
                bio: formData.userBio,
                profileImage: formData.profileImage,
            },
            profileData: {
                category: formData.category,
                hourlyRate: parseFloat(formData.hourlyRate),
                isVerified: formData.isVerified,
                city: formData.city,
                bio: formData.profileBio,
                rating: parseFloat(formData.rating),
                yearsOfExperience: parseInt(formData.yearsOfExperience),
                workImages: formData.workImages,
            },
        };

        console.log('Form Data:', payload);

        try {
            const res = await fetch('http://localhost:8080/api/providers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (res.ok) {
                alert('Provider added successfully!');
                navigate('/dashboard'); // Redirect to the dashboard or another page
            } else {
                const error = await res.json();
                alert(error.message || 'Failed to add provider.');
            }
        } catch (err) {
            console.error(err);
            alert('Something went wrong.');
        }
    };

    return (
        <div className="add-provider-container">
            <h2>➕ Add New Provider</h2>
            <form className="provider-form" onSubmit={handleSubmit}>
                <div className="form-grid">
                    <p className="section-title">👤 User Information</p>

                    <div className="form-control">
                        <label>Username</label>
                        <input type="text" name="username" value={formData.username} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Password</label>
                        <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Email</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>First Name</label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Last Name</label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Phone</label>
                        <input type="text" name="phone" value={formData.phone} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>City</label>
                        <input type="text" name="city" value={formData.city} onChange={handleChange} required />
                    </div>
                    <div className="form-control">
                        <label>Profile Image URL</label>
                        <input type="text" name="profileImage" value={formData.profileImage} onChange={handleChange} />
                    </div>
                    <div className="form-control full-width">
                        <label>User Bio</label>
                        <textarea name="userBio" value={formData.userBio} onChange={handleChange} />
                    </div>

                    <p className="section-title">🔧 Profile Information</p>

                    <div className="form-control">
                        <label>Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}>
                            <option value="plumbing">Plumbing</option>
                            <option value="electrical">Electrical</option>
                            <option value="landscaping">Landscaping</option>
                        </select>
                    </div>
                    <div className="form-control">
                        <label>Hourly Rate ($)</label>
                        <input type="number" name="hourlyRate" value={formData.hourlyRate} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label>Rating</label>
                        <input type="number" step="0.1" name="rating" value={formData.rating} onChange={handleChange} />
                    </div>
                    <div className="form-control">
                        <label>Years of Experience</label>
                        <input type="number" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} />
                    </div>
                    <div className="checkbox-wrapper">
                        <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleChange} />
                        <label>Verified</label>
                    </div>
                    <div className="form-control full-width">
                        <label>Profile Bio</label>
                        <textarea name="profileBio" value={formData.profileBio} onChange={handleChange} />
                    </div>
                    <div className="form-control full-width">
                        <label>Work Image 1</label>
                        <input type="text" value={formData.workImages[0]} onChange={(e) => handleWorkImageChange(0, e.target.value)} />
                    </div>
                    <div className="form-control full-width">
                        <label>Work Image 2</label>
                        <input type="text" value={formData.workImages[1]} onChange={(e) => handleWorkImageChange(1, e.target.value)} />
                    </div>
                </div>
                <button type="submit" className="btn-submit">Submit</button>
            </form>
        </div>
    );
};

export default AddProvider;