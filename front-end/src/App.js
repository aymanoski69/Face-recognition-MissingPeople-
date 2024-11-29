import React from 'react';
import './App.css'
import Home from './components/pages/Home';
import Navbar from './components/inc/Navbar';
import About from './components/pages/About';
import Contact from './components/pages/Contact';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LogIn from './components/inc/LogIn'
import SignUp from './components/inc/SignUp'
import '@fortawesome/fontawesome-free/css/all.min.css';
function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/LogIn" element={<LogIn />}></Route>
          <Route path="/SignUp" element={<SignUp />}></Route>
        </Routes>
        
      </div>
    </Router>
  );
}

export default App;
