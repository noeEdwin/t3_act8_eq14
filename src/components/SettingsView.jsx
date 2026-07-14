import BusinessInfoSection from './settings/BusinessInfoSection.jsx'
import CatalogSettingsSection from './settings/CatalogSettingsSection.jsx'
import InterfacePreferencesSection from './settings/InterfacePreferencesSection.jsx'
import SettingsHero from './settings/SettingsHero.jsx'

function SettingsView() {
  return (
    <main className="catalog-view settings-view">
      <div className="dashboard-header">
        <div>
          <p className="section-kicker">AURAHOGAR</p>
          <h2 className="dashboard-title">Configuracion</h2>
        </div>
        <button type="button" className="dashboard-cta cursor-pointer">
          <span className="material-symbols-outlined">tune</span>
          <span>Guardar cambios</span>
        </button>
      </div>

      <SettingsHero />

      <section className="settings-grid">
        <BusinessInfoSection />
        <InterfacePreferencesSection />
        <CatalogSettingsSection />
      </section>
    </main>
  )
}

export default SettingsView
