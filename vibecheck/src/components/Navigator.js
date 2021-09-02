import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../containers/Navigator.css";

function Navigator(props) {
  return (
    <Navbar className="navbar-light" expand="lg">
      <Container>
        <Navbar.Brand href="#home">Vibe Check</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {props.user === null ? (
              <React.Fragment>
                <Nav.Link className="user-links" href="/login">
                  Login
                </Nav.Link>
                <Nav.Link className="user-links" href="/signup">
                  Sign up
                </Nav.Link>
              </React.Fragment>
            ) : (
              <React.Fragment>
                <Nav.Link href="/profile">Profile</Nav.Link>
                <Nav.Link href="/forum">Feed</Nav.Link>
              </React.Fragment>
            )}
          </Nav>
          <Nav className="ms-auto">
            {props.user !== null && (
              <React.Fragment>
                <Navbar.Text className="welcome">
                  Welcome, {props.user.username}!
                </Navbar.Text>
                <Nav.Link href="/login" onClick={props.logoutUser}>
                  Logout
                </Nav.Link>{" "}
                <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
              </React.Fragment>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigator;
