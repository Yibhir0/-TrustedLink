
// import './App.css';

import AppRoutes from './router/AppRoutes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';
import Clarity from '@microsoft/clarity';
import { useEffect } from 'react';

function App() {
useEffect(() => {
    Clarity.init("r20tbykrb0");
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
