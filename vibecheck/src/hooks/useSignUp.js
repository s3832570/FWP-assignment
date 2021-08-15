import { useState } from "react";
import { addNewUser } from "../data/repository";

const useSignUp = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: ""
  });
  const [error] = useState("");

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log(values.username);
  };

  const handleSubmit = (e) => {
    console.log("Signing up user");
    if (e) e.preventDefault();
    addNewUser(values.username, values.password, values.firstname, values.password, values.email);
    props.loginUser(values.username);
    props.history.push("/");
  };

  return {
    handleChange,
    handleSubmit,
    values,
    error,
  };
};

export default useSignUp;
