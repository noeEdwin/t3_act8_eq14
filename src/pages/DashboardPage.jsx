import { useState } from 'react'
import CatalogView from '../components/CatalogView.jsx'
import HistoryView from '../components/HistoryView.jsx'
import Navbar from '../components/Navbar.jsx'
import Sidebar from '../components/Sidebar.jsx'

function DashboardPage({ user, onLogout }) {
  const [activeView, setActiveView] = useState('catalog')

  return (
    <section className="dashboard-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="dashboard-content">
        <Navbar user={user} onLogout={onLogout} />
        {activeView === 'history' ? <HistoryView /> : <CatalogView />}
      </div>
    </section>
  )
}

export default DashboardPage
