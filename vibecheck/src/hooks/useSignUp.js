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
  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  // Checks that the user name that the user has entered hasn't
  // already been taken. It then checks if all the fields are filled
  // in. If both criteria are met, creates new user, adds the user to
  // local storage, sets the user as logged in and pushed them to the
  // home page.
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (props.checkUserAvailable(values.username) === true) {
      setError("");
      const d1 = new Date();
      const date = d1.toDateString();

      const user = { ...values };
      user.joinDate = date;

      if (checkFieldsNotBlank(user) === true) {
        console.log(checkFieldsNotBlank(user));
        props.addOrUpdateUser(user);

        const users = props.getUsers();

        props.loginUser(users[values.username]);
        props.history.push("/");
      }
    } else {
      setError("This username is already taken");
    }
  };

  // Checks to see if the user has left any fields empty
  const checkFieldsNotBlank = (user) => {
    var filled = true;
    Object.keys(user).map((key) => {
      if (!values[key] && key !== "joinDate") {
        console.log(key);
        setError("You cannot leave any fields blank.");
        filled = false;
      }
    });
    return filled;
  };

  return {
    handleChange,
    values,
    handleSubmit,
    error,
  };
};

export default useSignUp;
