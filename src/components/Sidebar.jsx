const navItems = [
  { icon: 'inventory_2', label: 'Catalogo', view: 'catalog' },
  { icon: 'history', label: 'Historial', view: 'history' },
  { icon: 'settings', label: 'Configuracion', view: 'settings' },
]

function Sidebar({ activeView, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2 className="sidebar-title">AURA</h2>
        <p className="sidebar-label">Gestión</p>
      </div>

      <nav className="sidebar-menu">
        <ul className="sidebar-nav">
          {navItems.map((item) => (
            <li key={item.label}>
              <button
                type="button"
                className={`sidebar-link ${item.view === activeView ? 'sidebar-link-active' : ''}`}
                onClick={() => item.view && onNavigate(item.view)}
              >
                <span className="material-symbols-outlined">{item.icon}</span>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

export default Sidebar
