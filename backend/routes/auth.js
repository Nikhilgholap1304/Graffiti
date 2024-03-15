const express = require('express');
const User = require("../models/userSchema")
const Admin = require("../models/adminSchema")
const bcrypt = require("bcryptjs")
const router = express.Router();
const jwt = require("jsonwebtoken");
require("dotenv").config();

const secretKey = process.env.otp_secret_key;

router.get("/", (req, res) => {
  res.send("Hello from router js");
});

router.post('/register', async (req, res) => {

  const { name, email, password, cpassword } = req.body;

  if (!name || !email || !password || !cpassword) {
    return res.status(421).json({ error: "Plz fill the field properly" });
  }

  try {
    const userExist = await User.findOne({ email: email })

    if (userExist) {
      return res.status(422).json({ error: "Email already Exist" });
      //for login const isMatch = await bcrypt.compare(password, userExist.password);
    } else if (password != cpassword) {
      return res.status(423).json({ error: "Passwords not Matching" });
    } else {

      const user = new User({ name, email, password, cpassword })
      user.rname = await name;
      const userRegister = await user.save();

      if (userRegister) {
        res.status(201).json({ message: "user registered successfully" })
      } else {
        res.status(500).json({ error: "Failed to registered" })
      }
    }

  } catch (err) {
    console.log(err)
  }

});

const generateSessionToken = (user) => {
  return jwt.sign({ userId: user._id }, secretKey, {
    expiresIn: '10d', // 10 days
  });
};

router.post('/signin', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(300).json({ error: "Plz Fill the Data" })
    }

    const userLogin = await User.findOne({ email: email })
    const adminLogin = await Admin.findOne({
      email: email
    })
    if (userLogin) {

      const isMatch = await bcrypt.compare(password, userLogin.password);
      if (isMatch) {
        const sessionToken = generateSessionToken(userLogin);
        userLogin.sessionToken = sessionToken;
        userLogin.status = 'active';
        await userLogin.save();
        res.json({ message: "User Login Successful", sessionToken, name: userLogin.name });
      } else {
        res.status(400).json({ message: "Password is not Correct" })
        console.log("password doesnt match")
      }

    } 
    else if (adminLogin) {
      if (password === adminLogin.password) {
        const AdminSessionToken = generateSessionToken(adminLogin);
        adminLogin.sessionToken = AdminSessionToken;
        await adminLogin.save();
        res.status(600).json({ message: "Admin Login Successful", AdminSessionToken, name: adminLogin.name });
      } else {
        res.status(400).json({ message: "Password is not Correct" })
        console.log("password doesnt match")
      }
    } 
    else {
      res.status(450).json({ message: "Account does not Exists" })
      console.log("Doesnt exist")
    }

  } catch (error) {
    console.log(error);
  }
})

// Endpoint to check login status
router.get('/check-login', async (req, res) => {
  try {
    // Check if the user is logged in by verifying their session token
    const sessionToken = req.header('Authorization'); // Use req.header to get the session token
    // console.log(sessionToken);
    if (!sessionToken) {
      return res.json({ isLoggedIn: false });
    }

    const user = await User.findOne({ sessionToken });
    // console.log(user);
    if (user) {
      return res.json({ isLoggedIn: true });
    } else {
      return res.json({ isLoggedIn: false });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/getUserId", async (req, res) => {
  const sessionToken = req.header('Authorization');
  if (sessionToken) {
    const user = await User.findOne({ sessionToken });
    return res.status(200).json({ userId: (user._id).toString() })
  }
})
router.get("/getAdminId", async (req, res) => {
  const AdminSessionToken = req.header('Authorization');
  if (AdminSessionToken) {
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken });
    return res.status(200).json({ adminId: (admin._id).toString() })
  }
})

router.post("/logout", async (req, res) => {
  // Extract the user session token from the request headers
  const sessionToken = req.headers.authorization;

  try {
    // Clear the session token in your database (assuming you have a User model)
    if (sessionToken) {
      await User.updateOne({ sessionToken }, { $unset: { sessionToken: "" } });
      const user = await User.findOne({ sessionToken });
      user.status = 'inactive';
      await user.save()
    }

    // Logout successful
    return res.status(200).json({ message: "Logout Successful" });
  } catch (error) {
    console.error(error);
    // Handle server error
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;

