import { Link } from 'react-router-dom'
import Button from '@widgets/Button/Button'
import { Home } from 'lucide-react'
import './NotFoundView.css'

const NotFoundView = () => {
  return (
    <div className="not-found-view">
      <div className="not-found-container">
        <h1 className="not-found-code">404</h1>
        <h2 className="not-found-title">Page Not Found</h2>
        <p className="not-found-message">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <Button>
            <Home size={18} />
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFoundView
