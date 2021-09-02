import { useState, useEffect } from "react";
import { getPosts } from "../data/postRepository";

const usePosts = (props) => {
  const [values, setValues] = useState({
    postID: "",
    user: "",
    post: "",
  });

  const [error, setError] = useState("");

  const [editPost, setEditPost] = useState(false);

  useEffect(() => {}, [values]);

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const post = { ...values };

    console.log(post.postID);

    post.user = props.user.firstname + " " + props.user.lastname;

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

  const updatePost = (e) => {
    //   if (e) e.preventDefault();
    //   const post = { postID: editPost.id, user: editPost.user, post: editPost.post };
    //   console.log("new post " + post.postID);
    //   props.createOrUpdatePost(post);
  };

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
    setEditPost,
    togglePopup,
    updatePost,
  };
};

export default usePosts;
