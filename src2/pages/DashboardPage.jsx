import CatalogView from '../components/CatalogView.jsx'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

function DashboardPage({ user, onLogout }) {
  return (
    <section className="dashboard-layout">
      <Sidebar />
      <div className="dashboard-content">
        <Navbar user={user} onLogout={onLogout} />
        <CatalogView />
      </div>
    </section>
  )
}

export default DashboardPage
