const express = require("express");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const router = express.Router();
require("dotenv").config();

const secretKey = process.env.otp_secret_key;
const email_pass = process.env.email_pass;

// Generate the email verification token with user ID
const generateEmailVerificationToken = (email, userId) => {
  return jwt.sign({ email, userId }, secretKey, {
    expiresIn: "10m",
  });
};

// Forgot Password
router.post("/forgot", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    } else {
      // Generate the email verification token with user ID
      const emailVerificationToken = generateEmailVerificationToken(email, user._id);

      user.resetPasswordToken = emailVerificationToken;
      user.resetPasswordExpires = new Date();
      user.resetPasswordExpires.setMinutes(
        user.resetPasswordExpires.getMinutes() + 10
      );
      await user.save();

      const transporter = nodemailer.createTransport({
        service: "Gmail",
        auth: {
          user: "graffiti.13.io@gmail.com",
          pass: email_pass,
        },
      });

      // Create the verification link
      const verificationLink = `http://localhost:3000/verify_email?token=${emailVerificationToken}`;

      // Configure the email details
      const mailOptions = {
        from: "graffiti.13.io@gmail.com",
        to: email,
        subject: "Password Reset Email Verification",
        text: `Please click on the following link to reset your password: ${verificationLink}`,
      };

      // Send the email with the verification link
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log(error);
          return res.status(500).json({ error: "Failed to send email verification link" });
        } else {
          console.log("Email verification link sent: " + info.response);
          return res.status(200).json({ message: `Email verification link sent to ${email}` });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(501).json({ error: "Server error" });
  }
});

// Verify Email Verification Link
// Verify Email Verification Link
router.get("/verify_email", async (req, res) => {
  const { token } = req.query;
  console.log("Received token:", token); // Add this line to check if the token is received

  try {
    // Verify the token
    const decodedToken = jwt.verify(token, secretKey);
    console.log("Decoded token:", decodedToken); // Add this line to check if the token is decoded correctly
    const { email } = decodedToken;

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid session" });
    }

    // Verify the token expiration
    if (user.resetPasswordExpires.getTime() < Date.now()) {
      return res.status(400).json({ error: "Email verification link has expired" });
    }

    user.isEmailVerified = true;
    await user.save();

    // Email verification successful
    res.status(200).json({ message: "Email verification successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

// Reset Password
router.post("/reset_password", async (req, res) => {
  const { password, cpassword, token } = req.body; // Extract token from request body
  
  try {
    // Verify the token
    const decodedToken = jwt.verify(token, secretKey);
    const { email } = decodedToken;
    
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ error: "Invalid session" });
    }
    
    // Verify the token expiration
    if (user.resetPasswordExpires.getTime() < Date.now()) {
      return res.status(400).json({ error: "Reset password link has expired" });
    }
    
    // Update the user's password and reset the resetPasswordToken and resetPasswordExpires fields
    user.password = password;
    user.cpassword = cpassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    user.isEmailVerified = false;
    await user.save();

    // Password reset successful
    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;