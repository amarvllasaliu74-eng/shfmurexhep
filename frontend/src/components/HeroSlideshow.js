import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const HeroSlideshow = ({ slides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    if (slides.length === 0) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const goToPrevious = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  if (slides.length === 0) {
    return null;
  }

  return (
    <section className="relative bg-white">
      <div className="relative h-[500px] overflow-hidden">
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative h-full">
              <img
                src={`${BACKEND_URL}${slide.image_url}`}
                alt={slide.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div className="max-w-7xl mx-auto">
                  <div className="bg-yellow-400 text-gray-900 text-sm font-semibold px-4 py-1 rounded-full inline-block mb-3">
                    {slide.slide_type === 'event' ? 'Event' : slide.slide_type === 'news' ? 'Lajme' : 'Njoftim'}
                  </div>
                  <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-xl text-gray-100 max-w-3xl">{slide.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        {slides.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all"
              data-testid="slideshow-prev-btn"
            >
              <ChevronLeft className="text-white" size={28} />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/40 backdrop-blur-sm rounded-full p-3 transition-all"
              data-testid="slideshow-next-btn"
            >
              <ChevronRight className="text-white" size={28} />
            </button>
          </>
        )}

        {/* Dots Navigation */}
        {slides.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentSlide
                    ? 'bg-yellow-400 w-8'
                    : 'bg-white/50 hover:bg-white/80'
                }`}
                data-testid={`slideshow-dot-${index}`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default HeroSlideshow;
