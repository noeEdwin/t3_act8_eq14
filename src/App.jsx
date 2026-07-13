import { useState } from 'react'
import LoginPage from './pages/LoginPage.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = () => {
    setCurrentUser({
      firstName: 'Edwin',
      lastName: 'Chavez',
      username: 'edwin',
      image: '',
    })
  }

  const handleLogout = () => {
    setCurrentUser(null)
  }

  return (
    <main className="app-shell">
      {currentUser ? (
        <DashboardPage user={currentUser} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} />
      )}
    </main>
  )
}

export default App
