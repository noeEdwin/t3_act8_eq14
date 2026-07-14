import SettingsCard from './SettingsCard.jsx'

function CatalogSettingsSection() {
  return (
    <SettingsCard
      eyebrow="Catalogo"
      title="Parametros operativos"
      chip="Datos"
      className="settings-card-wide-layout"
    >
      <div className="settings-form-grid">
        <div className="settings-field">
          <label htmlFor="settings-page-size">Registros por pagina</label>
          <select id="settings-page-size" defaultValue="20">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="40">40</option>
            <option value="50">50</option>
          </select>
        </div>
        <div className="settings-field">
          <label htmlFor="settings-stock-threshold">Umbral de stock bajo</label>
          <input id="settings-stock-threshold" type="number" defaultValue="15" />
        </div>
        <div className="settings-field settings-field-full">
          <label htmlFor="settings-notes">Notas internas del modulo</label>
          <textarea
            id="settings-notes"
            rows="4"
            defaultValue="Mantener revisiones semanales de inventario, actualizar categorias de temporada y revisar productos con baja rotacion."
          />
        </div>
      </div>
    </SettingsCard>
  )
}

export default CatalogSettingsSection
