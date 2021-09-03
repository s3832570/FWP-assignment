import { useState } from "react";

const useProfile = (props) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const user = props.user;

  const [values, setValues] = useState({
    username: user.username,
    password: user.password,
    firstname: user.firstname,
    lastname: user.lastname,
    email: user.email,
    joinDate: user.joinDate,
    avatar: user.avatar,
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
    showPopup,
  };
};

export default useProfile;
