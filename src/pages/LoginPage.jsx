import { useState } from 'react'

function LoginPage({ onLogin }) {
  const [formValues, setFormValues] = useState({
    identifier: '',
    password: '',
  })
  const [fieldErrors, setFieldErrors] = useState({})
  const [submitError, setSubmitError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }))

    if (fieldErrors[name]) {
      setFieldErrors((currentErrors) => {
        const nextErrors = { ...currentErrors }
        delete nextErrors[name]
        return nextErrors
      })
    }

    if (submitError) {
      setSubmitError('')
    }
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    const nextFieldErrors = {}

    if (!formValues.identifier.trim()) {
      nextFieldErrors.identifier = 'Ingresa un usuario o correo.'
    }

    if (!formValues.password.trim()) {
      nextFieldErrors.password = 'Ingresa una contraseña.'
    }

    if (Object.keys(nextFieldErrors).length > 0) {
      setFieldErrors(nextFieldErrors)
      return
    }

    setIsSubmitting(true)
    setSubmitError('')

    try {
      await onLogin({
        identifier: formValues.identifier,
        password: formValues.password,
      })
    } catch {
      setSubmitError('Usuario o contraseña incorrectos')
    } finally {
      setIsSubmitting(false)
    }
  }

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

            <form className="login-form" onSubmit={handleSubmit}>
              <div className="field-group">
                <label htmlFor="identifier">Usuario o correo</label>
                <input
                  id="identifier"
                  name="identifier"
                  type="text"
                  placeholder="michaelw"
                  value={formValues.identifier}
                  onChange={handleChange}
                  autoComplete="username"
                />
                {fieldErrors.identifier ? (
                  <p className="field-error">{fieldErrors.identifier}</p>
                ) : null}
              </div>

              <div className="field-group">
                <label htmlFor="password">Contraseña</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="michaelwpass"
                  value={formValues.password}
                  onChange={handleChange}
                  autoComplete="current-password"
                />
                {fieldErrors.password ? (
                  <p className="field-error">{fieldErrors.password}</p>
                ) : null}
                <div className="field-actions">
                  <button type="button" className="text-button">
                    ¿Olvidaste tu contraseña?
                  </button>
                </div>
              </div>

              {submitError ? <p className="submit-error">{submitError}</p> : null}

              <button type="submit" className="primary-button" disabled={isSubmitting}>
                {isSubmitting ? 'Ingresando...' : 'Entrar'}
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
