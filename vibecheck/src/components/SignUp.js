import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import { Form } from "react-bootstrap";
import useSignUp from "../hooks/useSignUp";
import "../containers/SignUp.css";

function SignUp(props) {
  const { handleChange, values, handleSubmit, error } = useSignUp(props);

  return (
    <div className="SignUp">
      <div className="Details">
        <Form>
          <h1>Sign up</h1>
          <Form.Group className="username" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="username"
              name="username"
              placeholder="Username"
              value={values.username || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="password" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              placeholder="Password"
              defaultValue={values.password || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="firstname" controlId="formBasicFirstname">
            <Form.Label>Firstname</Form.Label>
            <Form.Control
              type="firstname"
              name="firstname"
              placeholder="Firstname"
              defaultValue={values.firstname || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="lastname" controlId="formBasicLastname">
            <Form.Label>Lastname</Form.Label>
            <Form.Control
              type="lastname"
              name="lastname"
              placeholder="Lastname"
              defaultValue={values.lastname || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="email" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              name="email"
              placeholder="email"
              defaultValue={values.email || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <button
            className="submit"
            variant="primary"
            type="submit"
            onClick={handleSubmit}
          >
            Sign up
          </button>
        </Form>
        {error && <p className="help is-danger">{error}</p>}
      </div>
    </div>
  );
}

export default SignUp;
