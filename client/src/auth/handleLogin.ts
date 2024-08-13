// TODO: Make it so that this will just call an endpoint
// in the server which would handle this part of the functionality
// and just return a json ({success: true}), once the json returns true
// you could make another request to the server to obtain information about
// the user (profile photo, name, etc).

export const handleLogin = () => {
  window.location.href = "http://localhost:8080/login";
};
