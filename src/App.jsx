import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evenements from './pages/Evenements';
import Artistes from './pages/Artistes';
import Privatisation from './pages/Privatisation';
import './App.css';

export default function App() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('site-header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    // recalculer si la fenêtre change de taille
    const handleResize = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header avec burger intégré */}
        <Header />

        {/* Contenu principal avec padding auto */}
        <main
          className="flex-grow page-main bg-gray-50"
          style={{ paddingTop: headerHeight }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/artistes" element={<Artistes />} />
            <Route path="/privatisation" element={<Privatisation />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        {/* Footer en bas */}
        <Footer />
      </div>
    </Router>
  );
}
