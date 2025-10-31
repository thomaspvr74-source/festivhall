import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Evenements from './pages/Evenements';
import Artistes from './pages/Artistes';
import Privatisation from './pages/Privatisation';
import './App.css';

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow page-main bg-gray-50">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/evenements" element={<Evenements />} />
            <Route path="/artistes" element={<Artistes />} />
            <Route path="/privatisation" element={<Privatisation />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
