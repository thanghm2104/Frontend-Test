import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { LanguageProvider } from './context/LanguageContext'
import { useEffect } from 'react'
import { getLanguageFromURL } from './utils/languageUtils'

function App() {
  // Redirect root to language-specific route on initial load
  useEffect(() => {
    const path = window.location.pathname
    // If at root path with no language prefix, redirect to preferred language
    if (path === '/') {
      // We could use browser preferred language: const preferredLang = navigator.language.startsWith('fr') ? 'fr' : 'en'
      // But for simplicity, let's default to 'en'
      window.history.replaceState({}, '', '/en')
    }
  }, [])

  return (
    <LanguageProvider>
      <div className="app">
        <Routes>
          {/* Language-specific routes */}
          <Route path="/:lang" element={<HomePage />} />
          <Route path="/:lang/activities" element={<HomePage />} />
          <Route path="/:lang/contact" element={<HomePage />} />
          
          {/* Redirect from / to language route if accessed directly */}
          <Route path="/" element={<Navigate to={`/${getLanguageFromURL()}`} replace />} />
          
          {/* Catch-all route to redirect to language route */}
          <Route path="*" element={<Navigate to={`/${getLanguageFromURL()}`} replace />} />
        </Routes>
      </div>
    </LanguageProvider>
  )
}

export default App
