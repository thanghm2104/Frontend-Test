import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import useLanguage from "../hooks/useLanguage";

interface TabItem {
  id: number;
  icon: React.ReactNode;
  title: string;
  path: string;
}

const HeroContent: React.FC = () => {
  const { currentLanguage, pageContent } = useLanguage();
  const [hoveredTab, setHoveredTab] = useState<number | null>(null);

  const tabs: TabItem[] = [
    {
      id: 0,
      icon: (
        <img
          src="/icons/Mountains.svg"
          alt="Mountains"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]"
        />
      ),
      title: pageContent?.banner_menu?.[0] || "",
      path: `/${currentLanguage}/mountains`,
    },
    {
      id: 1,
      icon: (
        <img
          src="/icons/Fishing.svg"
          alt="Fishing"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]"
        />
      ),
      title: pageContent?.banner_menu?.[1] || "",
      path: `/${currentLanguage}/fishing`,
    },
    {
      id: 2,
      icon: (
        <img
          src="/icons/Crosshair.svg"
          alt="Hunting"
          className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 transition-all duration-300 group-hover:brightness-[2] group-hover:[filter:invert(36%)_sepia(74%)_saturate(1519%)_hue-rotate(341deg)_brightness(99%)_contrast(88%)]"
        />
      ),
      title: pageContent?.banner_menu?.[2] || "",
      path: `/${currentLanguage}/hunting`,
    },
  ];

  return (
    <div className="container mx-auto px-2 sm:px-4">
      <div className="flex justify-between items-stretch border-t border-white/20">
        {tabs.map((tab) => (
          <Link
            key={tab.id}
            to={tab.path}
            className="group relative flex-1 min-w-0"
            onMouseEnter={() => setHoveredTab(tab.id)}
            onMouseLeave={() => setHoveredTab(null)}
          >
            <div className="relative flex flex-col items-center py-3 px-1 sm:py-4 sm:px-3 md:py-6 md:px-4">
              {/* Glowing border effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[2px] bg-white"
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{
                  scaleX: hoveredTab === tab.id ? 1 : 0,
                  opacity: hoveredTab === tab.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Glow effect */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-white/20 to-transparent"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: hoveredTab === tab.id ? 1 : 0,
                }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon */}
              <motion.div
                className="text-white mb-1 sm:mb-1.5 md:mb-2"
                whileHover={{ scale: 1.1 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                {tab.icon}
              </motion.div>

              {/* Title with slide-up animation */}
              <motion.div
                className="h-4 sm:h-5 md:h-6 overflow-hidden"
                initial={false}
              >
                <motion.span
                  className="block text-white text-[10px] sm:text-sm md:text-base font-semibold whitespace-nowrap text-center px-1"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{
                    y: hoveredTab === tab.id ? 0 : 20,
                    opacity: hoveredTab === tab.id ? 1 : 0,
                  }}
                  transition={{
                    duration: 0.3,
                    ease: "easeOut",
                  }}
                >
                  {tab.title}
                </motion.span>
              </motion.div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HeroContent;
