import { Outlet } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import Sidebar from './Sidebar'
import RoleGuard from './RoleGuard'

/**
 * Layout theo wireframe:
 * - Header (full width)
 * - Body: Nav + Sidebar (trái) | Main Content (phải)
 * - Footer (full width)
 */
export default function Layout({ user, setUser }) {
  return (
    <div className="page-wrapper">
      <Header user={user} onLogout={setUser ? () => setUser(null) : undefined} />
      <div className="layout-body">
        <div className="layout-left">
          <Nav />
          <Sidebar user={user} />
        </div>
        <main className="layout-main-content">
          <RoleGuard user={user}>
            <Outlet />
          </RoleGuard>
        </main>
      </div>
      <footer className="layout-footer">
        Assignment 1 - BuiYenNhi-SE18D04 | News Management System (UI)
      </footer>
    </div>
  )
}
