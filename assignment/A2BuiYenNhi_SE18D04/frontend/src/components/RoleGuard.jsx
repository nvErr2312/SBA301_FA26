import { Navigate, useLocation } from 'react-router-dom'
import { ROLE_ADMIN, ROLE_STAFF } from '../constants/roles'

// Các đường dẫn chỉ Staff được vào (Category, Tag, News, Profile, My News)
const STAFF_PATHS = [
  '/admin/categories',
  '/admin/tags',
  '/admin/news',
  '/admin/profile',
  '/admin/my-news',
]

/**
 * Phân quyền theo role: Admin (1) chỉ vào Account; Staff (2) chỉ vào Category/News/...
 * Nếu vào sai trang thì redirect về trang đúng.
 */
export default function RoleGuard({ user, children }) {
  const location = useLocation()
  const path = location.pathname
  const role = user?.accountRole != null ? Number(user.accountRole) : 0

  const isStaffPath = STAFF_PATHS.some((p) => path.startsWith(p))
  const isAccountsPath = path.startsWith('/admin/accounts')

  // Admin (1) vào trang Staff → đẩy về Account
  if (role === ROLE_ADMIN && isStaffPath) {
    return <Navigate to="/admin/accounts" replace />
  }
  // Staff (2) vào trang Account → đẩy về News
  if (role === ROLE_STAFF && isAccountsPath) {
    return <Navigate to="/admin/news" replace />
  }

  return children
}
