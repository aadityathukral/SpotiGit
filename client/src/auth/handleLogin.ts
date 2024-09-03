/** Clears the current session and redirects user to login. */
export const handleLogin = () => {
  fetch("http://localhost:8080/sessionClear", {
    method: "POST",
    credentials: "include",
  })
    .then(() => {
      window.location.href = "http://localhost:8080/login";
    })
    .catch((err) => {
      console.error(`Unable to clear the session. Error: ${err}`);
    });
};
