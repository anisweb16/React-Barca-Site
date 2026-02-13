import { Navbar, Container, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import logo from '../assets/logo.webp'
import '../assets/fcb.css'

function AppNavbar() {
  return (
    <Navbar expand="lg" className="fcb-navbar">
      <Container>

        {/* LOGO + TITRE */}
        <Navbar.Brand
          as={Link}
          to="/"
          className="d-flex align-items-center gap-3"
        >
          <img
            src={logo}
            alt="FC Barcelona"
            className="logo-fcb"
          />

          <div className="brand-text">
            <div className="brand-title">ERP Estadio</div>
            <div className="brand-subtitle">
              Ventas de Tickets - Camp Nou
            </div>
          </div>
        </Navbar.Brand>

        <Nav className="ms-auto">
          <Nav.Link as={Link} to="/">Ventas</Nav.Link>
          <Nav.Link as={Link} to="/ventas/nuevo">
            Nueva venta
          </Nav.Link>
        </Nav>

      </Container>
    </Navbar>
  )
}

export default AppNavbar
