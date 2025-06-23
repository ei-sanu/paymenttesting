import { faClock } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [timeDate, setTimeDate] = useState<{ time: string, date: string }>({
    time: '',
    date: ''
  });

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: true,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      });

      const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
        year: 'numeric'
      });

      setTimeDate({ time: timeString, date: dateString });
    };

    // Update immediately
    updateDateTime();
    // Update every second
    const timer = setInterval(updateDateTime, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-xl border-b border-amber-700/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer">
          <div className="relative">
            <div className="absolute inset-0 bg-amber-400/20 blur-lg rounded-full"></div>
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            CyberCode
          </span>
        </div>
        <div className="flex items-center space-x-8">
          <div className="flex items-center space-x-2 text-amber-400 font-mono">
            <FontAwesomeIcon icon={faClock} className="h-4 w-4 mb-4 " />
            <div className="flex flex-col items-end">
              <span>{timeDate.time}</span>
              <span className="text-xs text-amber-400/80">{timeDate.date}</span>
            </div>
          </div>
          <Link to="/" className="text-gray-300 hover:text-amber-400">
            Home
          </Link>
          <Link to="/about" className="text-gray-300 hover:text-amber-400">
            About
          </Link>
          <Link to="/how-it-works" className="text-gray-300 hover:text-amber-400">
            How It Works
          </Link>
          <Link to="/contact" className="text-gray-300 hover:text-amber-400">
            Contact
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
