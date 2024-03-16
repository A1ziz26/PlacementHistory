
import './App.css';
import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import Login from './pages/login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
   <Router>
    <div className="App">
      <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/home" element={<Home />} />
      </Routes>
    </div>
    </Router> 
  );
}

export default App;
