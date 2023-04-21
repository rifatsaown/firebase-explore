import {
  GithubAuthProvider,
  GoogleAuthProvider,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import React from "react";
import { Link } from "react-router-dom";
import app from "../firebase/firebase.init";

const auth = getAuth(app);

const Login = () => {
  const [user, setUser] = React.useState(null);
  const [error, setError] = React.useState("");

  const emailRef = React.useRef("");
  // Getting Firebase Auth , Google Auth Provider and Github Auth Provider
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

  // Handling Login With Email and Password//
  const handleLogin = (e) => {
    // Preventing Default Behavior of Form
    e.preventDefault();
    setError("");
    // Getting Values from Form
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);
    // validate password
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      e.target.password.value = "";
      return;
    }
    // Login with Email and Password
    signInWithEmailAndPassword(auth, email, password)
      .then((result) => {
        result.user.emailVerified
          ? setUser(result.user) && signOut(auth)
          : setError("Please Verify Your Email");
      })
      .catch((error) => {
        setError(error.message);
        console.error(error);
      });
  };
  const handleReset = () => {
    const email = emailRef.current.value;
    if (email) {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          alert("Password Reset Email Sent");
          setError("")
        })
        .catch((error) => {
          console.log(error);
          setError(error.message);
        });
    } else {
      setError("Please Provide Your Email");
    }
  }


  // JSX
  return (
    <div>
      {user ? (
        <button onClick={handleSignOut}>Sign Out</button>
      ) : (
        <>
          <h3>Log In With Password</h3>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              name="email"
              id="email"
              ref={emailRef}
              placeholder="Your Email"
              required
            />
            <br />
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Your Password"
              required
            />
            <br />
            <p style={{ color: "red" }}>{error}</p>
            <input type="submit" value="Log In" />
          </form>
          <button onClick={handleReset}>Forgot Password?</button>
          <p style={{ marginTop: "40px" }}>
            <Link to="/register">New in site Please Register</Link>
          </p>
          <h3 style={{ marginTop: "10px" }}>Log In With Social Media</h3>
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
