import { Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import { LanguageProvider } from './context/LanguageContext'
import { useEffect } from 'react'
import { getLanguageFromURL } from './utils/languageUtils'
import { Toaster } from 'react-hot-toast'

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
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: 'rgba(0, 0, 0, 0.8)',
            color: '#fff',
            backdropFilter: 'blur(10px)',
          },
          success: {
            iconTheme: {
              primary: '#4CAF50',
              secondary: '#fff',
            },
          },
          error: {
            iconTheme: {
              primary: '#F2542D',
              secondary: '#fff',
            },
          },
          loading: {
            iconTheme: {
              primary: '#fff',
              secondary: 'rgba(0, 0, 0, 0.8)',
            },
          },
        }}
      />
      <LanguageProvider>
        <div className="app">
          <Routes>
            {/* Language-specific routes */}
            <Route path="/:lang" element={<HomePage />} />
            <Route path="/:lang/activities" element={<HomePage />} />
            <Route path="/:lang/contact" element={<HomePage />} />
            <Route path="/:lang/mountains" element={<HomePage />} />
            <Route path="/:lang/fishing" element={<HomePage />} />
            <Route path="/:lang/hunting" element={<HomePage />} />
            <Route path="/:lang/online-classes" element={<HomePage />} />
            <Route path="/:lang/ethical-hunting" element={<HomePage />} />
            <Route path="/:lang/gastronomic-experiences" element={<HomePage />} />
            
            {/* Redirect from / to language route if accessed directly */}
            <Route path="/" element={<Navigate to={`/${getLanguageFromURL()}`} replace />} />
            
            {/* Catch-all route to redirect to language route */}
            <Route path="*" element={<Navigate to={`/${getLanguageFromURL()}`} replace />} />
          </Routes>
        </div>
      </LanguageProvider>
    </>
  )
}

export default App
