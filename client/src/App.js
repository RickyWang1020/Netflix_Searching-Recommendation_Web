
import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Routes, Route}
    from 'react-router-dom';
import Home from './pages';
import Movies from './pages/movies';
import People from './pages/people';
  
function App() {
return (
    <Router>
        <Navbar />
        <Routes>
            <Route exact path='/' element={<Home />} />
            <Route path='/Movies' element={<Movies/>} />
            <Route path='/People' element={<People/>} />
        </Routes>
    </Router>
);
}
  
export default App;