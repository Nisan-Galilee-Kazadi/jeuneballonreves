import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import MissionVision from './pages/MissionVision';
import Medias from './pages/Medias';
import Partenariat from './pages/Partenariat';
import { JeunesBallonRevesPage, LectureMoiPage } from './pages/Programs';

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/mission" element={<MissionVision />} />
        <Route path="/medias" element={<Medias />} />
        <Route path="/partenariat" element={<Partenariat />} />
        <Route path="/programme-jbr" element={<JeunesBallonRevesPage />} />
        <Route path="/lecture-et-moi" element={<LectureMoiPage />} />
        <Route path="/donation" element={<Contact />} /> {/* Donation still points to contact for details */}
      </Routes>
    </Router>
  );
}

export default App;
