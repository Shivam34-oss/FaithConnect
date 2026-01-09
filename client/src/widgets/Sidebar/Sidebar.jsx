import { Link, useLocation } from 'react-router-dom'
import { Home, Users, Heart, BookOpen, Settings } from 'lucide-react'
import './Sidebar.css'

const Sidebar = () => {
  const location = useLocation()

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Users, label: 'Communities', path: '/community' },
    { icon: Heart, label: 'Prayers', path: '/prayers' },
    { icon: BookOpen, label: 'Scriptures', path: '/scriptures' },
    { icon: Settings, label: 'Settings', path: '/settings' },
  ]

  return (
    <aside className="sidebar">
      <nav className="sidebar-nav">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`sidebar-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}

export default Sidebar
