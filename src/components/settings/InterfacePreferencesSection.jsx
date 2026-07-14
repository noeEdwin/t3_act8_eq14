import SettingsCard from './SettingsCard.jsx'

function InterfacePreferencesSection() {
  return (
    <SettingsCard
      eyebrow="Interfaz"
      title="Preferencias de experiencia"
      chip="UI"
      chipClassName="settings-chip-soft"
    >
      <div className="settings-form-grid">
        <div className="settings-field">
          <label htmlFor="settings-language">Idioma</label>
          <select id="settings-language" defaultValue="es">
            <option value="es">Espanol</option>
            <option value="en">English</option>
          </select>
        </div>
        <div className="settings-field">
          <label htmlFor="settings-density">Densidad visual</label>
          <select id="settings-density" defaultValue="comfortable">
            <option value="compact">Compacta</option>
            <option value="comfortable">Comoda</option>
            <option value="wide">Amplia</option>
          </select>
        </div>
        <div className="settings-field">
          <label htmlFor="settings-home-view">Vista inicial</label>
          <select id="settings-home-view" defaultValue="catalog">
            <option value="catalog">Catalogo</option>
            <option value="history">Historial</option>
            <option value="settings">Configuracion</option>
          </select>
        </div>
        <div className="settings-field">
          <label htmlFor="settings-theme">Tema visual</label>
          <select id="settings-theme" defaultValue="warm">
            <option value="warm">Warm Editorial</option>
            <option value="neutral">Neutral Studio</option>
            <option value="dark">Dark Console</option>
          </select>
        </div>
      </div>
    </SettingsCard>
  )
}

export default InterfacePreferencesSection
