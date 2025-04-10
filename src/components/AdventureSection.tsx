import React from 'react';
import { useInView } from 'react-intersection-observer';
import useLanguage from '../hooks/useLanguage';

interface Adventure {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
  link: string;
  cta?: string;
}

const AdventureSection: React.FC = () => {
  const { currentLanguage, pageContent } = useLanguage();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Get data from API if available, otherwise use sample data
  const adventureItems = pageContent?.adventure?.items;
  
  // Get the title directly from bloc_1 if available
  const activityTitle = pageContent?.bloc_1?.title || 'Discover Culinary Art with CookMaster';
  const activitySubtitle = pageContent?.bloc_1?.subtitle || 'Explore unique experiences to learn, taste, and share';
  
  // Sample data as fallback
  const sampleAdventures: Adventure[] = [
    {
      id: 1,
      title: 'Online Classes',
      description: currentLanguage === 'en' 
        ? 'Join our interactive online classes to master culinary skills with our chefs.' 
        : 'Rejoignez nos cours en ligne interactifs pour maîtriser les compétences culinaires avec nos chefs.',
      image: '/public/images/adventure1.png',
      tag: currentLanguage === 'en' ? 'Learn from your own kitchen' : 'Apprenez depuis votre cuisine',
      link: `/${currentLanguage}/online-classes`,
      cta: currentLanguage === 'en' ? 'See our online classes' : 'Voir nos cours en ligne'
    },
    {
      id: 2,
      title: 'Ethical Hunting',
      description: currentLanguage === 'en'
        ? 'Participate in our in-person workshops to perfect your cooking techniques.'
        : 'Participez à nos ateliers en personne pour perfectionner vos techniques de cuisine.',
      image: '/public/images/adventure2.png',
      tag: currentLanguage === 'en' ? 'Get hands-on experience' : 'Acquérir une expérience pratique',
      link: `/${currentLanguage}/ethical-hunting`,
      cta: currentLanguage === 'en' ? 'Discover our workshops' : 'Découvrir nos ateliers'
    },
    {
      id: 3,
      title: 'Gastronomic Experiences',
      description: currentLanguage === 'en'
        ? 'Enjoy exceptional moments around gastronomy with our expert chefs.'
        : 'Profitez de moments exceptionnels autour de la gastronomie avec nos chefs experts.',
      image: '/public/images/adventure3.png',
      tag: currentLanguage === 'en' ? 'A unique culinary journey' : 'Un voyage culinaire unique',
      link: `/${currentLanguage}/gastronomic-experiences`,
      cta: currentLanguage === 'en' ? 'Book an experience' : 'Réserver une expérience'
    }
  ];
  
  // Use API data if available, otherwise use sample data
  const adventures: Adventure[] = adventureItems as Adventure[] || sampleAdventures;
  
  return (
    <section ref={ref} className="py-16 md:py-24 bg-gray-50">
      <div className="max-w-[1240px] mx-auto px-4">
        <div className={`text-center mb-12 md:mb-16 transition-all duration-700 transform ${
          inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}>
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="h-[1px] w-32 bg-[#BBB]"></div>
            <h2 className="text-[#F2542D] text-center font-['Poppins'] text-[52px] font-semibold leading-[60px] uppercase">
              {activityTitle}
            </h2>
            <div className="h-[1px] w-32 bg-[#BBB]"></div>
          </div>
          <p className="text-[#562C2C] text-center font-['Poppins'] text-[24px] font-normal leading-[30px] tracking-[0.25px] max-w-3xl mx-auto">
            {activitySubtitle}
          </p>
        </div>

        {/* Adventure Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {adventures.map((adventure: Adventure, index: number) => (
            <div 
              key={adventure.id}
              className={`bg-white rounded-lg shadow-lg overflow-hidden transition-all duration-700 transform ${index==1 ?"h-fit":""} ${
                inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                marginTop: index === 1 ? '0px' : '45px'
              }}
            >
              <div className="relative">
                <img 
                  src={`/public/images/adventure${index+1}.png`} 
                  alt={adventure.title}
                  className="w-full h-64 object-cover transition-transform duration-500 hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-primary text-white text-sm py-1 px-3 rounded-full">
                  {adventure.tag}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl md:text-2xl font-bold mb-3 text-gray-800">{adventure.title}</h3>
                <p className="text-gray-600 mb-4">{adventure.description}</p>
                <a 
                  href={adventure.link}
                  className="inline-flex items-center text-primary font-medium hover:text-primary-dark transition-colors"
                >
                  {adventure.cta || (currentLanguage === 'en' ? 'Explore More' : 'Explorer Plus')}
                  <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AdventureSection; 