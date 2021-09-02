import { useState } from "react";

const useProfile = (props) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const username = props.user.username;
  const users = props.getUsers();



  const [values, setValues] = useState({
    username: users[username].username,
    password: users[username].password,
    firstname: users[username].firstname,
    lastname: users[username].lastname,
    email: users[username].email,
    joinDate: users[username].joinDate,
    avatar: users[username].avatar
  });

  const editProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  const updateProfile = () => {
    const user = { ... values };

    props.addOrUpdateUser(user);
    props.setUser(user);
    setShowEditProfile(false);
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const deleteUser = () => {
    const user = { ...values }
    props.removeUser(user);
    props.logoutUser();
    props.history.push("/");
  };

  const togglePopup = () => {
    setShowPopup(!showPopup);
  };



  return {
    values,
    setValues,
    editProfile,
    updateProfile,
    handleChange,
    showEditProfile,
    deleteUser,
    togglePopup,
    showPopup
  };
};

export default useProfile;
