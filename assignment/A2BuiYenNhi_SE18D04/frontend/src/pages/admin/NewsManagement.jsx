import { useState, useMemo, useEffect } from 'react'
import { Form, Button, Table, Modal } from 'react-bootstrap'
import ConfirmModal from '../../components/ConfirmModal'
import newsApi from '../../api/newsApi'
import categoryApi from '../../api/categoryApi'
import tagApi from '../../api/tagApi'
import { getAuthUser } from '../../utils/authStorage'

const statusLabel = (s) => (s === 1 ? 'Visible' : 'Hidden')

// Chuẩn hóa article từ API (categoryID, createdByID, updatedByID, tagIDs, tagNames)
function normalizeArticle(a) {
  return {
    ...a,
    categoryID: a.categoryID ?? a.category?.categoryID ?? null,
    createdByID: a.createdByID ?? a.createdBy?.accountID ?? null,
    createdByName: a.createdByName ?? a.createdBy?.accountName ?? null,
    updatedByID: a.updatedByID ?? a.updatedBy?.accountID ?? null,
    updatedByName: a.updatedByName ?? a.updatedBy?.accountName ?? null,
    tagIDs: a.tagIDs ?? (a.tags || []).map((t) => t.tagID ?? t.tagID) ?? [],
    tagNames: (a.tags || []).map((t) => t.tagName).filter(Boolean),
  }
}

function formatDate(val) {
  if (!val) return '—'
  const d = typeof val === 'string' ? new Date(val) : val
  return Number.isNaN(d.getTime()) ? val : d.toLocaleDateString()
}

export default function NewsManagement() {
  const [articles, setArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [tags, setTags] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [editingArticle, setEditingArticle] = useState(null)

  const [form, setForm] = useState({
    newsTitle: '',
    headline: '',
    newsContent: '',
    newsSource: 'FPT University',
    categoryID: '',
    newsStatus: 1,
    tagIDs: [],
  })

  const [deleteConfirm, setDeleteConfirm] = useState(null)
  const [touched, setTouched] = useState({})
  const [errors, setErrors] = useState({})

  const currentUser = getAuthUser()

  const validateNewsTitle = (v) => (!v || !v.trim() ? 'Please enter a title.' : '')
  const validateHeadline = (v) => (!v || !v.trim() ? 'Please enter a headline.' : '')
  const validateNewsContent = (v) => (!v || !v.trim() ? 'Please enter the content.' : '')
  const validateNewsSource = (v) => (!v || !v.trim() ? 'Please enter a source.' : '')

  useEffect(() => {
    Promise.all([
      newsApi.getAll(),
      categoryApi.getAll(),
      tagApi.getAll(),
    ])
      .then(([newsRes, catRes, tagRes]) => {
        setArticles((newsRes.data || []).map(normalizeArticle))
        setCategories(catRes.data || [])
        setTags(tagRes.data || [])
      })
      .catch((err) =>
        setError(
          err?.response?.data?.message || err.message || 'Failed to load data'
        )
      )
      .finally(() => setLoading(false))
  }, [])

  const getCategoryName = (categoryID) => {
    if (categoryID == null) return '—'
    const c = categories.find((x) => x.categoryID === categoryID)
    return c ? c.categoryName : `ID ${categoryID}`
  }

  const getAuthorName = (article) => {
    if (article.createdByName) return article.createdByName
    if (article.createdByID != null) return `ID ${article.createdByID}`
    return '—'
  }

  const getUpdatedByName = (article) => {
    if (article.updatedByName) return article.updatedByName
    if (article.updatedByID != null) return `ID ${article.updatedByID}`
    return '—'
  }

  const truncate = (str, maxLen = 50) => {
    if (!str) return '—'
    const s = String(str)
    return s.length <= maxLen ? s : s.slice(0, maxLen) + '…'
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return articles
    return articles.filter(
      (a) =>
        (a.newsTitle && a.newsTitle.toLowerCase().includes(q)) ||
        (a.headline && a.headline.toLowerCase().includes(q)) ||
        (a.newsContent && a.newsContent.toLowerCase().includes(q))
    )
  }, [articles, search])

  const openAdd = () => {
    setEditingArticle(null)
    setForm({
      newsTitle: '',
      headline: '',
      newsContent: '',
      newsSource: 'FPT University',
      categoryID: categories.length ? categories[0].categoryID : '',
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
      newsTitle: article.newsTitle || '',
      headline: article.headline || '',
      newsContent: article.newsContent || '',
      newsSource: article.newsSource || '',
      categoryID: article.categoryID ?? '',
      newsStatus: article.newsStatus ?? 1,
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

    const accountId = currentUser?.accountID ?? 1
    const payload = {
      newsTitle: form.newsTitle.trim(),
      headline: form.headline?.trim() || null,
      newsContent: form.newsContent.trim(),
      newsSource: form.newsSource.trim(),
      category: form.categoryID ? { categoryID: +form.categoryID } : null,
      newsStatus: form.newsStatus,
      tags: (form.tagIDs || []).map((id) => ({ tagID: +id })),
      createdBy: editingArticle ? undefined : { accountID: accountId },
      updatedBy: editingArticle ? { accountID: accountId } : undefined,
    }

    if (editingArticle) {
      newsApi
        .update(editingArticle.newsArticleID, payload)
        .then((res) => {
          const updated = normalizeArticle(res.data || { ...editingArticle, ...form })
          setArticles((prev) =>
            prev.map((a) =>
              a.newsArticleID === editingArticle.newsArticleID ? updated : a
            )
          )
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            newsTitle: err?.response?.data?.message || err.message || 'Update failed',
          }))
        )
    } else {
      newsApi
        .create(payload)
        .then((res) => {
          setArticles((prev) => [...prev, normalizeArticle(res.data)])
          setModalOpen(false)
        })
        .catch((err) =>
          setErrors((e) => ({
            ...e,
            newsTitle: err?.response?.data?.message || err.message || 'Create failed',
          }))
        )
    }
  }

  const handleDelete = (article) => setDeleteConfirm(article)

  const handleConfirmDelete = () => {
    if (!deleteConfirm) return
    newsApi
      .remove(deleteConfirm.newsArticleID)
      .then(() => {
        setArticles((prev) =>
          prev.filter((a) => a.newsArticleID !== deleteConfirm.newsArticleID)
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
    ? `Are you sure you want to delete the article "${deleteConfirm.newsTitle}"?`
    : ''

  const toggleTag = (tagID) => {
    const id = +tagID
    setForm((f) => ({
      ...f,
      tagIDs: f.tagIDs.includes(id)
        ? f.tagIDs.filter((x) => x !== id)
        : [...f.tagIDs, id],
    }))
  }

  return (
    <div className="admin-page">
      <div className="page-header">
        <h2>News Management</h2>
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
            Add News
          </Button>
        </div>
      </div>

      <Table responsive bordered hover className="data-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Headline</th>
            <th>Content</th>
            <th>Source</th>
            <th>Category</th>
            <th>Status</th>
            <th>Author</th>
            <th>Created</th>
            <th>Updated By</th>
            <th>Modified</th>
            <th>Tags</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={13} className="text-center text-muted py-4">
                Loading...
              </td>
            </tr>
          ) : (
            filtered.map((a) => (
              <tr key={a.newsArticleID}>
                <td>{a.newsArticleID}</td>
                <td>{a.newsTitle || '—'}</td>
                <td title={a.headline || ''}>{truncate(a.headline, 40)}</td>
                <td title={a.newsContent || ''}>{truncate(a.newsContent, 50)}</td>
                <td>{a.newsSource || '—'}</td>
                <td>{getCategoryName(a.categoryID)}</td>
                <td>{statusLabel(a.newsStatus)}</td>
                <td>{getAuthorName(a)}</td>
                <td>{formatDate(a.createdDate)}</td>
                <td>{getUpdatedByName(a)}</td>
                <td>{formatDate(a.modifiedDate)}</td>
                <td title={(a.tagNames || []).join(', ')}>{(a.tagNames && a.tagNames.length) ? a.tagNames.join(', ') : '—'}</td>
                <td>
                  <Button variant="outline-primary" size="sm" className="me-1" onClick={() => openEdit(a)}>
                    Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(a)}>
                    Delete
                  </Button>
                </td>
              </tr>
            ))
          )}
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
              onChange={(e) => setForm((f) => ({ ...f, newsTitle: e.target.value }))}
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
              onChange={(e) => setForm((f) => ({ ...f, headline: e.target.value }))}
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
              onChange={(e) => setForm((f) => ({ ...f, newsContent: e.target.value }))}
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
              onChange={(e) => setForm((f) => ({ ...f, newsSource: e.target.value }))}
              onBlur={() => handleBlur('newsSource')}
              placeholder="Source"
              isInvalid={!!errors.newsSource && touched.newsSource}
            />
            <Form.Control.Feedback type="invalid">{errors.newsSource}</Form.Control.Feedback>
          </Form.Group>

          <div className="d-flex flex-wrap gap-3">
            <Form.Group className="mb-3" style={{ minWidth: 180 }} controlId="categoryID">
              <Form.Label>Category</Form.Label>
              <Form.Control
                as="select"
                value={form.categoryID}
                onChange={(e) => setForm((f) => ({ ...f, categoryID: e.target.value }))}
              >
                <option value="">— Select —</option>
                {categories.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>
                    {c.categoryName}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group className="mb-3" style={{ minWidth: 120 }} controlId="newsStatus">
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

          <Form.Group className="mb-3" controlId="tagIDs">
            <Form.Label>Tags</Form.Label>
            <div className="d-flex flex-wrap gap-2">
              {tags.map((t) => (
                <Form.Check
                  key={t.tagID}
                  type="checkbox"
                  id={`tag-${t.tagID}`}
                  label={t.tagName}
                  checked={(form.tagIDs || []).includes(t.tagID)}
                  onChange={() => toggleTag(t.tagID)}
                />
              ))}
              {tags.length === 0 && <span className="text-muted">No tags yet.</span>}
            </div>
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
