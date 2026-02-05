import { useState, useMemo } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ConfirmModal from '../../components/ConfirmModal'

const statusLabel = (s) => (s === 1 ? 'Visible' : 'Hidden')

export default function NewsManagement() {
  // Assignment 1: UI only, no API data. Assignment 2 will load from API.
  const [articles, setArticles] = useState([])
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  const [form, setForm] = useState({
    newsTitle: '',
    headline: '',
    newsContent: '',
    newsSource: '',
    categoryID: '',
    newsStatus: 1,
    tagIDs: [],
  })

  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const validateNewsTitle = (v) => (!v || !v.trim() ? 'Please enter a title.' : '')
  const validateHeadline = (v) => (!v || !v.trim() ? 'Please enter a headline.' : '')
  const validateNewsContent = (v) => (!v || !v.trim() ? 'Please enter the content.' : '')
  const validateNewsSource = (v) => (!v || !v.trim() ? 'Please enter a source.' : '')

  // UI-only placeholders (Assignment 2 will map IDs to names)
  const getCategoryName = (id) => (id ? '—' : '—')
  const getAuthorName = (id) => (id ? '—' : '—')

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return articles
    return articles.filter(
      (a) =>
        a.newsTitle.toLowerCase().includes(q) ||
        (a.headline && a.headline.toLowerCase().includes(q))
    )
  }, [articles, search])

  const openAdd = () => {
    setEditingArticle(null)
    setForm({
      newsTitle: '',
      headline: '',
      newsContent: '',
      newsSource: 'FPT University',
      categoryID: '',
      newsStatus: 1,
      tagIDs: [],
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const openEdit = (article) => {
    setEditingArticle(article)
    setForm({
      newsTitle: article.newsTitle,
      headline: article.headline || '',
      newsContent: article.newsContent || '',
      newsSource: article.newsSource || '',
      categoryID: article.categoryID,
      newsStatus: article.newsStatus,
      tagIDs: article.tagIDs ? [...article.tagIDs] : [],
    })
    setTouched({})
    setErrors({})
    setModalOpen(true)
  }

  const handleBlur = (field) => {
    setTouched((t) => ({ ...t, [field]: true }))
    if (field === 'newsTitle') setErrors((e) => ({ ...e, newsTitle: validateNewsTitle(form.newsTitle) }))
    if (field === 'headline') setErrors((e) => ({ ...e, headline: validateHeadline(form.headline) }))
    if (field === 'newsContent') setErrors((e) => ({ ...e, newsContent: validateNewsContent(form.newsContent) }))
    if (field === 'newsSource') setErrors((e) => ({ ...e, newsSource: validateNewsSource(form.newsSource) }))
  }

  const handleSave = () => {
    setTouched({ newsTitle: true, headline: true, newsContent: true, newsSource: true })

    const errTitle = validateNewsTitle(form.newsTitle)
    const errHeadline = validateHeadline(form.headline)
    const errContent = validateNewsContent(form.newsContent)
    const errSource = validateNewsSource(form.newsSource)

    setErrors({ newsTitle: errTitle, headline: errHeadline, newsContent: errContent, newsSource: errSource })
    if (errTitle || errHeadline || errContent || errSource) return

    const now = new Date().toISOString().slice(0, 10)

    if (editingArticle) {
      setArticles((prev) =>
        prev.map((a) =>
          a.newsArticleID === editingArticle.newsArticleID ? { ...a, ...form, modifiedDate: now } : a
        )
      )
    } else {
      const newId = Math.max(...articles.map((a) => a.newsArticleID), 0) + 1
      setArticles((prev) => [
        ...prev,
        {
          ...form,
          newsArticleID: newId,
          createdDate: now,
          modifiedDate: now,
          createdByID: 1,
          updatedByID: 1,
        },
      ])
    }

    setModalOpen(false)
  }

  // ✅ ConfirmModal usage aligned with AccountManagement.jsx & CategoryManagement.jsx
  const handleDelete = (article) => setDeleteConfirm(article)

  const handleConfirmDelete = () => {
    if (deleteConfirm) {
      setArticles((prev) => prev.filter((a) => a.newsArticleID !== deleteConfirm.newsArticleID))
      setDeleteConfirm(null)
    }
  }

  const deleteConfirmBody = deleteConfirm
    ? `Are you sure you want to delete the article "${deleteConfirm.newsTitle}"?`
    : ''

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>News Management</h2>
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
            Add News
          </Button>
        </div>
      </div>

      <Table responsive bordered hover className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((a) => (
            <tr key={a.newsArticleID}>
              <td>{a.newsArticleID}</td>
              <td>{a.newsTitle}</td>
              <td>{getCategoryName(a.categoryID)}</td>
              <td>{getAuthorName(a.createdByID)}</td>
              <td>{statusLabel(a.newsStatus)}</td>
              <td>
                <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openEdit(a)}>
                  Edit
                </Button>
                <Button variant="outline-danger" size="sm" onClick={() => handleDelete(a)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={modalOpen} onHide={() => setModalOpen(false)} centered size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{editingArticle ? 'Update News' : 'Add News'}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form.Group className="mb-3" controlId="newsTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              value={form.newsTitle}
              onChange={(e) => {
                setForm((f) => ({ ...f, newsTitle: e.target.value }))
                if (touched.newsTitle) setErrors((err) => ({ ...err, newsTitle: validateNewsTitle(e.target.value) }))
              }}
              onBlur={() => handleBlur('newsTitle')}
              placeholder="Title"
              isInvalid={!!errors.newsTitle && touched.newsTitle}
            />
            <Form.Control.Feedback type="invalid">{errors.newsTitle}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="headline">
            <Form.Label>Headline</Form.Label>
            <Form.Control
              value={form.headline}
              onChange={(e) => {
                setForm((f) => ({ ...f, headline: e.target.value }))
                if (touched.headline) setErrors((err) => ({ ...err, headline: validateHeadline(e.target.value) }))
              }}
              onBlur={() => handleBlur('headline')}
              placeholder="Summary"
              isInvalid={!!errors.headline && touched.headline}
            />
            <Form.Control.Feedback type="invalid">{errors.headline}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="newsContent">
            <Form.Label>Content</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={form.newsContent}
              onChange={(e) => {
                setForm((f) => ({ ...f, newsContent: e.target.value }))
                if (touched.newsContent) setErrors((err) => ({ ...err, newsContent: validateNewsContent(e.target.value) }))
              }}
              onBlur={() => handleBlur('newsContent')}
              placeholder="Content"
              isInvalid={!!errors.newsContent && touched.newsContent}
            />
            <Form.Control.Feedback type="invalid">{errors.newsContent}</Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="newsSource">
            <Form.Label>Source</Form.Label>
            <Form.Control
              value={form.newsSource}
              onChange={(e) => {
                setForm((f) => ({ ...f, newsSource: e.target.value }))
                if (touched.newsSource) setErrors((err) => ({ ...err, newsSource: validateNewsSource(e.target.value) }))
              }}
              onBlur={() => handleBlur('newsSource')}
              placeholder="Source"
              isInvalid={!!errors.newsSource && touched.newsSource}
            />
            <Form.Control.Feedback type="invalid">{errors.newsSource}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex gap-3">
            <Form.Group className="mb-3 flex-grow-1" controlId="categoryID">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={form.categoryID}
                onChange={(e) => setForm((f) => ({ ...f, categoryID: e.target.value }))}
              >
                <option value="">— Select category —</option>
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3 flex-grow-1" controlId="newsStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control
                as="select"
                value={form.newsStatus}
                onChange={(e) => setForm((f) => ({ ...f, newsStatus: +e.target.value }))}
              >
                <option value={1}>Visible</option>
                <option value={0}>Hidden</option>
              </Form.Control>
            </Form.Group>
          </div>
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
