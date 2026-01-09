import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Sidebar from '../Sidebar/Sidebar'
import './Layout.css'

const Layout = () => {
  return (
    <div className="layout">
      <Navbar />
      <div className="layout-container">
        <Sidebar />
        <main className="layout-main">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout
