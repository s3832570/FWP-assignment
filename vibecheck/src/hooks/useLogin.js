import { useState } from "react";
import { verifyUser } from "../data/userRepository";

const useLogin = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");

  /* 
  Verifies the users username and password, creates a user object and 
  sets the user as the logged in user, then pushes user to profile page.
  If the username or password is incorrect sets an error.
  */
  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    if (verifyUser(values.username, values.password) === true) {
      const users = props.getUsers();
      props.setUser(users[values.username]);
      props.history.push("/profile");
    }
    setError("Username or password is incorrect.");
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  return {
    handleSubmit,
    handleChange,
    values,
    error,
  };
};

export default useLogin;
