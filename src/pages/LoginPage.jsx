function LoginPage({ onLogin }) {
  return (
    <section className="login-page">
      <header className="login-header">
        <div>
          <p className="brand-wordmark">AURA HOGAR</p>
        </div>
        <div className="login-header-actions">
          <span className="header-muted">ESPAÑOL</span>
          <span className="material-symbols-outlined">help_outline</span>
        </div>
      </header>

      <div className="login-glow login-glow-right" aria-hidden="true"></div>
      <div className="login-glow login-glow-left" aria-hidden="true"></div>

      <main className="login-main">
        <section className="login-copy-block">
          <h1 className="login-title">
            Transforma tu hogar <span>en un comodo</span> lugar.
          </h1>
          <p className="login-description">
            Explora nuestra colección de muebles de interior y cientos de accesorios.
          </p>
          <div className="login-visual">
            <img
              src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80"
              alt="Interior minimalista"
            />
          </div>
        </section>

        <section className="login-form-wrap">
          <div className="login-card">
            <div className="login-card-copy">
              <h2>Bienvenido</h2>
              <p>Ingresa tus credenciales para continuar.</p>
            </div>

            <form className="login-form" onSubmit={(event) => event.preventDefault()}>
              <div className="field-group">
                <label htmlFor="email">Correo Electronico</label>
                <input id="email" type="email" placeholder="aura@collective.com" />
              </div>

              <div className="field-group">
                <label htmlFor="password">Contrasena</label>
                <input id="password" type="password" placeholder="••••••••" />
                <div className="field-actions">
                  <button type="button" className="text-button">
                    Olvidaste tu contrasena?
                  </button>
                </div>
              </div>

              <button type="button" className="primary-button" onClick={onLogin}>
                Entrar
              </button>
            </form>
          </div>
        </section>
      </main>

      <footer className="login-footer">
        <p>© 2026 AURA HOGAR. TODOS LOS DERECHOS RESERVADOS.</p>
        <div className="login-footer-links">
          <button type="button" className="footer-link">
            Privacidad
          </button>
          <button type="button" className="footer-link">
            Terminos
          </button>
          <button type="button" className="footer-link">
            Soporte
          </button>
        </div>
      </footer>
    </section>
  )
}

export default LoginPage
