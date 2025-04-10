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
    <div 
      className="absolute transition-all duration-300 transform cursor-pointer hover:scale-110"
      style={{ left: `${x}%`, top: `${y}%` }}
      onClick={onClick}
    >
      <div className={`
        w-6 h-6 rounded-full 
        ${isActive ? 'bg-red-500' : 'bg-primary'}
        flex items-center justify-center
        transition-all duration-300
        shadow-lg hover:shadow-xl
        ${isActive ? 'scale-125' : 'scale-100'}
      `}>
        <div className="w-2 h-2 bg-white rounded-full"></div>
      </div>
      
      {isActive && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-xl rounded-lg p-3 z-10 w-56">
          <h4 className="font-bold text-primary mb-1">{name}</h4>
          <p className="text-sm text-gray-600">{description}</p>
        </div>
      )}
    </div>
  );
};

const MapSection: React.FC = () => {
  const { pageContent } = useLanguage();
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  if (!pageContent) {
    return <div className="py-20"></div>;
  }

  const { title, subtitle, locations } = pageContent.map;

  const handleMarkerClick = (locationId: number) => {
    if (activeLocation === locationId) {
      setActiveLocation(null);
    } else {
      setActiveLocation(locationId);
      setIsZoomed(true);
    }
  };

  const handleMapClick = (e: React.MouseEvent) => {
    // Only reset if clicking on the map background, not on a marker
    if ((e.target as HTMLElement).classList.contains('map-container')) {
      setActiveLocation(null);
      setIsZoomed(false);
    }
  };

  return (
    <section ref={ref} className="py-20">
      <div className="container mx-auto px-4">
        <div className={`text-center mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{title}</h2>
          {subtitle && <p className="text-lg text-gray-600 max-w-2xl mx-auto">{subtitle}</p>}
        </div>

        <div className={`map-container relative w-full aspect-video cursor-zoom-in mx-auto overflow-hidden rounded-lg shadow-xl transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
        onClick={handleMapClick}
        style={{ maxWidth: '1200px' }}
        >
          <div className={`transition-transform duration-700 ease-in-out ${isZoomed ? 'scale-125' : 'scale-100'}`}>
            {/* This would be your map image */}
            <div className="w-full h-full bg-gray-200 relative">
              <img 
                src="/assets/map.png"
                alt="Map" 
                className="w-full h-full object-cover"
              />
              
              {locations.map((location) => (
                <MapMarker
                  key={location.id}
                  x={location.coordinates.x}
                  y={location.coordinates.y}
                  name={location.name}
                  description={location.description}
                  isActive={activeLocation === location.id}
                  onClick={() => handleMarkerClick(location.id)}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          Click on a location to see details. Click again to zoom out.
        </div>
      </div>
    </section>
  );
};

export default MapSection; 