import React from 'react';
import Navigation from './components/Navigation';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import CursorAnimation from './components/CursorAnimation';
import RetroHome from './components/RetroHome';

function App() {
  return (
    <div className="relative min-h-screen bg-gray-900 overflow-x-hidden">
      
      <Background3D />
      <CursorAnimation />
      <Navigation />
      <RetroHome />
        <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

export default App;