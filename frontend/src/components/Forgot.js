import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Register from "./Register";
import Vector1 from "./img/vector1.png";

const Forgot = () => {
  const Navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
  });

  const [errors, setErrors] = useState({
    email: "",
  });

  const handleInputs = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    validateField(name, value);
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

    setErrors(updatedErrors);
  };

  const findUser = async (e) => {
    e.preventDefault();

    const resolveAfter3Sec = new Promise((resolve) =>
      setTimeout(resolve, 3000)
    );
    toast.promise(resolveAfter3Sec, {
      pending: "Just a sec",
    });

    validateForm();

    if (Object.values(errors).every((error) => error === "")) {
      const { email } = user;

      const res = await fetch("/forgot", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      if (res.status === 500) {
        toast.warning("Failed to send OTP");
      } else if (res.status === 200) {
        toast.success(`verificaton link sent to ${email}`, {
          style: {
            textTransform: "none",
          },
        });
      } else if (res.status === 404) {
        toast.info("User not found");
      } else {
        toast.error("server error");
      }
    }
  };

  useEffect(() => {
    // Retrieve the error message from localStorage
    const errorMessage = localStorage.getItem("resetErrorMessage");

    // Show the toast message if there is an error message
    if (errorMessage) {
      toast.error(errorMessage);
      // Clean up the stored error message after showing the toast
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
              <span
                style={{
                  marginLeft: 0,
                  marginBottom: "2rem",
                  color: "#dd4700",
                  fontSize: "2.5rem",
                }}
              >
                Graffiti
              </span>{" "}
              <br />
              Find Your Account
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
            <button type="submit" name="signin" className="submit" onClick={findUser}>
              Continue
            </button>
          </form>

          <Link to={"/Login"} className="link">
            Back to Login ? <span>Sign in</span>
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
        autoClose={5000}
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

export default Forgot;
