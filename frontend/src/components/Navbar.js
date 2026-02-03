import React from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const navLinks = [
    { to: '/', label: 'Ballina' },
    { to: '/nxenesi-i-muajit', label: 'Nxënësi i Muajit' },
    { to: '/nxenesit-me-te-mire', label: 'Nxënësit më të Mirë' },
    { to: '/aktivitetet', label: 'Aktivitetet' },
    { to: '/turniret', label: 'Turniret' },
    { to: '/rreth', label: 'Rreth Shkollës' },
    { to: '/kontakt', label: 'Kontakt' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="https://customer-assets.emergentagent.com/job_ad25ad54-8626-47ba-81e5-21a727040a21/artifacts/wjob7as3_a6.png" 
              alt="Logo" 
              className="h-14 w-auto"
            />
            <div>
              <div className="text-xl font-bold text-school-blue">Sh.F.M.U. "Rexhep Elmazi"</div>
              <div className="text-sm text-gray-600">Gjilan, Kosovë</div>
            </div>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="text-gray-700 hover:text-school-blue font-medium transition-colors duration-200"
                data-testid={`nav-link-${link.to.replace('/', '')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-gray-700 hover:text-school-blue"
            data-testid="mobile-menu-button"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t" data-testid="mobile-menu">
          <div className="px-4 pt-2 pb-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-school-blue hover:text-white rounded-lg transition-colors duration-200"
                data-testid={`mobile-nav-link-${link.to.replace('/', '')}`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;