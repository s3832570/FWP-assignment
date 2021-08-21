import Navigator from "./Navigator";
import Login from "./Login";
import Home from "./Home";
import SignUp from "./SignUp";
import Profile from "./Profile";

import { useState } from "react";
import "../containers/App.css";
import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { getLoggedInUser, setLoggedInUser, getUser } from "../data/repository";

function App() {
  var loggedInUsername = JSON.parse(getLoggedInUser());

  const [username, setUsername] = useState(loggedInUsername.username);

  const loginUser = (username) => {
    setUsername(username);
    setLoggedInUser(username);
  };

  const logoutUser = () => {
    setLoggedInUser(null);
    setUsername(null);
  };

  return (
    <div>
      <Router>
        <Navigator
          className="nav-wrapper"
          username={username}
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
                />
              )}
            />
            <Route exact path="/" component={Home} />
            <Route
              path="/signup"
              render={(props) => <SignUp {...props} loginUser={loginUser} />}
            />
            <Route path="/profile">
              <Profile username={username} getUser={getUser}/>
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;
// class App extends Component {
//   constructor(props) {
//     console.log("constructor");
//     super(props);
//     this.state = { username: null };
//   }

//   loginUser = (username) => {
//     console.log(username);
//     this.setState({ username: username });
//     console.log("logging in " + this.props.username);
//   };

//   logoutUser = () => {
//     console.log("logging user out");
//     this.setState({ username: null});
//   };

//   render() {
//     return (
//       <div>
//         <Router>
//           <Navigator className="nav-wrapper" username={this.state.username} logoutUser={this.logoutUser}/>
//           <Switch>
//             <Route path='/login' render={props => (
//               <Login {...props} loginUser={this.loginUser} logoutUser={this.logoutUser}/>
//             )} />
//             <Route exact path='/' component={Home}/>
//             <Route path='/signup' render={props => (
//               <SignUp {...props}/>
//             )} />
//           </Switch>
//         </Router>
//       </div>
//     );
//   }
// }

// export default App;
