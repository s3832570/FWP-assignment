import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Navbar, Nav, Container } from "react-bootstrap";
import "../containers/Navigator.css";
import Logo from "../icons/logo.png";

function Navigator(props) {

  let context = useContext(props.loggedInUserContext);

  return (
    <Navbar className="navbar-light" expand="lg">
      <Container>
        <Navbar.Brand href="#home"><img src={Logo} height="100px" alt="logo" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
            <Nav.Link href="/">Home</Nav.Link>
          {context === null ? (
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
                <Nav.Link href="/forum">Forum</Nav.Link>
              </React.Fragment>
            )}
          </Nav>
          <Nav className="ms-auto">
            {context !== null && (
              <React.Fragment>
                <Navbar.Text className="welcome">
                  Welcome, {context.username}!
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
