import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const StudentSlideshow = ({ students }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (students.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % students.length);
    }, 6000); // Change every 6 seconds

    return () => clearInterval(interval);
  }, [students.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? students.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % students.length);
  };

  if (students.length === 0) {
    return null;
  }

  return (
    <div className="relative max-w-4xl mx-auto">
      {students.map((student, index) => (
        <div
          key={student.id}
          className={`transition-opacity duration-700 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0 absolute inset-0'
          }`}
        >
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-t-4 border-yellow-400">
            {student.photo_url && (
              <div className="flex justify-center pt-8 bg-gradient-to-b from-yellow-50 to-white">
                <img 
                  src={student.photo_url.startsWith('http') ? student.photo_url : `${BACKEND_URL}${student.photo_url}`}
                  alt={student.name}
                  className="w-48 h-48 object-cover rounded-full border-4 border-yellow-400 shadow-lg"
                />
              </div>
            )}
            <div className="p-8 text-center">
              <div className="bg-blue-100 text-blue-800 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-3">
                {student.month} {student.year}
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-2">{student.name}</h3>
              <p className="text-lg text-gray-600 mb-4">Klasa: {student.class_name}</p>
              <p className="text-gray-700 leading-relaxed">{student.reason}</p>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      {students.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all z-10"
          >
            <ChevronLeft className="text-blue-600" size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 bg-white hover:bg-gray-100 rounded-full p-3 shadow-lg transition-all z-10"
          >
            <ChevronRight className="text-blue-600" size={24} />
          </button>
        </>
      )}

      {/* Dots Navigation */}
      {students.length > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          {students.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide
                  ? 'bg-yellow-400 w-8'
                  : 'bg-gray-300 hover:bg-gray-400'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentSlideshow;
