import React from 'react';
import { MapPin, Mail, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-school-yellow">Sh.F.M.U. "Rexhep Elmazi"</h3>
            <p className="text-gray-300">Shkolla Fillore e Mesme e Ulët në Gjilan, Kosovë</p>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-school-yellow">Kontakt</h3>
            <div className="space-y-2 text-gray-300">
              <div className="flex items-center space-x-2">
                <Mail size={18} />
                <a href="mailto:shfmurexhepelmazi@hotmail.com" className="hover:text-school-yellow">shfmurexhepelmazi@hotmail.com</a>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin size={18} />
                <span>Gjilan, Kosovë</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-xl font-bold mb-4 text-school-yellow">Navigimi</h3>
            <div className="space-y-2">
              <Link to="/" className="block text-gray-300 hover:text-school-yellow">Ballina</Link>
              <Link to="/rreth" className="block text-gray-300 hover:text-school-yellow">Rreth Shkollës</Link>
              <Link to="/kontakt" className="block text-gray-300 hover:text-school-yellow">Kontakt</Link>
              <Link to="/admin/login" className="block text-gray-300 hover:text-school-yellow text-sm">Admin</Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Sh.F.M.U. "Rexhep Elmazi". Të gjitha të drejtat e rezervuara.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;