import { createUserWithEmailAndPassword, getAuth, sendEmailVerification } from "firebase/auth";
import React from "react";
import app from "../firebase/firebase.init";

const Register = () => {
  const [error, setError] = React.useState("");
  const [success, setSuccess] = React.useState("");

  const auth = getAuth(app);

  // Handling Form Submit
  const handleSubmit = (e) => {
    // Preventing Default Behavior of Form
    e.preventDefault();
    setSuccess("");
    setError("");
    // Getting Values from Form
    const password = e.target.password.value;
    const email = e.target.email.value;
    const name = e.target.name.value;
    // Password Validation using Regular Expression
    if (!/(?=.*[A-Z])/.test(password)) {
      setError("Password must be One Uppercase");
      return;
    } else if(!/(?=.*[0-9])/.test(password)) {
      setError("Password must be One Number");
      return;
    } else if(!/(?=.*[!@#$%^&*])/.test(password)) {
      setError("Password must be One Special Character");
      return;
    } else if(password.length < 6) {
      setError("Password must be at least 6 characters long");
      return;
    }
    // User Registration
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setError("");
        e.target.reset();
        setSuccess("Registration Successful");
        verifyEmail(result.user);
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const verifyEmail = (user) => {
    sendEmailVerification(user)
      .then(() => {
        console.log("Email Sent");
        alert("Email Sent , Please Verify");
      });
  }

  // JSX
  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
      <input
          required
          type="text"
          name="name"
          id="name"
          placeholder="Your Name"
        />
        <br />
        <input
          required
          type="email"
          name="email"
          id="email"
          placeholder="Your Email"
        />
        <br />
        <input
          required
          type="password"
          name="password"
          id="password"
          placeholder="Your Password"
        />
        <br />
        <p>{error}</p>
        <p>{success}</p>
        <input type="submit" value="Register" />
      </form>
    </div>
  );
};

export default Register;
