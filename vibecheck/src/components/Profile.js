import React from "react";
import "bootstrap/dist/css/bootstrap.css";
import profileImage from "../profile-image.jpg";
import editTool from "../edit-tool.jpeg";
import "../containers/Profile.css";

function Profile(props) {
  console.log(props.username);

  const user = JSON.parse(props.getUser(props.username));

  return (
    <div className="container-profile">
      <table width="200px">
        <thead>
          <tr></tr>
        </thead>
        <tbody>
          <tr height="50px">
            <td rowSpan="2" valign="middle">
              <img src={profileImage} height="70" />
            </td>
            <td valign="bottom">
              {user.firstname} {user.lastname}
            </td>
            <td valign="bottom"><button><img src={editTool} height="20px"/></button></td>
          </tr>
          <tr width="300px">
            <td className="email" valign="top">{user.email}</td>
            <td valign="top"><button><img src={editTool} height="20px"/></button></td>
          </tr>
        </tbody>
      </table>
      <p><b>Joined:</b> {user.dateJoined}</p>
    </div>
  );
}

export default Profile;
