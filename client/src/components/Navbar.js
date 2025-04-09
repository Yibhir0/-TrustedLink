import { Link } from 'react-router-dom';
import '../css/Navbar.css';

const Navbar = () => {
    return (
        <nav className="navbar">
            <h1 className="logo">Trusted Link</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/register">Register</Link></li>
                <li><Link to="/profile">Profile</Link></li>
            </ul>
        </nav>
    );
};

export default Navbar;
