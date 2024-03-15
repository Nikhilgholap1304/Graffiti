import React, { useState, useEffect } from "react";
import "./style/log_reg.css";
import { Link, useNavigate } from "react-router-dom";
import Vector1 from "./img/vector1.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faEyeSlash,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Register() {
  const Navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const handleTogglePassword = () => {
    setPasswordVisible((prevPasswordVisible) => !prevPasswordVisible);
  };
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const handleToggleCPassword = () => {
    setCPasswordVisible((prevCPasswordVisible) => !prevCPasswordVisible);
  };

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const updatedErrors = { ...errors };

    switch (fieldName) {
      case "name":
        if (value.trim() === "") {
          updatedErrors.name = "! Please enter your name";
        } else if (value && !/^[A-Za-z]/.test(value)) {
          updatedErrors.name = "! Name must start with a letter";
        } else if (value && !/^[A-Za-z0-9_-]+$/.test(value)) {
          updatedErrors.name =
            "Username may only contain A-Z, 0-9, underscores, and dashes";
        } else {
          updatedErrors.name = "";
        }
        break;
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
      case "cpassword":
        if (value.trim() === "") {
          updatedErrors.cpassword = "! Please confirm your password";
        } else if (value !== user.password) {
          updatedErrors.cpassword = "! Passwords do not match";
        } else {
          updatedErrors.cpassword = "";
        }
        break;
      default:
        break;
    }

    setErrors(updatedErrors);
  };

  const validateForm = () => {
    const updatedErrors = { ...errors };

    if (user.name.trim() === "") {
      updatedErrors.name = "! Please enter your name";
    } else if (user.name && !/^[A-Za-z]/.test(user.name)) {
      updatedErrors.name = "! Name must start with a letter";
    } else if (user.name && !/^[A-Za-z0-9_-]+$/.test(user.name)) {
      updatedErrors.name =
        "Username may only contain A-Z, 0-9, underscores, and dashes";
    } else {
      updatedErrors.name = "";
    }

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

    if (user.cpassword.trim() === "") {
      updatedErrors.cpassword = "! Please confirm your password";
    } else if (user.cpassword !== user.password) {
      updatedErrors.cpassword = "! Passwords do not match";
    } else {
      updatedErrors.cpassword = "";
    }

    setErrors(updatedErrors);
  };

  const PostData = async (e) => {
    e.preventDefault();

    validateForm();

    if (Object.values(errors).every((error) => error === "")) {
      const { name, email, password, cpassword } = user;

      const res = await fetch("/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          cpassword,
        }),
      });

      const data = await res.json();
      if (res.status === 421 || !data) {
        toast.info("Please fill the fields properly");
      } else if (res.status === 422 || !data) {
        toast.error("Email already exists");
      } else if (res.status === 423 || !data) {
        toast.warning("Passwords do not match");
      } else if (res.status === 201) {
        const successMessage = "Signup successful, Login now.";
        toast.success(successMessage);
        localStorage.setItem("registrationSuccess", successMessage);
        Navigate("/Login");
      } else {
        toast.error("Failed to register");
      }
    }
  };

  return (
    <>
      <section className="container">
        <div className="left_container">
          <div className="logo">
            <h3>graffiti</h3>
          </div>
          <h3>Let's Illustrate this World, by Befitting your Design.</h3>
          <div className="front_vector">
            <img src={Vector1} alt="" />
          </div>
        </div>
        <div className="right_container">
          <form method="POST" action="">
            <h1>
              Sign up to <span>Graffiti</span>
            </h1>
            <div className="input_container">
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                value={user.name}
                onChange={handleInputs}
                autoComplete="on"
              />
              {errors.name && <p className="Form_validate">{errors.name}</p>}
            </div>
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
            <div className="input_container" >
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
                style={{top:"14px"}}
                onClick={handleTogglePassword}
              >
                {passwordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            <div className="input_container">
              <input
                type={cpasswordVisible ? "text" : "password"}
                name="cpassword"
                id="cpassword"
                placeholder="Confirm Your password"
                value={user.cpassword}
                onChange={handleInputs}
                autoComplete="on"
              />
              {errors.cpassword && (
                <p className="Form_validate">{errors.cpassword}</p>
              )}

              <button
                type="button"
                className="p_visibility"
                style={{top:"14px"}}
                onClick={handleToggleCPassword}
              >
                {cpasswordVisible ? (
                  <FontAwesomeIcon icon={faEye} />
                ) : (
                  <FontAwesomeIcon icon={faEyeSlash} />
                )}
              </button>
            </div>
            <button type="submit" className="submit" onClick={PostData}>
              Create Account
            </button>
          </form>

          <Link to={"/Login"} className="link">
            Already have a member ? <span>Sign In</span>
          </Link>

          <footer className="reg_foot">
            <a href="https://www.instagram.com/nikhil__gholap1304/">
              <i class="fa-brands fa-square-instagram"></i>
            </a>
            <a href="https://www.facebook.com/nikhil.gholap.7127">
              <i class="fa-brands fa-square-facebook"></i>
            </a>
            <a href="https://github.com/Nikhilgholap1304">
              <i class="fa-brands fa-square-github"></i>
            </a>
            <a href="https://twitter.com/NikhilGholap19">
              <i class="fa-brands fa-square-twitter"></i>
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
}

export default Register;
