import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Trophy, Calendar, Medal } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Tournaments = () => {
  const [tournaments, setTournaments] = useState([]);

  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const response = await axios.get(`${API}/tournaments`);
      setTournaments(response.data);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
              <Trophy className="text-white" size={40} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="page-title">
              Turniret Shkollore
            </h1>
            <p className="text-xl text-blue-100">
              Kompeticionet sportive dhe arritjet e nxënësve tanë
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {tournaments.map((tournament) => {
              const hasImages = tournament.images && tournament.images.length > 0;
              const imageUrl = hasImages ? `${BACKEND_URL}${tournament.images[0]}` : '';
              
              return (
                <div 
                  key={tournament.id} 
                  className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  data-testid={`tournament-card-${tournament.id}`}
                >
                  {hasImages && (
                    <img 
                      src={imageUrl} 
                      alt={tournament.name}
                      className="w-full h-56 object-cover"
                      data-testid={`tournament-image-${tournament.id}`}
                    />
                  )}
                  <div className="p-8">
                    <div className="flex items-center justify-center w-14 h-14 bg-yellow-400 rounded-full mb-4">
                      <Trophy className="text-white" size={28} />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">{tournament.name}</h2>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-center text-gray-700">
                        <Medal className="text-blue-600 mr-3" size={20} />
                        <span className="font-semibold">Sport:</span>
                        <span className="ml-2">{tournament.sport_type}</span>
                      </div>
                      
                      <div className="flex items-center text-gray-700">
                        <Calendar className="text-blue-600 mr-3" size={20} />
                        <span className="font-semibold">Data:</span>
                        <span className="ml-2">{tournament.date}</span>
                      </div>
                    </div>

                    <div className="bg-blue-50 rounded-lg p-4 mb-3">
                      <h3 className="font-semibold text-gray-900 mb-2">Rezultatet:</h3>
                      <p className="text-gray-700">{tournament.results}</p>
                    </div>

                    <div className="bg-yellow-50 rounded-lg p-4">
                      <h3 className="font-semibold text-gray-900 mb-2">Fituesit:</h3>
                      <p className="text-gray-700">{tournament.winners}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {tournaments.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Nuk ka turnire për momentin.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tournaments;