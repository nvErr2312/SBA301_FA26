import React, { useEffect, useMemo, useState } from "react";
import { Row, Col } from "react-bootstrap";
import Orchid from "./Orchid.jsx";
import FilterSort from "./FilterSort.jsx";


import { getOrchids } from "../api/orchidAPI";

function ListOfOrchid({ searchText = "" }) {
  const [orchids, setOrchids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [filterCategory, setFilterCategory] = useState("");
  const [sortOption, setSortOption] = useState("");

  // 1) LẤY DỮ LIỆU TỪ JSON SERVER
  useEffect(() => {
    let isMounted = true;

    async function load() {
      try {
        setLoading(true);
        setError("");

        const data = await getOrchids(); // phải trả về array
        if (isMounted) setOrchids(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("getOrchids error:", err);
        if (isMounted)
          setError("Không tải được dữ liệu. Hãy kiểm tra JSON Server (8080) đang chạy.");
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    load();

    // ✅ tránh warning setState khi component unmount
    return () => {
      isMounted = false;
    };
  }, []);

  // 2) CATEGORY an toàn (lọc bỏ null/undefined)
  const categories = useMemo(() => {
    return [...new Set(orchids.map((o) => o?.category).filter(Boolean))];
  }, [orchids]);

  // 3) FILTER + SEARCH + SORT
  const filteredOrchids = useMemo(() => {
    let result = [...orchids];

    // FILTER
    if (filterCategory) {
      result = result.filter((o) => o?.category === filterCategory);
    }

    // SEARCH (an toàn nếu orchidName thiếu)
    if (searchText?.trim()) {
      const s = searchText.toLowerCase().trim();
      result = result.filter((o) =>
        (o?.orchidName ?? "").toLowerCase().includes(s)
      );
    }

    // SORT (an toàn nếu price là string/null)
    switch (sortOption) {
      case "asc":
        result.sort((a, b) => Number(a?.price ?? 0) - Number(b?.price ?? 0));
        break;
      case "desc":
        result.sort((a, b) => Number(b?.price ?? 0) - Number(a?.price ?? 0));
        break;
      case "name-asc":
        result.sort((a, b) =>
          (a?.orchidName ?? "").localeCompare(b?.orchidName ?? "")
        );
        break;
      case "name-desc":
        result.sort((a, b) =>
          (b?.orchidName ?? "").localeCompare(a?.orchidName ?? "")
        );
        break;
      default:
        break;
    }

    return result;
  }, [orchids, filterCategory, sortOption, searchText]);

  // UI trạng thái tải / lỗi
  if (loading) {
    return <div className="text-center py-5">Đang tải dữ liệu hoa lan...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-5">
        <h5 className="text-danger">{error}</h5>
        <p className="text-muted mb-0">
          Test nhanh: mở <b>http://localhost:8080/orchids</b> xem có ra JSON không.
        </p>
      </div>
    );
  }

  return (
    <div className="py-4">
      <FilterSort
        categories={categories}
        onFilterChange={setFilterCategory}
        onSortChange={setSortOption}
      />

      {filteredOrchids.length === 0 ? (
        <div className="text-center py-5">
          <h4 className="text-muted">Không tìm thấy kết quả nào</h4>
          <p className="text-muted mt-2">Vui lòng thử lại với từ khóa hoặc bộ lọc khác</p>
        </div>
      ) : (
        <Row className="g-4">
          {filteredOrchids.map((orchid) => (
            <Col key={orchid?.id} xs={12} sm={6} md={4} lg={3} className="d-flex">
              <Orchid {...orchid} />
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
}

export default ListOfOrchid;
