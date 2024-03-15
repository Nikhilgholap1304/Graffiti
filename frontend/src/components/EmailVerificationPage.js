import React, { useEffect } from "react";
import { Audio, TailSpin, ThreeDots } from "react-loader-spinner";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

function EmailVerificationPage() {
  const navigate = useNavigate(); // Use navigate instead of history
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const token = searchParams.get("token");
    console.log("Received token from URL:", token); // Add this line to check if the token is received from the URL

    if (token) {
      // Make a GET request to the backend to verify the email
      axios
        .get(`/verify_email?token=${token}`)
        .then((response) => {
          // Email verification successful
          console.log(response.data.message);
          localStorage.setItem("successMessage", "Verified");
          navigate(`/reset_password?token=${token}`); // Correct way to pass the token as a prop
        })
        .catch((error) => {
          // Handle error
          console.log(error.response.data.error);
          // You can show an error message to the user or handle the error in some other way
          if (error.response && error.response.status === 400) {
            // Token is expired
            localStorage.setItem("resetErrorMessage", "Link has expired");
            navigate("/forgot");
          } else {
            // Other errors
            localStorage.setItem("resetErrorMessage", "Invalid Session or Link");
            navigate("/forgot");
          }
        });
    } else {
      localStorage.setItem("resetErrorMessage", "Invaliď Session or Link");
      navigate("/forgot");
      console.log("token is missing");
    }
  }, [navigate, location.search]); // Update the dependencies

  return (
    <>
    <div style={{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%,-50%)",display: "flex",
    flexDirection: "column",alignItems: "center"}}>
      <ThreeDots
        height="100"
        width="100"
        radius="11"
        color="#ffa21f"
        ariaLabel="three-dots-loading"
        wrapperStyle={{}}
        wrapperClassName=""
        visible={true}
      />
      <h1 style={{color:"#333"}}>Verifying email</h1>
      </div>
    </>
  );
}

export default EmailVerificationPage;
