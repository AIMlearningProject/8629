# Centria Library UI

A modern, bilingual library interface built with React and Vite. This application provides an intuitive language selection interface for library users.

## Features

- **Bilingual Interface** - Finnish (KIRJASTO) and English (LIBRARY) options
- **Modern Design** - Clean, accessible UI with smooth animations
- **Responsive** - Works seamlessly on desktop, tablet, and mobile devices
- **Accessible** - Built with WCAG accessibility guidelines in mind
- **Fast** - Powered by Vite for lightning-fast development and builds

## Preview

The interface displays two prominent buttons for language selection:
- **KIRJASTO** (Finnish)
- **LIBRARY** (English)

## Tech Stack

- **React 18.3** - UI library
- **Vite 5** - Build tool and dev server
- **CSS3** - Modern styling with CSS variables
- **ES6+** - Modern JavaScript

## Getting Started

### Prerequisites

- Node.js 16+ installed
- npm or yarn package manager

### Installation

```bash
# Navigate to the library-ui directory
cd library-ui

# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev

# The app will open at http://localhost:3000
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Project Structure

```
library-ui/
├── src/
│   ├── components/
│   │   ├── LibraryButtons.jsx      # Main button component
│   │   └── LibraryButtons.css      # Button styling
│   ├── App.jsx                     # Main app component
│   ├── App.css                     # App styling
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── public/                         # Static assets
├── index.html                      # HTML template
├── vite.config.js                  # Vite configuration
├── package.json                    # Dependencies
└── README.md                       # This file
```

## Component Overview

### LibraryButtons

The main component that renders the language selection buttons.

**Props:**
- `onLanguageSelect(language)` - Callback function called when a button is clicked

**Usage:**
```jsx
import LibraryButtons from './components/LibraryButtons'

function App() {
  const handleLanguageSelect = (language) => {
    console.log(`Selected: ${language}`)
  }

  return <LibraryButtons onLanguageSelect={handleLanguageSelect} />
}
```

## Customization

### Colors

Edit CSS variables in `src/index.css`:

```css
:root {
  --primary-color: #0066cc;
  --secondary-color: #004d99;
  --accent-color: #00a3e0;
  /* ... more variables */
}
```

### Button Text

Modify button labels in `src/components/LibraryButtons.jsx`:

```jsx
<span className="button-text">KIRJASTO</span>
<span className="button-text">LIBRARY</span>
```

### Layout

Adjust grid layout in `src/components/LibraryButtons.css`:

```css
.buttons-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--spacing-lg);
}
```

## Accessibility Features

- **Keyboard Navigation** - Full keyboard support
- **Focus Indicators** - Clear focus states for keyboard users
- **ARIA Labels** - Descriptive labels for screen readers
- **Reduced Motion** - Respects user's motion preferences
- **High Contrast** - Works well with high contrast mode

## Browser Support

- Chrome/Edge 90+
- Firefox 88+
- Safari 14+
- Opera 76+

## Performance

- **First Contentful Paint:** < 1s
- **Time to Interactive:** < 2s
- **Bundle Size:** ~50KB (gzipped)

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

[Specify your license]

## Contact

For questions or support, please contact [your-email@example.com]

---

Built with ❤️ for Centria University of Applied Sciences
