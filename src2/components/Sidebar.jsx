const navItems = [
  { icon: 'inventory_2', label: 'Catalogo' },
  { icon: 'history', label: 'Historial' },
  { icon: 'settings', label: 'Configuracion' },
]

function Sidebar() {
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
                className={`sidebar-link ${item.active ? 'sidebar-link-active' : ''}`}
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
