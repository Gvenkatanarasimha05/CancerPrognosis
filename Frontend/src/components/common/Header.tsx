import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Heart, Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, logout } = useAuth();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  const getDashboardPath = () => {
    if (!user) return '/';
    switch (user.role) {
      case 'patient': return '/patient-dashboard';
      case 'doctor': return '/doctor-dashboard';
      case 'admin': return '/admin-dashboard';
      default: return '/';
    }
  };

  // Detect scroll for transparency
  useEffect(() => {
    if (location.pathname === '/') {
      const onScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', onScroll);
      return () => window.removeEventListener('scroll', onScroll);
    }
  }, [location.pathname]);

  const isLandingPage = location.pathname === '/';

  return (
    <header
      className={`${
        isLandingPage ? 'absolute' : 'sticky'
      } top-0 w-full z-50 transition-all duration-300 h-16 
      ${isLandingPage
        ? scrolled
          ? 'bg-white shadow-lg'
          : 'bg-transparent'
        : 'bg-white shadow-lg'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className={`${isLandingPage && !scrolled ? 'bg-white/20' : 'bg-blue-600'} p-2 rounded-lg group-hover:bg-blue-700 transition-colors`}>
              <Heart className="h-6 w-6 text-white" />
            </div>
            <span className={`text-xl font-bold ${isLandingPage && !scrolled ? 'text-white' : 'text-gray-900'}`}>
              CANCER PROGNOSIS
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {!user ? (
              <>
                <Link 
                  to="/" 
                  className={`${isLandingPage && !scrolled ? 'text-white' : 'text-gray-600'} hover:text-blue-600 transition-colors ${isActive('/') ? 'text-blue-600 font-medium' : ''}`}
                >
                  Home
                </Link>
                <Link 
                  to="/login" 
                  className={`${isLandingPage && !scrolled ? 'text-white' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className={`${isLandingPage && !scrolled
                    ? 'bg-white text-blue-600 hover:bg-gray-100'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                  } px-6 py-2 rounded-lg transition-colors`}
                >
                  Get Started
                </Link>
              </>
            ) : (
              <>
                <Link 
                  to={getDashboardPath()} 
                  className={`${isLandingPage && !scrolled ? 'text-white' : 'text-gray-600'} hover:text-blue-600 transition-colors`}
                >
                  Dashboard
                </Link>
                <div className="flex items-center space-x-4">
                  <div className={`flex items-center space-x-2 ${isLandingPage && !scrolled ? 'text-white' : 'text-gray-600'}`}>
                    <User className="h-5 w-5" />
                    <span className="text-sm">
                      {user.firstName} {user.lastName}
                    </span>
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                      {user.role}
                    </span>
                  </div>
                  <button
                    onClick={logout}
                    className={`flex items-center space-x-1 hover:text-red-600 transition-colors ${isLandingPage && !scrolled ? 'text-white' : 'text-gray-600'}`}
                  >
                    <LogOut className="h-4 w-4" />
                    <span>Logout</span>
                  </button>
                </div>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`${isLandingPage && !scrolled ? 'text-white' : 'text-gray-600'} hover:text-gray-900 focus:outline-none`}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className={`md:hidden border-t ${isLandingPage && !scrolled ? 'border-white/30' : 'border-gray-200'}`}>
            <div className="px-2 pt-2 pb-3 space-y-1">
              {!user ? (
                <>
                  <Link to="/" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-blue-600">
                    Home
                  </Link>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-blue-600">
                    Login
                  </Link>
                  <Link to="/register" onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Get Started
                  </Link>
                </>
              ) : (
                <>
                  <Link to={getDashboardPath()} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2 hover:text-blue-600">
                    Dashboard
                  </Link>
                  <div className="px-3 py-2 text-sm">
                    {user.firstName} {user.lastName} ({user.role})
                  </div>
                  <button
                    onClick={() => {
                      logout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 text-red-600 hover:text-red-700"
                  >
                    Logout
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Header;
