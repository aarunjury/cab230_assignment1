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
            <Nav variant="tabs" defaultActiveKey="/" className="me-auto" onSelect={(selectedKey) => navigate(`${selectedKey}`)}>
              <Nav.Item>
                <Nav.Link href="/">Home</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="/volcanoeslist">All Volcanoes</Nav.Link>
              </Nav.Item>
              {props.isAuth && <Nav.Item><Nav.Link onClick={logout}>Logout</Nav.Link></Nav.Item>}
              {!props.isAuth && <Nav.Item><Nav.Link eventKey="/register" >Register</Nav.Link></Nav.Item>}
              {!props.isAuth && <Nav.Item><Nav.Link eventKey="/login" >Login</Nav.Link></Nav.Item>}
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}
