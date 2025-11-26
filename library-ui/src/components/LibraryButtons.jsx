import React from 'react'
import './LibraryButtons.css'

const LibraryButtons = ({ onLanguageSelect }) => {
  const handleClick = (language) => {
    if (onLanguageSelect) {
      onLanguageSelect(language)
    }
  }

  return (
    <div className="library-buttons-container">
      <div className="buttons-grid">
        {/* Finnish Button */}
        <button
          className="library-button finnish-button"
          onClick={() => handleClick('Finnish')}
          aria-label="Valitse suomi"
        >
          <span className="button-text">KIRJASTO</span>
        </button>

        {/* English Button */}
        <button
          className="library-button english-button"
          onClick={() => handleClick('English')}
          aria-label="Select English"
        >
          <span className="button-text">LIBRARY</span>
        </button>
      </div>
    </div>
  )
}

export default LibraryButtons
