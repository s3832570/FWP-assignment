import { useState } from "react";

const useProfile = (props, context) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showPopup, setShowPopup] = useState(false);


  const [values, setValues] = useState({
    username: context.username,
    password: context.password,
    firstname: context.firstname,
    lastname: context.lastname,
    email: context.email,
    joinDate: context.joinDate,
    avatar: context.avatar
  });

  /**
   * Toggles whether a user is editing their profile or not
   */
  const editProfile = () => {
    setShowEditProfile(!showEditProfile);
  };

  /**
   * Creates a user object and adds the updated user to the local storage.
   */
  const updateProfile = () => {
    const user = { ...values };

    props.addOrUpdateUser(user);
    props.setUser(user);
    setShowEditProfile(false);
  };

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  /**
   * Removes the user from local storage, logs out the user and pushes them back to
   * the home page.
   */
  const deleteUser = () => {
    const user = { ...values }
    props.removeUser(user);
    props.deleteUserPostsAndReplies(user);
    props.logoutUser();
    props.history.push("/");
  };

  /**
   * Toggles whether the edit avatar pop up is showing.
   */
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
