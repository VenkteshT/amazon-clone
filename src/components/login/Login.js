import React, { useState } from "react";
import "./login.css";
import { Link } from "@mui/material";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// logo url
const img_url = `https://upload.wikimedia.org/wikipedia/commons/
thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png`;

// main function
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  //   signin
  const signIn = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((auth) => {
        if (auth) {
          toast.success(`Welcome ${auth.user?.email}`, { autoClose: 3500 });
          navigate("/");
          return;
        }
      })
      .catch((err) => {
        toast.error(err.message, { autoClose: 2500 });
      });
  };

  return (
    <div className="login">
      <Link to={"/"}>
        <img src={img_url} alt="logo" className="login_logo" />
      </Link>

      <div className="login_container">
        <h1>Sign-in</h1>

        <form>
          <h5>E-mail</h5>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <h5>Password</h5>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit" onClick={signIn} className="login_signinButton">
            Sign-in
          </button>
        </form>
        <p>
          By sigining-in you agree to Amazon's Clone Conditions of Use & Sale.
          Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          className="login_registerButton"
          onClick={() => navigate("/signup")}
        >
          Create you Amazon Account
        </button>
      </div>
    </div>
  );
}
