import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from 'react-router-dom';
import FloatingGeometry from './components/FloatingGeometry';
import Footer from './components/Footer';
import Header from './components/Header';
import Loader from './components/Loader';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import HowItWorks from './pages/HowItWorks';
export type PageType = 'home' | 'about' | 'how-it-works' | 'contact';

// Create a wrapped component to use useLocation
const AppContent = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Initial loading
    const timer = setTimeout(() => setIsLoading(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-hidden relative">
      {/* Background Effects */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-black" />
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-amber-900/5 to-amber-700/10" />

      {/* Floating 3D Elements */}
      <FloatingGeometry />

      {/* Grid Pattern Overlay */}
      <div className="fixed inset-0 opacity-10"
        style={{
          backgroundImage: `
               linear-gradient(rgba(195,176,145,0.1) 1px, transparent 1px),
               linear-gradient(90deg, rgba(195,176,145,0.1) 1px, transparent 1px)
             `,
          backgroundSize: '50px 50px'
        }} />

      <Header />

      <AnimatePresence>
        {isTransitioning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <div className="text-center">
              <div className="w-16 h-16 border-2 border-amber-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <div className="text-amber-400 font-mono text-lg animate-pulse">Loading...</div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="relative z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={location.pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
