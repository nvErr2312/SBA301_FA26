import { useState, useMemo, useEffect } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ConfirmModal from '../../components/ConfirmModal'
import categoryApi from '../../api/categoryApi'

const statusLabel = (isActive) => (isActive === 1 ? 'Active' : 'Inactive')

export default function CategoryManagement() {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingCat, setEditingCat] = useState(null)
  const [form, setForm] = useState({
    categoryName: '',
    categoryDescription: '',
    parentCategoryID: null,
    isActive: 1,
  })
  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const validateCategoryName = (v) =>
    !v || !v.trim() ? 'Please enter a category name.' : ''

  const validateCategoryDescription = (v) =>
    !v || !v.trim() ? 'Please enter a description.' : ''

  // Chuẩn hóa parentCategoryID từ response (backend có thể trả parentCategoryID hoặc parentCategory.categoryID)
  const normalizeCategories = (list) =>
    (list || []).map((c) => ({
      ...c,
      parentCategoryID:
        c.parentCategoryID ?? c.parentCategory?.categoryID ?? null,
    }))

  useEffect(() => {
    categoryApi
      .getAll()
      .then((res) => setCategories(normalizeCategories(res.data)))
      .catch((err) =>
        setError(
          err?.response?.data?.message ||
            err.message ||
            'Failed to load categories'
        )
      )
      .finally(() => setLoading(false))
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return categories
    return categories.filter(
      (c) =>
        c.categoryName.toLowerCase().includes(q) ||
        (c.categoryDescription &&
          c.categoryDescription.toLowerCase().includes(q))
    )
  }, [categories, search])

  const parentOptions = categories.filter(
    (c) => !editingCat || c.categoryID !== editingCat.categoryID
  )

  const openAdd = () => {
    setEditingCat(null)
    setForm({
      categoryName: '',
      categoryDescription: '',
      parentCategoryID: null,
      isActive: 1,
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (cat) => {
    setEditingCat(cat)
    setForm({
      categoryName: cat.categoryName,
      categoryDescription: cat.categoryDescription || '',
      parentCategoryID: cat.parentCategoryID ?? null,
      isActive: cat.isActive,
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    if (field === 'categoryName')
      setErrors((e) => ({
        ...e,
        categoryName: validateCategoryName(form.categoryName),
      }))
    if (field === 'categoryDescription')
      setErrors((e) => ({
        ...e,
        categoryDescription: validateCategoryDescription(
          form.categoryDescription
        ),
      }))
  }

  const handleSave = () => {
    setTouched({ categoryName: true, categoryDescription: true })

    const errName = validateCategoryName(form.categoryName)
    const errDesc = validateCategoryDescription(
      form.categoryDescription
    )

    setErrors({
      categoryName: errName,
      categoryDescription: errDesc,
    })

    if (errName || errDesc) return

    const payload = {
      categoryName: form.categoryName.trim(),
      categoryDescription: form.categoryDescription?.trim() || null,
      isActive: form.isActive,
      parentCategory:
        form.parentCategoryID != null && form.parentCategoryID !== ''
          ? { categoryID: form.parentCategoryID }
          : null,
    }

    const resolveParentID = (data) =>
      data?.parentCategoryID ?? data?.parentCategory?.categoryID ?? payload.parentCategory?.categoryID ?? null

    if (editingCat) {
      categoryApi
        .update(editingCat.categoryID, payload)
        .then((res) => {
          const updated = res.data || { ...editingCat, ...payload }
          updated.parentCategoryID = resolveParentID(res.data) ?? resolveParentID(updated)
          setCategories((prev) =>
            prev.map((c) =>
              c.categoryID === editingCat.categoryID ? updated : c
            )
          )
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            categoryName:
              err?.response?.data?.message || err.message || 'Update failed',
          }))
        )
    } else {
      categoryApi
        .create(payload)
        .then((res) => {
          const newCat = {
            ...res.data,
            parentCategoryID:
              res.data?.parentCategoryID ??
              res.data?.parentCategory?.categoryID ??
              (form.parentCategoryID != null && form.parentCategoryID !== ''
                ? form.parentCategoryID
                : null),
          }
          setCategories((prev) => [...prev, newCat])
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            categoryName:
              err?.response?.data?.message || err.message || 'Create failed',
          }))
        )
    }
  }

  const handleDelete = (cat) => setDeleteConfirm(cat)

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return
    categoryApi
      .remove(deleteConfirm.categoryID)
      .then(() => {
        setCategories((prev) =>
          prev.filter((c) => c.categoryID !== deleteConfirm.categoryID)
        )
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
    ? `Are you sure you want to delete the category "${deleteConfirm.categoryName}"?`
    : ''

  const getParentName = (parentId) => {
    if (parentId == null) return '—'
    const parent = categories.find((c) => c.categoryID === parentId)
    return parent ? parent.categoryName : `ID ${parentId}`
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Category Management</h2>
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
            Add Category
          </Button>
        </div>
      </div>

      <Table responsive bordered hover className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Parent Category</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={6} className="text-center text-muted py-4">
                Loading...
              </td>
            </tr>
          ) : (
          filtered.map((c) => (
            <tr key={c.categoryID}>
              <td>{c.categoryID}</td>
              <td>{c.categoryName}</td>
              <td>{c.categoryDescription || '—'}</td>
              <td>{getParentName(c.parentCategoryID)}</td>
              <td>{statusLabel(c.isActive)}</td>
              <td>
                <Button
                  variant="outline-primary"
                  size="sm"
                  className="me-1"
                  onClick={() => openEdit(c)}
                >
                  Edit
                </Button>
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(c)}
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
            {editingCat ? 'Update Category' : 'Add Category'}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              value={form.categoryName}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  categoryName: e.target.value,
                }))
              }
              onBlur={() => handleBlur('categoryName')}
              placeholder="Category name"
              isInvalid={
                !!errors.categoryName && touched.categoryName
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoryName}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={2}
              value={form.categoryDescription}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  categoryDescription: e.target.value,
                }))
              }
              onBlur={() => handleBlur('categoryDescription')}
              placeholder="Description"
              isInvalid={
                !!errors.categoryDescription &&
                touched.categoryDescription
              }
            />
            <Form.Control.Feedback type="invalid">
              {errors.categoryDescription}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Parent Category</Form.Label>
            <Form.Control
              as="select"
              value={form.parentCategoryID ?? ''}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  parentCategoryID: e.target.value === '' ? null : +e.target.value,
                }))
              }
            >
              <option value="">None</option>
              {parentOptions.map((c) => (
                <option key={c.categoryID} value={c.categoryID}>
                  {c.categoryName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              value={form.isActive}
              onChange={(e) =>
                setForm((f) => ({
                  ...f,
                  isActive: +e.target.value,
                }))
              }
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setModalOpen(false)}
          >
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
