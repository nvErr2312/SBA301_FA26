import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import CarouselBanner from './CarouselBanner';

function Header({ searchText, onSearchChange }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('lab2_isLoggedIn');
    const user = localStorage.getItem('lab2_username');
    if (loggedIn && user) {
      setIsLoggedIn(true);
      setUsername(user);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('lab2_isLoggedIn');
    localStorage.removeItem('lab2_username');
    setIsLoggedIn(false);
    setUsername('');
    navigate('/');
    window.location.reload();
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
            </Nav>

            {/* Update form search  chuẩn react*/}
            <Form className="d-flex" style={{ width: 300 }}>
              <Form.Control
                type="search"
                placeholder="Search orchid..."
                value={searchText}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </Form>

            <Nav className="ms-3">
              {isLoggedIn ? (
                <>
                  <Nav.Link style={{
                    color: '#28a745',
                    fontWeight: '600',
                    fontSize: '15px',
                    marginRight: '15px'
                  }}>
                    👤 {username}
                  </Nav.Link>
                  <Nav.Link onClick={handleLogout} style={{
                    color: '#dc3545',
                    fontWeight: '600',
                    textDecoration: 'none',
                    fontSize: '15px',
                    cursor: 'pointer'
                  }}>
                    Đăng Xuất
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/login" style={{
                  color: '#28a745',
                  fontWeight: '600',
                  textDecoration: 'none',
                  fontSize: '15px'
                }}>
                  Đăng Nhập
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