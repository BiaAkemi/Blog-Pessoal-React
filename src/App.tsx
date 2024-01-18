import React from 'react';
import UserProvider from './contexts/UserContext';
import './App.css';
import Navbar from './components/navBar/NavBar';
import Login from './pages/Login/Login';
import Home from './pages/Home/Home';
import Cadastro from './pages/cadastro/Cadastro';
import Footer from './components/footer/Footer';

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';



function App() {
  return (
    <>
   
      <AuthProvider>
        <BrowserRouter>
          <Navbar />
          <div className='min-h-[80vh]'>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Cadastro />} />
              <Route path="/home" element={<Home />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
        </AuthProvider>

  
    </>
  );
}
export default App; 