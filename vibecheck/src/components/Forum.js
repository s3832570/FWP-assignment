import usePosts from "../hooks/usePosts";
import "../containers/Forum.css";
import React, { useContext } from "react";
import Popup from "./Popups/Popup";
import CameraIcon from "../icons/camera-icon.png";
import useReply from "../hooks/useReply";

function Forum(props) {

  let context = useContext(props.loggedInUserContext);

  const {
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
  } = usePosts(props, context);

  const {
    handleReplyChange,
    handleReplySubmit,
    setReply,
    reply,
    toggleIsReplying,
    isreplying,
  } = useReply(props);

  const posts = props.getPosts();
  const replies = props.getReplies();
  const users = props.getUsers();

  // Resets the text areas
  function resetTextarea() {
    setValues((values) => ({ ...values, post: "" }));
  }

  /*
  This returns the input area, along with the post area.
  */
  return (
    <div className="forum-wrapper">
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
                            placeholder="Enter image address (URL)"
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
                            <img src={CameraIcon} style={{ height: "50px" }} alt="camera-icon" />
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
              <div>
                <input
                  type="text"
                  placeholder="Filter..."
                  value={filter}
                  onChange={handleFilterChange}
                  style={{ marginTop: "15px" }}
                ></input>
                <p style={{ color: "rgb(150, 111, 155)" }} >*This is case sensistive</p>
              </div>
            </td>
          </tr>
          <tr>
            <td>
              <div className="all-posts">
                {Object.keys(posts)
                  .reverse()
                  .map((i) => {
                    var post = null;
                    if (filter && String(posts[i].user).includes(filter)) {

                      post = posts[i];
                    } else if (
                      filter &&
                      !String(posts[i].user).includes(filter)
                    ) {
                      return null;
                    } else if (!filter) {
                      post = posts[i];
                    }

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
                              <td colSpan="2" className="data-dropdown">
                                {post.user ===
                                  context.firstname +
                                    " " +
                                    context.lastname && (
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
                            <tr></tr>
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
                                    alt="post"
                                  />
                                )}
                              </td>
                            </tr>
                            <tr className="create-reply">
                              {isreplying && post.postID === reply.postID ? (
                                <td colSpan="2">
                                  <input
                                    id={post.id}
                                    style={{
                                      paddingLeft: "5px",
                                      paddingBottom: "5px",
                                      width: "100%",
                                      marginLeft: "5px",
                                      marginBottom: "5px",
                                    }}
                                    name="reply"
                                    value={reply.reply}
                                    type="text"
                                    placeholder="Reply..."
                                    onChange={handleReplyChange}
                                  />
                                  <button
                                    style={{ marginLeft: "5px" }}
                                    className="dropbtn"
                                    onClick={(e) => {
                                      toggleIsReplying();
                                      handleReplySubmit(e);
                                    }}
                                  >
                                    Post
                                  </button>
                                </td>
                              ) : null}

                              <td
                                colSpan="3"
                                style={{
                                  textAlign: "right",
                                  paddingRight: "3px",
                                }}
                              >
                                <button
                                  style={{ marginLeft: "5px" }}
                                  className="dropbtn"
                                  onClick={(e) => {
                                    setReply((reply) => ({
                                      ...reply,
                                      user: context.firstname,
                                    }));
                                    setReply((reply) => ({
                                      ...reply,
                                      username: context.username,
                                    }));
                                    setReply((reply) => ({
                                      ...reply,
                                      avatar: context.avatar,
                                    }));
                                    setReply((reply) => ({
                                      ...reply,
                                      postID: post.postID,
                                    }));
                                    toggleIsReplying();
                                  }}
                                >
                                  Reply
                                </button>
                              </td>
                            </tr>
                            {Object.keys(replies)
                              .reverse()
                              .map((i) => {
                                if (replies[i].postID === post.postID) {
                                  /* This will return the comments on a post if the post has any replies. */
                                  return (
                                    <tr
                                      style={{
                                        backgroundColor: "rgb(245, 241, 229)",
                                      }}
                                    >
                                      <td>
                                        <div>
                                          <img
                                            src={replies[i].avatar}
                                            style={{
                                              height: "30px",
                                              borderRadius: "50%",
                                              margin: "3px",
                                            }}
                                            alt="user-avatar"
                                          />
                                          {replies[i].user}
                                        </div>
                                      </td>
                                      <div className="box">
                                        <td className="replies">
                                          <span margin="3px">
                                            {replies[i].reply}
                                          </span>
                                        </td>
                                        <td className="replies"></td>
                                      </div>
                                    </tr>
                                  );
                                }
                                return null;
                              })}
                          </tbody>
                        </table>
                      </div>
                    );

                    /*
                    Below the input area are all the exisiting posts, each post can be 
                    delete and editied, but only if you are logged in as the user that
                    made the post. When a user selects to edit a post, a popup window 
                    will show. If the user selects to reply to the post, an input box
                    for the reply will appear.
                    */
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

export default Forum;
