
// import './App.css';

import AppRoutes from './router/AppRoutes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import clarity from 'clarity-js';
import { useEffect } from 'react';

function App() {
useEffect(() => {
    clarity.init("r20tbykrb0");
}, []);


  return (

    <Router>
      <AuthProvider>

        <Navbar />
        <AppRoutes />
      </AuthProvider>
    </Router>


  );
}

export default App;
