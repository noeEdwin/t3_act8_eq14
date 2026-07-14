function SettingsCard({ eyebrow, title, chip, chipClassName = '', className = '', children }) {
  return (
    <article className={`settings-card ${className}`.trim()}>
      <div className="settings-card-header">
        <div>
          <p className="section-kicker">{eyebrow}</p>
          <h3 className="settings-card-title">{title}</h3>
        </div>
        <span className={`settings-chip ${chipClassName}`.trim()}>{chip}</span>
      </div>

      {children}
    </article>
  )
}

export default SettingsCard
