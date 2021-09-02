import usePosts from "../hooks/usePosts";
import "../containers/Forum.css";
import React, { useEffect } from "react";
import Popup from "./Popup";
import { updatePosts } from "../data/postRepository";

function Feed(props) {
  const {
    handleChange,
    getAllPosts,
    validatePost,
    values,
    setValues,
    error,
    deletePost,
    editPost,
    setEditPost,
    togglePopup,
    handleSubmit,
    updatePost,
  } = usePosts(props);

  useEffect(() => {}, [deletePost]);

  const posts = getAllPosts();

  function resetTextarea() {
    setValues((values) => ({ ...values, post: "" }));
  }

  return (
    <div className="post-wrapper">
      <table className="forum-table">
        <tbody>
          <tr>
            <td>
              <div className="post-input">
                <table className="post-table">
                  <tbody>
                    <tr>
                      <td>
                        <textarea
                          name="post"
                          id="post"
                          rows="5"
                          cols="60"
                          value={values.post}
                          placeholder="What's on your mind?"
                          onChange={handleChange}
                        />
                      </td>
                    </tr>
                    <tr>
                      <td className="post-button">
                        <button
                          onClick={() => {
                            resetTextarea();
                            validatePost();
                          }}
                          type="reset"
                        >
                          Post
                        </button>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        {error && <p className="help is-danger">{error}</p>}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="all-posts">
                {Object.keys(posts)
                  .reverse()
                  .map((i) => {
                    const post = posts[i];
                    return (
                      <div>
                        <table className="post">
                          <tbody>
                            <tr>
                              <td className="post-creator">{post.user}</td>
                            </tr>
                            <tr>
                              <td className="data-dropdown">
                                <div className="dropdown">
                                  <button className="dropbtn">Options</button>
                                  <div className="dropdown-content">
                                    <button
                                      value={post.postID}
                                      onClick={(e) => {
                                        deletePost(e.target.value);
                                      }}
                                    >
                                      Delete
                                    </button>
                                    <button
                                      id={post.postID}
                                      value={post.post}
                                      name={post.user}
                                      onClick={(e) => {
                                        togglePopup();
                                        setValues((values) => ({
                                          ...values,
                                          postID: post.postID,
                                        }));
                                        setValues((values) => ({
                                          ...values,
                                          user: post.user,
                                        }));
                                      }}
                                    >
                                      Edit post
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                            <tr>
                              <td className="post-contents">{post.post}</td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    );
                  })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      {editPost === true && (
        <Popup
          content={
            <div>
              <table>
                <tbody>
                  <tr>
                    <td>
                      <textarea
                        name="post"
                        id="post"
                        rows="5"
                        cols="60"
                        value={values.post}
                        placeholder={editPost.post}
                        onChange={handleChange}
                      ></textarea>
                    </td>
                  </tr>
                  <tr>
                    <td style={{ textAlign: "right" }}>
                      <button
                        onClick={(e) => {
                          handleSubmit(e);
                          togglePopup();
                          resetTextarea();
                        }}
                      >
                        Update
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          }
          handleClose={togglePopup}
        />
      )}
    </div>
  );
}

export default Feed;
