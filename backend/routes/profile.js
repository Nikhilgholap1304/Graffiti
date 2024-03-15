const express = require("express");
const User = require("../models/userSchema");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const multer = require('multer'); // For handling file uploads
const path = require('path');
const fs = require('fs');
const bcrypt = require("bcryptjs")
const router = express.Router();
require("dotenv").config();

const secretKey = process.env.otp_secret_key;
const email_pass = process.env.email_pass;
// const storage = multer.diskStorage({}); // Store files in memory
// const upload = multer({ storage:storage });


// router.post('/upload-profile-pic', upload.single('profilePic'), async (req, res) => {
// try {
//   // Check if the user is logged in by verifying their session token
//   const sessionToken = req.header('Authorization');

//   if (!sessionToken) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   const user = await User.findOne({ sessionToken });

//   if (!user) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   if (!req.file) {
//     return res.status(400).json({ error: 'No file uploaded' });
//   }

//   // Process the uploaded file (e.g., save it to the database or file system)
//   // In this example, we're storing the file name (original name) in the user's profilePic field
//   user.profilePic = req.file.filename;
//   await user.save();

//   console.log('Profile picture uploaded successfully');
//   return res.status(200).json({ message: 'Profile picture uploaded successfully' });
// } catch (error) {
//   console.error(error);
//   return res.status(500).json({ error: 'Internal Server Error' });
// }
// });



//upload profile pic

router.post('/upload-profile-pic', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const user = await User.findOne({ sessionToken });
    // const {file} = req.body;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized access without session' });
    } else if (!user) {
      return res.status(401).json({ error: 'Unauthorized access of non user' });
    } else if (!req.body.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    } else {
      if (user.profilePic) {
        user.profilePic = null;
        await user.save();
      }
      user.profilePic = req.body.file;
      await user.save();
      res.status(200).send(user.profilePic)
      console.log('uploaded');
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.get('/profile-pic', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const user = await User.findOne({ sessionToken });
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized access without session' });
    } else if (!user.profilePic) {
      return res.status(404).json({ error: 'Profile picture not found' });
    } else {
      // console.log(user.profilePic)
      res.status(200).send(user.profilePic)
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
})

router.delete('/remove-profile-pic', async (req, res) => {
  try {
    // Check if the user is logged in by verifying their session token
    const sessionToken = req.header('Authorization');

    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ sessionToken });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    // Clear the profilePic field
    user.profilePic = null; // Assuming `profilePic` is a field in your user schema
    await user.save();

    console.log('Profile picture removed successfully');
    return res.status(200).json({ message: 'Profile picture removed successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.put('/update-profile-name', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');

    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ sessionToken });
    const { newName } = req.body;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    } else if (!newName) {
      return res.status(400).json({ error: "Name is empty" })
    }
    user.name = newName;
    await user.save();
    return res.status(200).json({ message: "Name changed successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500)
  }
})

router.put('/update-profile-rname', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');

    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const user = await User.findOne({ sessionToken });
    const { newRName } = req.body;
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    } else if (!newRName) {
      return res.status(400).json({ error: "Name is empty" })
    }
    user.rname = newRName;
    await user.save();
    return res.status(200).json({ message: "Name changed successfully" })
  } catch (error) {
    console.log(error);
    return res.status(500)
  }
})
//fetching profile names
router.get('/user-names', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');

    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const user = await User.findOne({ sessionToken });
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (user.rname == null) {
      const user = new User({ rname })
      user.rname = user.name;
      await user.save();
    }
    return res.status(200).json({ name: user.name, rname: user.rname, email: user.email, hasDesignerBadge: user.hasDesignerBadge })
  } catch (error) {
    console.log(error)
  }
})

router.delete('/logout-all', async (req, res) => {
  try {
    // Assuming you have a way to verify the user's identity (e.g., by checking their credentials)
    // In a real application, you should ensure the user is properly authenticated.
    const sessionToken = req.header('Authorization');
    const user = await User.findOne({ sessionToken });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    if (sessionToken) {

      // Clear the session tokens array to log out from all devices
      user.sessionToken = [];
      // Save the updated user document
      await user.save();

      return res.status(200).json({ message: 'Logged out from all devices' });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/account-delete', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const { password } = req.body
    if (!sessionToken) {
      return res.status(404).json({ message: "Unauthorized user" })
    }
    const user = await User.findOne({ sessionToken })
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log("doesn't match")
        return res.status(401).json({ message: "Invalid Password" })
      }
      if (isMatch) {
        // Password is valid, proceed with account deletion
        await User.deleteOne({ _id: user._id });
        return res.status(200).json({ message: "User deleted" })
      }
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});



// Route to serve profile pictures
// router.get('/profile-pic', async (req, res) => {
// try {
//   // Check if the user is logged in by verifying their session token
//   const sessionToken = req.header('Authorization');

//   if (!sessionToken) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   const user = await User.findOne({ sessionToken });

//   if (!user) {
//     return res.status(401).json({ error: 'Unauthorized' });
//   }

//   if (!user.profilePic) {
//     return res.status(404).json({ error: 'Profile picture not found' });
//   }

//   // Read the profile picture file from the uploads directory
//   const filePath = path.join(__dirname, '../../frontend/src/proPicUploads', user.profilePic);
//   console.log(filePath);

//   // Convert the file to base64 data and send it as a response

//   res.setHeader('Content-Type', 'image/jpeg'); // Set the content type based on your file type
//   return res.status(200).sendFile(filePath);
// } catch (error) {
//   console.error(error);
//   return res.status(500).json({ error: 'Internal Server Error' });
// }
// });


module.exports = router;