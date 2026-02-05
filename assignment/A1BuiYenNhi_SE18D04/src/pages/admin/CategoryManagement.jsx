import { useState, useMemo } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ConfirmModal from '../../components/ConfirmModal'

const statusLabel = (isActive) => (isActive === 1 ? 'Active' : 'Inactive')

export default function CategoryManagement() {
  // Assignment 1: UI only, no API data. Assignment 2 will load from API.
  const [categories, setCategories] = useState([])
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

    if (editingCat) {
      setCategories((prev) =>
        prev.map((c) =>
          c.categoryID === editingCat.categoryID
            ? { ...c, ...form }
            : c
        )
      )
    } else {
      const newId =
        Math.max(...categories.map((c) => c.categoryID), 0) + 1
      setCategories((prev) => [
        ...prev,
        { ...form, categoryID: newId },
      ])
    }
    setModalOpen(false)
  }

  const handleDelete = (cat) => setDeleteConfirm(cat)

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      setCategories((prev) =>
        prev.filter(
          (c) => c.categoryID !== deleteConfirm.categoryID
        )
      )
      setDeleteConfirm(null)
    }
  }

  const deleteConfirmBody = deleteConfirm
    ? `Are you sure you want to delete the category "${deleteConfirm.categoryName}"?`
    : ''

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>Category Management</h2>
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
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((c) => (
            <tr key={c.categoryID}>
              <td>{c.categoryID}</td>
              <td>{c.categoryName}</td>
              <td>{c.categoryDescription || '—'}</td>
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
          ))}
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
