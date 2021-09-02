import useEditPost from "../../hooks/useEditPost";

function EditPost(props) {

    const {
        values, 
        handleChange,
        error,
        validatePost
    } = useEditPost(props);

  return (
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
                placeholder={props.postToEdit.post}
                onChange={handleChange}
              />
            </td>
          </tr>
          <tr>
            <td className="post-button">
              <button
                onClick={() => {
                  validatePost(props.postToEdit.user, props.postToEdit.postID);
                }}
              >
                Update
              </button>
            </td>
          </tr>
          <tr>
            <td>{error && <p className="help is-danger">{error}</p>}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EditPost;
