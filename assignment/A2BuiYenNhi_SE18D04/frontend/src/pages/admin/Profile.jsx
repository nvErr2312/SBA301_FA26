import { useState, useEffect } from 'react'
import { Form, Button, Card } from 'react-bootstrap'
import accountApi from '../../api/accountApi'
import { getAuthUser, setAuthUser } from '../../utils/authStorage'
import { ROLE_STAFF } from '../../constants/roles'

export default function Profile() {
  const currentUser = getAuthUser()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState('')
  const [form, setForm] = useState({
    accountName: '',
    accountEmail: '',
    accountPassword: '',
  })
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const validateName = (v) => (!v || !v.trim() ? 'Please enter your name.' : '')
  const validateEmail = (v) => (!v || !v.trim() ? 'Please enter your email.' : '')

  useEffect(() => {
    if (!currentUser?.accountID) {
      setLoading(false)
      return
    }
    accountApi
      .getById(currentUser.accountID)
      .then((res) => {
        const d = res.data || {}
        setForm({
          accountName: d.accountName || '',
          accountEmail: d.accountEmail || '',
          accountPassword: '',
        })
      })
      .catch((err) =>
        setError(err?.response?.data?.message || err.message || 'Failed to load profile')
      )
      .finally(() => setLoading(false))
  }, [currentUser?.accountID])

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    if (field === 'accountName') setErrors((e) => ({ ...e, accountName: validateName(form.accountName) }))
    if (field === 'accountEmail') setErrors((e) => ({ ...e, accountEmail: validateEmail(form.accountEmail) }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSuccess('')
    setTouched({ accountName: true, accountEmail: true })

    const errName = validateName(form.accountName)
    const errEmail = validateEmail(form.accountEmail)
    setErrors({ accountName: errName, accountEmail: errEmail })
    if (errName || errEmail) return

    const payload = {
      accountName: form.accountName.trim(),
      accountEmail: form.accountEmail.trim(),
      accountRole: currentUser?.accountRole ?? ROLE_STAFF,
      accountPassword: form.accountPassword?.trim() || undefined,
    }

    accountApi
      .update(currentUser.accountID, payload)
      .then((res) => {
        const updated = res.data || {}
        setAuthUser({ ...currentUser, accountName: updated.accountName, accountEmail: updated.accountEmail })
        setSuccess('Profile updated successfully.')
        setForm((f) => ({ ...f, accountPassword: '' }))
      })
      .catch((err) =>
        setErrors((e) => ({
          ...e,
          accountName: err?.response?.data?.message || err.message || 'Update failed',
        }))
      )
  }

  if (loading) {
    return (
      <div className="admin-page">
        <p className="text-muted">Loading profile...</p>
      </div>
    )
  }

  if (!currentUser?.accountID) {
    return (
      <div className="admin-page">
        <p className="text-danger">Please log in to manage your profile.</p>
      </div>
    )
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>My Profile</h2>
      </div>

      {error && (
        <div className="alert alert-danger mb-3" role="alert">
          {error}
          <button type="button" className="btn-close ms-2" aria-label="Close" onClick={() => setError(null)} />
        </div>
      )}
      {success && (
        <div className="alert alert-success mb-3" role="alert">
          {success}
        </div>
      )}

      <Card style={{ maxWidth: '500px' }}>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                value={form.accountName}
                onChange={(e) => setForm((f) => ({ ...f, accountName: e.target.value }))}
                onBlur={() => handleBlur('accountName')}
                placeholder="Your name"
                isInvalid={!!errors.accountName && touched.accountName}
              />
              <Form.Control.Feedback type="invalid">{errors.accountName}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={form.accountEmail}
                onChange={(e) => setForm((f) => ({ ...f, accountEmail: e.target.value }))}
                onBlur={() => handleBlur('accountEmail')}
                placeholder="Your email"
                isInvalid={!!errors.accountEmail && touched.accountEmail}
              />
              <Form.Control.Feedback type="invalid">{errors.accountEmail}</Form.Control.Feedback>
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>New password (leave blank to keep current)</Form.Label>
              <Form.Control
                type="password"
                value={form.accountPassword}
                onChange={(e) => setForm((f) => ({ ...f, accountPassword: e.target.value }))}
                placeholder="New password"
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Save changes
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  )
}
