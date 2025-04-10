import { Link } from 'react-router-dom';
import '../css/Navbar.css';
import { useAuth } from '../contexts/AuthProvider';

const Navbar = () => {
    const { currentUser, logOut } = useAuth();

    return (
        <nav className="navbar">
            <h1 className="logo">Trusted Link</h1>
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/services">Services</Link></li>
                {currentUser ? (
                    <>
                        {/* <li><Link to="/profile">Profile</Link></li> */}
                        <li>
                            <Link to={currentUser.role === 'admin' ? '/dashboard' : '/bookings'}>
                                {currentUser.role === 'admin' ? 'Dashboard' : 'Bookings'}
                            </Link>
                        </li>
                        <li>
                            <button className="logout-btn" onClick={logOut}>
                                Logout
                            </button>
                        </li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
};

export default Navbar;
