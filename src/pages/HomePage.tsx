import React from 'react'
import { useTranslation } from 'react-i18next'
import Header from '../components/Header'
import useLanguage from '../hooks/useLanguage'

const HomePage: React.FC = () => {
  const { t } = useTranslation()
  const { changeLanguage, currentLanguage } = useLanguage()
  
  return (
    <div>
      <Header />
      <main>
        <div className="container-custom py-12">
          <div className="mb-6 text-right">
            <button 
              onClick={() => changeLanguage(currentLanguage === 'en' ? 'fr' : 'en')}
              className="px-4 py-2 bg-gray-100 rounded-md text-sm"
            >
              {currentLanguage === 'en' ? 'Français' : 'English'}
            </button>
          </div>
          
          <h1 className="text-3xl font-bold text-center mb-8">
            {t('homepage.welcome')}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">{t('homepage.feature1.title')}</h2>
              <p className="text-gray-600">{t('homepage.feature1.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">{t('homepage.feature2.title')}</h2>
              <p className="text-gray-600">{t('homepage.feature2.description')}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold mb-3">{t('homepage.feature3.title')}</h2>
              <p className="text-gray-600">{t('homepage.feature3.description')}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default HomePage 