import React from 'react';

interface GalleryItemProps {
  image: string;
  author: string;
}

const GalleryItem: React.FC<GalleryItemProps> = ({ image, author }) => {
  return (
    <div className="relative rounded-lg overflow-hidden">
      <img src={image} alt={author} className="w-full aspect-square object-cover" />
      <div className="absolute bottom-0 left-0 right-0 bg-opacity-70 bg-gray-700 px-4 py-2 flex justify-between items-center text-white">
        <div className="flex items-center">
          <img src="/public/icons/mdi_instagram.svg" alt="user" className="w-[28px] h-[28px]" />
          <span className="text-lg font-medium ml-2">
            {author}
          </span>
        </div>
        <div className="hover:bg-black hover:opacity-50 rounded-full p-1">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 transform rotate-[320deg]" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const ImmortalizeSection: React.FC = () => {
  const galleryItems = [
    {
      image: "/public/images/ImmortalizeSection1.png",
      author: "Anthony Durand"
    },
    {
      image: "/public/images/ImmortalizeSection2.png",
      author: "Anthony Durand"
    },
    {
      image: "/public/images/ImmortalizeSection3.png",
      author: "Anthony Durand"
    },
    {
      image: "/public/images/ImmortalizeSection4.png",
      author: "Anthony Durand"
    }
  ];

  return (
    <section className="py-16 bg-teal-50">
      <div className=" max-w-screen-xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        {/* Left Column - Text */}
        <div className="pr-0 lg:pr-12">
          <p className="text-[rgba(86,44,44,0.80)] font-poppins text-[18px] font-normal leading-[26px] mb-8">
            Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially.
          </p>
        </div>
        
        {/* Right Column - Heading */}
        <div>
          <h2 className="text-[40px] font-[600] text-[var(--3, #562C2C)] font-poppins leading-[54px] uppercase mb-2">
            IMMORTALISEZ DES MOMENTS INOUBLIABLES AVEC <span className="text-[#F2542D]">#BASIC</span>
          </h2>
        </div>
      </div>

      {/* Main Feature Image Card */}
      <div 
        className="relative mb-8 max-w-screen-xl mx-auto"
        style={{
          backgroundImage: 'url("/public/images/ImmortalizeSectionbg.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          padding: '52px 105px',
          borderRadius: '20px'
        }}
      >
        <div className="bg-white rounded-lg overflow-hidden shadow-sm p-4">
          <img 
            src="/public/images/ImmortalizeSectionbg.png" 
            alt="Beautiful fruit platter" 
            className="w-full object-cover max-h-96"
          />
          <div className="p-6 border-t border-gray-100">
            <div className="flex justify-between items-center">
              <h3 className="text-[24px] font-[600] text-[#000] font-poppins leading-normal tracking-[0.24px]">La famille</h3>
              <span className="text-sm text-gray-500 flex items-center justify-center gap-2 border border-[rgba(102, 102, 102, 0.10)] rounded-[100px] p-[6px_16px]">
                24 Sep 2024
              </span>
            </div>
            <p className="mt-2" style={{ color: '#666', fontFamily: 'Poppins', fontSize: '18px', fontStyle: 'normal', fontWeight: 400, lineHeight: '24px', letterSpacing: '-0.18px' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua
            </p>
          </div>
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="max-w-screen-xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        {galleryItems.map((item, index) => (
          <GalleryItem 
            key={index}
            image={item.image}
            author={item.author}
          />
        ))}
      </div>

      {/* Bottom Text */}
      <div className="text-center" style={{ color: '#666', fontFamily: 'Poppins', fontSize: '24px', fontStyle: 'normal', fontWeight: 400, lineHeight: 'normal', letterSpacing: '-0.24px' }}>
        <p>
          Consultez @<span style={{ color: '#F2542D', fontFamily: 'Poppins', fontSize: '24px', fontStyle: 'normal', fontWeight: 700, lineHeight: 'normal', letterSpacing: '-0.24px' }}>#BASIC</span> et #BASIC pour découvrir les expériences inoubliables des pourvoiries et activités BASIC.
        </p>
      </div>
    </section>
  );
};

export default ImmortalizeSection;