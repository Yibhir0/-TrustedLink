import { Routes, Route } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';

import Home from '../pages/Home';
import Services from '../pages/Services';
import ProviderProfile from '../pages/ProviderProfile';
import ProviderDetail from '../pages/ProviderDetail';
import AddBooking from '../pages/AddBooking';
import BookingPage from '../pages/BookingPage';
import AdminDashBoard from '../pages/AdminDashBoard';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddProvider from '../pages/AddProvider';
import AccountPage from '../pages/AccountPage';

import PrivateRoute from './PrivateRoute';
import InvoicePage from '../pages/InvoicePage';

const AppRoutes = () => {
    const { currentUser } = useAuth();

    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/providers/services/:category" element={<ProviderProfile />} />
            <Route path="/providers/:id" element={<ProviderDetail />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* 🔒 Protected Routes */}
            <Route element={<PrivateRoute />}>
                <Route path="/book/:providerId/:serviceId/:customerId" element={<AddBooking />} />
                <Route path="/add-provider" element={<AddProvider />} />
                <Route path="/invoice" element={<InvoicePage />} />

                {/* Role-based routing */}
                {currentUser?.role === 'admin' ? (
                    <Route path="/dashboard" element={<AdminDashBoard />} />
                ) : (
                    <Route path="/bookings" element={<BookingPage />} />
                )}
                {currentUser?.role === 'customer' && (
                    <Route path="/account" element={<AccountPage />} />
                )}
            </Route>
        </Routes>
    );
};

export default AppRoutes;
