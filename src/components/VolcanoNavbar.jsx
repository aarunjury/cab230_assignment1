import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Icon from "../img/icon.png";
import { useNavigate } from "react-router-dom";

export default function VolcanoNavbar(props) {
  const navigate = useNavigate();

  function logout() {
    props.setIsAuth(false);
    localStorage.removeItem("token", null);
    navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Col>
          <img
            alt="logo"
            src={Icon}
            width="30"
            height="30"
            className="d-inline-block align-top"
            href="/"
          />
          <Navbar.Brand href="/">Volcanoes of the World</Navbar.Brand>
        </Col>
        <Col className="d-flex align-items-end flex-column">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="/volcanoeslist">All Volcanoes</Nav.Link>
              {props.isAuth && <Nav.Link onClick={logout}>Logout</Nav.Link>}
              {!props.isAuth && <Nav.Link href="/register">Register</Nav.Link>}
              {!props.isAuth && <Nav.Link href="/login">Login</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}
