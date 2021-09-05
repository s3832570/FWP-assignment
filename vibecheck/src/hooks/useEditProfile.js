import { useState } from "react";

const useEditProfile = (props, context) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const [values, setValues] = useState({
    username: context.username,
    password: context.password,
    firstname: context.firstname,
    lastname: context.lastname,
    email: context.email,
    joinDate: context.joinDate,
    avatar: context.avatar
  });

  // Handles the values changes
  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  // Changes the users avatar
  const changeAvatar = (src) => {
    setValues((values) => ({ ...values, avatar: src }));
  };

  /*
   Creates a user object and then adds it to the localsotrage and 
   sets the user as the logged in user
   */
  const updateProfile = () => {
    const user = { ...values };

    props.addOrUpdateUser(user);
    props.setUser(user);
    setShowEditProfile(false);
  };

  // Toggles whether the user is uploading an avatar
  const toggleUploadAvatar = () => {
    setUploadingAvatar(!uploadingAvatar);
  };

  // Toggles whether a user is setting their avatar
  const togglePopup = () => {
    setEditAvatar(!editAvatar);
  };

  return {
    values,
    setValues,
    changeAvatar,
    updateProfile,
    toggleUploadAvatar,
    uploadingAvatar,
    togglePopup,
    editAvatar,
    handleChange,
  };
};

export default useEditProfile;
