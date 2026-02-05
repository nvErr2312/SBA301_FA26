import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState } from 'react'

import Login from './pages/Login'
import Layout from './components/Layout'
import AdminGuard from './components/AdminGuard'

import AccountManagement from './pages/admin/AccountManagement'
import CategoryManagement from './pages/admin/CategoryManagement'
import NewsManagement from './pages/admin/NewsManagement'
import TagManagement from './pages/admin/TagManagement'
import Profile from './pages/admin/Profile'
import MyNews from './pages/admin/MyNews'
import { getAuthUser } from './utils/authStorage'
import { ROLE_ADMIN } from './constants/roles'

export default function App() {
  const [user, setUser] = useState(() => getAuthUser())
  const location = useLocation()
  const currentUser = user || location.state?.user

  // Mặc định: Admin (1) → /admin/accounts, Staff (2) → /admin/news
  const role = currentUser?.accountRole != null ? Number(currentUser.accountRole) : 0
  const defaultPath = role === ROLE_ADMIN ? '/admin/accounts' : '/admin/news'

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <AdminGuard user={user} setUser={setUser}>
            <Layout user={currentUser} setUser={setUser} />
          </AdminGuard>
        }
      >
        <Route index element={<Navigate to={defaultPath} replace />} />
        <Route path="accounts" element={<AccountManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="tags" element={<TagManagement />} />
        <Route path="news" element={<NewsManagement />} />
        <Route path="profile" element={<Profile />} />
        <Route path="my-news" element={<MyNews />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
