import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@core/store/authStore'
import { getInitials } from '@core/utils/helpers'
import { LogOut, User, Home, Users, Search } from 'lucide-react'
import { toast } from 'react-toastify'
import './Navbar.css'

const Navbar = () => {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [searchTerm, setSearchTerm] = useState('')

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      toast.info(`Searching for: ${searchTerm}`)
      setSearchTerm('')
    }
  }

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <span className="navbar-logo">⛪</span>
          <span className="navbar-title">FaithConnect</span>
        </Link>

        <div className="navbar-search" style={{ display: 'flex', alignItems: 'center', background: '#f3f4f6', borderRadius: '24px', padding: '0 12px' }}>
          <Search size={18} color="#6b7280" />
          <input
            type="text"
            placeholder="Search..."
            className="navbar-search-input"
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', marginLeft: '8px' }}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleSearch}
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
