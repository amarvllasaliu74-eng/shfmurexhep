import React from 'react';

const NewsTicker = ({ announcements }) => {
  if (!announcements || announcements.length === 0) {
    return null;
  }

  const newsText = announcements.map(a => a.text).join(' • ');

  return (
    <div className="bg-yellow-400 py-3 overflow-hidden relative">
      <div className="marquee">
        <div className="marquee-content">
          <span className="text-gray-900 text-lg font-semibold px-8">
            {newsText} • {newsText}
          </span>
        </div>
      </div>
    </div>
  );
};

export default NewsTicker;
