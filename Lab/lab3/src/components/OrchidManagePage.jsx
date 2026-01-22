import React, { useEffect, useState, useMemo } from "react";
import { Container, Button, Table } from "react-bootstrap";

import OrchidForm from "./OrchidForm";
import ConfirmModal from "./ConfirmModal";

import {
  getOrchids,
  createOrchid,
  updateOrchid,
  deleteOrchid,
} from "../api/orchidAPI";

export default function OrchidManagePage() {
  const [orchids, setOrchids] = useState([]);

  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null); // null = add, object = edit

  const [showConfirm, setShowConfirm] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchOrchids = async () => {
    try {
      const data = await getOrchids();
      setOrchids(data);
    } catch (err) {
      console.error("Lỗi lấy danh sách orchids:", err);
    }
  };

  // Lấy danh sách category unique từ dữ liệu orchids
  const categories = useMemo(() => {
    const categorySet = new Set();
    orchids.forEach((orchid) => {
      if (orchid.category) {
        categorySet.add(orchid.category);
      }
    });
    return Array.from(categorySet).sort();
  }, [orchids]);

  useEffect(() => {
    fetchOrchids();
  }, []);

  const openCreate = () => {
    setEditing(null);
    setShowForm(true);
  };

  const openEdit = (orchid) => {
    setEditing(orchid);
    setShowForm(true);
  };

  const handleSubmit = async (data) => {
    try {
      if (editing) {
        await updateOrchid(editing.id, data);
      } else {
        await createOrchid(data);
      }

      setShowForm(false);
      setEditing(null);
      fetchOrchids();
    } catch (err) {
      console.error("Lỗi thêm/sửa orchid:", err);
    }
  };

  const askDelete = (id) => {
    setDeletingId(id);
    setShowConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteOrchid(deletingId);
      setShowConfirm(false);
      setDeletingId(null);
      fetchOrchids();
    } catch (err) {
      console.error("Lỗi xóa orchid:", err);
    }
  };

  return (
    <Container className="mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Quản lý Orchids (CRUD)</h2>
        <Button variant="success" onClick={openCreate}>
          + Thêm Orchid
        </Button>
      </div>

      <Table bordered hover responsive>
        <thead>
          <tr>
            <th>Id</th>
            <th>Ảnh</th>
            <th>Tên</th>
            <th>Mô tả</th>
            <th>Giá</th>
            <th>Loại</th>
            <th>Đặc biệt</th>
            <th>Hành động</th>
          </tr>
        </thead>

        <tbody>
          {orchids.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center">
                Chưa có dữ liệu.
              </td>
            </tr>
          ) : (
            orchids.map((o, idx) => (
              <tr key={o.id}>
                <td>{idx + 1}</td>
                <td>
                  {o.image ? (
                    <img 
                      src={`/${o.image}`} 
                      alt={o.orchidName || o.name || "Orchid"} 
                      style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "4px" }}
                    />
                  ) : (
                    <span className="text-muted">Không có ảnh</span>
                  )}
                </td>
                <td>{o.orchidName || o.name || "N/A"}</td>
                <td style={{ maxWidth: "200px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {o.description || "N/A"}
                </td>
                <td>{o.price ? o.price.toLocaleString() + " VND" : "N/A"}</td>
                <td>{o.category || "N/A"}</td>
                <td>{o.isSpecial ? "🌟 Có" : "Không"}</td>
                <td className="d-flex gap-2">
                  <Button variant="warning" size="sm" onClick={() => openEdit(o)}>
                    Sửa
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => askDelete(o.id)}>
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>

      {/* Form thêm/sửa */}
      <OrchidForm
        show={showForm}
        onHide={() => {
          setShowForm(false);
          setEditing(null);
        }}
        initialData={editing}
        onSubmit={handleSubmit}
        categories={categories}
      />

      {/* Confirm xóa */}
      <ConfirmModal
        show={showConfirm}
        title="Xác nhận xóa"
        message="Bạn có chắc muốn xóa orchid này không?"
        onCancel={() => setShowConfirm(false)}
        onConfirm={confirmDelete}
      />
    </Container>
  );
}
