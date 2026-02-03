import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Star, Trophy, Calendar } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const LiveTV = () => {
  const [currentSection, setCurrentSection] = useState(0);
  const [studentOfMonth, setStudentOfMonth] = useState(null);
  const [activities, setActivities] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    fetchData();
    const dataInterval = setInterval(fetchData, 30000); // Refresh every 30 seconds
    const timeInterval = setInterval(() => setCurrentTime(new Date()), 1000);
    const rotationInterval = setInterval(() => {
      setCurrentSection((prev) => (prev + 1) % 3);
    }, 8000); // Rotate every 8 seconds

    return () => {
      clearInterval(dataInterval);
      clearInterval(timeInterval);
      clearInterval(rotationInterval);
    };
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, activitiesRes, tournamentsRes, announcementsRes] = await Promise.all([
        axios.get(`${API}/student-of-month`),
        axios.get(`${API}/activities`),
        axios.get(`${API}/tournaments`),
        axios.get(`${API}/announcements`)
      ]);

      if (studentsRes.data.length > 0) {
        setStudentOfMonth(studentsRes.data[0]);
      }
      setActivities(activitiesRes.data.slice(0, 4));
      setTournaments(tournamentsRes.data.slice(0, 3));
      setAnnouncements(announcementsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString('sq-AL', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('sq-AL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-blue-900 text-white overflow-hidden" data-testid="live-tv-dashboard">
      {/* Header with Logo and Time */}
      <div className="bg-white bg-opacity-10 backdrop-blur-md py-6 px-8 flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <img 
            src="https://customer-assets.emergentagent.com/job_ad25ad54-8626-47ba-81e5-21a727040a21/artifacts/wjob7as3_a6.png" 
            alt="Logo" 
            className="h-20 w-auto"
          />
          <div>
            <div className="text-3xl font-bold">Sh.F.M.U. "Rexhep Elmazi"</div>
            <div className="text-xl text-blue-200">Gjilan, Kosovë</div>
          </div>
        </div>
        <div className="text-right">
          <div className="text-5xl font-bold" data-testid="live-time">{formatTime(currentTime)}</div>
          <div className="text-xl text-blue-200" data-testid="live-date">{formatDate(currentTime)}</div>
        </div>
      </div>

      {/* Announcements Marquee */}
      {announcements.length > 0 && (
        <div className="bg-yellow-400 text-gray-900 py-3 overflow-hidden marquee">
          <div className="marquee-content">
            <span className="text-xl font-semibold px-8">
              {announcements.map(a => a.text).join(' • ')}
            </span>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <div className="p-8">
        {/* Student of the Month Section */}
        {currentSection === 0 && studentOfMonth && (
          <div className="fade-in" data-testid="live-section-student">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-400 rounded-full mb-4">
                <Star className="text-white" size={48} />
              </div>
              <h2 className="text-5xl font-bold mb-2">Nxënësi i Muajit</h2>
              <p className="text-2xl text-blue-200">{studentOfMonth.month} {studentOfMonth.year}</p>
            </div>
            
            <div className="max-w-4xl mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-3xl p-12 border-4 border-yellow-400">
              {studentOfMonth.photo_url && (
                <div className="mb-8 flex justify-center">
                  <img 
                    src={`${BACKEND_URL}${studentOfMonth.photo_url}`} 
                    alt={studentOfMonth.name}
                    className="w-64 h-64 object-cover rounded-full border-8 border-yellow-400 shadow-2xl"
                  />
                </div>
              )}
              <div className="text-center">
                <h3 className="text-5xl font-bold mb-4">{studentOfMonth.name}</h3>
                <p className="text-3xl text-yellow-200 mb-6">Klasa: {studentOfMonth.class_name}</p>
                <p className="text-2xl leading-relaxed">{studentOfMonth.reason}</p>
              </div>
            </div>
          </div>
        )}

        {/* Activities Section */}
        {currentSection === 1 && activities.length > 0 && (
          <div className="fade-in" data-testid="live-section-activities">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-blue-400 rounded-full mb-4">
                <Calendar className="text-white" size={48} />
              </div>
              <h2 className="text-5xl font-bold">Aktivitetet e Fundit</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              {activities.map((activity) => (
                <div key={activity.id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl overflow-hidden">
                  {activity.images && activity.images.length > 0 && (
                    <img 
                      src={`${BACKEND_URL}${activity.images[0]}`} 
                      alt={activity.title}
                      className="w-full h-64 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <div className="text-yellow-400 font-semibold mb-2 text-lg">{activity.date}</div>
                    <h3 className="text-3xl font-bold mb-3">{activity.title}</h3>
                    <p className="text-lg text-blue-100 line-clamp-3">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tournaments Section */}
        {currentSection === 2 && tournaments.length > 0 && (
          <div className="fade-in" data-testid="live-section-tournaments">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-yellow-400 rounded-full mb-4">
                <Trophy className="text-white" size={48} />
              </div>
              <h2 className="text-5xl font-bold">Turniret Shkollore</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 max-w-5xl mx-auto">
              {tournaments.map((tournament) => (
                <div key={tournament.id} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-8 flex items-center space-x-8">
                  {tournament.images && tournament.images.length > 0 && (
                    <img 
                      src={`${BACKEND_URL}${tournament.images[0]}`} 
                      alt={tournament.name}
                      className="w-64 h-64 object-cover rounded-xl"
                    />
                  )}
                  <div className="flex-1">
                    <div className="flex items-center mb-4">
                      <Trophy className="text-yellow-400 mr-3" size={36} />
                      <h3 className="text-4xl font-bold">{tournament.name}</h3>
                    </div>
                    <p className="text-2xl text-blue-200 mb-3">{tournament.sport_type}</p>
                    <p className="text-xl text-blue-100 mb-4">{tournament.date}</p>
                    <div className="bg-yellow-400 bg-opacity-20 rounded-xl p-4">
                      <p className="text-xl"><strong className="text-yellow-400">Fituesit:</strong> {tournament.winners}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTV;
