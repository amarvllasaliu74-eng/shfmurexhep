import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import StudentSlideshow from '@/components/StudentSlideshow';
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
          {students.length > 0 ? (
            <StudentSlideshow students={students} />
          ) : (
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