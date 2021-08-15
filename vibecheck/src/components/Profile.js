import React from "react";
import 'bootstrap/dist/css/bootstrap.css';
import profileImage from "../profile-image.jpg";
import "../containers/Profile.css";

function Profile(props) {
    console.log(props.username);

    return (
        <div className="text-left">
            <h1>Profile</h1>
            <div>
                <img src={profileImage} className="profileImage" alt="profile image"/>
                <span>{props.firstname} {props.lastname}</span>
            </div>
        </div>
    );
}

export default Profile;