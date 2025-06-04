import { Link, useLocation } from 'react-router-dom';
import { Menu, Moon, Sun, Mic, History, Settings, Home } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Navbar = ({ darkMode, toggleDarkMode }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const navLinks = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/interview', label: 'Interview', icon: <Mic size={20} /> },
    { path: '/history', label: 'History', icon: <History size={20} /> },
    { path: '/settings', label: 'Settings', icon: <Settings size={20} /> },
  ];

  return (
    <nav className={`sticky top-0 z-50 ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-800'} shadow-md`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center">
              <Mic className="text-white" size={24} />
            </div>
            <span className="font-bold text-xl">InterviewAI</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center space-x-1 py-2 px-3 rounded-md transition duration-300 ${
                  location.pathname === link.path
                    ? 'bg-blue-500 text-white'
                    : 'hover:bg-blue-100 dark:hover:bg-gray-700'
                }`}
              >
                {link.icon}
                <span>{link.label}</span>
              </Link>
            ))}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile Navigation Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              aria-label="Toggle menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden py-4"
          >
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center space-x-2 py-2 px-4 rounded-md ${
                    location.pathname === link.path
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-blue-100 dark:hover:bg-gray-700'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.icon}
                  <span>{link.label}</span>
                </Link>
              ))}
              <button
                onClick={toggleDarkMode}
                className="flex items-center space-x-2 py-2 px-4 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700"
              >
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                <span>{darkMode ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;