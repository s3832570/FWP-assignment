import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.css";
import editTool from "../edit-tool.png";
import deleteIcon from "../delete-icon.png";
import "../containers/Profile.css";
import useProfile from "../hooks/useProfile";
import Popup from "./Popup";
import EditProfile from "./Popups/EditProfile";

function Profile(props) {
  const {
    handleChange,
    values,
    updateProfile,
    editProfile,
    showEditProfile,
    deleteUser,
    togglePopup,
    showPopup,
  } = useProfile(props);

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
                  src={props.user.avatar}
                  alt="display image"
                  
                />
              </td>
              <td valign="bottom">
                {values.firstname} {values.lastname}
              </td>
              <td rowSpan="2">
                <button className="options" onClick={editProfile}>
                  <img src={editTool} height="30px" />
                </button>
                <button className="options" onClick={togglePopup}>
                  <img src={deleteIcon} height="30px" />
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
          user={props.user}
          handleChange={handleChange}
          addOrUpdateUser={props.addOrUpdateUser}
          editProfile={editProfile}
          setUser={props.setUser}
          getUsers={props.getUsers}
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
