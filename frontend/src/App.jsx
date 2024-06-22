import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Posts from './components/Posts';
import New from './components/New';
import Edit from './components/Edit';
import "./index.css"


function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" element={<Posts />} />
          <Route path="/show" element={<Posts />} />
          <Route path="/new" element={<New />} />
          <Route path='/:id' element={<Edit/>}/>
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
