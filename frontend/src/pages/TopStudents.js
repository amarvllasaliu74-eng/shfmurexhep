import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Award, BookOpen } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const TopStudents = () => {
  const [students, setStudents] = useState([]);
  const [groupedStudents, setGroupedStudents] = useState({});

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get(`${API}/top-students`);
      setStudents(response.data);
      
      // Group students by subject
      const grouped = response.data.reduce((acc, student) => {
        if (!acc[student.subject]) {
          acc[student.subject] = [];
        }
        acc[student.subject].push(student);
        return acc;
      }, {});
      setGroupedStudents(grouped);
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
              <Award className="text-white" size={40} />
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-4" data-testid="page-title">
              Nxënësit më të Mirë sipas Lëndës
            </h1>
            <p className="text-xl text-blue-100">
              Arritjet akademike të nxënësve tanë
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="space-y-12">
            {Object.entries(groupedStudents).map(([subject, subjectStudents]) => (
              <div key={subject} className="bg-white rounded-2xl shadow-lg p-8" data-testid={`subject-section-${subject}`}>
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                    <BookOpen className="text-blue-600" size={24} />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900">{subject}</h2>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {subjectStudents.map((student) => (
                    <div 
                      key={student.id} 
                      className="bg-gradient-to-br from-blue-50 to-white border border-blue-200 rounded-xl p-6 hover:shadow-md transition-shadow duration-300"
                      data-testid={`student-card-${student.id}`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-xl font-bold text-gray-900">{student.name}</h3>
                        <Award className="text-yellow-500" size={24} />
                      </div>
                      <p className="text-gray-600 mb-2">Klasa: <span className="font-semibold">{student.class_name}</span></p>
                      <p className="text-gray-700">{student.achievement}</p>
                    </div>
                  ))}
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

export default TopStudents;