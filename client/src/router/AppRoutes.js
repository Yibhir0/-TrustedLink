import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ProviderProfile from '../pages/ProviderProfile';
import ProviderDetail from '../pages/ProviderDetail';
import AddBooking from '../pages/AddBooking';

import BookingPage from '../pages/BookingPage';


const AppRoutes = () => (


    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/providers/services/:category" element={<ProviderProfile />} />
        <Route path="/providers/:id" element={<ProviderDetail />} />
        <Route path="/book/:providerId/:serviceId/:customerId" element={<AddBooking />} />
        <Route path="/bookings" element={<BookingPage />} />
        {/* Add more routes as needed */}
    </Routes>

);

export default AppRoutes;