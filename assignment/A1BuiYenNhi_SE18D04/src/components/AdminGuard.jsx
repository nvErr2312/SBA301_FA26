import { Navigate, useLocation } from 'react-router-dom'
import { useEffect } from 'react'

export default function AdminGuard({ children, user, setUser }) {
  const location = useLocation()
  const stateUser = location.state?.user

  // Khi vừa login xong → nhận user từ location.state
  useEffect(() => {
    if (stateUser) {
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
