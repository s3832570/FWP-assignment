import usePosts from "../hooks/usePosts";
import "../containers/Forum.css";
import React, { useEffect } from "react";
import Popup from "./Popup";
import CameraIcon from "../icons/camera-icon.png";

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
    togglePopup,
    handleSubmit,
    attachImage,
    toggleAttachImage,
  } = usePosts(props);

  useEffect(() => {}, [deletePost]);

  const posts = getAllPosts();

  const users = props.getUsers();

  // Resets the text areas
  function resetTextarea() {
    setValues((values) => ({ ...values, post: "" }));
  }

  /*
  This returns the input area, along with the post area.
  */
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
                      <td colSpan="2">
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
                      {attachImage ? (
                        <td style={{ textAlign: "left" }} valign="top">
                          <input
                            name="img"
                            defaultValue={values.img}
                            type="text"
                            placeholder="Enter image address"
                            onChange={handleChange}
                          />
                          <button
                            style={{ padding: "1%", marginLeft: "5px" }}
                            onClick={toggleAttachImage}
                          >
                            Attach
                          </button>
                          <button
                            style={{ padding: "1%", marginLeft: "5px" }}
                            onClick={toggleAttachImage}
                          >
                            Cancel
                          </button>
                        </td>
                      ) : (
                        <td style={{ textAlign: "left" }} valign="top">
                          <button
                            style={{ backgroundColor: "transparent" }}
                            onClick={toggleAttachImage}
                          >
                            <img src={CameraIcon} style={{ height: "50px" }} />
                          </button>
                        </td>
                      )}

                      <td style={{ textAlign: "right" }}>
                        <button
                          onClick={() => {
                            resetTextarea();
                            validatePost();
                          }}
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
                    /*
                    Below the input area are all the exisiting posts, each post can be 
                    delete and editied, but only if you are logged in as the user that
                    made the post. When a user selects to edit a post, a popup window 
                    will show.
                    */
                    return (
                      <div>
                        <table className="post">
                          <tbody>
                            <tr>
                              <td className="post-creator">
                                <img
                                  className="avatar"
                                  src={users[post.username].avatar}
                                  alt="user-avatar"
                                  style={{ padding: "2%" }}
                                />
                              </td>
                              <td className="post-creator">{post.user}</td>
                            </tr>
                            <tr>
                              <td colSpan="2" className="data-dropdown">
                                {post.user ===
                                  props.user.firstname +
                                    " " +
                                    props.user.lastname && (
                                  <div className="dropdown">
                                    <button className="dropbtn">Options</button>
                                    <div className="dropdown-content">
                                      <button
                                        className="options"
                                        value={post.postID}
                                        onClick={(e) => {
                                          deletePost(e.target.value);
                                        }}
                                      >
                                        Delete
                                      </button>
                                      <button
                                        className="options"
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
                                          setValues((values) => ({
                                            ...values,
                                            post: post.post,
                                          }));
                                        }}
                                      >
                                        Edit post
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </td>
                            </tr>
                            <tr>
                              <td colSpan="2" className="post-contents">
                                {post.post}
                              </td>
                            </tr>
                            <tr>
                              <td style={{ textAlign: "center" }} colSpan="2">
                                {post.img && (
                                  <img
                                  style={{ height: "300px", padding: "2%" }}
                                  src={post.img}
                                />
                                )}
                                
                              </td>
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
      {editPost && (
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
                        placeholder={values.post}
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
