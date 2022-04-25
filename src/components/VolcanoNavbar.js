import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Icon from "../img/icon.png";
import Col from "react-bootstrap/Col";
import React, { useContext } from "react";
import { AuthContext } from "./contexts/AuthContext";

export default function VolcanoNavbar({ isAuth }) {
  // const token = localStorage.getItem("token");
  const { auth, setAuth } = useContext(AuthContext);
  // const auth = false;

  // useEffect(() => {
  //   setUtoken(localStorage.getItem("token"));
  // }, [token]);

  // if (props.uToken) {
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
              {auth && <Nav.Link href="/logout">Logout</Nav.Link>}
              {!auth && <Nav.Link href="/register">Register</Nav.Link>}
              {!auth && <Nav.Link href="/login">Login</Nav.Link>}
            </Nav>
          </Navbar.Collapse>
        </Col>
      </Container>
    </Navbar>
  );
}
