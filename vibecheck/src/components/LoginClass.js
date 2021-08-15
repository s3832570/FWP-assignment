// import { Component } from "react";
// import React from "react";
// import "bootstrap/dist/css/bootstrap.css";
// import { Form, Button } from "react-bootstrap";
// import "../containers/Login.css";
// import verifyUser from "../data/repository";
// import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

// class LoginClass extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       fields: {
//         username: "",
//         password: "",
//       },
//       errors: {},
//     };
//   }

//   handleInputChange = (event) => {
//     const name = event.target.name;
//     const value = event.target.value;

//     const fields = this.state.fields;
//     fields[name] = value;

//     this.setState({ fields });
//   };

//   handleSubmit = (event) => {
//     console.log("handled submit");
//     event.preventDefault();

//     const username = this.state.fields.username;
//     const verified = verifyUser(username, this.state.fields.password);

//     if (verified == true) {
//       console.log("logging in " + username);
//       this.props.loginUser(username);

//       localStorage.setItem(
//         "userProfile",
//         JSON.stringify({
//           username: username,
//           password: this.state.fields.password,
//         })
//       );

//       this.props.history.push("/");
//       return;
//     }

//     const handleClick = (val) =>
//     updateFn({
//       ...state,
//       [val]: state[val] + 1,
//     });

//     const fields = this.state.fields;
//     fields.password = "";

//     this.setState({
//       fields: fields,
//       errors: {
//         errorMessage: "Username or password is incorrect, please try again.",
//       },
//     });
//   };

//   render() {
//     return (
//       <div className="Login">
//         <div className="Details">
//           <Form>
//             <Form.Group className="username" controlId="formBasicUsername">
//               <Form.Label>Username</Form.Label>
//               <Form.Control
//                 type="username"
//                 name="username"
//                 placeholder="Username"
//                 defaultValue={this.state.fields.username}
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>

//             <Form.Group className="password" controlId="formBasicPassword">
//               <Form.Label>Password</Form.Label>
//               <Form.Control
//                 type="password"
//                 name="password"
//                 placeholder="Password"
//                 defaultValue={this.state.fields.password}
//                 onChange={this.handleInputChange}
//               />
//             </Form.Group>

//             <Button
//               className="submit"
//               variant="primary"
//               type="submit"
//               onClick={this.handleSubmit}
//             >
//               Submit
//             </Button>
//             <Form.Group className="SignUp-link">
//               <Form.Text>Don't have an account? Sign up <a href='/signup'>here</a>
//               </Form.Text>
//               {/* <Link to='./signup' component={SignUp}>here</Link> */}
//               {/* <Router>
//                 <Route path="/signup" component={SignUp} />
//               </Router> */}
//             </Form.Group>
//           </Form>
//           {this.state.errors["errorMessage"] && (
//             <div className="error">
//               <span>{this.state.errors["errorMessage"]}</span>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }

// export default LoginClass;
