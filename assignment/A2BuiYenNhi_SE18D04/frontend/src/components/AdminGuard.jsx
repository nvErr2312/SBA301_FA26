import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { setAuthUser } from '../utils/authStorage'

export default function AdminGuard({ children, user, setUser }) {
  const location = useLocation()
  const stateUser = location.state?.user

  // Khi vừa login xong → nhận user từ location.state và lưu localStorage (để reload không mất)
  useEffect(() => {
    if (stateUser) {
      setAuthUser(stateUser)
      setUser(stateUser)
    }
  }, [stateUser, setUser])

  // Đã login nếu:
  // - Có user trong App state
  // - Hoặc vừa điều hướng từ Login sang
  const isLoggedIn = user || stateUser

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />
  }

  return children
}
