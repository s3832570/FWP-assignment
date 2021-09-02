import { useState } from "react";
import useProfile from "../../hooks/useProfile";
import Popup from "../Popup";
import "../../containers/Profile.css";

function EditProfile(props) {
  const [editAvatar, setEditAvatar] = useState(false);

  const togglePopup = () => {
    setEditAvatar(!editAvatar);
  };

  const avatars = {
    spongebob:
      "https://i.pinimg.com/564x/6e/a5/70/6ea570193869b9e6539d4de4927cc75f.jpg",
    hamster:
      "https://i.pinimg.com/564x/b6/2a/6c/b62a6cd76abc74602ef54c1697c740f1.jpg",
    careBear:
      "https://i.pinimg.com/564x/af/0a/3f/af0a3f7fb05be8714beb06ecc36a7900.jpg",
    stitch:
      "https://i.pinimg.com/564x/89/b7/6a/89b76af840e352b4da98ba65c1d0c0c9.jpg",
    duck: "https://i.pinimg.com/564x/eb/64/01/eb64019731dd17d6ba13aef6eb2ddafa.jpg",
    jerry:
      "https://i.pinimg.com/564x/09/d1/87/09d187d157a8b1b90bc5f9c70a44f4b0.jpg",
  };

  const { setValues, values, updateProfile } = useProfile(props);

  const changeAvatar = (src) => {
    console.log(src);
    setValues((values) => ({ ...values, avatar: src }));
  };

  return (
    <div id="edit profile" className="editProfile">
      <table className="editTable">
        <tbody>
          <tr>
            <td className="edit-avatar-button" colSpan="2">
              <button onClick={togglePopup}>Edit Avatar</button>
            </td>
          </tr>
          <tr className="edit-table-row">
            <td>First name</td>
            <td className="input-data">
              <input
                type="text"
                name="firstname"
                id="firstname"
                defaultValue={values.firstname}
                onChange={props.handleChange}
              ></input>
            </td>
          </tr>

          <tr className="edit-table-row">
            <td>Last name</td>
            <td className="input-data">
              <input
                type="text"
                name="lastname"
                id="lastname"
                defaultValue={values.lastname}
                onChange={props.handleChange}
              ></input>
            </td>
          </tr>

          <tr className="edit-table-row">
            <td>Email</td>
            <td className="input-data">
              <input
                type="text"
                name="email"
                id="email"
                defaultValue={values.email}
                onChange={props.handleChange}
              ></input>
            </td>
          </tr>

          <tr className="edit-buttons">
            <td className="buttons" colSpan="2">
              <button
                className="update-button"
                onClick={(e) => {
                  updateProfile();
                  props.editProfile();
                }}
              >
                {" "}
                Update{" "}
              </button>
              <button className="cancel-button" onClick={props.editProfile}>
                Cancel
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      {editAvatar && (
        <Popup
          content={
            <div>
              <table>
                <thead>
                  <tr>
                    <td colSpan="3">
                      <h3>Choose an avatar:</h3>
                    </td>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <button
                        className="options"
                        onClick={() => changeAvatar(avatars.spongebob)}
                      >
                        <img
                          className="profile-image"
                          src={avatars.spongebob}
                          alt="avatar"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="options"
                        onClick={() => changeAvatar(avatars.hamster)}
                      >
                        <img
                          className="profile-image"
                          src={avatars.hamster}
                          alt="avatar"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="options"
                        onClick={() => changeAvatar(avatars.careBear)}
                      >
                        <img
                          className="profile-image"
                          src={avatars.careBear}
                          alt="avatar"
                        />
                      </button>
                    </td>
                    <td rowSpan="2" width="50%" valign="middle" style={{textAlign:"center"}}>
                      <button onClick={togglePopup} style={{padding:"3%"}}>OK</button>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <button
                        className="options"
                        onClick={() => changeAvatar(avatars.stitch)}
                      >
                        <img
                          className="profile-image"
                          src={avatars.stitch}
                          alt="avatar"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="options"
                        onClick={() => changeAvatar(avatars.duck)}
                      >
                        <img
                          className="profile-image"
                          src={avatars.duck}
                          alt="avatar"
                        />
                      </button>
                    </td>
                    <td>
                      <button
                        className="options"
                        onClick={() => changeAvatar(avatars.jerry)}
                      >
                        <img
                          className="profile-image"
                          src={avatars.jerry}
                          alt="avatar"
                        />
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

export default EditProfile;
