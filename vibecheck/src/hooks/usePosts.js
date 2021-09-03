import { useState, useEffect } from "react";
import { getPosts } from "../data/postRepository";

const usePosts = (props) => {
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

  useEffect(() => {}, [values]);

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
    console.log(e.target.value);
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const post = { ...values };

    console.log(post.postID);

    post.user = props.user.firstname + " " + props.user.lastname;
    post.username = props.user.username;

    props.createOrUpdatePost(post);
  };

  const getAllPosts = () => {
    const allPosts = getPosts();
    return allPosts;
  };

  const validatePost = () => {
    if (values.post) {
      handleSubmit();
      setError("");
    } else {
      setError("Your post cannot be empty.");
    }
  };

  const deletePost = (postID) => {
    setValues((values) => ({ ...values, post: "" }));

    props.deletePost(postID);
  };

  const togglePopup = () => {
    setEditPost(!editPost);
  };

  const toggleAttachImage = () => {
    setAttachImage(!attachImage);
  }

  return {
    handleChange,
    handleSubmit,
    getAllPosts,
    validatePost,
    values,
    setValues,
    error,
    deletePost,
    editPost,
    togglePopup,
    attachImage,
    toggleAttachImage
  };
};

export default usePosts;
