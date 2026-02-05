import { useState, useMemo, useEffect } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ConfirmModal from '../../components/ConfirmModal'
import accountApi from '../../api/accountApi'
import { ROLE_ADMIN, ROLE_STAFF, getRoleLabel } from '../../constants/roles'

export default function AccountManagement() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingUser, setEditingUser] = useState(null)
  const [form, setForm] = useState({
    accountName: '',
    accountEmail: '',
    accountRole: 2,
    accountPassword: '',
  })
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const validateAccountName = (v) =>
    !v || !v.trim() ? 'Please enter a name.' : ''

  const validateAccountEmail = (v) =>
    !v || !v.trim() ? 'Please enter an email.' : ''

  const validatePassword = (v, isEdit) =>
    !isEdit && (!v || !v.trim()) ? 'Please enter a password.' : ''

  useEffect(() => {
    accountApi
      .getAll()
      .then((res) => setUsers(res.data || []))
      .catch((err) => setError(err?.response?.data?.message || err.message || 'Failed to load accounts'))
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return users
    return users.filter(
      (u) =>
        u.accountName.toLowerCase().includes(q) ||
        u.accountEmail.toLowerCase().includes(q)
    )
  }, [users, search])

  const openAdd = () => {
    setEditingUser(null)
    setForm({
      accountName: '',
      accountEmail: '',
      accountRole: ROLE_STAFF,
      accountPassword: '',
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (user) => {
    setEditingUser(user)
    setForm({
      accountName: user.accountName,
      accountEmail: user.accountEmail,
      accountRole: user.accountRole,
      accountPassword: user.accountPassword || '',
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    if (field === 'accountName')
      setErrors((e) => ({
        ...e,
        accountName: validateAccountName(form.accountName),
      }))
    if (field === 'accountEmail')
      setErrors((e) => ({
        ...e,
        accountEmail: validateAccountEmail(form.accountEmail),
      }))
    if (field === 'accountPassword')
      setErrors((e) => ({
        ...e,
        accountPassword: validatePassword(
          form.accountPassword,
          !!editingUser
        ),
      }))
  }

  const handleSave = () => {
    setTouched({
      accountName: true,
      accountEmail: true,
      accountPassword: true,
    })

    const errName = validateAccountName(form.accountName)
    const errEmail = validateAccountEmail(form.accountEmail)
    const errPw = validatePassword(form.accountPassword, !!editingUser)

    setErrors({
      accountName: errName,
      accountEmail: errEmail,
      accountPassword: errPw,
    })

    if (errName || errEmail || errPw) return

    const payload = {
      accountName: form.accountName.trim(),
      accountEmail: form.accountEmail.trim(),
      accountRole: form.accountRole,
      accountPassword: form.accountPassword || undefined,
    }

    if (editingUser) {
      accountApi
        .update(editingUser.accountID, payload)
        .then((res) => {
          setUsers((prev) =>
            prev.map((u) =>
              u.accountID === editingUser.accountID ? (res.data || { ...u, ...payload }) : u
            )
          )
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            accountEmail: err?.response?.data?.message || err.message || 'Update failed',
          }))
        )
    } else {
      accountApi
        .create(payload)
        .then((res) => {
          setUsers((prev) => [...prev, res.data])
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            accountEmail: err?.response?.data?.message || err.message || 'Create failed',
          }))
        )
    }
  }

  const handleDelete = (user) => setDeleteConfirm(user)

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return
    accountApi
      .remove(deleteConfirm.accountID)
      .then(() => {
        setUsers((prev) =>
          prev.filter((u) => u.accountID !== deleteConfirm.accountID)
        )
        setDeleteConfirm(null)
      })
      .catch((err) => {
        const msg = err?.response?.data?.message ?? err?.response?.data ?? err.message ?? 'Delete failed'
        setError(typeof msg === 'string' ? msg : 'Delete failed')
        setDeleteConfirm(null)
      })
  }

  const deleteConfirmBody = deleteConfirm
    ? `Are you sure you want to delete the account "${deleteConfirm.accountName}"?`
    : ''

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Account Management</h2>
        {error && (
          <div className="alert alert-danger mb-2" role="alert">
            {error}
            <button
              type="button"
              className="btn-close ms-2"
              aria-label="Close"
              onClick={() => setError(null)}
            />
          </div>
        )}
        <div className="page-actions">
          <Form.Control
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="search-input"
            style={{ width: '200px' }}
          />
          <Button variant="primary" onClick={openAdd}>
            Add Account
          </Button>
        </div>
      </div>

      <Table responsive bordered hover className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={5} className="text-center text-muted py-4">
                Loading...
              </td>
            </tr>
          ) : (
          filtered.map((u) => (
            <tr key={u.accountID}>
              <td>{u.accountID}</td>
              <td>{u.accountName}</td>
              <td>{u.accountEmail}</td>
              <td>{getRoleLabel(u.accountRole)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-1"
                  onClick={() => openEdit(u)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(u)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))
          )}
        </tbody>
      </Table>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingUser ? 'Update Account' : 'Add New User'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              value={form.accountName}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  accountName: e.target.value,
                }))
              }
              onBlur={() => handleBlur('accountName')}
              placeholder="Account name"
              isInvalid={!!errors.accountName && touched.accountName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.accountName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={form.accountEmail}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  accountEmail: e.target.value,
                }))
              }
              onBlur={() => handleBlur('accountEmail')}
              placeholder="email@example.com"
              isInvalid={!!errors.accountEmail && touched.accountEmail}
            />
            <Form.Control.Feedback type="invalid">
              {errors.accountEmail}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={form.accountRole}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  accountRole: +e.target.value,
                }))
              }
            >
              <option value={ROLE_ADMIN}>Admin (1)</option>
              <option value={ROLE_STAFF}>Staff (2)</option>
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>
              Password {editingUser && '(leave blank to keep unchanged)'}
            </Form.Label>
            <Form.Control
              type="password"
              value={form.accountPassword}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  accountPassword: e.target.value,
                }))
              }
              onBlur={() => handleBlur('accountPassword')}
              placeholder="••••••"
              isInvalid={
                !!errors.accountPassword && touched.accountPassword
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.accountPassword}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmModal
        show={!!deleteConfirm}
        handleClose={() => setDeleteConfirm(null)}
        title="Delete Confirmation"
        body={deleteConfirmBody}
        onConfirm={handleConfirmDelete}
        confirmLabel="Delete"
        confirmVariant="danger"
      />
    </div>
  )
}
