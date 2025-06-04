import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import 'regenerator-runtime/runtime';

// Pages
import Home from './pages/Home';
import Interview from './pages/Interview';
import History from './pages/History';
import Settings from './pages/Settings';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Context
import { InterviewProvider } from './context/InterviewContext';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      <InterviewProvider>
        <Router>
          <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
          <main className="flex-grow container mx-auto px-4 py-8">
            <AnimatePresence mode="wait">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/interview" element={<Interview />} />
                <Route path="/history" element={<History />} />
                <Route path="/settings" element={<Settings />} />
              </Routes>
            </AnimatePresence>
          </main>
          <Footer />
        </Router>
      </InterviewProvider>
    </div>
  );
}

export default App;