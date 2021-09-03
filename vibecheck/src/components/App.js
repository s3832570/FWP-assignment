import Navigator from "./Navigator";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Footer from "./Footer";
import Forum from "./Forum";
import EditPost from "./Popups/EditPost";
import EditProfile from "./Popups/EditProfile";

import { createContext, useEffect, useState } from "react";
import "../containers/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  getLoggedInUser,
  addOrUpdateUser,
  getUsers,
  removeUser,
  removeLoggedInUser,
  checkUserAvailable
} from "../data/userRepository";
import {
  createOrUpdatePost,
  deletePost,
  getPosts,
} from "../data/postRepository";

const userContext = createContext();
const LOGGED_IN_USER = "loggedInUser";

/*
- try and use useContext
- create homepage
- create footer
*/

function App() {
  const [user, setUser] = useState(getLoggedInUser());

  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user && user !== JSON.stringify(getLoggedInUser())) {
      setUser(user);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
  }, [user]);

  const loginUser = (user) => {
    setUser(user);
  };

  const logoutUser = () => {
    removeLoggedInUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <Navigator
          className="nav-wrapper"
          user={user}
          logoutUser={logoutUser}
        />
        <div className="container my-3">
          <Switch>
            <Route
              path="/login"
              render={(props) => (
                <Login
                  {...props}
                  loginUser={loginUser}
                  logoutUser={logoutUser}
                  getUsers={getUsers}
                  setUser={setUser}
                />
              )}
            />
            <Route exact path="/" component={Home} />
            <Route
              path="/signup"
              render={(props) => (
                <SignUp
                  {...props}
                  loginUser={loginUser}
                  addOrUpdateUser={addOrUpdateUser}
                  getUsers={getUsers}
                  checkUserAvailable={checkUserAvailable}
                />
              )}
            />
            <Route
              path="/profile"
              render={(props) => (
                <Profile
                  {...props}
                  user={user}
                  addOrUpdateUser={addOrUpdateUser}
                  getUsers={getUsers}
                  setUser={setUser}
                  removeUser={removeUser}
                  logoutUser={logoutUser}
                />
              )}
            ></Route>
            <Route
              path="/forum"
              render={(props) => (
                <Forum
                  {...props}
                  user={user}
                  getUsers={getUsers}
                  createOrUpdatePost={createOrUpdatePost}
                  getPosts={getPosts}
                  deletePost={deletePost}
                  EditPost={EditPost}
                />
              )}
            ></Route>
          </Switch>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
