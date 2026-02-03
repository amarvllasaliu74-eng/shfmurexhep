import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Calendar, Image as ImageIcon } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const [selectedActivity, setSelectedActivity] = useState(null);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await axios.get(`${API}/activities`);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
              <Calendar className="text-white" size={40} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="page-title">
              Aktivitetet Shkollore
            </h1>
            <p className="text-xl text-blue-100">
              Zbuloni event t dhe aktivitetet që organizohen në shkollën tonë
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-8">
            {activities.map((activity) => (
              <div 
                key={activity.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                data-testid={`activity-card-${activity.id}`}
              >
                <div className="md:flex">
                  {activity.images && activity.images.length > 0 && (
                    <div className="md:w-1/3">
                      <img 
                        src={`${BACKEND_URL}${activity.images[0]}`} 
                        alt={activity.title}
                        className="w-full h-64 md:h-full object-cover cursor-pointer"
                        onClick={() => setSelectedActivity(activity)}
                        data-testid={`activity-image-${activity.id}`}
                      />
                    </div>
                  )}
                  <div className={`${activity.images?.length > 0 ? 'md:w-2/3' : 'w-full'} p-8`}>
                    <div className="flex items-center text-sm text-blue-600 font-semibold mb-3">
                      <Calendar size={18} className="mr-2" />
                      {activity.date}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">{activity.title}</h2>
                    <p className="text-gray-700 leading-relaxed mb-4">{activity.description}</p>
                    
                    {activity.images && activity.images.length > 1 && (
                      <button 
                        onClick={() => setSelectedActivity(activity)}
                        className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                        data-testid={`view-gallery-btn-${activity.id}`}
                      >
                        <ImageIcon size={20} className="mr-2" />
                        Shiko Galerinë ({activity.images.length} fotografi)
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {activities.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Nuk ka aktivitete për momentin.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery Modal */}
      {selectedActivity && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedActivity(null)}
          data-testid="gallery-modal"
        >
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-gray-900">{selectedActivity.title}</h3>
                <button 
                  onClick={() => setSelectedActivity(null)}
                  className="text-gray-500 hover:text-gray-700 text-2xl"
                  data-testid="close-modal-btn"
                >
                  &times;
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {selectedActivity.images.map((image, index) => (
                  <img 
                    key={index}
                    src={`${BACKEND_URL}${image}`} 
                    alt={`${selectedActivity.title} ${index + 1}`}
                    className="w-full h-64 object-cover rounded-lg"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Activities;