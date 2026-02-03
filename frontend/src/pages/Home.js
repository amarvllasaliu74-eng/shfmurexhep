import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSlideshow from '@/components/HeroSlideshow';
import NewsTicker from '@/components/NewsTicker';
import { Calendar, Trophy, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const Home = () => {
  const [studentOfMonth, setStudentOfMonth] = useState(null);
  const [activities, setActivities] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [heroSlides, setHeroSlides] = useState([]);
  const [announcements, setAnnouncements] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [studentsRes, activitiesRes, tournamentsRes, slidesRes, announcementsRes] = await Promise.all([
        axios.get(`${API}/student-of-month`),
        axios.get(`${API}/activities`),
        axios.get(`${API}/tournaments`),
        axios.get(`${API}/hero-slides`),
        axios.get(`${API}/announcements`)
      ]);

      if (studentsRes.data.length > 0) {
        setStudentOfMonth(studentsRes.data[0]);
      }
      setActivities(activitiesRes.data.slice(0, 3));
      setTournaments(tournamentsRes.data.slice(0, 3));
      setHeroSlides(slidesRes.data);
      setAnnouncements(announcementsRes.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center fade-in">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold mb-6" data-testid="hero-title">
              Mirësevini në Shkollën<br />
              "Rexhep Elmazi"
            </h1>
            <p className="text-xl sm:text-2xl text-blue-100">Gjilan, Kosovë</p>
          </div>
        </div>
      </section>

      {/* Hero Slideshow */}
      {heroSlides.length > 0 && <HeroSlideshow slides={heroSlides} />}

      {/* Student of the Month */}
      {studentOfMonth && (
        <section className="py-16 bg-gradient-to-b from-yellow-50 to-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-400 rounded-full mb-4">
                <Star className="text-white" size={32} />
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2" data-testid="student-of-month-section">
                Nxënësi i Muajit
              </h2>
              <p className="text-gray-600">{studentOfMonth.month} {studentOfMonth.year}</p>
            </div>
            
            <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8 border-t-4 border-yellow-400">
              {studentOfMonth.photo_url && (
                <div className="mb-6 flex justify-center">
                  <img 
                    src={`${BACKEND_URL}${studentOfMonth.photo_url}`} 
                    alt={studentOfMonth.name}
                    className="w-48 h-48 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
                    data-testid="student-photo"
                  />
                </div>
              )}
              <div className="text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-2" data-testid="student-name">{studentOfMonth.name}</h3>
                <p className="text-lg text-gray-600 mb-4">Klasa: {studentOfMonth.class_name}</p>
                <p className="text-gray-700 leading-relaxed">{studentOfMonth.reason}</p>
              </div>
              <div className="mt-6 text-center">
                <Link 
                  to="/nxenesi-i-muajit" 
                  className="inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
                  data-testid="view-all-students-btn"
                >
                  Shiko të gjithë <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Latest Activities */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2" data-testid="activities-section">
                Aktivitetet e Fundit
              </h2>
              <p className="text-gray-600">Zbuloni çfarë po ndodh në shkollën tonë</p>
            </div>
            <Link 
              to="/aktivitetet" 
              className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              data-testid="view-all-activities-btn"
            >
              Shiko të gjitha <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <div key={activity.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300" data-testid={`activity-card-${activity.id}`}>
                {activity.images && activity.images.length > 0 && (
                  <img 
                    src={`${BACKEND_URL}${activity.images[0]}`} 
                    alt={activity.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <Calendar size={16} className="mr-2" />
                    {activity.date}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{activity.title}</h3>
                  <p className="text-gray-600 line-clamp-3">{activity.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Tournaments */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2" data-testid="tournaments-section">
                Turniret Shkollore
              </h2>
              <p className="text-gray-600">Kompeticionet dhe arritjet sportive</p>
            </div>
            <Link 
              to="/turniret" 
              className="hidden sm:inline-flex items-center text-blue-600 hover:text-blue-800 font-semibold"
              data-testid="view-all-tournaments-btn"
            >
              Shiko të gjitha <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {tournaments.map((tournament) => (
              <div key={tournament.id} className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-shadow duration-300" data-testid={`tournament-card-${tournament.id}`}>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <Trophy className="text-blue-600" size={24} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tournament.name}</h3>
                <p className="text-gray-600 mb-2">{tournament.sport_type}</p>
                <div className="flex items-center text-sm text-gray-500 mb-3">
                  <Calendar size={16} className="mr-2" />
                  {tournament.date}
                </div>
                <p className="text-gray-700 text-sm"><strong>Fit usit:</strong> {tournament.winners}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Preview */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6" data-testid="contact-section">
            Na kontaktoni
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Për më shumë informacion ose për të vizituar shkollën tonë
          </p>
          <Link 
            to="/kontakt" 
            className="inline-block bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors duration-200"
            data-testid="contact-us-btn"
          >
            Shiko Kontaktin
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;