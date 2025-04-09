import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Services from '../pages/Services';
import ProviderProfile from '../pages/ProviderProfile';
import ProviderDetail from '../pages/ProviderDetail';


const AppRoutes = () => (


    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/providers/services/:category" element={<ProviderProfile />} />
        <Route path="/providers/:id" element={<ProviderDetail />} />
        {/* Add more routes as needed */}
    </Routes>

);

export default AppRoutes;