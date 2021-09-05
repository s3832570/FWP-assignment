import { useState } from "react";
function useEditPost(props) {
  const [values, setValues] = useState({
    post: "",
  });

  const [error, setError] = useState("");

  // Handles the post value input
  const handleChange = (e) => {
    e.persist();
    setValues((values) => ({ ...values, [e.target.name]: e.target.value }));
  };

  // Checks whether the post if empty or not, if it is empty sets an error
  const validatePost = () => {
    if (values.post) {
      handleSubmit();
      setError("");
      props.history.push("/feed");
    } else {
      setError("Your post cannot be empty.");
    }
  };

  // Creates a post object and adds it to local storage
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
