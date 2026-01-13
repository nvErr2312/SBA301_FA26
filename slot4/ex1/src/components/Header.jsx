import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Form from "react-bootstrap/Form";

function Header({ searchText, onSearchChange }) {
  return (
    <Navbar bg="light" expand="lg" className="border-bottom">
      <Container>
        <Navbar.Brand className="fw-bold">FlowerShop</Navbar.Brand>

        <Navbar.Toggle />

        <Navbar.Collapse>
          <Nav className="me-auto">
            <Nav.Link>Home</Nav.Link>
            <Nav.Link>About</Nav.Link>
            <Nav.Link>Contact</Nav.Link>
          </Nav>

          {/* SEARCH BAR */}
          <Form className="d-flex" style={{ width: 300 }}>
            <Form.Control
              type="search"
              placeholder="Search orchid..."
              value={searchText}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;