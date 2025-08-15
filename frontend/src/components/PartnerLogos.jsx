import React from 'react';
import { useAppContext } from '../context/AppContext';

// You'll need to add these logo images to your assets folder
import digitalIndiaLogo from '../assets/logos/digitalIndiaLogo.png';
import pmayLogo from '../assets/logos/PMAY.png';
import nsdcLogo from '../assets/logos/nsdc.png';
import ayushmanLogo from '../assets/logos/ayushmanLogo.png';
import skillIndiaLogo from '../assets/logos/skillIndiaLogo.png';
import pmkisanLogo from '../assets/logos/pmkisanLogo.png';

const PartnerLogos = () => {
  const { language, translations } = useAppContext();
  
  // Return null if translations are not loaded yet
  if (!translations) return null;
  
  // Get translations for the current language
  const t = translations[language];
  const logos = [
    { src: digitalIndiaLogo, alt: 'Digital India' },
    { src: pmayLogo, alt: 'Pradhan Mantri Awas Yojana' },
    { src: nsdcLogo, alt: 'National Skill Development Corporation' },
    { src: ayushmanLogo, alt: 'Ayushman Bharat' },
    { src: skillIndiaLogo, alt: 'Skill India' },
    { src: pmkisanLogo, alt: 'PM Kisan' },
  ];

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <h2 className="text-center text-gray-500 text-sm font-medium uppercase tracking-wider mb-8">
          {t?.partneredWith || "Partnered with Government Schemes & Ministries"}
        </h2>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
          {logos.map((logo, index) => (
            <div key={index} className="flex justify-center">
              <img 
                src={logo.src} 
                alt={logo.alt} 
                className="h-22 w-auto opacity-60 grayscale hover:grayscale-0 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerLogos;