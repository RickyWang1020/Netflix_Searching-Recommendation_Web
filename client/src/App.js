
import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import { ConfigProvider } from 'antd';
import Navbar from './components/Navbar';
import Home from './pages';
import Movies from './pages/movies';
import People from './pages/people';
  
function App() {
return (
    <Router>
        <Navbar />
        <ConfigProvider
            theme={{token:{
                colorIcon: '#fff',
                colorText: '#fff',
                colorTextPlaceholder: '#fff',
                colorBgElevated	: '#333',
                colorBgContainer: 'rgba(0, 0, 0, 0)',
                colorBorderSecondary: '#fff',
                colorPrimary: '#777',
                colorFillTertiary: 'rgba(150, 150, 150, 0.4)',
                colorFillSecondary: 'rgba(100, 100, 100, 0.5)',
            }}}>
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/Movies' element={<Movies/>} />
                <Route path='/People' element={<People/>} />
            </Routes>
        </ConfigProvider>
    </Router>
);
}
  
export default App;