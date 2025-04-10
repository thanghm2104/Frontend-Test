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
    <section ref={ref} className="py-16 md:py-24 ">
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
          {adventures.map((adventure: Adventure, index: number) => (
            <div 
              key={adventure.id}
              className={`overflow-hidden transition-all duration-700 transform ${index==1 ?"h-fit":""} ${
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
                  className="w-[397px] h-[397px] object-cover rounded-[8px] transition-transform duration-500 hover:scale-105"
                />

              </div>
              <div className="p-6 pl-0 pr-0">
              <div className="text-[#F2542D] font-['Poppins'] text-[20px] font-normal font-medium leading-normal">
                  {adventure.tag}
              </div>
                <h3 className="text-[var(--3, #562C2C)] font-['Poppins'] text-[28px] font-normal font-medium leading-[32px] mb-3">{adventure.title}</h3>
                <p className="overflow-hidden text-ellipsis text-[rgba(86,44,44,0.80)] mb-4" style={{
                  display: '-webkit-box',
                  width: '100%',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  flexShrink: 0,
                  alignSelf: 'stretch',
                  lineHeight: '24px',
                  fontFamily: 'Poppins',
                  fontSize: '18px',
                  fontWeight: 400,
                  letterSpacing: '-0.18px'
                }}>
                  {adventure.description}
                </p>
                <a 
                  href={adventure.link}
                  className="text-[#562C2C] inline-flex items-center justify-center  font-medium hover:text-primary-dark transition-colors w-[249px] h-[44px] rounded-[333px] border border-[rgba(86, 44, 44, 0.30)]"
                >
                  {adventure.cta}
                  <img src="/public/icons/ArrowUpRightAdventure.svg" alt="Arrow" className="h-5 w-5" />
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