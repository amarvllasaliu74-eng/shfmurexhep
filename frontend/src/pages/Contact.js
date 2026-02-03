import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MapPin, Phone } from 'lucide-react';

const Contact = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
              <Mail className="text-white" size={40} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="page-title">
              Na Kontaktoni
            </h1>
            <p className="text-xl text-blue-100">
              Jemi këtu për ju - na shkruani ose na vizitoni
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Informata të Kontaktit</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4 bg-white rounded-xl shadow-md p-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <Mail className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Email</h3>
                    <a 
                      href="mailto:shfmurexhepelmazi@hotmail.com" 
                      className="text-blue-600 hover:text-blue-800 text-lg"
                      data-testid="contact-email"
                    >
                      shfmurexhepelmazi@hotmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4 bg-white rounded-xl shadow-md p-6">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full">
                      <MapPin className="text-blue-600" size={24} />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Adresa</h3>
                    <p className="text-gray-700 text-lg">Gjilan, Kosovë</p>
                    <a 
                      href="https://maps.app.goo.gl/RxGaW53LZcDJNqVx9?g_st=ic" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 inline-block mt-2"
                      data-testid="google-maps-link"
                    >
                      Shiko në Google Maps →
                    </a>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-blue-50 to-yellow-50 rounded-xl shadow-md p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">Orë të Punës</h3>
                  <div className="space-y-3 text-gray-700">
                    <div>
                      <p className="font-semibold text-blue-600 mb-1">Niveli i Lartë (Klasat 6-9):</p>
                      <p><span className="font-semibold">E Hënë - E Premte:</span> 07:30 - 12:35</p>
                    </div>
                    <div>
                      <p className="font-semibold text-blue-600 mb-1">Niveli i Ulët (Klasat 1-5):</p>
                      <p><span className="font-semibold">E Hënë - E Premte:</span> 13:00 - 17:10</p>
                    </div>
                    <div className="pt-2 border-t">
                      <p><span className="font-semibold">E Shtunë & E Diel:</span> E mbyllur</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-white rounded-xl shadow-md p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">Sh.F.M.U. "Rexhep Elmazi"</h3>
                <p className="text-gray-700">
                  Shkolla Fillore e Mesme e Ulët në Gjilan, e përkushtuar në ofrimin e arsimit cilësor 
                  për nxënësit tanë dhe zhvillimin e të ardhmës së tyre.
                </p>
              </div>
            </div>

            {/* Google Maps */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-8">Lokacioni</h2>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '600px' }}>
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2933.1!2d21.4676462!3d42.4729356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x13548d365d33c9c1%3A0xa4fd108a16f19773!2sShkolla%20Rexhep%20Elmazi!5e0!3m2!1sen!2s!4v1234567890123!5m2!1sen!2s"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Google Maps Location"
                  data-testid="google-maps-embed"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Contact;