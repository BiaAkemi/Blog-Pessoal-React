import React from 'react';
import UserProvider from './contexts/UserContext';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/navBar/NavBar';
import Login from './pages/Home/Login';
import Home from './pages/Home/Home';
import Footer from './components/footer/Footer';


function App() {
  return (
    <>
    <UserProvider>
    <BrowserRouter>
        <Navbar />
          <div className='min-h-[80vh]'>
          <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>

          </div>
          <Footer />
        </BrowserRouter>
        </UserProvider>
    </>
);
}
export default App; 