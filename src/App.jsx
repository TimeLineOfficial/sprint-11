import React, { useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import Dashboard from './pages/Dashboard';
import Markets from './pages/Markets';
import TradePage from './pages/TradePage';
import StrategiesPage from './pages/StrategiesPage';
import PortfolioPage from './pages/PortfolioPage';

export default function App() {
  useEffect(() => {
    // Set dark mode by default on root document element
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col justify-between transition-colors">
        <div>
          <Navbar />
          <main className="pb-16 md:pb-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/trade" element={<TradePage />} />
              <Route path="/strategies" element={<StrategiesPage />} />
              <Route path="/portfolio" element={<PortfolioPage />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </div>
    </Router>
  );
}
