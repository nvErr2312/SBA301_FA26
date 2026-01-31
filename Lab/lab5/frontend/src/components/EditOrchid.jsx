import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap';
import { toast, Toaster } from 'react-hot-toast';
import { getOrchidById, updateOrchid } from '../api/orchidApi';
import { fetchCategories } from '../api/categoryApi';

export default function EditOrchid() {
  const { orchidID } = useParams();
  const navigate = useNavigate();
  const [orchid, setOrchid] = useState(null);
  const [categoryList, setCategoryList] = useState([]);
  const [loading, setLoading] = useState(true);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm({ mode: 'onTouched' });

  const orchidUrlWatch = watch('orchidUrl');

  const getErrorMessage = (error) =>
    error.response?.data?.message || error.message || 'Đã xảy ra lỗi';

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const list = await fetchCategories();
        setCategoryList(list);
      } catch (e) {
        // ignore
      }
    };
    loadCategories();
  }, []);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await getOrchidById(orchidID);
        setOrchid(data);
        reset({
          orchidName: data.orchidName ?? '',
          orchidUrl: data.orchidUrl ?? '',
          orchidDescription: data.orchidDescription ?? '',
          categoryID: data.category?.categoryID ?? '',
          isNatural: data.isNatural ?? false,
        });
      } catch (error) {
        console.log(error);
        toast.error(getErrorMessage(error));
        navigate('/');
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [orchidID, reset, navigate]);

  const onSubmit = async (data) => {
    try {
      await updateOrchid(orchidID, {
        orchidName: data.orchidName,
        orchidUrl: data.orchidUrl,
        orchidDescription: data.orchidDescription || null,
        categoryID: data.categoryID || null,
        isNatural: data.isNatural ?? false,
      });
      toast.success('Đã cập nhật orchid.');
      navigate('/');
    } catch (error) {
      console.log(error);
      toast.error(getErrorMessage(error));
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <p className="text-muted">Đang tải...</p>
      </Container>
    );
  }

  const handleImageFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = () => setValue('orchidUrl', reader.result, { shouldValidate: true });
    reader.readAsDataURL(file);
  };

  if (!orchid) return null;

  return (
    <Container fluid className="py-4 px-4">
      <Toaster position="top-center" />

      <Row className="justify-content-center">
        <Col xs={12} md={11} lg={10} xl={9} style={{ maxWidth: '1200px' }}>
          <p className="mb-1 text-dark fw-medium">Edit the orchid: {orchid.orchidName}</p>
          <hr className="mb-4" />

          <form onSubmit={handleSubmit(onSubmit)}>
            <Form.Group className="mb-3">
              <Form.Label>Name <span className="text-danger">*</span></Form.Label>
              <Controller
                name="orchidName"
                control={control}
                rules={{ required: 'Tên không được để trống' }}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="Orchid name"
                    isInvalid={!!errors.orchidName}
                    {...field}
                  />
                )}
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
                  onChange={handleImageFileChange}
                  className="form-control"
                />
                <Form.Text className="text-muted">Chọn ảnh từ máy (hoặc nhập URL bên dưới)</Form.Text>
              </div>
              <Controller
                name="orchidUrl"
                control={control}
                rules={{ required: 'Vui lòng chọn ảnh từ máy hoặc nhập URL ảnh' }}
                render={({ field }) => (
                  <Form.Control
                    type="text"
                    placeholder="https://... hoặc /images/hoalan1.jpg"
                    isInvalid={!!errors.orchidUrl}
                    {...field}
                  />
                )}
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
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Short description..."
                {...register('orchidDescription')}
              />
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Check
                type="switch"
                id="edit-natural"
                label="Natural"
                {...register('isNatural')}
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button variant="primary" type="submit">
                Save
              </Button>
              <Button variant="secondary" type="button" onClick={() => navigate('/')}>
                Back to list
              </Button>
            </div>
          </form>
        </Col>
      </Row>
    </Container>
  );
}
