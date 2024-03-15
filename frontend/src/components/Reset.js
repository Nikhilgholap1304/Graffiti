import React, { useState, useEffect } from "react";
import "./style/log_reg.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Vector1 from "./img/vector1.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Reset() {
  const Navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState({
    password: "",
    cpassword: "",
    token: "",
  });

  const [errors, setErrors] = useState({
    password: "",
    cpassword: "",
  });

  const [message, setMessage] = useState("");

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
  };

  const validateField = (fieldName, value) => {
    const updatedErrors = { ...errors };

    switch (fieldName) {
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

    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Resetting..",
    });

    validateForm();

    if (Object.values(errors).every((error) => error === "")) {
      const { password, cpassword, token } = user;

      if (!token) {
        console.log("url is missing the token");
        return;
      }

      const res = await fetch("/reset_password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          cpassword,
          token,
        }),
      });

      if (res.status === 404) {
        localStorage.setItem("resetErrorMessage", "Invalid Session");
        toast.error("Invalid Session");
        Navigate("/Forgot");
      } else if (res.status === 400) {
        localStorage.setItem("resetErrorMessage", "Link has expired");
        toast.warning("Link has expired");
        Navigate("/Forgot");
      } else if (res.status === 200) {
        const successMessage = "Password reset successful.";
        toast.success(successMessage);
        localStorage.setItem("registrationSuccess", successMessage);
        Navigate("/Login");
      } else {
        localStorage.setItem("resetErrorMessage", "Failed to Reset");
        toast.error("failed to reset");
        Navigate("/Forgot");
      }
    }
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    const successMessage = localStorage.getItem("successMessage");
    if (token) {
      // Set the token in the component's state
      setUser((prevUser) => ({ ...prevUser, token }));
    }
    if (successMessage) {
      toast.success(successMessage);
      localStorage.removeItem("successMessage");
    }

    return () => {
      localStorage.removeItem("resetErrorMessage");
    };
  }, []);

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
                type="password"
                name="password"
                id="password"
                placeholder="Enter your new password"
                value={user.password}
                onChange={handleInputs}
                autoComplete="on"
              />
              {errors.password && (
                <p className="Form_validate">{errors.password}</p>
              )}
            </div>
            <div className="input_container">
              <input
                type="password"
                name="cpassword"
                id="cpassword"
                placeholder="Confirm your new password"
                value={user.cpassword}
                onChange={handleInputs}
                autoComplete="on"
              />
              {errors.cpassword && (
                <p className="Form_validate">{errors.cpassword}</p>
              )}
            </div>
            <button type="submit" className="submit" onClick={PostData}>
              Reset password
            </button>
          </form>

          <Link to={"/Login"} className="link">
            Back to Login ? <span>Sign In</span>
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

export default Reset;
