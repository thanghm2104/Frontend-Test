import { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function FoodCarousel() {
  const [slides, setSlides] = useState([
    {
      id: 1,
      image: "/public/images/food1.png",
      caseTitle: "Case title",
      title: "Case sous-titre",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard..."
    },
    {
      id: 2,
      image: "/public/images/food2.png",
      caseTitle: "Case title",
      title: "Case sous-titre",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard..."
    },
    {
      id: 3,
      image: "/public/images/food3.png",
      caseTitle: "Case title",
      title: "Case sous-titre",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard..."
    },
    {
      id: 4,
      image: "/public/images/food4.png",
      caseTitle: "Case title",
      title: "Case sous-titre",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard..."
    },
    {
      id: 5,
      image: "/public/images/food1.png",
      caseTitle: "Case title",
      title: "Case sous-titre",
      text: "Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem ipsum has been the industry standard..."
    }
  ]);

  return (
  <>
    <div className="max-w-screen-xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-orange-500">TITRE</h2>
        <a href="#" className="text-gray-600 flex items-center underline transition-all duration-300 hover:text-orange-500 transform hover:scale-105">
          En Savoir Plus
          <img src="/public/icons/ArrowRight.svg" alt="arrow-right" className="ml-2 transition-transform duration-300 transform hover:translate-x-1 hover:rotate-45" />
        </a>
      </div>

    
      

    </div>
    <div >
      <Swiper
      spaceBetween={-450}
      slidesPerView={4}
      navigation={false}
      pagination={{ clickable: true }}
      centeredSlides={true}
      breakpoints={{
        640: {
          slidesPerView: 2,
        },
        768: {
          slidesPerView: 3,
        },
        1024: {
          slidesPerView: 4,
        },
      }}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.id}>
          <div className="w-[340px]">
            <img 
              src={slide.image} 
              alt={slide.title} 
              className="w-[340px] h-[340px] object-cover"
            />
            <div className="p-4">
              <span className="text-sm text-orange-500">{slide.caseTitle}</span>
              <h3 className="text-xl font-semibold mt-1">{slide.title}</h3>
              <p className="mt-2 text-sm text-gray-600 border-l-2 border-gray-300 pl-4">{slide.text}</p>
             
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
    </div>
    </>
  );
}