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

      <section className="settings-hero">
        <p>
          Centro visual de preferencias del sistema. Esta vista muestra una propuesta de
          configuracion general para negocio, interfaz y catalogo.
        </p>
      </section>

      <section className="settings-grid">
        <article className="settings-card">
          <div className="settings-card-header">
            <div>
              <p className="section-kicker">Perfil</p>
              <h3 className="settings-card-title">Informacion del negocio</h3>
            </div>
            <span className="settings-chip">Visual</span>
          </div>

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
        </article>

        <article className="settings-card">
          <div className="settings-card-header">
            <div>
              <p className="section-kicker">Interfaz</p>
              <h3 className="settings-card-title">Preferencias de experiencia</h3>
            </div>
            <span className="settings-chip settings-chip-soft">UI</span>
          </div>

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
        </article>

        <article className="settings-card settings-card-wide-layout">
          <div className="settings-card-header">
            <div>
              <p className="section-kicker">Catalogo</p>
              <h3 className="settings-card-title">Parametros operativos</h3>
            </div>
            <span className="settings-chip">Datos</span>
          </div>

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
        </article>

      </section>
    </main>
  )
}

export default SettingsView
