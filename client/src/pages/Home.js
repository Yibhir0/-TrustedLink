
import '../css/Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div className="home">


            <header className="home-header">
                <h2>Find Trusted Home Service Providers Near You</h2>
                <p>
                    From plumbing and electrical work to landscaping, we've got you covered.
                </p>
                <Link to="/services" className="explore-btn">Explore Services</Link>
            </header>

            <section className="service-cards">
                <div className="card">
                    <h3>Plumbing</h3>
                    <p>Fix leaks, install fixtures, and ensure smooth water flow.</p>
                </div>
                <div className="card">
                    <h3>Electrical</h3>
                    <p>Certified electricians for installations and emergencies.</p>
                </div>
                <div className="card">
                    <h3>Landscaping</h3>
                    <p>Create beautiful outdoor spaces with expert care.</p>
                </div>
            </section>
        </div>
    );
};

export default Home;
