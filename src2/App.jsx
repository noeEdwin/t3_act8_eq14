import { useState } from 'react'
import DashboardPage from './pages/DashboardPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import { loginUser } from './services/authService.js'
import './App.css'

function App() {
  const [currentUser, setCurrentUser] = useState(null)

  const handleLogin = async ({ identifier, password }) => {
    const user = await loginUser({ identifier, password })

    setCurrentUser({
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      image: user.image,
      email: user.email,
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
