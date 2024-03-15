import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Register";
import Reset from "./Reset";
import Vector1 from "./img/vector1.png";
import "./style/log_reg.css";

const Login = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const handleTogglePassword = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };

  const validateField = (fieldName, value) => {
    const updatedErrors = { ...errors };

    switch (fieldName) {
      case "email":
        if (value.trim() === "") {
          updatedErrors.email = "! Please enter your email";
        } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value)) {
          updatedErrors.email = "! Invalid email address";
        } else {
          updatedErrors.email = "";
        }
        break;

      case "password":
        if (value.trim() === "") {
          updatedErrors.password = "! Please enter your password";
        } else {
          updatedErrors.password = "";
        }
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };

  const validateForm = () => {
    const updatedErrors = { ...errors };

    if (user.email.trim() === "") {
      updatedErrors.email = "! Please enter your email";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(user.email)) {
      updatedErrors.email = "! Invalid email address";
    } else {
      updatedErrors.email = "";
    }

    if (user.password.trim() === "") {
      updatedErrors.password = "! Please enter your password";
    } else {
      updatedErrors.password = "";
    }

    setErrors(updatedErrors);
  };

  const loginUser = async (e) => {
    e.preventDefault();

    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Just a sec",
    });

    validateForm();

    if (Object.values(errors).every((error) => error === "")) {
      const { email, password } = user;

      const res = await fetch("/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (res.status === 300) {
        toast.warning("Please fill the fields properly");
      } else if (res.status === 400) {
        toast.error("Password is incorrect");
      } else if (res.status === 450) {
        toast.info("User does not exist");
      } else if (res.status === 600) {
        const responseJson = await res.json();
        // Store the session token in localStorage
        const loginmsg = `Welcome, ${responseJson.name}`;
        localStorage.setItem("AdminSessionToken", responseJson.AdminSessionToken);
        localStorage.setItem("adminloginsuccess", loginmsg);
        // console.log(loginmsg)
        Navigate("/Admin/Dashboard");
      } else {
        const responseJson = await res.json();
        // Store the session token in localStorage
        const loginmsg = `Welcome, ${responseJson.name}`;
        localStorage.setItem("sessionToken", responseJson.sessionToken);
        localStorage.setItem("loginsuccess", loginmsg);
        console.log(loginmsg)
        Navigate("/Home");
      }
    }
  };

  useEffect(() => {
    const registrationSuccess = localStorage.getItem("registrationSuccess");
    const resetErrorMessage = localStorage.getItem("resetErrorMessage");
    if (registrationSuccess) {
      toast.success(registrationSuccess);
      localStorage.removeItem("registrationSuccess");
    }
    if (resetErrorMessage) {
      toast.error(resetErrorMessage);
      localStorage.removeItem("resetErrorMessage");
    }
  }, []);

  return (
    <>
      <section className="container">
        <div className="left_container">
          <div className="logo">
            <h3>Graffiti</h3>
          </div>
          <h3>Let's Illustrate this World, by Befitting your Design.</h3>
          <div className="front_vector">
            <img src={Vector1} alt="" />
          </div>
        </div>
        <div className="right_container">
          <form method="POST" action="">
            <h1>
              Sign in to <span>Graffiti</span>
            </h1>
            <div className="input_container">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                value={user.email}
                onChange={handleInputs}
                autoComplete="on"
              />
              {errors.email && <p className="Form_validate">{errors.email}</p>}
            </div>
            <div className="input_container">
              <Link
                to={"/Forgot"}
                style={{
                  textAlign: "right",
                  display: "block",
                  width: "100%",
                  textDecoration: "underline",
                }}
              >
                <span
                  style={{
                    fontSize: "1.2rem",
                    color: "brown",
                    fontFamily: "roboto",
                  }}
                >
                  Forgot?
                </span>
              </Link>
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter your password"
                value={user.password}
                onChange={handleInputs}
                autoComplete="on"
              />
              {errors.password && (
                <p className="Form_validate">{errors.password}</p>
              )}
              <button
                type="button"
                className="p_visibility"
                style={{
                  position: "absolute",
                }}
                onClick={handleTogglePassword}
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>{" "}
            </div>
            <button type="submit" name="signin" className="submit" onClick={loginUser}>
              Sign In
            </button>
          </form>

          <Link to={"/Register"} className="link">
            Not a member ? <span>Sign Up</span>
          </Link>
          <footer className="reg_foot">
            <a href="https://www.instagram.com/nikhil__gholap1304/">
              <i className="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://www.facebook.com/nikhil.gholap.7127">
              <i className="fa-brands fa-square-facebook"></i>
            </a>
            <a href="https://github.com/Nikhilgholap1304">
              <i className="fa-brands fa-square-github"></i>
            </a>
            <a href="https://twitter.com/NikhilGholap19">
              <i className="fa-brands fa-square-twitter"></i>
            </a>
          </footer>
        </div>
      </section>
      <ToastContainer
        position="top-center"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default Login;
