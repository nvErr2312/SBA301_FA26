import { Outlet } from 'react-router-dom'
import Header from './Header'
import Nav from './Nav'
import Sidebar from './Sidebar'

/**
 * Layout theo wireframe:
 * - Header (full width)
 * - Body: Nav + Sidebar (trái) | Main Content (phải)
 * - Footer (full width)
 */
export default function Layout({ user }) {
  return (
    <div className="page-wrapper">
      <Header user={user} />
      <div className="layout-body">
        <div className="layout-left">
          <Nav />
          <Sidebar />
        </div>
        <main className="layout-main-content">
          <Outlet />
        </main>
      </div>
      <footer className="layout-footer">
        Assignment 1 - BuiYenNhi-SE18D04 | News Management System (UI)
      </footer>
    </div>
  )
}
