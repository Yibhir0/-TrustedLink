import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Register.css';

const Register = () => {

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
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:8080/api/users/customers', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (!res.ok) throw new Error('Registration failed');
            alert('Account created successfully!');
            navigate('/login');
        } catch (err) {
            alert(err.message);
        }
    };

    return (
        <div className="register-container">
            <form className="register-form" onSubmit={handleSubmit}>
                <h2>📝 Create Your Account</h2>

                <div className="form-grid">
                    <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} required />
                    <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
                    <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
                    <input type="tel" name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} required />
                </div>

                <div className="form-grid">
                    <input type="text" name="city" placeholder="City" value={formData.city} onChange={handleChange} required />
                    <input type="text" name="profileImage" placeholder="Profile Image URL (optional)" value={formData.profileImage} onChange={handleChange} />
                </div>

                <button type="submit" className="btn-register">Register</button>

                <p className="login-redirect">
                    Already have an account? <a href="/login">Login</a>
                </p>
            </form>
        </div>
    );
};

export default Register;
