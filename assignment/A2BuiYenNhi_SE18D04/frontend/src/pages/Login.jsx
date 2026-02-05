import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { setAuthUser } from '../utils/authStorage'
import accountApi from '../api/accountApi'
import { ROLE_ADMIN } from '../constants/roles'

export default function Login() {
  const navigate = useNavigate()

  const [form, setForm] = useState({ email: '', password: '' })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})
  const [authError, setAuthError] = useState('')
  const [loading, setLoading] = useState(false)

  const validateEmail = (v) =>
    !v || !v.trim() ? 'Please enter an email / username.' : ''

  const validatePassword = (v) =>
    !v || !v.trim() ? 'Please enter a password.' : ''

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))

    if (field === 'email') {
      setErrors((e) => ({ ...e, email: validateEmail(form.email) }))
    }
    if (field === 'password') {
      setErrors((e) => ({ ...e, password: validatePassword(form.password) }))
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setAuthError('')

    // mark all touched
    setTouched({ email: true, password: true })

    // validate all
    const errEmail = validateEmail(form.email)
    const errPw = validatePassword(form.password)

    const newErrors = { email: errEmail, password: errPw }
    setErrors(newErrors)

    // Nếu còn lỗi required -> không login
    if (errEmail || errPw) return

    setLoading(true)
    accountApi
      .login(form.email.trim(), form.password)
      .then((res) => {
        const userData = res.data
        setAuthUser(userData)
        // Admin (1) → trang Account; Staff (2) → trang News
        if (userData.accountRole === ROLE_ADMIN) {
          navigate('/admin/accounts', { state: { user: userData } })
        } else {
          navigate('/admin/news', { state: { user: userData } })
        }
      })
      .catch((err) => {
        setLoading(false)
        const status = err?.response?.status
        let msg
        if (status === 404) {
          msg =
            'Không tìm thấy địa chỉ đăng nhập (404). Kiểm tra backend đã chạy tại http://localhost:8080 chưa.'
        } else if (status === 401) {
          msg = err?.response?.data?.message || 'Email hoặc mật khẩu không đúng.'
        } else {
          msg =
            err?.response?.data?.message ||
            err?.message ||
            'Email hoặc mật khẩu không đúng.'
        }
        setAuthError(msg)
        setErrors({
          email: msg,
          password: msg,
        })
      })
  }

  const showEmailInvalid = touched.email && !!errors.email
  const showPwInvalid = touched.password && !!errors.password

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>Login</h1>
        <p className="login-subtitle">News Management System (Assignment 1 - UI)</p>

        <Form onSubmit={handleSubmit} noValidate className="login-form">
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email / Username</Form.Label>
            <Form.Control
              type="text"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              onBlur={() => handleBlur('email')}
              placeholder="Admin"
              autoComplete="username"
              isInvalid={showEmailInvalid}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={form.password}
              onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
              onBlur={() => handleBlur('password')}
              placeholder="Admin"
              autoComplete="current-password"
              isInvalid={showPwInvalid}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Optional: nếu muốn hiện lỗi chung 1 dòng (không bắt buộc) */}
          {authError && (
            <div className="text-danger mb-2" style={{ fontSize: 14 }}>
              {authError}
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-100"
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Login'}
          </Button>
        </Form>
      </div>
    </div>
  )
}
