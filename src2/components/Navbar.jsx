function Navbar({ user, onLogout }) {
  const fullName = `${user.firstName} ${user.lastName}`.trim()

  return (
    <header className="navbar">
      <div className="navbar-search">
        <span className="material-symbols-outlined">search</span>
        <input type="text" placeholder="Buscar productos..." />
      </div>

      <div className="navbar-actions">
        <button type="button" className="navbar-icon-button">
          <span className="material-symbols-outlined">notifications</span>
          <span className="navbar-dot"></span>
        </button>
        <button type="button" className="navbar-icon-button">
          <span className="material-symbols-outlined">help</span>
        </button>
        <div className="navbar-separator"></div>
        <div className="navbar-user">
          <div className="navbar-user-copy">
            <strong>{fullName}</strong>
            <p className="navbar-username">@{user.username}</p>
          </div>
          {user.image ? (
            <img className="avatar-image" src={user.image} alt={fullName} />
          ) : (
            <div className="avatar-placeholder" aria-hidden="true">
              {user.firstName?.charAt(0) || 'U'}
            </div>
          )}
        </div>
        <button type="button" className="secondary-button" onClick={onLogout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  )
}

export default Navbar
