import { useState } from "react";

const useEditProfile = (props) => {
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [editAvatar, setEditAvatar] = useState(false);

  const [uploadingAvatar, setUploadingAvatar] = useState(false);

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

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const changeAvatar = (src) => {
    setValues((values) => ({ ...values, avatar: src }));
  };

  const updateProfile = () => {
    const user = { ...values };

    props.addOrUpdateUser(user);
    props.setUser(user);
    setShowEditProfile(false);
  };

  const toggleUploadAvatar = () => {
    setUploadingAvatar(!uploadingAvatar);
  };

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
