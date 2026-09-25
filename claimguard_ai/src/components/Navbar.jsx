import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';
import { Button } from './Button';

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'How It Works', path: '/about' },
    { name: 'Analytics', path: '/analytics' },
    { name: 'Predict Claim', path: '/predict' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#141414]/90 backdrop-blur-md border-b border-[#343434]/80 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-20">
          
          {/* Brand Logo */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group focus:outline-none"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className="p-2 rounded-xl bg-[#00C878]/10 border border-[#00C878]/30 group-hover:border-[#00C878]/70 group-hover:bg-[#00C878]/20 transition-all duration-300 shadow-sm shadow-[#00C878]/10">
              <Shield className="w-5 h-5 md:w-6 md:h-6 text-[#00C878]" />
            </div>
            <div className="flex flex-col">
              <span className="text-lg md:text-xl font-black font-heading tracking-tight text-[#F5F5F5] group-hover:text-[#00C878] transition-colors">
                ClaimGuard<span className="text-[#00C878]">.AI</span>
              </span>
              <span className="text-[10px] text-[#A3A3A3] font-semibold tracking-wider uppercase hidden sm:block">
                Insurance Risk Intelligence
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5 lg:gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 ${
                    isActive
                      ? 'text-[#00C878] bg-[#00C878]/10 border border-[#00C878]/30 shadow-sm'
                      : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#222222]/80'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="nav-indicator"
                      className="absolute -bottom-1 left-3 right-3 h-0.5 bg-[#00C878] rounded-full shadow-[0_0_8px_#00C878]"
                      transition={{ type: 'spring', stiffness: 350, damping: 30 }}
                    />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button
              variant="primary"
              size="md"
              icon={ArrowRight}
              iconPosition="right"
              onClick={() => navigate('/predict')}
            >
              Analyze a Claim
            </Button>
          </div>

          {/* Mobile Hamburger Toggle Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 rounded-xl text-[#A3A3A3] hover:text-[#F5F5F5] bg-[#1E1E1E] hover:bg-[#262626] focus:outline-none border border-[#343434] transition-colors"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-[#00C878]" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-[#1A1A1A] border-b border-[#343434] shadow-2xl"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-base font-semibold transition-all ${
                      isActive
                        ? 'text-[#00C878] bg-[#00C878]/10 border border-[#00C878]/30 shadow-sm'
                        : 'text-[#A3A3A3] hover:text-[#F5F5F5] hover:bg-[#222222]'
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              ))}
              <div className="pt-3">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  icon={ArrowRight}
                  iconPosition="right"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    navigate('/predict');
                  }}
                >
                  Analyze a Claim
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;

