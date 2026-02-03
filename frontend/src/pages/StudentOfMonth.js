import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const StudentOfMonth = () => {
  const [students, setStudents] = useState([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API}/student-of-month`);
      setStudents(response.data);
    } catch (error) {
      console.error('Error fetching students:', error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <div className="flex-grow">
        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-yellow-400 rounded-full mb-6">
              <Star className="text-white" size={40} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="page-title">
              Nxënësi i Muajit
            </h1>
            <p className="text-xl text-blue-100">
              Nxënësit që kanë dalë në pah në mënyrë të veçantë
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {students.map((student) => (
              <div 
                key={student.id} 
                className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-yellow-400 hover:shadow-xl transition-shadow duration-300"
                data-testid={`student-card-${student.id}`}
              >
                {student.photo_url && (
                  <div className="flex justify-center pt-8">
                    <img 
                      src={`${BACKEND_URL}${student.photo_url}`} 
                      alt={student.name}
                      className="w-40 h-40 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
                    />
                  </div>
                )}
                <div className="p-6 text-center">
                  <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-3">
                    {student.month} {student.year}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{student.name}</h3>
                  <p className="text-lg text-gray-600 mb-4">Klasa: {student.class_name}</p>
                  <p className="text-gray-700 leading-relaxed">{student.reason}</p>
                </div>
              </div>
            ))}
          </div>

          {students.length === 0 && (
            <div className="text-center py-16">
              <p className="text-gray-500 text-lg">Nuk ka të dhëna për momentin.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default StudentOfMonth;