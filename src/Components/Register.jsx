import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import React from "react";
import app from "../firebase/firebase.init";

const Register = () => {
    const [error , setError] = React.useState("");
    const [success , setSuccess] = React.useState("");

  const auth = getAuth(app);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("");
    const password = e.target.password.value;
    const email = e.target.email.value;
    createUserWithEmailAndPassword(auth, email, password)
    .then((result) => {
        console.log(result.user);
        setError("");
        e.target.reset();
        setSuccess("Registration Successful");
    }).catch((error) => {
        setError(error.message);
    });
  };

  return (
    <div>
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input required type="email" name="email" id="email" placeholder="Your Email" />
        <br />
        <input required
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
