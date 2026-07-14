import SettingsCard from './SettingsCard.jsx'

function BusinessInfoSection() {
  return (
    <SettingsCard eyebrow="Perfil" title="Informacion del negocio" chip="Visual">
      <div className="settings-form-grid">
        <div className="settings-field">
          <label htmlFor="settings-business-name">Nombre comercial</label>
          <input id="settings-business-name" type="text" defaultValue="Aura Hogar Studio" />
        </div>
        <div className="settings-field">
          <label htmlFor="settings-business-email">Correo de contacto</label>
          <input
            id="settings-business-email"
            type="email"
            defaultValue="contacto@aurahogar.mx"
          />
        </div>
        <div className="settings-field">
          <label htmlFor="settings-business-phone">Telefono</label>
          <input id="settings-business-phone" type="text" defaultValue="+52 55 1234 5678" />
        </div>
        <div className="settings-field">
          <label htmlFor="settings-business-site">Sitio o dominio</label>
          <input id="settings-business-site" type="text" defaultValue="aurahogar.mx" />
        </div>
        <div className="settings-field settings-field-full">
          <label htmlFor="settings-business-message">Mensaje institucional</label>
          <textarea
            id="settings-business-message"
            rows="4"
            defaultValue="Aura Hogar centraliza catalogo, historial y ajustes operativos en una sola experiencia interna."
          />
        </div>
      </div>
    </SettingsCard>
  )
}

export default BusinessInfoSection
