import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@core/store/authStore'
import { getInitials } from '@core/utils/helpers'
import { LogOut, User, Home, Users } from 'lucide-react'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">⛪</span>
          <span className="navbar-title">FaithConnect</span>
        </Link>

        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search-input"
          />
        </div>

        <div className="navbar-menu">
          <Link to="/" className="navbar-menu-item">
            <Home size={20} />
            <span>Home</span>
          </Link>
          <Link to="/community" className="navbar-menu-item">
            <Users size={20} />
            <span>Communities</span>
          </Link>
          
          {user && (
            <div className="navbar-user">
              <Link to="/profile" className="navbar-user-link">
                {user.avatar ? (
                  <img
                    src={user.avatar}
                    alt={user.name}
                    className="navbar-avatar"
                  />
                ) : (
                  <div className="navbar-avatar-placeholder">
                    {getInitials(user.name)}
                  </div>
                )}
                <span className="navbar-username">{user.name}</span>
              </Link>
              <button onClick={handleLogout} className="navbar-logout">
                <LogOut size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar
