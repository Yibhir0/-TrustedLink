import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = ({ isEditing = false, userData = null, setEditing = {} }) => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        firstName: '',
        lastName: '',
        city: '',
        phone: '',
        profileImage: '',
        role: 'customer',
        cardHolderName: '',
        cardNumber: '',
        expiryMonth: '',
        expiryYear: '',
        cvc: ''
    });

    useEffect(() => {
        if (isEditing && userData) {
            setFormData({
                ...formData,
                ...userData,
                cardHolderName: userData?.paymentCard?.cardHolderName || '',
                cardNumber: userData?.paymentCard?.cardNumber || '',
                expiryMonth: userData?.paymentCard?.expiryMonth || '',
                expiryYear: userData?.paymentCard?.expiryYear || '',
                cvc: userData?.paymentCard?.cvc || ''
            });
        }
    }, [isEditing, userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const url = isEditing
            ? `http://localhost:8080/api/users/customers/${userData._id}`
            : 'http://localhost:8080/api/users/customers';

        const method = isEditing ? 'PUT' : 'POST';

        try {
            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error(`${isEditing ? 'Update' : 'Registration'} failed`);
            alert(`Account ${isEditing ? 'updated' : 'created'} successfully!`);

            if (!isEditing) {
                navigate('/login');
            }
            else {
                setEditing(false); // Reset editing state after successful update// Redirect to account page after updating
            }
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="register-container full-page">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>{isEditing ? '🛠 Update Your Profile' : '📝 Create Your Account'}</h2>

                <div className="form-grid">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required={!isEditing} />
                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <input type="text" name="profileImage" placeholder="Profile Image URL (optional)" value={formData.profileImage} onChange={handleChange} />
                </div>

                <h3>💳 Payment Information</h3>
                <div className="form-grid">
                    <input type="text" name="cardHolderName" placeholder="Cardholder Name" value={formData.cardHolderName} onChange={handleChange} required />
                    <input type="text" name="cardNumber" placeholder="Card Number" value={formData.cardNumber} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="number" name="expiryMonth" placeholder="Expiry Month (MM)" min="1" max="12" value={formData.expiryMonth} onChange={handleChange} required />
                    <input type="number" name="expiryYear" placeholder="Expiry Year (YYYY)" min="2024" value={formData.expiryYear} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="text" name="cvc" placeholder="CVC" value={formData.cvc} onChange={handleChange} required />
                </div>

                <button type="submit" className="btn-register">{isEditing ? 'Update Profile' : 'Register'}</button>

                {!isEditing && (
                    <p className="login-redirect">
                        Already have an account? <a href="/login">Login</a>
                    </p>
                )}
            </form>
        </div>
    );
};

export default Register;
