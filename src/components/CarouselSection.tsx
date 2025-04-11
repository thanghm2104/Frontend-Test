import { Swiper, SwiperSlide } from 'swiper/react';
import useLanguage from '../hooks/useLanguage';
import { motion, AnimatePresence } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface Slide {
  id: number;
  image: string;
  caseTitle: string;
  title: string;
  text: string;
}

export default function CarouselSection() {
  const { pageContent, currentLanguage, isLoading } = useLanguage();
  
  // Get carousel data from API with fallback
  const carouselData = pageContent?.carousel || {
    title: currentLanguage === 'en' ? 'TITLE' : 'TITRE',
    viewMore: currentLanguage === 'en' ? 'Learn More' : 'En Savoir Plus',
    slides: [
      {
        id: 1,
        image: "/public/images/food1.png",
        caseTitle: currentLanguage === 'en' ? "Case title" : "Titre du cas",
        title: currentLanguage === 'en' ? "Case subtitle" : "Sous-titre du cas",
        text: currentLanguage === 'en' 
          ? "Lorem ipsum is simply dummy text of the printing and typesetting industry."
          : "Lorem ipsum est simplement un texte factice de l'industrie de l'impression."
      },
      {
        id: 2,
        image: "/public/images/food2.png",
        caseTitle: currentLanguage === 'en' ? "Case title" : "Titre du cas",
        title: currentLanguage === 'en' ? "Case subtitle" : "Sous-titre du cas",
        text: currentLanguage === 'en'
          ? "Lorem ipsum is simply dummy text of the printing and typesetting industry."
          : "Lorem ipsum est simplement un texte factice de l'industrie de l'impression."
      },
      {
        id: 3,
        image: "/public/images/food3.png",
        caseTitle: currentLanguage === 'en' ? "Case title" : "Titre du cas",
        title: currentLanguage === 'en' ? "Case subtitle" : "Sous-titre du cas",
        text: currentLanguage === 'en'
          ? "Lorem ipsum is simply dummy text of the printing and typesetting industry."
          : "Lorem ipsum est simplement un texte factice de l'industrie de l'impression."
      },
      {
        id: 4,
        image: "/public/images/food4.png",
        caseTitle: currentLanguage === 'en' ? "Case title" : "Titre du cas",
        title: currentLanguage === 'en' ? "Case subtitle" : "Sous-titre du cas",
        text: currentLanguage === 'en'
          ? "Lorem ipsum is simply dummy text of the printing and typesetting industry."
          : "Lorem ipsum est simplement un texte factice de l'industrie de l'impression."
      },
      {
        id: 5,
        image: "/public/images/food1.png",
        caseTitle: currentLanguage === 'en' ? "Case title" : "Titre du cas",
        title: currentLanguage === 'en' ? "Case subtitle" : "Sous-titre du cas",
        text: currentLanguage === 'en'
          ? "Lorem ipsum is simply dummy text of the printing and typesetting industry."
          : "Lorem ipsum est simplement un texte factice de l'industrie de l'impression."
      }
    ]
  };

  return (
    <>
      <div className="w-full max-w-screen-xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div 
            key={currentLanguage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-8 gap-4"
          >
            <motion.h2 
              className="text-2xl sm:text-3xl font-bold text-orange-500"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {carouselData.title}
            </motion.h2>
            <motion.a 
              href="#" 
              className="text-gray-600 flex items-center underline transition-all duration-300 hover:text-orange-500 group text-sm sm:text-base"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {carouselData.viewMore}
              <motion.img 
                src="/public/icons/ArrowRight.svg" 
                alt="arrow-right" 
                className="ml-2 w-4 sm:w-5 transition-transform duration-300"
                whileHover={{ x: 5, rotate: 45 }}
              />
            </motion.a>
          </motion.div>
        </AnimatePresence>

        <div className={`transition-opacity duration-300 ${isLoading ? 'opacity-50' : 'opacity-100'}`}>
          <Swiper
            spaceBetween={16}
            slidesPerView={1.2}
            navigation={false}
            pagination={{ clickable: true }}
            centeredSlides={true}
            loop={true}
            breakpoints={{
              480: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 24,
                centeredSlides: false,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 24,
                centeredSlides: false,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 32,
                centeredSlides: false,
              },
            }}
            className="!px-4 sm:!px-0"
          >
            {carouselData.slides.map((slide: Slide, index: number) => (
              <SwiperSlide key={slide.id}>
                <motion.div 
                  className="w-full"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="aspect-square w-full overflow-hidden rounded-lg">
                    <img 
                      src={slide.image} 
                      alt={slide.title} 
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <motion.div 
                    className="p-3 sm:p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                  >
                    <span className="text-xs sm:text-sm text-orange-500">{slide.caseTitle}</span>
                    <h3 className="text-lg sm:text-xl font-semibold mt-1">{slide.title}</h3>
                    <p className="mt-2 text-xs sm:text-sm text-gray-600 border-l-2 border-gray-300 pl-3 sm:pl-4 line-clamp-3">{slide.text}</p>
                  </motion.div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
}