import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import {
  Navbar,
  Nav,
  Container,
} from "react-bootstrap";
import "../containers/Navigator.css";

function Navigator(props) {
  console.log("props username " + props.username);
    return (
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Vibe Check</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/">Home</Nav.Link>
              {props.username === null ? 
              
                <Nav.Link href="/login">Login</Nav.Link>
                :
                <Nav.Link href="/profile">Profile</Nav.Link>
              }
            </Nav>
            <Nav className="ms-auto">
              {props.username !== null &&
                <React.Fragment>
                  <Nav.Link href="/login" onClick={props.logoutUser}>
                    Logout
                  </Nav.Link>{" "}
                  <Navbar.Collapse className="justify-content-end"></Navbar.Collapse>
                  <Navbar.Text className="welcome">Welcome, {props.username}</Navbar.Text>
                </React.Fragment>
              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}

export default Navigator;
