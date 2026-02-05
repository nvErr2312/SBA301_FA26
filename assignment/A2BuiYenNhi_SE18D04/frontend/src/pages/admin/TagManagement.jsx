import { useState, useMemo, useEffect } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ConfirmModal from '../../components/ConfirmModal'
import tagApi from '../../api/tagApi'

export default function TagManagement() {
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingTag, setEditingTag] = useState(null)
  const [form, setForm] = useState({
    tagName: '',
    note: '',
  })
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const validateTagName = (v) =>
    !v || !v.trim() ? 'Please enter a tag name.' : ''

  useEffect(() => {
    tagApi
      .getAll()
      .then((res) => setTags(res.data || []))
      .catch((err) =>
        setError(
          err?.response?.data?.message || err.message || 'Failed to load tags'
        )
      )
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return tags
    return tags.filter(
      (t) =>
        (t.tagName && t.tagName.toLowerCase().includes(q)) ||
        (t.note && t.note.toLowerCase().includes(q))
    )
  }, [tags, search])

  const openAdd = () => {
    setEditingTag(null)
    setForm({ tagName: '', note: '' })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (tag) => {
    setEditingTag(tag)
    setForm({
      tagName: tag.tagName || '',
      note: tag.note || '',
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    if (field === 'tagName')
      setErrors((e) => ({ ...e, tagName: validateTagName(form.tagName) }))
  }

  const handleSave = () => {
    setTouched({ tagName: true })
    const errName = validateTagName(form.tagName)
    setErrors({ tagName: errName })
    if (errName) return

    const payload = {
      tagName: form.tagName.trim(),
      note: form.note?.trim() || null,
    }

    if (editingTag) {
      tagApi
        .update(editingTag.tagID, payload)
        .then((res) => {
          const updated = res.data || { ...editingTag, ...payload }
          setTags((prev) =>
            prev.map((t) => (t.tagID === editingTag.tagID ? updated : t))
          )
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            tagName: err?.response?.data?.message || err.message || 'Update failed',
          }))
        )
    } else {
      tagApi
        .create(payload)
        .then((res) => {
          setTags((prev) => [...prev, res.data])
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            tagName: err?.response?.data?.message || err.message || 'Create failed',
          }))
        )
    }
  }

  const handleDelete = (tag) => setDeleteConfirm(tag)

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return
    tagApi
      .remove(deleteConfirm.tagID)
      .then(() => {
        setTags((prev) => prev.filter((t) => t.tagID !== deleteConfirm.tagID))
        setDeleteConfirm(null)
      })
      .catch((err) => {
        const msg =
          err?.response?.data?.message ?? err?.response?.data ?? err.message ?? 'Delete failed'
        setError(typeof msg === 'string' ? msg : 'Delete failed')
        setDeleteConfirm(null)
      })
  }

  const deleteConfirmBody = deleteConfirm
    ? `Are you sure you want to delete the tag "${deleteConfirm.tagName}"?`
    : ''

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Tag Management</h2>
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
            Add Tag
          </Button>
        </div>
      </div>

      <Table responsive bordered hover className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Tag Name</th>
            <th>Note</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="text-center text-muted py-4">
                Loading...
              </td>
            </tr>
          ) : (
            filtered.map((t) => (
              <tr key={t.tagID}>
                <td>{t.tagID}</td>
                <td>{t.tagName}</td>
                <td>{t.note || '—'}</td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-1"
                    onClick={() => openEdit(t)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => handleDelete(t)}
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
            {editingTag ? 'Update Tag' : 'Add Tag'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Tag Name</Form.Label>
            <Form.Control
              value={form.tagName}
              onChange={(e) =>
                setForm((f) => ({ ...f, tagName: e.target.value }))
              }
              onBlur={() => handleBlur('tagName')}
              placeholder="Tag name"
              isInvalid={!!errors.tagName && touched.tagName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.tagName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Note (optional)</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={form.note}
              onChange={(e) =>
                setForm((f) => ({ ...f, note: e.target.value }))
              }
              placeholder="Note"
            />
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
