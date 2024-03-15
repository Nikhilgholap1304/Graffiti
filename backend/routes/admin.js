const express = require("express");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcryptjs");
const { Console } = require("console");
const { Design } = require("../models/designSchema");
const Designer = require("../models/designerSchema");
const Admin = require("../models/adminSchema");
const router = express.Router();
require("dotenv").config();

router.get('/admin/fetch_users_data', async (req, res) => {
  try {
    const user = await User.find();
    res.status(200).json(user)
  } catch (error) {
    console.log(error)
  }
})

router.get("/admin/fetch_designers_data", async (req, res) => {
  try {
    // Fetch designers from the database where hasDesignerBadge is true
    const designers = await User.find({ hasDesignerBadge: true });

    // Return the filtered designers data
    res.status(200).json(designers);
  } catch (error) {
    console.error('Error fetching designers data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get("/admin/fetch_upoaders_data", async (req, res) => {
  try {

    const uniqueUserIds = await Design.distinct("userId");

    // Step 2: Query users with unique userIds from designs
    const uploaders = await User.find({ _id: { $in: uniqueUserIds } });

    res.status(200).json(uploaders);
  } catch (error) {
    console.error('Error fetching designers data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/admin/update_user/:id', async (req, res) => {
  try {
    const userId = req.params.id;
    const updatedUserData = req.body;

    // Update the user data in the database
    const updatedUser = await User.findByIdAndUpdate(userId, updatedUserData, { new: true });

    res.status(200).json({ message: 'User data updated successfully', user: updatedUser });
  } catch (error) {
    console.error('Error updating user data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/get_dashboard_data', async (req, res) => {
  try {
    const users = await User.find();
    const designs = await Design.find();
    const designers = await Designer.find();
    const userCount = await User.countDocuments();
    const designCount = await Design.countDocuments();
    const designerCount = await Designer.countDocuments();
    const totalCount = {
      userCount,
      designerCount,
      designCount,
    }
    let totalLikes = 0;
    let totalBookmarks = 0;
    let totalReports = 0;
    let totalViews = 0;

    designs.forEach(design => {
      totalLikes += design.likes.length;
      totalBookmarks += design.bookmarks.length;
      totalReports += parseInt(design.reportsCount);
      totalViews += design.views.length;
    });
    const totalDesignFactors = {
      totalLikes,
      totalBookmarks,
      totalReports,
      totalViews,
    }

    res.status(200).json({ totalCount, users, totalDesignFactors })
  } catch (error) {
    console.log("Error: ", error);
  }
})

router.post("/adminLogout", async (req, res) => {
  // Extract the user session token from the request headers
  const AdminSessionToken = req.headers.authorization;

  try {
    // Clear the session token in your database (assuming you have a User model)
    if (AdminSessionToken) {
      await Admin.updateOne({ sessionToken: AdminSessionToken }, { $pull: { sessionToken: AdminSessionToken } });
      const admin = await Admin.findOne({ sessionToken: AdminSessionToken });
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