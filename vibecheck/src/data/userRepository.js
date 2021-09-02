const USER_KEY = "users";
const LOGGED_IN_USER = "loggedInUser";

// Initialising user in storage
function initUsers() {
  if (localStorage.getItem(USER_KEY) !== null) {
    return;
  }

  localStorage.setItem(USER_KEY, "{}");
}

// Adds new user to localStorage, or updates a user already in 
// local storage.
function addOrUpdateUser(user) {
  const users = getUsers();

  users[user.username] = user;

  updateUsers(users);
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
  const users = getUsers();

  if (users[username]) {
    if (users[username].password === password) {
      return true;
    }
    return false;
  }
  return false;
}

// Sets logged in user
function setLoggedInUser(user) {
  localStorage.setItem(LOGGED_IN_USER, JSON.stringify(user));
}

// Removes user from local storage
function removeUser(user) {
  const users = getUsers();
  delete users[user.username];
  updateUsers(users);
}

function removeLoggedInUser() {
  localStorage.removeItem(LOGGED_IN_USER);
}

// Retrieves logged in user
function getLoggedInUser() {
  const loggedInUser = JSON.parse(localStorage.getItem(LOGGED_IN_USER));
  if (loggedInUser) {
    return loggedInUser;
  }
  return null;
}

function getUsers() {
  return JSON.parse(localStorage.getItem(USER_KEY));
}

function updateUsers(users) {
  localStorage.setItem(USER_KEY, JSON.stringify(users));
}

export {
  initUsers,
  verifyUser,
  addOrUpdateUser,
  checkUserAvailable,
  setLoggedInUser,
  getLoggedInUser,
  removeUser,
  getUsers,
  removeLoggedInUser
};
