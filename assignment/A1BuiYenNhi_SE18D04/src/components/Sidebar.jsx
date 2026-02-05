import { NavLink } from 'react-router-dom'

const menuItems = [
  { path: '/admin/accounts', label: 'User Managment' },
  { path: '/admin/categories', label: 'Category Management' },
  { path: '/admin/news', label: 'News Management' },
  { path: '/admin/settings', label: 'Settings' },
]

export default function Sidebar() {
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
