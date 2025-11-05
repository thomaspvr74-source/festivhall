import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evenements from './pages/Evenements';
import Artistes from './pages/Artistes';
import Privatisation from './pages/Privatisation';
import PrivatisationForm from "./pages/PrivatisationForm";
import Concept from './pages/Concept'; // ✅ nouvelle page
import './App.css';
import EvenementDetail from './pages/EvenementDetail'; // ✅ AJOUTER CETTE LIGNE
import Reservation from "./pages/Reservation";          // ✅ AJOUTER CETTE LIGNE
import ReservationRecap from "./pages/ReservationRecap";
import Confirmation from "./pages/Confirmation"; // ✅ ajoute cette ligne

export default function App() {
  const [headerHeight, setHeaderHeight] = useState(0);

  useEffect(() => {
    const header = document.getElementById('site-header');
    if (header) {
      setHeaderHeight(header.offsetHeight);
    }

    const handleResize = () => {
      if (header) setHeaderHeight(header.offsetHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Header */}
        <Header />

        {/* Contenu principal */}
        <main
          className="flex-grow page-main bg-gray-50"
          style={{ paddingTop: headerHeight }}
        >
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/evenements/:id" element={<EvenementDetail />} /> {/* ✅ nouvelle route */}
            <Route path="/artistes" element={<Artistes />} />
            <Route path="/privatisation" element={<Privatisation />} />
            <Route path="/privatisation-form" element={<PrivatisationForm />} /> {/* ✅ nouvelle route */}
            <Route path="/concept" element={<Concept />} /> {/* ✅ nouvelle route */}
            <Route path="/reservation" element={<Reservation />} />
            <Route path="/reservationrecap" element={<ReservationRecap />} />
            <Route path="/confirmation" element={<Confirmation />} /> {/* ✅ nouvelle route */}
            <Route path="*" element={<Home />} />
            
          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}
