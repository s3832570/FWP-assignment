import { useState, useEffect } from "react";
import { propTypes } from "react-bootstrap/esm/Image";
import { useHistory } from "react-router-dom";
import { verifyUser } from "../data/repository";

const useLogin = (callback, props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  useEffect(() => {
    if (Object.keys(error).length === 0) {
      callback();
    }
  }, [error]);

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (verifyUser(values.username, values.password) === true) {
      props.loginUser(values.username);
      props.history.push("/");
    }
    setError("Username or password is incorrect.");
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log(values.username);
    };

  return {
    handleSubmit,
    handleChange,
    values,
    error,
  };
};

export default useLogin;
