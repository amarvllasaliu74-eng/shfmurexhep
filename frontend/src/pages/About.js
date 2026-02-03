import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { BookOpen, Target, Users } from 'lucide-react';

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
              <BookOpen className="text-white" size={40} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="page-title">
              Rreth Shkollës
            </h1>
            <p className="text-xl text-blue-100">
              Sh.F.M.U. "Rexhep Elmazi" - Gjilan, Kosovë
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          {/* School Description */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Për Shkollën</h2>
            <div className="prose prose-lg max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Shkolla Fillore e Mesme e Ulët "Rexhep Elmazi" është një institucion arsimor në qytetin e Gjilanit, Kosovë. 
                Shkolla jonë është e përkushtuar në ofrimin e arsimit cilësor dhe në zhvillimin e plotë të çdo nxënësi.
              </p>
              <p className="text-gray-700 leading-relaxed mb-4">
                Me një staf të dedikuar mësimor dhe një mjedis mësimor bashkëkohor, ne përqendrohemi në krijimin e një 
                atmosfere që inkurajon mësimin, kreativitetin dhe zhvillimin personal të nxënësve tanë.
              </p>
            </div>
          </div>

          {/* Mission and Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl shadow-lg p-8 border-t-4 border-blue-600">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                <Target className="text-blue-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Misioni Ynë</h3>
              <p className="text-gray-700 leading-relaxed">
                Të ofrojmë arsim cilësor që i për gatit nxënësit për suksese akademike dhe personale, 
                duke i ndihmuar atë të bëhen q ytetarë të përgje gjshëm dhe të suksesshëm.
              </p>
            </div>

            <div className="bg-gradient-to-br from-yellow-50 to-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-400">
              <div className="flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-6">
                <BookOpen className="text-yellow-600" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Vizioni Ynë</h3>
              <p className="text-gray-700 leading-relaxed">
                Të jemi një shembull i shkollës moderne që kombinon vlerat tradicionale me metoda bashkëkohore 
                të mësimdhes, duke krijuar një komunitet arsimor të fortë dhe inkurajues.
              </p>
            </div>
          </div>

          {/* School Values */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mr-4">
                <Users className="text-blue-600" size={32} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900">Vlerat Tona</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Ekselenca Akademike</h4>
                <p className="text-gray-700">
                  Përqendrohemi në arritjen e standarde të larta akademike dhe në zhvillimin e aftësive kritike të mendimit.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Respekti dhe Bashkëpunimi</h4>
                <p className="text-gray-700">
                  Promovoj më një mjedis të respektueshem ku çdo nxënës nd ihet i vlerësuar dhe i mbeshtet ur.
                </p>
              </div>
              
              <div className="bg-blue-50 rounded-xl p-6">
                <h4 className="text-xl font-bold text-blue-900 mb-3">Zhvillimi Personal</h4>
                <p className="text-gray-700">
                  Inkurajojmë zhvillimin e talent ve individuale dhe nxit më kreativitetin në të gjitha fushat.
                </p>
              </div>
            </div>
          </div>

          {/* School Images */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Nga Shkolla Jonë</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <img 
                src="https://customer-assets.emergentagent.com/job_ad25ad54-8626-47ba-81e5-21a727040a21/artifacts/4ad1eb2l_a1.jpg" 
                alt="Nxënësit në shkollë"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://customer-assets.emergentagent.com/job_ad25ad54-8626-47ba-81e5-21a727040a21/artifacts/p6conap2_a2.jpg" 
                alt="Klasa"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
              <img 
                src="https://customer-assets.emergentagent.com/job_ad25ad54-8626-47ba-81e5-21a727040a21/artifacts/tmphc1t8_a3.jpg" 
                alt="Aktivitet shkollor"
                className="w-full h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default About;