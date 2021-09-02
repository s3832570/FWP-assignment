import { useState, useEffect } from "react";
import { verifyUser } from "../data/userRepository";

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

      const users = props.getUsers();
      console.log("effect logging in " + users[values.username].username);
      props.setUser(users[values.username])
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
