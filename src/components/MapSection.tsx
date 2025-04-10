import React, { useState } from 'react';
import useLanguage from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

interface MapMarkerProps {
  x: number;
  y: number;
  name: string;
  description: string;
  isActive: boolean;
  onClick: () => void;
}

const MapMarker: React.FC<MapMarkerProps> = ({ x, y, name, description, isActive, onClick }) => {
  return (
    <button
      className="absolute transition-all duration-300 transform group"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
    >
      <div className={`
        w-8 h-8 rounded-full bg-white border-2
        ${isActive ? 'border-red-500' : 'border-primary'} 
        flex items-center justify-center
        group-hover:scale-110 transition-transform
      `}>
        <div className={`
          w-4 h-4 rounded-full
          ${isActive ? 'bg-red-500' : 'bg-primary'}
        `}></div>
      </div>

      {isActive && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white rounded-xl p-4 shadow-2xl w-64 z-10">
          <h4 className="text-lg font-semibold text-gray-900 mb-2">{name}</h4>
          <p className="text-gray-600">{description}</p>
        </div>
      )}
    </button>
  );
};

const MapSection: React.FC = () => {
  const { pageContent } = useLanguage();
  const [selectedLocation, setSelectedLocation] = useState<number | null>(null);
  const [mapScale, setMapScale] = useState(1);
  
  const { ref, inView } = useInView({
    threshold: 0.2,
    triggerOnce: true
  });

  if (!pageContent?.map) {
    return null;
  }

  const { title, subtitle, locations } = pageContent.map;

  const handleLocationSelect = (id: number) => {
    if (selectedLocation === id) {
      setSelectedLocation(null);
      setMapScale(1);
    } else {
      setSelectedLocation(id);
      setMapScale(1.2);
    }
  };

  const resetMap = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('map-area')) {
      setSelectedLocation(null);
      setMapScale(1);
    }
  };

  return (
    <section ref={ref} className="py-24" style={{
      backgroundImage: "url('/public/images/backgroundmap.png')",
      backgroundSize: "cover",
      backgroundPosition: "center"
    }}>
      <div className="max-w-7xl mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-500 ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">{subtitle}</p>
        </div>

        <div 
          className="map-area relative aspect-[16/9] rounded-2xl overflow-hidden shadow-xl bg-white"
          onClick={resetMap}
        >
          <div className={`
            transition-transform duration-700 ease-out
            transform origin-center
          `} style={{ transform: `scale(${mapScale})` }}>
            <img
              src="/images/maps.png"
              alt="Interactive Map"
              className="w-full h-full object-cover"
            />
            
            {locations.map(location => (
              <MapMarker
                key={location.id}
                x={location.coordinates.x}
                y={location.coordinates.y}
                name={location.name}
                description={location.description}
                isActive={selectedLocation === location.id}
                onClick={() => handleLocationSelect(location.id)}
              />
            ))}
          </div>
        </div>

        <p className="text-center mt-6 text-gray-500">
          Select a location marker to learn more about the area
        </p>
      </div>
    </section>
  );
};

export default MapSection;