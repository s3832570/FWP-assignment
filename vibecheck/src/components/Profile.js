import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.css";
import editTool from "../icons/edit-icon.png";
import deleteIcon from "../icons/delete-icon.png";
import "../containers/Profile.css";
import useProfile from "../hooks/useProfile";
import Popup from "./Popups/Popup";
import EditProfile from "./Popups/EditProfile";

function Profile(props) {
  
  let context = useContext(props.loggedInUserContext);

  const {
    handleChange,
    values,
    setValues,
    editProfile,
    showEditProfile,
    deleteUser,
    togglePopup,
    showPopup,
  } = useProfile(props, context);

  return (
    <div className="profile-wrapper">
      <div className="container-profile">
        <table className="profile-table">
          <thead>
            <tr></tr>
          </thead>
          <tbody>
            <tr>
              <td rowSpan="2" valign="middle">
                <img
                  className="profile-image"
                  src={context.avatar}
                  alt="avatar"
                />
              </td>
              <td valign="bottom">
                {values.firstname} {values.lastname}
              </td>
              <td rowSpan="2">
                <button className="options" onClick={editProfile}>
                  <img src={editTool} height="30px" alt="edit-icon" />
                </button>
                <button className="options" onClick={togglePopup}>
                  <img src={deleteIcon} height="30px" alt="delete-icon" />
                </button>
              </td>
            </tr>
            <tr width="300px">
              <td className="email" valign="top">
                {values.email}
              </td>
            </tr>
          </tbody>
        </table>
        <p>
          <b>Joined:</b> {values.joinDate}
        </p>
      </div>
      {showEditProfile ? (
        <EditProfile
          loggedInUserContext={props.loggedInUserContext}
          user={context.user}
          handleChange={handleChange}
          addOrUpdateUser={props.addOrUpdateUser}
          editProfile={editProfile}
          setUser={props.setUser}
          getUsers={props.getUsers}
          values={values}
          setValues={setValues}
        />
      ) : null}
      {showPopup && (
        <Popup
          content={
            <div>
              <table>
                <tbody>
                  <tr>
                    <td className="popup-yesNo" colSpan="2">
                      <span>Are you sure you want to delete your account?</span>
                    </td>
                  </tr>
                  <tr>
                    <td className="popup-yesNo">
                      <button className="yesNoButtons" onClick={deleteUser}>
                        Yes
                      </button>
                      <button className="yesNoButtons" onClick={togglePopup}>
                        No
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

export default Profile;
