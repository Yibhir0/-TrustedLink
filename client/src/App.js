
// import './App.css';

import AppRoutes from './router/AppRoutes';
import Navbar from './components/Navbar';
import { BrowserRouter as Router } from 'react-router-dom';
import AuthProvider from './contexts/AuthProvider';


function App() {
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
