import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Login from './pages/Login'
import Layout from './components/Layout'
import AdminGuard from './components/AdminGuard'

import AccountManagement from './pages/admin/AccountManagement'
import CategoryManagement from './pages/admin/CategoryManagement'
import NewsManagement from './pages/admin/NewsManagement'

export default function App() {
  const [user, setUser] = useState(null)
  const location = useLocation()

  // Khi refresh trang → lấy user từ history state (nếu có)
  useEffect(() => {
    const stateUser = window.history.state?.usr?.state?.user
    if (stateUser) {
      setUser(stateUser)
    }
  }, [])

  const currentUser = user || location.state?.user

  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/admin"
        element={
          <AdminGuard user={user} setUser={setUser}>
            <Layout user={currentUser} />
          </AdminGuard>
        }
      >
        <Route index element={<Navigate to="/admin/accounts" replace />} />
        <Route path="accounts" element={<AccountManagement />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="news" element={<NewsManagement />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}
