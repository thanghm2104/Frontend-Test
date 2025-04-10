import React from 'react';

interface ValueProps {
  icon: string;
  title: string;
  subtitle: string;
}

const ValueItem: React.FC<ValueProps> = ({ icon, title, subtitle }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-12 h-12 rounded-full bg-teal-500 flex items-center justify-center">
        <img src={icon} alt={title} className="w-6 h-6" />
      </div>
      <h3 className="mt-4 font-medium text-lg">{title}</h3>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </div>
  );
};

const ExperienceSection: React.FC = () => {
  const values = [
    {
      icon: "/public/icons/auth.svg",
      title: "Authenticité",
      subtitle: "Sous-titre"
    },
    {
      icon: "/public/icons/respect.svg",
      title: "Respect",
      subtitle: "Sous-titre"
    },
    {
      icon: "/public/icons/global.svg",
      title: "Diversité",
      subtitle: "Sous-titre"
    },
    {
      icon: "/public/icons/person.svg",
      title: "Personnalisation",
      subtitle: "Sous-titre"
    },
    {
      icon: "/public/icons/smile.svg",
      title: "Confort",
      subtitle: "Sous-titre"
    }
  ];

  return (
    <section className="max-w-screen-xl mx-auto py-16 px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Left Column - Text Content */}
        <div className="flex flex-col">
          <h2 className="text-[48px] font-[600] leading-[60px] text-[#F2542D] uppercase">
            <span className="text-[#F2542D]">DES EXPÉRIENCES INOUBLIABLES</span>{" "}
            <span className="text-[rgba(242,84,45,0.60)]">LOREM IPSUM TRUC</span>
          </h2>
          
          <div className="mt-8">
            <div className="w-16 h-px bg-gray-300 mb-6"></div>
            <h3 className="text-xl font-medium mb-4">À Propos De BASIC</h3>
            <p className="text-gray-600 leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            </p>
          </div>
        </div>

        {/* Right Column - Image */}
        <div className="flex justify-center items-center">
          <div className="rounded-lg overflow-hidden">
            <img 
              src="/public/images/ice-cream.png" 
              alt="Ice cream cone" 
              className="w-[503px] h-[574px] mx-auto"
            />
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mt-16">
        {values.map((value, index) => (
          <ValueItem
            key={index}
            icon={value.icon}
            title={value.title}
            subtitle={value.subtitle}
          />
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;