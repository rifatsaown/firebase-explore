import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React from "react";
import app from "../firebase/firebase.init";

const Login = () => {
  const [user, setUser] = React.useState(null);
  // Getting Firebase Auth , Google Auth Provider and Github Auth Provider
  const auth = getAuth(app);
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // Handling Google Login
  const handleGoogleLogin = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };

  // Handling Github Login
  const handleGithubLogin = () => {
    signInWithPopup(auth, githubProvider)
      .then((result) => {
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
      });
  };
  // Handling Sign Out
  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        setUser(null);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // JSX
  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
        <h3>Log In With Password</h3>
          <form>
            <input
              type="email"
              name="username"
              id="username"
              placeholder="Your Email"
            />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
            />
            <br />
            <input type="submit" value="Log In" />
          </form>
          <button onClick={handleGithubLogin}>Github Login</button>
          <button onClick={handleGoogleLogin}>Google Login</button>
        </>
      )}
      {user && (
        <div>
          <h2>{user.displayName}</h2>
          <p>{user.email}</p>
          <img src={user.photoURL} alt="" />
        </div>
      )}
    </div>
  );
};

export default Login;
