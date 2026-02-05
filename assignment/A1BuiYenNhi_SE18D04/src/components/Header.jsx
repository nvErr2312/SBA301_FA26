import { useNavigate } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export default function Header({ user }) {
  const navigate = useNavigate()

  const handleLogout = () => {
    navigate('/login')
  }

  return (
    <header className="layout-header">
      <h1 className="layout-title">News Management System</h1>
      <div className="header-actions">
        {user && <span className="user-name">{user.accountName}</span>}
        <Button variant="outline-light" size="sm" onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </header>
  )
}
