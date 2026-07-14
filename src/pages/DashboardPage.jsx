import { useState } from 'react'
import CatalogView from '../components/CatalogView.jsx'
import HistoryView from '../components/HistoryView.jsx'
import Navbar from '../components/Navbar.jsx'
import SettingsView from '../components/SettingsView.jsx'
import Sidebar from '../components/Sidebar.jsx'

function DashboardPage({ user, onLogout }) {
  const [activeView, setActiveView] = useState('catalog')

  const renderActiveView = () => {
    if (activeView === 'history') {
      return <HistoryView />
    }

    if (activeView === 'settings') {
      return <SettingsView />
    }

    return <CatalogView />
  }

  return (
    <section className="dashboard-layout">
      <Sidebar activeView={activeView} onNavigate={setActiveView} />
      <div className="dashboard-content">
        <Navbar user={user} onLogout={onLogout} />
        {renderActiveView()}
      </div>
    </section>
  )
}

export default DashboardPage
