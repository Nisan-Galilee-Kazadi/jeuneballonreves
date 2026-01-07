import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import AlertProvider from './components/AlertProvider';
import Home from './pages/Home';
import Admin from './pages/Admin';
import About from './pages/About';
import Contact from './pages/Contact';
import MissionVision from './pages/MissionVision';
import Medias from './pages/Medias';
import Blog from './pages/Blog';
import Actualites from './pages/Actualites';
import Partenariat from './pages/Partenariat';
import { JeunesBallonRevesPage, LectureMoiPage } from './pages/Programs';

function App() {
  return (
    <AlertProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/mission" element={<MissionVision />} />
          <Route path="/medias" element={<Medias />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/actualites" element={<Actualites />} />
          <Route path="/partenariat" element={<Partenariat />} />
          <Route path="/programme-jbr" element={<JeunesBallonRevesPage />} />
          <Route path="/lecture-et-moi" element={<LectureMoiPage />} />
          <Route path="/donation" element={<Contact />} /> {/* Donation still points to contact for details */}
        </Routes>
      </Router>
    </AlertProvider>
  );
}

export default App;
