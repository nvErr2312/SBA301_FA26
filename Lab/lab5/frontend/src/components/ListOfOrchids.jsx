import { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import { Button, Form, Image, Modal, Table } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { fetchOrchids, addOrchid, deleteOrchid, updateOrchid } from '../api/orchidApi';
import { fetchCategories } from '../api/categoryApi';

const LOCAL_IMAGE_1 = '/images/hoalan1.jpg';
const LOCAL_IMAGE_2 = '/images/hoalan2.jpg';

const defaultValuesAdd = { orchidName: '', orchidUrl: '', categoryID: '', orchidDescription: '', isNatural: false };

export default function ListOfOrchids() {
  const [orchidList, setOrchidList] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [show, setShow] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [orchidToEdit, setOrchidToEdit] = useState(null);

  const { register, handleSubmit, formState: { errors }, reset, setValue, watch } = useForm({
    mode: 'onTouched',
    defaultValues: defaultValuesAdd,
  });

  const orchidUrlWatch = watch('orchidUrl');

  const getErrorMessage = (error) =>
    error.response?.data?.message || error.message || 'Đã xảy ra lỗi';

  const handleClose = () => {
    setShow(false);
    reset(defaultValuesAdd);
  };
  const handleShow = () => setShow(true);

  const handleEditClose = () => {
    setShowEdit(false);
    setOrchidToEdit(null);
    reset(defaultValuesAdd);
  };
  const handleEditShow = (orchid) => {
    setOrchidToEdit(orchid);
    reset({
      orchidName: orchid.orchidName ?? '',
      orchidUrl: orchid.orchidUrl ?? '',
      categoryID: orchid.category?.categoryID ?? '',
      orchidDescription: orchid.orchidDescription ?? '',
      isNatural: orchid.isNatural ?? false,
    });
    setShowEdit(true);
  };

  useEffect(() => {
    loadData();
    loadCategories();
  }, []);

  const loadCategories = async () => {
    try {
      const data = await fetchCategories();
      setCategoryList(data);
    } catch (error) {
      console.log('Error fetching categories:', error);
    }
  };

  const loadData = async () => {
    try {
      const data = await fetchOrchids();
      setOrchidList(data);
    } catch (error) {
      console.log('Error fetching data:', error);
      toast.error(getErrorMessage(error));
    }
  };

  const handleDelete = async (orchidID) => {
    try {
      await deleteOrchid(orchidID);
      await loadData();
      toast.success('Orchid deleted successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error(getErrorMessage(error));
    }
  };

  const onSubmit = async (data) => {
    try {
      await addOrchid({
        orchidName: data.orchidName,
        orchidUrl: data.orchidUrl,
        orchidDescription: data.orchidDescription || null,
        categoryID: data.categoryID || null,
        isNatural: data.isNatural ?? false,
      });
      setShow(false);
      await loadData();
      reset(defaultValuesAdd);
      toast.success('Orchid added successfully!');
    } catch (error) {
      console.log(error.message);
      toast.error(getErrorMessage(error));
    }
  };

  const onSubmitEdit = async (data) => {
    if (!orchidToEdit) return;
    try {
      await updateOrchid(orchidToEdit.orchidID, {
        orchidName: data.orchidName,
        orchidUrl: data.orchidUrl,
        orchidDescription: data.orchidDescription || null,
        categoryID: data.categoryID || null,
        isNatural: data.isNatural ?? false,
      });
      setShowEdit(false);
      setOrchidToEdit(null);
      await loadData();
      reset(defaultValuesAdd);
      toast.success('Đã cập nhật orchid.');
    } catch (error) {
      console.log(error.message);
      toast.error(getErrorMessage(error));
    }
  };

  const handleUseLocalImages = async () => {
    if (orchidList.length < 2) {
      toast.error('Cần ít nhất 2 orchid để dùng ảnh local.');
      return;
    }
    try {
      const first = orchidList[0];
      const second = orchidList[1];
      await updateOrchid(first.orchidID, { ...first, orchidUrl: LOCAL_IMAGE_1 });
      await updateOrchid(second.orchidID, { ...second, orchidUrl: LOCAL_IMAGE_2 });
      await loadData();
      toast.success('Đã đổi 2 orchid đầu sang ảnh trong public/images và lưu vào database.');
    } catch (error) {
      console.log(error.message);
      toast.error(getErrorMessage(error));
    }
  };

  const imageSrc = (url) => (url ? url : null);

  const handleImageFileChange = (e, setValueField) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setValueField('orchidUrl', reader.result, { shouldValidate: true });
    reader.readAsDataURL(file);
  };

  return (
    <Container fluid className="py-4 px-4">
      <Toaster position="top-center" />

      <Table striped bordered hover className="my-4 align-middle orchid-list-table">
        <thead className="table-light">
          <tr>
            <th style={{ width: '140px', fontSize: '1.15rem' }}>Image</th>
            <th style={{ fontSize: '1.15rem' }}>Orchid name</th>
            <th style={{ width: '140px', fontSize: '1.15rem' }}>Original</th>
            <th style={{ width: '220px', fontSize: '1.15rem' }}>
              <Button
                type="button"
                variant="primary"
                onClick={handleShow}
                className="d-inline-flex align-items-center gap-2 py-2 px-3"
                style={{ fontSize: '1.05rem' }}
              >
                <i className="bi bi-plus-lg" /> Add new orchid
              </Button>
            </th>
          </tr>
        </thead>
        <tbody>
          {orchidList.map((orchid) => (
            <tr key={orchid.orchidID}>
              <td className="text-center py-3">
                {imageSrc(orchid.orchidUrl) ? (
                  <Image
                    src={orchid.orchidUrl}
                    alt={orchid.orchidName}
                    rounded
                    style={{ width: 96, height: 96, objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/96?text=No+Image';
                    }}
                  />
                ) : (
                  <div className="bg-light rounded d-inline-flex align-items-center justify-content-center text-muted" style={{ width: 96, height: 96 }}>
                    <i className="bi bi-image" style={{ fontSize: '2rem' }} />
                  </div>
                )}
              </td>
              <td className="py-3" style={{ fontSize: '1.1rem' }}>{orchid.orchidName}</td>
              <td className="py-3">
                {orchid.isNatural ? (
                  <span className="badge text-bg-success" style={{ fontSize: '1rem', padding: '0.4em 0.6em' }}>Natural</span>
                ) : (
                  <span className="badge text-bg-warning text-dark" style={{ fontSize: '1rem', padding: '0.4em 0.6em' }}>Industry</span>
                )}
              </td>
              <td className="py-3">
                <button
                  type="button"
                  className="btn btn-link p-0 text-primary text-decoration-none me-3 border-0 bg-transparent"
                  style={{ fontSize: '1.1rem' }}
                  onClick={() => handleEditShow(orchid)}
                >
                  <i className="bi bi-pencil-square" /> Edit
                </button>
                <Link
                  to="#"
                  className="text-dark text-decoration-none"
                  style={{ fontSize: '1.1rem' }}
                  onClick={(e) => {
                    e.preventDefault();
                    if (confirm('Are you sure you want to delete this orchid?')) handleDelete(orchid.orchidID);
                  }}
                >
                  <i className="bi bi-trash3" /> Delete
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {orchidList.length === 0 && (
        <p className="text-center text-muted py-4" style={{ fontSize: '1.1rem' }}>No orchids yet. Click &quot;Add new orchid&quot; to create one.</p>
      )}

      

      <Modal show={show} onHide={handleClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>New Orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Orchid name"
                autoFocus
                isInvalid={!!errors.orchidName}
                {...register('orchidName', { required: 'Tên không được để trống' })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orchidName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh <span className="text-danger">*</span></Form.Label>
              <div className="mb-2">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, setValue)}
                  className="form-control"
                />
                <Form.Text className="text-muted">Chọn ảnh từ máy (hoặc nhập URL bên dưới)</Form.Text>
              </div>
              <Form.Control
                type="text"
                placeholder="/images/hoalan1.jpg hoặc https://..."
                isInvalid={!!errors.orchidUrl}
                {...register('orchidUrl', { required: 'Vui lòng chọn ảnh từ máy hoặc nhập URL ảnh' })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orchidUrl?.message}
              </Form.Control.Feedback>
              {orchidUrlWatch && (orchidUrlWatch.startsWith('data:') || orchidUrlWatch.startsWith('http') || orchidUrlWatch.startsWith('/')) && (
                <div className="mt-2">
                  <Image src={orchidUrlWatch} alt="Preview" rounded style={{ maxHeight: 80, width: 'auto' }} onError={() => {}} />
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register('categoryID')}>
                <option value="">-- Chọn category --</option>
                {categoryList.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Short description..." {...register('orchidDescription')} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="switch" id="natural" label="Natural" {...register('isNatural')} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>Close</Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      <Modal show={showEdit} onHide={handleEditClose} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>Edit Orchid</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit(onSubmitEdit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Form.Control
                type="text"
                placeholder="Orchid name"
                autoFocus
                isInvalid={!!errors.orchidName}
                {...register('orchidName', { required: 'Tên không được để trống' })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orchidName?.message}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ảnh <span className="text-danger">*</span></Form.Label>
              <div className="mb-2">
                <Form.Control
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageFileChange(e, setValue)}
                  className="form-control"
                />
                <Form.Text className="text-muted">Chọn ảnh từ máy (hoặc nhập URL bên dưới)</Form.Text>
              </div>
              <Form.Control
                type="text"
                placeholder="/images/hoalan1.jpg hoặc https://..."
                isInvalid={!!errors.orchidUrl}
                {...register('orchidUrl', { required: 'Vui lòng chọn ảnh từ máy hoặc nhập URL ảnh' })}
              />
              <Form.Control.Feedback type="invalid">
                {errors.orchidUrl?.message}
              </Form.Control.Feedback>
              {orchidUrlWatch && (orchidUrlWatch.startsWith('data:') || orchidUrlWatch.startsWith('http') || orchidUrlWatch.startsWith('/')) && (
                <div className="mt-2">
                  <Image src={orchidUrlWatch} alt="Preview" rounded style={{ maxHeight: 80, width: 'auto' }} onError={() => {}} />
                </div>
              )}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register('categoryID')}>
                <option value="">-- Chọn category --</option>
                {categoryList.map((c) => (
                  <option key={c.categoryID} value={c.categoryID}>{c.categoryName}</option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Short description..." {...register('orchidDescription')} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Check type="switch" id="edit-natural" label="Natural" {...register('isNatural')} />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleEditClose}>Close</Button>
              <Button variant="primary" type="submit">Save</Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>
    </Container>
  );
}
