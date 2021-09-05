import { useState, useEffect } from "react";

const usePosts = (props, context) => {
  const [values, setValues] = useState({
    postID: "",
    user: "",
    username: "",
    post: "",
    img: ""
  });

  const [error, setError] = useState("");

  const [editPost, setEditPost] = useState(false);

  const [attachImage, setAttachImage] = useState(false);

  const [filter, setFilter] = useState("");

  useEffect(() => {}, [values]);
  useEffect(() => {}, [filter]);

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleFilterChange = (e) => {
    e.persist();
    setFilter(e.target.value);
  }

  /*
  Creates a post object and adds a user and username to the object.
  Then adds the object to local storage.
  */
  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const post = { ...values };

    post.user = context.firstname + " " + context.lastname;
    post.username = context.username;

    props.createOrUpdatePost(post);
  };

  /*
  Makes sure that the users post isn't empty, sets an error if it is.
  */
  const validatePost = () => {
    if (values.post) {
      handleSubmit();
      setError("");
    } else {
      setError("Your post cannot be empty.");
    }
  };

  /*
  Removes a users post from local storage.
  */
  const deletePost = (postID) => {
    setValues((values) => ({ ...values, post: "" }));

    props.deletePost(postID);
  };

  /*
  Toggles whether a user is editing a post or not.
  */
  const togglePopup = () => {
    setEditPost(!editPost);
  };

  /*
  Toggles whether a user is attaching an image or not.
  */
  const toggleAttachImage = () => {
    setAttachImage(!attachImage);
  }

  return {
    handleChange,
    validatePost,
    values,
    setValues,
    error,
    deletePost,
    editPost,
    togglePopup,
    handleSubmit,
    attachImage,
    toggleAttachImage,
    filter,
    handleFilterChange
  };
};

export default usePosts;
