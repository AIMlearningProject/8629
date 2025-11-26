import React, { useState } from 'react'
import Logo3D from '../components/Logo3D'
import STLViewer from '../components/STLViewer'
import './ProjectTracker.css'

const ProjectTracker = ({ language }) => {
  const [activeView, setActiveView] = useState('info')
  const [selectedModel, setSelectedModel] = useState(null)

  const translations = {
    Finnish: {
      title: 'Centria 3D -tulostusprojekti',
      subtitle: 'Automaattinen 3D-mallinnusjärjestelmä',
      projectInfo: 'Projektin tiedot',
      modelLibrary: 'Mallisto',
      resources: 'Resurssit',
      projectInfoTitle: 'Centria-logotuotteet',
      projectDesc: 'Automaattinen 3D-mallinnusjärjestelmä Centria-logon tuotteille. Luo 12 tulostusvalmiista mallia yhdellä komennolla.',
      variantsLabel: 'Tuotevaihtoehdot',
      variantList: ['Nasta (3.5mm)', 'Magneetti (4.5mm)', 'Avaimenperä (5.5mm)', 'Kakkumuotti (10mm)'],
      languages: 'Logoversiot',
      languageList: ['Suomi (FI)', 'Englanti (EN)', 'C-kirjain'],
      totalModels: 'Yhteensä 12 mallia',
      quickStart: 'Pika-aloitus',
      quickStartDesc: 'Luo kaikki mallit yhdellä komennolla:',
      command: 'blender --background --python batch_process_all.py',
      resourcesTitle: 'Projektiresurssit',
      blenderScripts: 'Blender-automaatio',
      pythonScripts: 'Python-työkalut',
      documentation: 'Dokumentaatio',
      delivery: 'Toimitus',
      viewDocs: 'Avaa dokumentaatio'
    },
    English: {
      title: 'Centria 3D Print Project',
      subtitle: 'Automated 3D Modeling System',
      projectInfo: 'Project Info',
      modelLibrary: 'Model Library',
      resources: 'Resources',
      projectInfoTitle: 'Centria Logo Products',
      projectDesc: 'Automated 3D modeling system for Centria logo products. Generate 12 print-ready models with one command.',
      variantsLabel: 'Product Variants',
      variantList: ['Pin (3.5mm)', 'Magnet (4.5mm)', 'Keyring (5.5mm)', 'Cake Mould (10mm)'],
      languages: 'Logo Versions',
      languageList: ['Finnish (FI)', 'English (EN)', 'C Letter'],
      totalModels: 'Total 12 models',
      quickStart: 'Quick Start',
      quickStartDesc: 'Generate all models with one command:',
      command: 'blender --background --python batch_process_all.py',
      resourcesTitle: 'Project Resources',
      blenderScripts: 'Blender Automation',
      pythonScripts: 'Python Tools',
      documentation: 'Documentation',
      delivery: 'Delivery',
      viewDocs: 'View Documentation'
    }
  }

  const t = translations[language] || translations.English

  const resources = [
    {
      title: t.blenderScripts,
      items: [
        'import_svg.py',
        'create_variants.py',
        'export_stl.py',
        'render_previews.py'
      ],
      path: '../Centria_3D_Logo_Project/scripts/blender/'
    },
    {
      title: t.pythonScripts,
      items: [
        'file_organizer.py',
        'svg_processor.py'
      ],
      path: '../Centria_3D_Logo_Project/scripts/automation/'
    },
    {
      title: t.documentation,
      items: [
        'Project README',
        'Documentation Template',
        'User Guide'
      ],
      path: '../Centria_3D_Logo_Project/'
    },
    {
      title: t.tracker,
      items: [
        'Interactive Progress Tracker'
      ],
      path: '../Centria_3D_Logo_Project/checklist/'
    }
  ]

  return (
    <div className="project-tracker">
      <div className="tracker-header">
        <h1>{t.title}</h1>
        <p>{t.subtitle}</p>
      </div>

      <div className="tracker-nav">
        <button
          className={`nav-btn ${activeView === 'info' ? 'active' : ''}`}
          onClick={() => setActiveView('info')}
        >
          {t.projectInfo}
        </button>
        <button
          className={`nav-btn ${activeView === 'library' ? 'active' : ''}`}
          onClick={() => setActiveView('library')}
        >
          {t.modelLibrary}
        </button>
        <button
          className={`nav-btn ${activeView === 'resources' ? 'active' : ''}`}
          onClick={() => setActiveView('resources')}
        >
          {t.resources}
        </button>
      </div>

      <div className="tracker-content">

        {activeView === 'info' && (
          <div className="info-view">
            <Logo3D />

            <div className="info-card" style={{ marginTop: 'var(--space-8)' }}>
              <h2>{t.projectInfoTitle}</h2>
              <p>{t.projectDesc}</p>

              <div className="quick-stats" style={{ margin: 'var(--space-6) 0' }}>
                <div className="stat-box">
                  <div className="stat-number">12</div>
                  <div className="stat-label">{t.totalModels}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">4</div>
                  <div className="stat-label">{t.variantsLabel}</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">3</div>
                  <div className="stat-label">{t.languages}</div>
                </div>
              </div>

              <div className="info-section">
                <h3>{t.quickStart}</h3>
                <p style={{ color: 'rgba(255,255,255,0.8)', marginBottom: 'var(--space-3)' }}>
                  {t.quickStartDesc}
                </p>
                <div className="command-box">
                  <code>{t.command}</code>
                </div>
              </div>

              <div className="info-section">
                <h3>{t.variantsLabel}</h3>
                <ul className="info-list">
                  {t.variantList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>

              <div className="info-section">
                <h3>{t.languages}</h3>
                <ul className="info-list">
                  {t.languageList.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeView === 'library' && (
          <div className="library-view">
            <h2 style={{ color: '#ffffff', marginBottom: 'var(--space-6)', textAlign: 'center' }}>
              {language === 'Finnish' ? '3D-mallisto - 12 tulostusvalmiista mallia' : '3D Model Library - 12 Print-Ready Models'}
            </h2>

            {selectedModel && (
              <div style={{ marginBottom: 'var(--space-8)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-4)' }}>
                  <h3 style={{ color: '#fff', margin: 0 }}>{selectedModel.name}</h3>
                  <button
                    onClick={() => setSelectedModel(null)}
                    style={{
                      background: 'rgba(227, 30, 76, 0.2)',
                      border: '1px solid rgba(227, 30, 76, 0.5)',
                      color: '#fff',
                      padding: '8px 16px',
                      borderRadius: '8px',
                      cursor: 'pointer'
                    }}
                  >
                    {language === 'Finnish' ? 'Sulje' : 'Close'}
                  </button>
                </div>
                <STLViewer
                  modelUrl={selectedModel.url}
                  height="500px"
                  modelColor="#e31e4c"
                />
                <div style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  background: 'rgba(0,0,0,0.3)',
                  borderRadius: '8px',
                  color: '#fff'
                }}>
                  <p><strong>{language === 'Finnish' ? 'Paksuus' : 'Thickness'}:</strong> {selectedModel.thickness}</p>
                  <p><strong>{language === 'Finnish' ? 'Tiedosto' : 'File'}:</strong> {selectedModel.file}</p>
                </div>
              </div>
            )}

            <div className="model-grid">
              {/* Finnish Variants */}
              <div className="model-category">
                <h3 className="category-title">Finnish / Suomi</h3>
                <div className="model-cards">
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'Finnish Pin',
                    url: '/models/Finnish/Centria_FI_pin.stl',
                    thickness: '3.5mm',
                    file: 'Centria_FI_pin.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">📌</div>
                    </div>
                    <div className="model-info">
                      <h4>Pin</h4>
                      <p>3.5mm thickness</p>
                      <span className="model-file">Centria_FI_pin.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'Finnish Magnet',
                    url: '/models/Finnish/Centria_FI_magnet.stl',
                    thickness: '4.5mm',
                    file: 'Centria_FI_magnet.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🧲</div>
                    </div>
                    <div className="model-info">
                      <h4>Magnet</h4>
                      <p>4.5mm thickness</p>
                      <span className="model-file">Centria_FI_magnet.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'Finnish Keyring',
                    url: '/models/Finnish/Centria_FI_keyring.stl',
                    thickness: '5.5mm',
                    file: 'Centria_FI_keyring.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🔑</div>
                    </div>
                    <div className="model-info">
                      <h4>Keyring</h4>
                      <p>5.5mm thickness</p>
                      <span className="model-file">Centria_FI_keyring.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'Finnish Cake Mould',
                    url: '/models/Finnish/Centria_FI_cake_mould.stl',
                    thickness: '10mm',
                    file: 'Centria_FI_cake_mould.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🍰</div>
                    </div>
                    <div className="model-info">
                      <h4>Cake Mould</h4>
                      <p>10mm height</p>
                      <span className="model-file">Centria_FI_cake_mould.stl</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* English Variants */}
              <div className="model-category">
                <h3 className="category-title">English</h3>
                <div className="model-cards">
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'English Pin',
                    url: '/models/English/Centria_EN_pin.stl',
                    thickness: '3.5mm',
                    file: 'Centria_EN_pin.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">📌</div>
                    </div>
                    <div className="model-info">
                      <h4>Pin</h4>
                      <p>3.5mm thickness</p>
                      <span className="model-file">Centria_EN_pin.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'English Magnet',
                    url: '/models/English/Centria_EN_magnet.stl',
                    thickness: '4.5mm',
                    file: 'Centria_EN_magnet.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🧲</div>
                    </div>
                    <div className="model-info">
                      <h4>Magnet</h4>
                      <p>4.5mm thickness</p>
                      <span className="model-file">Centria_EN_magnet.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'English Keyring',
                    url: '/models/English/Centria_EN_keyring.stl',
                    thickness: '5.5mm',
                    file: 'Centria_EN_keyring.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🔑</div>
                    </div>
                    <div className="model-info">
                      <h4>Keyring</h4>
                      <p>5.5mm thickness</p>
                      <span className="model-file">Centria_EN_keyring.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'English Cake Mould',
                    url: '/models/English/Centria_EN_cake_mould.stl',
                    thickness: '10mm',
                    file: 'Centria_EN_cake_mould.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🍰</div>
                    </div>
                    <div className="model-info">
                      <h4>Cake Mould</h4>
                      <p>10mm height</p>
                      <span className="model-file">Centria_EN_cake_mould.stl</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* C Letter Variants */}
              <div className="model-category">
                <h3 className="category-title">C Symbol / C-symboli</h3>
                <div className="model-cards">
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'C Letter Pin',
                    url: '/models/C_letter/Centria_C_pin.stl',
                    thickness: '3.5mm',
                    file: 'Centria_C_pin.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">📌</div>
                    </div>
                    <div className="model-info">
                      <h4>Pin</h4>
                      <p>3.5mm thickness</p>
                      <span className="model-file">Centria_C_pin.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'C Letter Magnet',
                    url: '/models/C_letter/Centria_C_magnet.stl',
                    thickness: '4.5mm',
                    file: 'Centria_C_magnet.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🧲</div>
                    </div>
                    <div className="model-info">
                      <h4>Magnet</h4>
                      <p>4.5mm thickness</p>
                      <span className="model-file">Centria_C_magnet.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'C Letter Keyring',
                    url: '/models/C_letter/Centria_C_keyring.stl',
                    thickness: '5.5mm',
                    file: 'Centria_C_keyring.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🔑</div>
                    </div>
                    <div className="model-info">
                      <h4>Keyring</h4>
                      <p>5.5mm thickness</p>
                      <span className="model-file">Centria_C_keyring.stl</span>
                    </div>
                  </div>
                  <div className="model-card" onClick={() => setSelectedModel({
                    name: 'C Letter Cake Mould',
                    url: '/models/C_letter/Centria_C_cake_mould.stl',
                    thickness: '10mm',
                    file: 'Centria_C_cake_mould.stl'
                  })}>
                    <div className="model-preview">
                      <div className="model-icon">🍰</div>
                    </div>
                    <div className="model-info">
                      <h4>Cake Mould</h4>
                      <p>10mm height</p>
                      <span className="model-file">Centria_C_cake_mould.stl</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeView === 'resources' && (
          <div className="resources-view">
            <h2>{t.resourcesTitle}</h2>
            <div className="resources-grid">
              {resources.map((resource, index) => (
                <div key={index} className="resource-card">
                  <h3>{resource.title}</h3>
                  <ul className="resource-list">
                    {resource.items.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                  <div className="resource-path">{resource.path}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProjectTracker
