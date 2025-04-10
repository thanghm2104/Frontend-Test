import React from 'react'
import { useTranslation } from 'react-i18next'

const Header: React.FC = () => {
  const { t } = useTranslation()

  return (
    <header className="bg-white shadow-md">
      <div className="container-custom py-4 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-xl font-bold text-blue-600">FigmaLand</span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li><a href="#" className="hover:text-blue-600">{t('header.home')}</a></li>
            <li><a href="#" className="hover:text-blue-600">{t('header.features')}</a></li>
            <li><a href="#" className="hover:text-blue-600">{t('header.pricing')}</a></li>
            <li><a href="#" className="hover:text-blue-600">{t('header.contact')}</a></li>
          </ul>
        </nav>
        <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          {t('header.signUp')}
        </button>
      </div>
    </header>
  )
}

export default Header 