import React from "react";
import Logo from "../icons/logo.png";
import "../containers/Home.css";

function Home() {

    return (
        <div>
            <div className="welcome-logo" >
                <h1><b>Welcome to</b></h1>
                <img src={Logo} height="400px" alt="logo" />
            </div>
            <div className="welcome-box">
                <span> 
                    Vibe Check is a platform where you are free to express your thoughts and
                    feelings with other students!
                </span>
            </div>
        </div>
    );
}

export default Home;