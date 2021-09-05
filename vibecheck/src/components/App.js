import Navigator from "./Navigator";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import Profile from "./Profile";
import Footer from "./Footer";
import Forum from "./Forum";


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
  checkUserAvailable,
} from "../data/userRepository";
import {
  createOrUpdatePost,
  deletePost,
  getPosts,
  addReply,
  getReplies,
  deleteUserPostsAndReplies
} from "../data/postRepository";

const loggedInUserContext = createContext();
const LOGGED_IN_USER = "loggedInUser";

function App() {
  const [user, setUser] = useState(getLoggedInUser());

  /**
   * If the user exists and they aren't the same to the logged in
   * user, set the logged in user as the new user
   */
  useEffect(() => {
    const user = localStorage.getItem("loggedInUser");
    if (user && user !== JSON.stringify(getLoggedInUser())) {
      setUser(user);
    }
  }, []);

  /**
   * Update local storage every time the logged in user is changed
   */
  useEffect(() => {
    localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
  }, [user]);

  /**
   * Set the logged in user
   * @param {user} user 
   */
  const loginUser = (user) => {
    setUser(user);
  };

  /**
   * Remove the logged in user
   */
  const logoutUser = () => {
    removeLoggedInUser();
    setUser(null);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Router>
        <loggedInUserContext.Provider value={user}>
          <Navigator
            className="nav-wrapper"
            loggedInUserContext={loggedInUserContext}
            logoutUser={logoutUser}
          />
        </loggedInUserContext.Provider>

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
              exact
              path="/profile"
              render={(props) => (
                <loggedInUserContext.Provider value={user}>
                  <Profile
                    {...props}
                    loggedInUserContext={loggedInUserContext}
                    addOrUpdateUser={addOrUpdateUser}
                    getUsers={getUsers}
                    setUser={setUser}
                    removeUser={removeUser}
                    logoutUser={logoutUser}
                    getPosts={getPosts}
                    getReplies={getReplies}
                    deleteUserPostsAndReplies={deleteUserPostsAndReplies}
                  />
                </loggedInUserContext.Provider>
              )}
            ></Route>
            <Route
              path="/forum"
              render={(props) => (
                <loggedInUserContext.Provider value={user}>
                  <Forum
                    {...props}
                    loggedInUserContext={loggedInUserContext}
                    getUsers={getUsers}
                    createOrUpdatePost={createOrUpdatePost}
                    getPosts={getPosts}
                    deletePost={deletePost}
                    addReply={addReply}
                    getReplies={getReplies}
                  />
                </loggedInUserContext.Provider>
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
