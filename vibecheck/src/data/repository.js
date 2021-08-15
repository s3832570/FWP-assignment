const USER = "user";
const USER_KEY = "users";
const LOGGED_IN_USER = "loggedInUser";

// Adds new user to localStorage
function addNewUser(username, password, firstname, lastname, email) {
  console.log("adding new user to localStorage");
  localStorage.setItem(
    username,
    JSON.stringify({
      username: username, 
      password: password, 
      firstname: firstname, 
      lastname: lastname, 
      email: email })
  );
}

// Checks whether username if already taken or not
function checkUserAvailable(username) {
  if (localStorage.getItem(username) === null) {
    return true;
  }
  return false;
}

// Verifies username and password
function verifyUser(username, password) {
  if (localStorage.getItem(username) !== null) {
    const user = JSON.parse(localStorage.getItem(username));
    if (username === user.username && password === user.password) {
      return true;
    }
    return false;
  }
  return false;
}

// Sets logged in user
function setLoggedInUser(username) {
  localStorage.setItem(
    LOGGED_IN_USER,
    JSON.stringify({ username: username })
  );
}

// Retrieves logged in user
function getLoggedInUser() {
  return localStorage.getItem(LOGGED_IN_USER);
}

// Removes logged in user when they log out
function removeLoggedInUser() {
  localStorage.removeItem(LOGGED_IN_USER);
}

function getUser(key) {
  return localStorage.getItem(key);
}

export { 
  verifyUser, 
  addNewUser, 
  checkUserAvailable,
  setLoggedInUser, 
  getLoggedInUser, 
  removeLoggedInUser,
  getUser
};