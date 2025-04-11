import React, { useState, useEffect } from 'react';
import useLanguage from '../hooks/useLanguage';
import { useInView } from 'react-intersection-observer';

interface MapLocation {
  id: number;
  name: string;
  coordinates: { x: number; y: number };
  description: string;
  activities: string[];
  iconType: 'Mountains' | 'Fishing' | 'Crosshair';
}

interface MapMarkerProps {
  x: number;
  y: number;
  name: string;
  description: string;
  activities: string[];
  isActive: boolean;
  iconType: 'Mountains' | 'Fishing' | 'Crosshair';
  onClick: () => void;
  activityDescriptions?: Map<string, string>;
  activityTaglines?: Map<string, string>;
}

// Custom marker SVG component
const MarkerIcon: React.FC<{ isActive: boolean, iconType: 'Mountains' | 'Fishing' | 'Crosshair' }> = ({ isActive, iconType }) => {
  // Determine the icon path based on iconType
  const getIconPath = () => {
    switch (iconType) {
      case 'Mountains':
        return '/icons/Mountains.svg';
      case 'Fishing':
        return '/icons/Fishing.svg';
      case 'Crosshair':
        return '/icons/Crosshair.svg';
      default:
        return '/icons/Mountains.svg';
    }
  };

  return (
    <div className="relative" style={{ width: '32px', height: '42px' }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="32" height="42" viewBox="0 0 32 42" fill="none">
        <path 
          d="M16 0C11.758 0.00496267 7.69115 1.74496 4.69161 4.83827C1.69207 7.93157 0.00481224 12.1256 0 16.5002C0 22.3877 4.13565 28.5938 8.45455 34.5472C10.7004 37.2221 12.4099 39.6307 15.1727 41.7285C15.4173 41.9052 15.7087 42 16.0073 42C16.3059 42 16.5973 41.9052 16.8418 41.7285C19.5995 39.6298 21.3041 37.2212 23.5455 34.5472C27.8629 28.5938 32 22.3877 32 16.5002C31.9952 12.1256 30.3079 7.93157 27.3084 4.83827C24.3089 1.74496 20.242 0.00496267 16 0Z" 
          fill={isActive ? "#F2542D" : "#808080"}
          className="transition-colors duration-300"
        />
        <path 
          d="M5.05056 5.18634C7.9576 2.18842 11.8957 0.504961 16 0.5C20.1043 0.504961 24.0424 2.18842 26.9494 5.18634C29.8571 8.18492 31.4953 12.2537 31.5 16.5007C31.4999 19.3308 30.5042 22.2713 28.948 25.2686C27.3952 28.2596 25.3052 31.2686 23.151 34.2395C22.7033 34.7738 22.2797 35.2937 21.8672 35.8C20.1936 37.8538 18.7041 39.6818 16.5445 41.3265C16.3851 41.4402 16.1978 41.5 16.0073 41.5C15.8167 41.5 15.6293 41.4402 15.4699 41.3264C13.3037 39.6804 11.8091 37.85 10.1294 35.7928C9.7179 35.2888 9.29526 34.7712 8.84891 34.2393C6.69402 31.2685 4.6041 28.2595 3.05146 25.2686C1.49545 22.2712 0.500065 19.3306 0.5 16.5004C0.504742 12.2535 2.14294 8.18485 5.05056 5.18634Z" 
          stroke="white" 
          strokeOpacity="0.4"
        />
      </svg>
      
      {/* Icon in the center of the marker */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4 h-4">
        <img 
          src={getIconPath()} 
          alt={iconType} 
          className="w-full h-full object-contain filter brightness-0 invert" // Makes icon white
        />
      </div>
    </div>
  );
};

const MapMarker: React.FC<MapMarkerProps> = ({ 
  x, 
  y, 
  name, 
  description, 
  activities, 
  isActive, 
  iconType, 
  onClick,
  activityDescriptions,
  activityTaglines
}) => {
  return (
    <div 
      className="absolute transition-all duration-300 transform cursor-pointer hover:scale-110"
      style={{ 
        left: `${x}%`, 
        top: `${y}%`, 
        marginLeft: '-16px',  // Half of the marker width
        marginTop: '-42px'    // Full marker height to position bottom point
      }}
      onClick={(e) => {
        e.stopPropagation(); // Prevent map click event
        onClick();
      }}
    >
      <div className={`
        transition-all duration-300
        ${isActive ? 'scale-125' : 'scale-100'}
      `}>
        <MarkerIcon isActive={isActive} iconType={iconType} />
      </div>
      
      {isActive && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white shadow-xl rounded-lg p-3 z-10 w-72">
          <h4 className="font-bold text-cookmaster-title mb-1">{name}</h4>
          <p className="text-sm text-gray-600 mb-3">{description}</p>
          {activities.length > 0 && (
            <div>
              <h5 className="text-sm font-semibold text-cookmaster-brown mb-2">Experiences:</h5>
              <ul className="text-xs text-gray-600 space-y-2">
                {activities.map((activity, idx) => (
                  <li key={idx} className="flex">
                    <span className="w-2 h-2 rounded-full bg-cookmaster-red mr-2 mt-1.5 flex-shrink-0"></span>
                    <div>
                      <p className="font-medium">{activity}</p>
                      {activityTaglines?.get(activity) && (
                        <p className="text-gray-500 italic text-xs mt-0.5">{activityTaglines.get(activity)}</p>
                      )}
                      {activityDescriptions?.get(activity) && (
                        <p className="text-gray-600 text-xs mt-1">{activityDescriptions.get(activity)}</p>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

const InteractiveMap: React.FC = () => {
  const { pageContent } = useLanguage();
  const [locations, setLocations] = useState<MapLocation[]>([]);
  const [activeLocation, setActiveLocation] = useState<number | null>(null);
  const [isZoomed, setIsZoomed] = useState(false);
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Available icon types for distribution among locations
  const iconTypes: Array<'Mountains' | 'Fishing' | 'Crosshair'> = ['Mountains', 'Fishing', 'Crosshair'];

  // Extract title from bloc_2
  const mapTitle = pageContent?.bloc_2?.title || 'Our Locations';

  // Create a map of activity descriptions from bloc_1
  const activityDescriptions = new Map<string, string>();
  const activityTaglines = new Map<string, string>();
  
  if (pageContent?.bloc_1?.cases) {
    pageContent.bloc_1.cases.forEach(item => {
      if (item.category && item.description) {
        activityDescriptions.set(item.category, item.description);
      }
      if (item.category && item.tagline) {
        activityTaglines.set(item.category, item.tagline);
      }
    });
  }

  useEffect(() => {
    if (pageContent?.carte_point) {
      // Transform the API data to our component's format
      const mapLocations = pageContent.carte_point.map((point, index) => {
        // Convert coordinates to percentage positions on the map
        // These are just example calculations - you'll need to adjust based on your map
        const longitude = parseFloat(point.coordinates?.longitude || '0');
        const latitude = parseFloat(point.coordinates?.latitude || '0');
        
        // Convert geo coordinates to relative positions on the map
        // This is a simplified example - real implementation would depend on map projection
        const x = ((longitude + 180) / 360) * 100; // Convert -180 to 180 range to 0-100%
        const y = ((90 - latitude) / 180) * 100;  // Convert 90 to -90 range to 0-100%
        
        // Assign an icon type based on index (cycling through the available types)
        const iconType = iconTypes[index % iconTypes.length];
        
        // Get marker information from API
        const markerActivities = point.marker_information || point.activities || [];
        
        return {
          id: index + 1,
          name: point.name,
          coordinates: { x, y },
          description: point.address,
          activities: markerActivities,
          iconType
        };
      });
      
      // For demo purposes, ensure we have at least 3 markers with reasonable positions
      if (mapLocations.length < 3) {
        // Add fallback locations if API didn't return enough data
        const fallbackLocations: MapLocation[] = [
          {
            id: 1,
            name: "CookMaster Paris",
            coordinates: { x: 30, y: 40 },
            description: "14 Rue des Chefs, 75008 Paris",
            activities: ["Online Classes", "Gastronomic Experiences"],
            iconType: "Mountains"
          },
          {
            id: 2,
            name: "CookMaster Lyon",
            coordinates: { x: 70, y: 60 },
            description: "22 Avenue de la Gastronomie, 69002 Lyon",
            activities: ["Ethical Hunting", "Gastronomic Experiences"],
            iconType: "Fishing"
          },
          {
            id: 3,
            name: "CookMaster Bordeaux",
            coordinates: { x: 50, y: 70 },
            description: "8 Place du Vin, 33000 Bordeaux",
            activities: ["Cooking Classes", "Wine Tasting"],
            iconType: "Crosshair"
          }
        ];
        
        setLocations(fallbackLocations);
      } else {
        // Ensure the coordinates are reasonable for display purposes
        const fixedLocations = mapLocations.map(loc => ({
          ...loc,
          coordinates: {
            x: loc.coordinates.x < 0 || loc.coordinates.x > 100 ? Math.abs(loc.id * 25) % 90 + 5 : loc.coordinates.x,
            y: loc.coordinates.y < 0 || loc.coordinates.y > 100 ? Math.abs(loc.id * 15) % 80 + 10 : loc.coordinates.y
          }
        }));
        
        setLocations(fixedLocations.slice(0, 5)); // Limit to first 5 locations for better display
      }
    }
  }, [pageContent]);

  const handleMarkerClick = (locationId: number) => {
    // When clicking a marker, set it as active and zoom the map
    setActiveLocation(locationId);
    setIsZoomed(true);
  };

  const handleMapClick = () => {
    // When clicking the map background, reset everything
    setActiveLocation(null);
    setIsZoomed(false);
  };

  const handleResetClick = () => {
    setActiveLocation(null);
    setIsZoomed(false);
  };

  return (
    <section ref={ref} className="py-16 relative">
      <div 
        className="absolute inset-0 z-0"
        style={{
          background: "url('/images/backgroundmap.png') lightgray -392.609px -456px / 140.897% 185.598% no-repeat",
          opacity: 0.03
        }}
      />
      <div className="container mx-auto px-4 relative z-10">
        <div className={`text-center mb-12 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          {/* <h2 className="text-3xl md:text-4xl font-bold mb-4 text-cookmaster-title">{mapTitle}</h2> */}
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-32 bg-[#BBB]"></div>
            <h2 className="text-[#F2542D] text-center font-['Poppins'] text-[52px] font-semibold leading-[60px] uppercase">
              {mapTitle}
            </h2>
            <div className="h-[1px] w-32 bg-[#BBB]"></div>
          </div>
          <div className={`flex justify-center gap-4 mb-8 ${activeLocation === null ? 'opacity-50' : ''}`}>
            {locations.slice(0, 3).map((location) => (
              <button
                key={location.id}
                onClick={() => handleMarkerClick(location.id)}
                className={`
                  flex justify-center items-center gap-8 px-4 py-2 text-sm font-medium
                  transition-all duration-300 rounded-[40px] border-[1.5px]
                  ${activeLocation === location.id
                    ? 'bg-cookmaster-red text-white border-cookmaster-red shadow-lg scale-105'
                    : 'bg-[#FAFAFA] text-gray-600 border-[rgba(242,84,45,0.5)] hover:bg-gray-50'
                  }
                `}
              >
                <div className="flex items-center gap-2">
                  {location.iconType && (
                    <span className="text-lg">
                      {location.iconType === 'Mountains' && <img src="/icons/Mountains.svg" alt="Mountains" className="w-6 h-6" />}
                      {location.iconType === 'Fishing' && <img src="/icons/Fishing.svg" alt="Fishing" className="w-6 h-6" />}
                      {location.iconType === 'Crosshair' && <img src="/icons/Crosshair.svg" alt="Crosshair" className="w-6 h-6" />}
                    </span>
                  )}
                  <span>{location.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="relative">
          <div 
            className={`map-container relative w-full aspect-video cursor-zoom-in mx-auto overflow-hidden rounded-lg shadow-xl transition-all duration-700 transform ${
            inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            }`}
            onClick={handleMapClick}
            style={{ maxWidth: '1200px' }}
          >
            <div className={`transition-transform duration-700 ease-in-out ${isZoomed ? 'scale-125' : 'scale-100'}`}>
              <div className="w-full h-full bg-gray-200 relative">
                <img 
                  src="/images/maps.png"
                  alt="CookMaster Locations Map" 
                  className="w-full h-full object-cover"
                />
                
                {locations.map((location) => (
                  <MapMarker
                    key={location.id}
                    x={location.coordinates.x}
                    y={location.coordinates.y}
                    name={location.name}
                    description={location.description}
                    activities={location.activities}
                    isActive={activeLocation === location.id}
                    iconType={location.iconType}
                    onClick={() => handleMarkerClick(location.id)}
                    activityDescriptions={activityDescriptions}
                    activityTaglines={activityTaglines}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <button 
            onClick={handleResetClick}
            className={`mt-6 mx-auto block px-6 py-2 bg-cookmaster-red text-white rounded-full shadow-lg hover:bg-opacity-90 transition-all duration-300 transform ${
              isZoomed || activeLocation !== null ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
          >
            Reset View
          </button>
        </div>
        
        <div className="text-center mt-4 text-sm text-gray-500">
          Click on a marker to view details or click on the map to reset.
        </div>
      </div>
    </section>
  );
};

export default InteractiveMap; 