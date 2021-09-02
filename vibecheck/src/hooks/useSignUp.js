import { useState } from "react";

const useSignUp = (props) => {
  const [values, setValues] = useState({
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    email: "",
    joinDate: "",
    avatar: "https://data.whicdn.com/images/355233905/original.jpg",
  });
  const [error] = useState("");

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const d1 = new Date();
    const date = d1.toDateString();

    const user = { ...values };
    user.joinDate = date;

    props.addOrUpdateUser(user);

    const users = props.getUsers();

    props.loginUser(users[values.username]);
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
