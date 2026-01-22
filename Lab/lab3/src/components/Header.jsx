import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import CarouselBanner from "./CarouselBanner";
import { useAuth } from "../contexts/AuthContext";

function Header({ searchText, onSearchChange }) {
  const { state, logout } = useAuth(); // ✅ dùng logout chuẩn
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="border-bottom">
        <Container>
          <Navbar.Brand className="fw-bold">FlowerShop</Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link as={Link} to="/about">About</Nav.Link>
              <Nav.Link as={Link} to="/contact">Contact</Nav.Link>

              {/* ✅ CHỈ ADMIN MỚI THẤY */}
              {state.isLoggedIn && state.role === "admin" && (
                <Nav.Link
                  as={Link}
                  to="/manage/orchids"
                  style={{ color: "#dc3545", fontWeight: "600" }}
                >
                  Manage
                </Nav.Link>
              )}
            </Nav>

            {/* Search */}
            <Form className="d-flex" style={{ width: 300 }}>
              <Form.Control
                type="search"
                placeholder="Search orchid..."
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Form>

            <Nav className="ms-3">
              {state.isLoggedIn ? (
                <>
                  <Nav.Link style={{ color: "#28a745", fontWeight: 600 }}>
                    👤 {state.username} ({state.role})
                  </Nav.Link>
                  <Nav.Link
                    onClick={handleLogout}
                    style={{ color: "#dc3545", fontWeight: 600, cursor: "pointer" }}
                  >
                    Log out
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link
                  as={Link}
                  to="/login"
                  style={{ color: "#28a745", fontWeight: 600 }}
                >
                  Log in
                </Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CarouselBanner />
    </>
  );
}

export default Header;
