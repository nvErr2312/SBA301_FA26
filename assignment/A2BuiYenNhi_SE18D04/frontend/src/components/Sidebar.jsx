import { NavLink } from 'react-router-dom'
import { ROLE_ADMIN, ROLE_STAFF } from '../constants/roles'

// Menu cho Admin (AccountRole = 1): chỉ quản lý tài khoản
const adminMenuItems = [
  { path: '/admin/accounts', label: 'Account Management' },
]

// Menu cho Staff (AccountRole = 2): danh mục, tag, tin tức, profile, tin của tôi
const staffMenuItems = [
  { path: '/admin/categories', label: 'Category Management' },
  { path: '/admin/tags', label: 'Tag Management' },
  { path: '/admin/news', label: 'News Management' },
  { path: '/admin/profile', label: 'My Profile' },
  { path: '/admin/my-news', label: 'My News History' },
]

export default function Sidebar({ user }) {
  const role = user?.accountRole != null ? Number(user.accountRole) : 0
  const menuItems = role === ROLE_ADMIN ? adminMenuItems : role === ROLE_STAFF ? staffMenuItems : []

  return (
    <aside className="sidebar" aria-label="Sidebar">
      {menuItems.map((item) => (
        <NavLink
          key={item.path}
          to={item.path}
          className={({ isActive }) => (isActive ? 'sidebar-link active' : 'sidebar-link')}
        >
          {item.label}
        </NavLink>
      ))}
    </aside>
  )
}
