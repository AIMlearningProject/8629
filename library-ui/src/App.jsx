import { useState } from 'react'
import LibraryButtons from './components/LibraryButtons'
import ProjectTracker from './pages/ProjectTracker'
import './App.css'

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null)

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language)
  }

  const handleBack = () => {
    setSelectedLanguage(null)
  }

  if (selectedLanguage) {
    return (
      <div className="app">
        <button className="back-button" onClick={handleBack}>
          ← {selectedLanguage === 'Finnish' ? 'Takaisin' : 'Back'}
        </button>
        <ProjectTracker language={selectedLanguage} />
      </div>
    )
  }

  return (
    <div className="app">
      <div className="landing-container">
        <header className="landing-header">
          <div className="logo-section">
            <img src="/centria-logo.png" alt="Centria" className="centria-logo" />
            <h1>Centria 3D</h1>
            <p className="tagline">Automated 3D Model Generation System</p>
            <p className="project-code">Project Code: 8629</p>
          </div>
        </header>

        <main className="landing-main">
          <div className="language-prompt">
            <h2>Select Language / Valitse kieli</h2>
            <p>Choose your preferred language to continue</p>
          </div>
          <LibraryButtons onLanguageSelect={handleLanguageSelect} />
        </main>

        <footer className="landing-footer">
          <p>Centria University of Applied Sciences</p>
        </footer>
      </div>
    </div>
  )
}

export default App
