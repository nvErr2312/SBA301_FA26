import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

export default function OrchidForm({
  show,
  onHide,
  initialData,
  onSubmit,
  categories = [],
}) {
  const [form, setForm] = useState({
    orchidName: "",
    description: "",
    price: "",
    category: "",
    isSpecial: false,
    image: "",
  });

  const [imagePreview, setImagePreview] = useState("");
  const [errors, setErrors] = useState({});

  // Validate theo từng field (realtime)
  const validateField = (name, value) => {
    switch (name) {
      case "orchidName": {
        if (!String(value ?? "").trim()) return "Tên hoa lan không được để trống";
        return "";
      }
      case "price": {
        const v = String(value ?? "").trim();
        if (v === "") return "Giá không được để trống";
        const n = Number(v);
        if (Number.isNaN(n)) return "Giá phải là số";
        if (n <= 0) return "Giá phải lớn hơn 0";
        return "";
      }
      case "category": {
        if (!String(value ?? "").trim()) return "Vui lòng chọn loại hoa lan";
        return "";
      }
      case "image": {
        if (!String(value ?? "").trim())
          return "Vui lòng nhập đường dẫn ảnh hoặc chọn file ảnh";
        return "";
      }
      default:
        return "";
    }
  };

  // Validate toàn bộ form (dùng cho submit)
  const validateAll = (currentForm) => {
    const newErrors = {};
    ["orchidName", "price", "category", "image"].forEach((key) => {
      const msg = validateField(key, currentForm[key]);
      if (msg) newErrors[key] = msg;
    });
    return newErrors;
  };

  useEffect(() => {
    if (initialData) {
      const nextForm = {
        orchidName: initialData.orchidName || initialData.name || "",
        description: initialData.description || "",
        price: initialData.price ?? "",
        category: initialData.category || "",
        isSpecial: initialData.isSpecial || false,
        image: initialData.image || "",
      };
      setForm(nextForm);

      // preview: nếu là url http thì dùng luôn, nếu là path local thì thêm /
      const img = nextForm.image;
      setImagePreview(
        img ? (String(img).startsWith("http") ? img : `/${img}`) : ""
      );

      // reset lỗi khi mở/sửa
      setErrors({});
    } else {
      setForm({
        orchidName: "",
        description: "",
        price: "",
        category: "",
        isSpecial: false,
        image: "",
      });
      setImagePreview("");
      setErrors({});
    }
  }, [initialData, show]);

  // Realtime validate ngay khi gõ
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;

    setForm((prev) => {
      const next = { ...prev, [name]: finalValue };

      // validate realtime cho field đó
      const msg = validateField(name, finalValue);
      setErrors((prevErr) => ({ ...prevErr, [name]: msg }));

      return next;
    });
  };

  // Nếu bạn muốn chỉ báo lỗi khi "rời ô" (onBlur) thay vì lúc gõ, dùng thêm hàm này
  const handleBlur = (e) => {
    const { name, value, type, checked } = e.target;
    const finalValue = type === "checkbox" ? checked : value;
    const msg = validateField(name, finalValue);
    setErrors((prev) => ({ ...prev, [name]: msg }));
  };

  const handleImageUrlChange = (e) => {
    const url = e.target.value;

    setForm((prev) => ({ ...prev, image: url }));

    // validate realtime
    const msg = validateField("image", url);
    setErrors((prev) => ({ ...prev, image: msg }));

    setImagePreview(url ? (url.startsWith("http") ? url : `/${url}`) : "");
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // preview bằng base64
    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(reader.result);
    reader.readAsDataURL(file);

    // giả lập lưu path (thực tế muốn dùng file thật thì phải upload lên server)
    const imagePath = `images/${file.name}`;
    setForm((prev) => ({ ...prev, image: imagePath }));

    // chọn file => coi như hợp lệ
    setErrors((prev) => ({ ...prev, image: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = validateAll(form);
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) return;

    onSubmit({
      orchidName: String(form.orchidName).trim(),
      description: form.description,
      price: Number(form.price),
      category: form.category,
      isSpecial: form.isSpecial,
      image: form.image,
    });
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? "Sửa Orchid" : "Thêm Orchid"}</Modal.Title>
      </Modal.Header>

      {/* noValidate để tránh popup validate mặc định của browser */}
      <Form onSubmit={handleSubmit} noValidate>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          {/* Tên */}
          <Form.Group className="mb-3">
            <Form.Label>
              Tên hoa lan <span className="text-danger">*</span>
            </Form.Label>

            <Form.Control
              name="orchidName"
              value={form.orchidName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập tên hoa lan"
              isInvalid={!!errors.orchidName}
            />
            <Form.Control.Feedback type="invalid">
              {errors.orchidName}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Mô tả (không bắt buộc - vẫn để feedback cho đồng bộ UI, nhưng không set lỗi) */}
          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={form.description}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập mô tả về hoa lan"
              isInvalid={!!errors.description}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Giá */}
          <Form.Group className="mb-3">
            <Form.Label>
              Giá (VND) <span className="text-danger">*</span>
            </Form.Label>
            <Form.Control
              type="number"
              name="price"
              value={form.price}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Nhập giá"
              min="0"
              isInvalid={!!errors.price}
            />
            <Form.Control.Feedback type="invalid">
              {errors.price}
            </Form.Control.Feedback>
          </Form.Group>

          {/* Loại */}
          <Form.Group className="mb-3">
            <Form.Label>
              Loại <span className="text-danger">*</span>
            </Form.Label>

            <Form.Select
              name="category"
              value={form.category}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.category}
            >
              <option value="">-- Chọn loại hoa lan --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </Form.Select>

            <Form.Control.Feedback type="invalid">
              {errors.category}
            </Form.Control.Feedback>

            {categories.length === 0 && (
              <Form.Text className="text-muted">
                Chưa có loại hoa lan nào trong hệ thống
              </Form.Text>
            )}
          </Form.Group>

          {/* Ảnh */}
          <Form.Group className="mb-3">
            <Form.Label>
              Ảnh <span className="text-danger">*</span>
            </Form.Label>

            <Form.Control
              type="text"
              name="image"
              value={form.image}
              onChange={handleImageUrlChange}
              onBlur={handleBlur}
              placeholder="Nhập đường dẫn ảnh (ví dụ: images/hoalan1.jpg hoặc URL)"
              isInvalid={!!errors.image}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>

            <Form.Text className="text-muted">Hoặc chọn file ảnh từ máy tính:</Form.Text>
            <Form.Control
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="mt-2"
            />

            {imagePreview && (
              <div className="mt-2">
                <img
                  src={imagePreview}
                  alt="Preview"
                  style={{
                    maxWidth: "200px",
                    maxHeight: "200px",
                    objectFit: "cover",
                    borderRadius: "4px",
                    border: "1px solid #ddd",
                  }}
                />
              </div>
            )}
          </Form.Group>

          {/* Special (không bắt buộc, vẫn có feedback cho đồng bộ) */}
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              name="isSpecial"
              label="Hoa lan đặc biệt"
              checked={form.isSpecial}
              onChange={handleChange}
              onBlur={handleBlur}
              isInvalid={!!errors.isSpecial}
            />
            <Form.Control.Feedback type="invalid">
              {errors.isSpecial}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onHide}>
            Hủy
          </Button>
          <Button type="submit" variant="success">
            {initialData ? "Lưu" : "Thêm"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}
