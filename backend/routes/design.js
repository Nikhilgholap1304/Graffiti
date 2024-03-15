const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Designer = require('../models/designerSchema');
const Admin = require('../models/adminSchema');
const { Design, Report, Comment } = require('../models/designSchema'); // Assuming you have a Design schema
const multer = require('multer');
const dotenv = require('dotenv');
const { GridFSBucket } = require('mongodb');
const { Int32 } = require('mongodb');
const router = express.Router();
const ObjectId = mongoose.Types.ObjectId;
const fs = require('fs');
const archiver = require('archiver');
const rimraf = require('rimraf');


dotenv.config({ path: '../config.env' })
database = process.env.DATABASE;

const createZipArchive = async (source, out) => {
  const archive = archiver('zip', { zlib: { level: 9 } });
  const stream = fs.createWriteStream(out);

  return new Promise((resolve, reject) => {
    archive
      .directory(source, false)
      .on('error', (err) => reject(err))
      .pipe(stream);

    stream.on('close', () => resolve());
    archive.finalize();
  });
};

// const storage = new GridFsStorage({
//   url: database,
//   options: { useNewUrlParser: true, useUnifiedTopology: true },
//   file: (req, file) => {
//     return {
//       filename: file.originalname,
//       bucketName: 'uploads' // Name of your GridFS bucket
//       // ... other options if needed
//     };
//   }
// });

// Initialize multer middleware with the configured storage engine
// const upload = multer({ storage });

// router.post('/design', async (req, res) => {
//   try {
//     const sessionToken = req.header('Authorization');
//     const user = await User.findOne({ sessionToken });
//     if (!user) {
//       return res.status(401).json({ error: 'Unauthorized' });
//     }

//     // Assuming 'extFiles' contains files received from the frontend
//     const formData = req.body; // Modify this according to your frontend data structure
//     console.log(formData.title)
//     const designData = {
//       title: formData.title,
//       description: formData.description,
//       tags: formData.tags,
//       user_id: user._id
//     };
//     console.log(designData)
//     console.log(formData)
//     const design = new Design(designData);
//     await design.save();

//     const db = mongoose.connection.db;
//     const gfs = new GridFSBucket(db);
//     const savedFiles = [];

//     // Extract files from formData
//     let fileIndex = 0;
//     while (formData[`file${fileIndex}`]) {
//       const file = formData[`file${fileIndex}`];

//       const uploadStream = gfs.openUploadStream(file.originalname);
//       const bufferStream = new stream.PassThrough();
//       bufferStream.end(Buffer.from(file.data, 'base64')); // Assuming file.data contains base64 encoded file content
//       bufferStream.pipe(uploadStream);

//       const fileMetadata = new File({
//         filename: file.originalname,
//         contentType: file.mimetype,
//         size: file.size,
//         tags: designData.tags, // Assuming tags in designData
//         title: designData.title, // Assuming title in designData
//         description: designData.description, // Assuming description in designData
//         userId: user._id, // Assuming authenticated user's ID is in req.user._id
//         // ...other properties...
//       });

//       const gridFSFileId = await new Promise((resolve, reject) => {
//         uploadStream.once('finish', () => {
//           resolve(uploadStream.id);
//         });
//         uploadStream.once('error', (error) => {
//           reject(error);
//         });
//       });

//       fileMetadata.gridFSFileId = gridFSFileId;
//       await fileMetadata.save();

//       design.files.push(fileMetadata);
//       savedFiles.push(fileMetadata);

//       fileIndex++;
//     }

//     await design.save();
//     res.json({ design, files: savedFiles });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Failed to upload files' });
//   }
// });

router.post("/upload_design", async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const user = await User.findOne({ sessionToken });
    const { files } = req.body;
    // console.log(files)
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    if (files != null) {
      const designData = new Design({
        userId: user._id,
        userName: user.name,
        UserPic: user.profilePic,
        title: files.title,
        description: files.description,
        tags: files.tags,
        files: files.base64Files, // Array of file details
        no_files: files.base64Files.length,
        reportsCount: '0',
        commentsCount: '0',
      });
      await designData.save();
      // Check if the user has uploaded three or more designs
      const numDesignsUploaded = await Design.countDocuments({ userId: user._id });
      let triggerCongratulations = false;
      if (numDesignsUploaded === 3) {
        triggerCongratulations = true;
        const designerData = new Designer({
          userId: user._id,
          isDesigner: true, // Set isDesigner to true
          designsUploaded: numDesignsUploaded,
        });
        await designerData.save();
      }
      else if (numDesignsUploaded > 3) {
        // If the user has uploaded three or more designs, update the designer schema
        const designerData = new Designer({
          userId: user._id,
          isDesigner: true, // Set isDesigner to true
          designsUploaded: numDesignsUploaded,
        });
        await designerData.save();
      }
      // console.log('Design saved:', savedDesign);
      return res.status(200).json({ message: 'Successful', triggerCongratulations });
    }
  } catch (err) {
    console.error(err);
  }
})

router.get('/fetch_design_data', async (req, res) => {
  const sessionToken = req.header('Authorization');
  const user = await User.findOne({ sessionToken });
  try {
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const userId = user._id;
    const designs = await Design.find({ userId });
    if (!designs || designs.length === 0) {
      console.log("Not found")
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      const profilePic = user.profilePic;
      const hasDesignerBadge = user.hasDesignerBadge;
      res.status(200).send({ designs, profilePic, hasDesignerBadge });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get('/fetch_pinned_design_data', async (req, res) => {
  const sessionToken = req.header('Authorization');
  const user = await User.findOne({ sessionToken });
  try {
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const designs = await Design.find({ bookmarks: user._id });
    if (!designs || designs.length === 0) {
      console.log("Not found")
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      const profilePic = user.profilePic;
      res.status(200).send({ designs, profilePic });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get('/fetch_liked_design_data', async (req, res) => {
  const sessionToken = req.header('Authorization');
  const user = await User.findOne({ sessionToken });
  try {
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const designs = await Design.find({ likes: user._id });
    if (!designs || designs.length === 0) {
      console.log("Not found")
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      const profilePic = user.profilePic;
      res.status(200).send({ designs, profilePic });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get('/fetch_downloaded_design_data', async (req, res) => {
  const sessionToken = req.header('Authorization');
  const user = await User.findOne({ sessionToken });
  try {
    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const designs = await Design.find({ downloadUserId: user._id });
    if (!designs || designs.length === 0) {
      console.log("Not found")
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      const profilePic = user.profilePic;
      res.status(200).send({ designs, profilePic });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get('/fetch_general_design_data', async (req, res) => {
  try {
    const designs = await Design.find();
    const users = await User.find({}, '_id hasDesignerBadge').lean();
    const formattedUsers = users.map(user => ({
      userId: user._id,
      hasDesignerBadge: user.hasDesignerBadge
    }));
    if (designs.length === 0) {
      console.log("Not found")
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      res.status(200).send({ designs, formattedUsers });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get('/fetch_Individual_design/:designId', async (req, res) => {
  // console.log("getting till here")
  try {
    const sessionToken = req.header('Authorization');
    const designId = req.params.designId;
    const user = await User.findOne({ sessionToken });

    if (!user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const designDetail = await Design.findById(designId);
    const DesignUserId = designDetail.userId;

    // if (designDetail.likes.includes(user._id)) {
    //   console.log('liked')
    // } else {
    //   console.log('not liked')
    // }

    // Query user details by DesignUserId
    const userDetails = await User.findById(DesignUserId);

    // Check if the user associated with the design exists
    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ShortUserDetails = [
      (userDetails.name),
      (userDetails.profilePic),
      (userDetails.hasDesignerBadge)
    ]
    if (!designDetail.views.includes(user._id)) {
      // Increment the view count
      designDetail.views.push(user._id);
      // Save the updated design
      await designDetail.save();
    }

    res.status(200).send({ designDetail, ShortUserDetails });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/fetch_Individual_design_admin/:designId', async (req, res) => {
  // console.log("getting till here")
  try {
    const AdminSessionToken = req.header('Authorization');
    const designId = req.params.designId;
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken });

    // if (!admin) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    const reports = await Report.find({ designId })
    const reasons = reports.map(report => report.reason);

    // Count occurrences of each reason
    const reasonCounts = reasons.reduce((counts, reason) => {
      counts[reason] = (counts[reason] || 0) + 1;
      return counts;
    }, {});

    const designDetail = await Design.findById(designId);
    const DesignUserId = designDetail.userId;

    // if (designDetail.likes.includes(user._id)) {
    //   console.log('liked')
    // } else {
    //   console.log('not liked')
    // }

    // Query user details by DesignUserId
    const userDetails = await User.findById(DesignUserId);

    // Check if the user associated with the design exists
    if (!userDetails) {
      return res.status(404).json({ error: 'User not found' });
    }

    const ShortUserDetails = [
      (userDetails.name),
      (userDetails.profilePic),
      (userDetails.hasDesignerBadge)
    ]
    if (!designDetail.views.includes(admin._id)) {
      // Increment the view count
      designDetail.views.push(admin._id);
      // Save the updated design
      await designDetail.save();
    }

    res.status(200).send({ designDetail, ShortUserDetails, reasonCounts });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
router.post('/like_design/:designId', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const { designId } = req.params;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    const user = await User.findOne({ sessionToken });

    const isLiked = design.likes.includes(user._id);

    if (isLiked) {
      design.likes.pull(user._id);
    } else {
      design.likes.push(user._id);
    }
    const updatedDesign = await design.save();
    res.status(200).json({ likes: updatedDesign.likes, updatedDesign });
  } catch (err) {
    console.log(err);
  }
})

router.post('/like_design_admin/:designId', async (req, res) => {
  try {
    const AdminSessionToken = req.header('Authorization');
    const { designId } = req.params;
    // if (!sessionToken) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken });
    console.log("near liked")

    const isLiked = design.likes.includes(admin._id);

    if (isLiked) {
      design.likes.pull(admin._id);
    } else {
      design.likes.push(admin._id);
    }
    const updatedDesign = await design.save();
    res.status(200).json({ likes: updatedDesign.likes, updatedDesign });
  } catch (err) {
    console.log(err);
  }
})

router.post('/bookmark_design/:designId', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const { designId } = req.params;
    if (!sessionToken) {
      return res.status(401).json({ error: 'Unauthorized' });
    }
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    const user = await User.findOne({ sessionToken });

    const isBookmarked = design.bookmarks.includes(user._id);

    if (isBookmarked) {
      design.bookmarks.pull(user._id);
    } else {
      design.bookmarks.push(user._id);
    }
    const updatedDesign = await design.save();
    res.status(200).json({ bookmarks: updatedDesign.bookmarks, updatedDesign });
  } catch (err) {
    console.log(err);
  }
})


router.post('/bookmark_design_admin/:designId', async (req, res) => {
  try {
    const AdminSessionToken = req.header('Authorization');
    const { designId } = req.params;
    // if (!sessionToken) {
    //   return res.status(401).json({ error: 'Unauthorized' });
    // }
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken });

    const isBookmarked = design.bookmarks.includes(admin._id);

    if (isBookmarked) {
      design.bookmarks.pull(admin._id);
    } else {
      design.bookmarks.push(admin._id);
    }
    const updatedDesign = await design.save();
    res.status(200).json({ bookmarks: updatedDesign.bookmarks, updatedDesign });
  } catch (err) {
    console.log(err);
  }
})

router.post('/report_design/:designId/:reportReason', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const { designId } = req.params;
    const { reportReason } = req.params;

    // Check if the design exists
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    const user = await User.findOne({ sessionToken });
    // Check if the user has already reported this design
    const userId = user._id;
    const existingReport = await Report.findOne({ userId, designId });
    if (existingReport) {
      return res.status(403).json({ error: 'Design already reported by this user' });
    }

    // Create a new report entry
    const report = new Report({
      userId,
      designId,
      reason: reportReason,
    });
    await report.save();
    setTimeout(async () => {
      design.reportsCount = (parseInt(design.reportsCount) + 1).toString();
      await design.save();
    }, 500);

    // Save the report to the database
    // You can also update the design model to keep track of the number of reports if needed

    res.status(200).json({ success: 'Reported' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/report_design_admin/:designId/:reportReason', async (req, res) => {
  try {
    const AdminSessionToken = req.header('Authorization');
    const { designId } = req.params;
    const { reportReason } = req.params;

    // Check if the design exists
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken });
    // Check if the admin has already reported this design
    const adminId = admin._id;
    const existingReport = await Report.findOne({ userId: adminId, designId });
    if (existingReport) {
      return res.status(403).json({ error: 'Design already reported by this admin' });
    }

    // Create a new report entry
    const report = new Report({
      userId: adminId,
      designId,
      reason: reportReason,
    });
    await report.save();
    setTimeout(async () => {
      design.reportsCount = (parseInt(design.reportsCount) + 1).toString();
      await design.save();
    }, 500);

    // Save the report to the database
    // You can also update the design model to keep track of the number of reports if needed

    res.status(200).json({ success: 'Reported' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/delete_design/:designId', async (req, res) => {
  try {
    const { designId } = req.params;
    const sessionToken = req.header('Authorization');
    const user = await User.findOne({ sessionToken })
    console.log("on delete way")

    // Check if the design exists
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(401).json({ error: 'Design not found' });
    }
    if (design.userId.toString() !== user._id.toString()) {
      console.log("User is not associated");
      return res.status(403).json({ error: 'Permission denied' });
    } else {
      await Design.deleteOne({ _id: designId });
      // Check if the user has fewer than three designs after deletion
      const numDesignsUploaded = await Design.countDocuments({ userId: user._id });
      let RemovingBadge = false;
      if (numDesignsUploaded < 3) {
        // If the user has fewer than three designs, remove the designer schema
        await Designer.deleteOne({ userId: user._id });
        RemovingBadge = true;
      }
      res.status(200).json({ success: true, RemovingBadge });
    }

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/delete_design_admin/:designId', async (req, res) => {
  try {
    const { designId } = req.params;
    const AdminSessionToken = req.header('Authorization');
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken })
    console.log("on delete way")

    // Check if the design exists
    const design = await Design.findById(designId);
    if (!design) {
      return res.status(401).json({ error: 'Design not found' });
    }
    await Design.deleteOne({ _id: designId });
    // Check if the user has fewer than three designs after deletion
    const numDesignsUploaded = await Design.countDocuments({ userId: admin._id });
    let RemovingBadge = false;
    if (numDesignsUploaded < 3) {
      // If the Admin has fewer than three designs, remove the designer schema
      await Designer.deleteOne({ userId: admin._id });
      RemovingBadge = true;
    }
    res.status(200).json({ success: true, RemovingBadge });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/download_design/:designId', async (req, res) => {
  try {
    const { designId } = req.params;
    const design = await Design.findById(designId);
    const sessionToken = req.header('Authorization');
    const user = await User.findOne({ sessionToken })

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (!design.downloadUserId.includes(user._id)) {
      // Increment the view count
      design.downloadUserId.push(user._id);
      // Save the updated design
      await design.save();
    }
    const updatedDesign = await design.save();
    // Assume files are stored as base64 in the database
    const base64Files = design.files.map(file => file.data);

    // Create a temporary directory to store downloaded files
    const downloadDir = './temp_download';
    fs.mkdirSync(downloadDir, { recursive: true });

    // Save base64 files as separate files in the temporary directory
    base64Files.forEach((file, index) => {
      const fileType = design.files[index].type || 'unknown'; // Provide a default value if type is undefined
      const filePath = `${downloadDir}/file_${index + 1}.${fileType.split('/')[1]}`;
      fs.writeFileSync(filePath, file, 'base64');
    });

    // Create a zip file containing all downloaded files
    const zipFileName = `design_${designId}_files.zip`;
    const zipFilePath = `${downloadDir}/${zipFileName}`;

    try {
      await createZipArchive(downloadDir, zipFilePath);
    } catch (zipError) {
      console.error('Error during zip creation:', zipError.message);
      return res.status(500).json({ error: 'Internal server error during zip creation' });
    }

    // Send the zip file to the client
    res.download(zipFilePath, zipFileName, async (err) => {
      if (err) {
        console.error('Error sending zip file:', err);
        return res.status(500).json({ error: 'Error sending zip file' });
      } else {
        // Clean up: Remove temporary files and directory after download
        try {
          await fs.promises.unlink(zipFilePath);
          rimraf.sync(downloadDir);

          // Make sure to check if the response is already sent before sending another response
          if (!res.headersSent) {
            return res.status(200).json({ success: 'Download successful' });
          }
        } catch (cleanupError) {
          console.error('Error during cleanup:', cleanupError.message);

          // Handle the specific error related to unlink
          if (cleanupError.code === 'ERR_INVALID_ARG_TYPE') {
            console.error('Ignoring ERR_INVALID_ARG_TYPE in cleanup.');
          } else {
            // Make sure to check if the response is already sent before sending another response
            if (!res.headersSent) {
              return res.status(500).json({ error: 'Internal server error during cleanup' });
            }
          }
        }
      }
    });
  } catch (err) {
    console.error('Error during download:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/download_design_admin/:designId', async (req, res) => {
  try {
    const { designId } = req.params;
    const design = await Design.findById(designId);
    const AdminSessionToken = req.header('Authorization');
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken })

    if (!design) {
      return res.status(404).json({ error: 'Design not found' });
    }

    if (!design.downloadUserId.includes(admin._id)) {
      // Increment the view count
      design.downloadUserId.push(admin._id);
      // Save the updated design
      await design.save();
    }
    const updatedDesign = await design.save();
    // Assume files are stored as base64 in the database
    const base64Files = design.files.map(file => file.data);

    // Create a temporary directory to store downloaded files
    const downloadDir = './temp_download';
    fs.mkdirSync(downloadDir, { recursive: true });

    // Save base64 files as separate files in the temporary directory
    base64Files.forEach((file, index) => {
      const fileType = design.files[index].type || 'unknown'; // Provide a default value if type is undefined
      const filePath = `${downloadDir}/file_${index + 1}.${fileType.split('/')[1]}`;
      fs.writeFileSync(filePath, file, 'base64');
    });

    // Create a zip file containing all downloaded files
    const zipFileName = `design_${designId}_files.zip`;
    const zipFilePath = `${downloadDir}/${zipFileName}`;

    try {
      await createZipArchive(downloadDir, zipFilePath);
    } catch (zipError) {
      console.error('Error during zip creation:', zipError.message);
      return res.status(500).json({ error: 'Internal server error during zip creation' });
    }

    // Send the zip file to the client
    res.download(zipFilePath, zipFileName, async (err) => {
      if (err) {
        console.error('Error sending zip file:', err);
        return res.status(500).json({ error: 'Error sending zip file' });
      } else {
        // Clean up: Remove temporary files and directory after download
        try {
          await fs.promises.unlink(zipFilePath);
          rimraf.sync(downloadDir);

          // Make sure to check if the response is already sent before sending another response
          if (!res.headersSent) {
            return res.status(200).json({ success: 'Download successful' });
          }
        } catch (cleanupError) {
          console.error('Error during cleanup:', cleanupError.message);

          // Handle the specific error related to unlink
          if (cleanupError.code === 'ERR_INVALID_ARG_TYPE') {
            console.error('Ignoring ERR_INVALID_ARG_TYPE in cleanup.');
          } else {
            // Make sure to check if the response is already sent before sending another response
            if (!res.headersSent) {
              return res.status(500).json({ error: 'Internal server error during cleanup' });
            }
          }
        }
      }
    });
  } catch (err) {
    console.error('Error during download:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
})

router.get('/fetch_tag_design_data/:TagName', async (req, res) => {
  try {
    const { TagName } = req.params;
    console.log(TagName)
    const designs = await Design.find({ tags: { $all: [TagName] } });
    // console.log(designs)
    if (designs.length === 0) {
      console.log(designs.length === 0)
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      res.status(200).send({ designs });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})


router.get('/fetch_admin_general_design_data', async (req, res) => {
  try {
    let designs = [];
    designs = await Design.find();
    // console.log(designs)
    if (designs.length === 0) {
      console.log(designs.length === 0)
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      res.status(200).send({ designs });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get('/fetch_admin_reported_design_data', async (req, res) => {
  try {
    let designs = [];
    designs = await Design.find({ reportsCount: { $gte: 1 } });
    // console.log(designs)
    if (designs.length === 0) {
      console.log(designs.length === 0)
      // return res.status(404).json(EMPTY_DESIGN);
      const EMPTY_DESIGN = { status: "empty", error: 'No file Uploaded' };
      return res.status(404).send(EMPTY_DESIGN);
      // return res.status(404).json({ error: 'Design not found' });
    } else {
      res.status(200).send({ designs });
    }

  } catch (error) {
    console.log(error)
  }
  // console.log(designs[0])
})

router.get("/update_designer_badge", async (req, res) => {
  try {
    // Query the Designer collection to find all designers
    const designers = await Designer.find();
    const designerUserIds = designers.map(designer => designer.userId);

    // Update user profiles to include a designer badge
    await User.updateMany(
      { _id: { $in: designerUserIds } },
      { $set: { hasDesignerBadge: true } }
    );
    const nonDesignerUserIds = await Designer.find({ designsUploaded: { $lte: 3 } }).distinct('userId');
    await User.updateMany(
      { _id: { $in: nonDesignerUserIds } },
      { $set: { hasDesignerBadge: false } }
    );

    return res.status(200).json({ message: 'Designer badges updated successfully' });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/post_comment/:designId', async (req, res) => {
  try {
    const sessionToken = req.header('Authorization');
    const { designId } = req.params;
    const { comment, commentTitle } = req.body;
    const user = await User.findOne({ sessionToken });
    const design = await Design.findOne({ designId })
    // const designId = '65b9318c64c2f9ca9e1b7a93';
    const comments = new Comment({
      userId: user._id,
      userName: user.name,
      UserPic: (user.profilePic ? user.profilePic : ''),
      designId,
      title: commentTitle,
      body: comment,
    });
    await comments.save();
    setTimeout(async () => {
      const commentCount = await Comment.countDocuments({ designId });
      await Design.findByIdAndUpdate(designId, { commentsCount: commentCount });
    }, 500);
    const messages = await Comment.find({ designId });
    res.status(200).json({ messages });
  } catch (err) {
    console.log('error: ', err);
  }
})

router.post('/post_comment_admin/:designId', async (req, res) => {
  try {
    const AdminSessionToken = req.header('Authorization');
    const { designId } = req.params;
    const design = await Design.findOne({ designId })
    const { comment, commentTitle } = req.body;
    const admin = await Admin.findOne({ sessionToken: AdminSessionToken });
    const comments = new Comment({
      userId: admin._id,
      userName: admin.name,
      UserPic: '',
      designId,
      title: commentTitle,
      body: comment,
    });
    await comments.save();
    setTimeout(async () => {
      const commentCount = await Comment.countDocuments({ designId });
      await Design.findByIdAndUpdate(designId, { commentsCount: commentCount });
    }, 500);
    const messages = await Comment.find({ designId });
    res.status(200).json({ messages });
  } catch (err) {
    console.log('error: ', err);
  }
})

router.get('/get_comment/:designId', async (req, res) => {
  try {
    const { designId } = req.params;
    const messages = await Comment.find({ designId });
    res.status(200).json({ messages });
  } catch (err) {
    console.log('error:', err); // Log any errors that occur
    res.status(500).json({ error: 'An internal server error occurred' });
  }
});

module.exports = router;
