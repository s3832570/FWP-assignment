import { useState } from "react";
function useEditPost(props) {
  const [values, setValues] = useState({
    post: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  const validatePost = () => {
    if (values.post) {
      handleSubmit();
      setError("");
      props.history.push("/feed");
    } else {
      setError("Your post cannot be empty.");
    }
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    const post = { 
        postID: props.postToEdit.postID,
        user: props.postToEdit.user,
        post: values.post
     };

    props.createOrUpdatePost(post);
  };

  return {
    values,
    error,
    handleChange,
    validatePost,
  };
}

export default useEditPost;
