import {
  Dropzone,
  FileMosaic,
  FullScreen,
  ImagePreview,
  VideoPreview
} from "@files-ui/react";
import * as React from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "../style/light_dark_mode.css";
import axios from 'axios';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ProfileHeader from "./ProfileHeader";
import "./Prof_style/NewUpload.css"
import { ToastContainer, toast } from "react-toastify";
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BASE_URL = "https://www.myserver.com";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const categories = [
  'Web Design',
  'Vector',
  'Illustration',
  'Theme',
  'Landing Page',
  'Portfolio',
  'Animated Design',
  'Paralax',
  'Minimilistic Design',
  'Font',
  'Decoratives',
];

function getStyles(category, categoryName, theme) {
  return {
    fontWeight:
      categoryName.indexOf(category) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

const NewUpload = () => {
  const Navigate = useNavigate();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [fileUploadDescOpen, setFileUploadDescOpen] = useState(true);
  const [descSpaceInfoOpen, setDescSpaceInfoOpen] = useState(true);
  const [extFiles, setExtFiles] = useState([]);
  const [imageSrc, setImageSrc] = useState(undefined);
  const [videoSrc, setVideoSrc] = useState(undefined);
  const [title, setTitle] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [titleId, setTitleId] = useState('standard-basic');
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const [descriptionId, setDescriptionId] = useState('standard-basic');
  const [categoryId, setCategoryId] = useState('standard-basic');
  const [categoryError, setCategoryError] = useState(false);
  const [categoryEmptyError, setCategoryEmptyError] = useState(false);

  const [selectedMode, setSelectedMode] = useState(() => {
    const storedMode = localStorage.getItem('selectedMode');
    return storedMode || 'light'; // Assuming 'light' as the default mode
  });
  useEffect(() => {

    if (selectedMode === "auto") {
      if (window.matchMedia("(prefers-color-scheme: dark)")) {
        document.body.classList.add("dark-mode");
        document.body.classList.remove("light-mode");
      }
      else {
        document.body.classList.add("light-mode");
        document.body.classList.remove("dark-mode");
      }
    }
    else if (selectedMode === "dark") {
      document.body.classList.add("dark-mode");
      document.body.classList.remove("light-mode");
      document.getElementById('standard-basic-label').style.color = "rgb(241 241 241 / 60%)";
      document.querySelector('label').removeAttribute('id', 'standard-basic-label');
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }

  }, [selectedMode]);

  const handleDialogClickOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  const updateFiles = (incommingFiles) => {
    console.log("incomming files", incommingFiles);
    setExtFiles(incommingFiles);
  };
  const onDelete = (id) => {
    setExtFiles(extFiles.filter((x) => x.id !== id));
  };
  const handleSee = (imageSource) => {
    setImageSrc(imageSource);
  };
  const handleWatch = (videoSource) => {
    setVideoSrc(videoSource);
  };
  const handleStart = (filesToUpload) => {
    console.log("advanced demo start upload", filesToUpload);
  };
  const handleFinish = (uploadedFiles) => {
    console.log("advanced demo finish upload", uploadedFiles);
  };
  const handleAbort = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: "aborted" };
        } else return { ...ef };
      })
    );
  };
  const handleCancel = (id) => {
    setExtFiles(
      extFiles.map((ef) => {
        if (ef.id === id) {
          return { ...ef, uploadStatus: undefined };
        } else return { ...ef };
      })
    );
  };
  const theme = useTheme();
  const [categoryName, setCategoryName] = useState([]);

  const handleCategoryChange = (event) => {
    const { target: { value } } = event;
    const selectedTags = typeof value === 'string' ? value.split(',') : value;
    setCategoryName(selectedTags);
    validateCategory(selectedTags);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
    validateTitle(e.target.value);
  };
  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    validateDescription(e.target.value);
  };

  const handleBlur = () => {
    validateTitle(title);
  };
  const handleDescBlur = () => {
    validateDescription(description);
  };
  const handleCateBlur = () => {
    validateCategory(categoryName);
  };

  const validateTitle = (value) => {
    if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(value)) {
      setTitleError(true);
      setTitleId('standard-error-helper-text');
    } else if (value.length > 50) {
      setTitleError(true);
      setTitleId('standard-error-helper-text');
    } else {
      setTitleError(false);
      setTitleId('standard-basic');
    }
  };
  const validateDescription = (value) => {
    if (value.length > 1000) {
      setDescriptionError(true);
      setDescriptionId('standard-error-helper-text');
    } else {
      setDescriptionError(false);
      setDescriptionId('standard-basic');
    }
  };
  const validateCategory = (tags) => {
    if (tags.length === 0) {
      setCategoryError(true);
      setCategoryEmptyError(true);
    } else if (tags.length > 3) {
      setCategoryError(true);
      setCategoryId('standard-error-helper-text');
    } else {
      setCategoryError(false);
      setCategoryId('standard-basic');
      setCategoryEmptyError(false);
    }
  };

  const validateInputs = () => {
    let isValid = true;

    if (extFiles.length === 0) {
      console.log("Please select files to upload.");
      isValid = false;
    }

    if (title.trim() === '') {
      setTitleError(true);
      setTitleId('standard-error-helper-text'); // Change ID on error
      isValid = false;
    } else if (!/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(title)) {
      setTitleError(true);
      setTitleId('standard-error-helper-text');
    } else if (title.length > 50) {
      setTitleError(true);
      setTitleId('standard-error-helper-text');
    } else {
      setTitleError(false);
      setTitleId('standard-basic'); // Reset ID on validation
    }

    if (description.trim() === '') {
      setDescriptionError(true);
      setDescriptionId('standard-error-helper-text'); // Change ID on error
      isValid = false;
    } else if (description.length > 1000) {
      setDescriptionError(true);
      setDescriptionId('standard-error-helper-text');
    } else {
      setDescriptionError(false);
      setDescriptionId('standard-basic'); // Reset ID on validation
    }

    if (categoryName.length === 0) {
      setCategoryError(true);
      setCategoryEmptyError(true);
    } else if (categoryName.length > 3) {
      setCategoryError(true);
      setCategoryId('standard-error-helper-text');
    } else {
      setCategoryError(false);
      setCategoryId('standard-basic');
      setCategoryEmptyError(false);
    }

    // Other validation checks for description, tags, etc.
    return isValid;
  };

  // const handleUpload = async () => {
  //   const isValid = validateInputs();
  //   if (!isValid) {
  //     return;
  //   } else {
  //     const uploadURL = BASE_URL + "/file";
  //     // Check if there are files to upload
  //     if (extFiles.length === 0) {
  //       console.log("Please select files to upload.");
  //       return;
  //     }

  //     const uploadPromises = extFiles.map(async (file) => {
  //       const formData = new FormData();
  //       formData.append("file", file);

  //       try {
  //         const response = await axios.post(uploadURL, formData, {
  //           headers: {
  //             'Content-Type': 'multipart/form-data'
  //           }
  //         });

  //         // Handle success if needed
  //         console.log(`File ${file.name} uploaded successfully!`, response.data);
  //       } catch (error) {
  //         // Handle errors if the upload fails
  //         console.error(`Error uploading ${file.name}:`, error.message);
  //       }
  //     });

  //     try {
  //       // Wait for all uploads to complete
  //       await Promise.all(uploadPromises);
  //       // Optionally, perform actions after all uploads are completed
  //     } catch (error) {
  //       console.error("Upload process failed:", error.message);
  //     }
  //   };
  // }
  const sessionToken = localStorage.getItem('sessionToken');
  // const handleUpload = async () => {
  //   const isValid = validateInputs();
  //   if (extFiles.length === 0) {
  //     console.log("Please select files to upload.");
  //     toast.error("Please select files to upload")
  //     return;
  //   }
  //   console.log(extFiles)
  //   if (!isValid) {
  //     return;
  //   } else {
  // Check if there are files to upload

  // const designData = {
  //   title: title,
  //   description: description,
  //   tags: categoryName, // Assuming this aligns with backend expectations
  //   files: extFiles.map(file => file.id), // Assuming extFiles contain uploaded file details with IDs
  //   // Other properties needed by the backend
  // };
  // const formData = new FormData();

  // // Verify extFiles contents
  // console.log("Contents of extFiles before forEach:", extFiles);

  // // Check for valid File objects within extFiles
  // extFiles.forEach(file => {
  //   console.log("File object within extFiles:", file);
  //   console.log("File properties:", file.name, file.size, file.type);
  // });

  // // Attach file objects to formData
  // extFiles.forEach((file, index) => {
  //   formData.append(`file${index}`, file.file); // Assuming 'file' property contains the File object
  // });

  // // Add other form fields to formData
  // formData.append('title', title);
  // formData.append('description', description);
  // formData.append('tags', categoryName);

  // // Inspect formData contents
  // console.log("Contents of formData:", formData);
  // console.log("Keys in formData:", formData.keys());
  // console.log("Entries in formData:", formData.entries());
  // console.log("Title value:", formData.get('title'));
  // console.log("file0", formData.get('file0'));

  // // Inspect individual files within formData
  // console.log('File name:', formData.get('file0').name);
  // console.log('File size:', formData.get('file0').size);
  // console.log('File type:', formData.get('file0').type);
  // console.log(extFiles[0].size)
  // const formsdata = formData.get('title');
  // try {
  //   const res = await axios.post('/design', {formData: formData}, {
  //     headers: {
  //       'Content-Type': 'multipart/form-data'
  //     }
  //   });
  // const res = await fetch("/demo", {
  //   method: "POST",
  //   headers: {
  //     "Authorization": sessionToken,
  //     "Content-Type": "multipart/form-data"
  //   },
  //   body: JSON.stringify({
  //     formsdata,
  //   }),
  // });
  // Handle successful res from the backend
  //       if (res.ok) {
  //         console.log('Design files posted successfully:', await res.json());
  //         // Handle successful response, e.g., clear form, display success message
  //         toast.success("Design files uploaded successfully!");
  //       } else {
  //         throw new Error(`Error posting design files: ${res.statusText}`);
  //       }
  //       // Optionally, perform actions after successful post
  //     } catch (error) {
  //       // Handle errors from the backend
  //       console.error('Error posting design files:', error.message);
  //       // Handle error display or other actions
  //     }
  //   }
  // };
  const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file.file); // Read the file as data URL

      reader.onload = () => {
        const base64Data = reader.result.split(',')[1]; // Extract base64 data (remove data URL prefix)
        const fileSizeMB = (file.file.size / (1024 * 1024)).toFixed(2);
        resolve({ filename: file.file.name, data: base64Data, type: file.file.type, filesize: `${fileSizeMB} MB` });
      };

      reader.onerror = (error) => reject(error);
    });
  };

  const filesToBase64 = async (extFiles, title, description, tags) => {
    const base64Files = [];
    try {
      for (const file of extFiles) {
        const base64File = await fileToBase64(file);
        base64Files.push(base64File);
      }
      return { title, description, tags, base64Files };
    } catch (error) {
      throw new Error('Error converting files to base64: ' + error);
    }
  };
  const Reload = () => {
    setTimeout(async () => {
      window.location.reload(false);
    }, 3000);
  };
  const handleUpload = async () => {
    if (sessionToken) {
      const isValid = validateInputs();
      if (extFiles.length === 0) {
        console.log("Please select files to upload.");
        toast.error("Please select files to upload")
        return;
      }
      // console.log(extFiles)
      if (!isValid) {
        return;
      }
      try {
        setTimeout(async () => {
          const designData = await filesToBase64(extFiles, title, description, categoryName);
          // console.log(designData);
          const config = {
            headers: {
              Authorization: sessionToken,
            },
          };
          const res = await axios.post('/upload_design', { files: designData }, config);
          if (res.status === 200) {
            console.log('Design files posted successfully');
            // Handle successful response, e.g., clear form, display success message
            if(res.data.triggerCongratulations === true){
              toast('🎉 Congrats, you got a designers badge')
            }
            setTimeout(() => {
              Reload();
            }, 1000);
          } else {
            throw new Error(`Error posting design files: ${res.statusText}`);
          }
        }, 2000);
        const myPromise = new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
        toast.promise(myPromise, {
          pending: "Uploading the design...",
          success: "Design uploaded successfully",
          error: "Error"
        });
      } catch (err) {
        console.log(err.message)
      }
    }
  }
  const CancelUpload = () => {
    Navigate('/Upload');
    setDialogOpen(false);
  }
  useEffect(() => {
    if (!sessionToken) {
      Navigate('/Login');
    }
  }, sessionToken)


  return (
    <>
      <section className="ButtonGrp">
        <Button variant="outlined" color="warning" onClick={handleDialogClickOpen} style={{ fontSize: "1.3rem", borderRadius: "0.3rem", color: "grey", borderColor: "grey" }} >Cancel</Button>
        <Button variant="contained" color="warning" onClick={handleUpload} startIcon={<CloudUploadIcon />} style={{ fontSize: "1.3rem", borderRadius: "0.3rem" }}>Upload</Button>
      </section>
      <section className="uploadHeading">
        <h1>Let's upload your work !</h1>
      </section>
      <section className="ProjectUpload">
        <form action="">
          <div className="dropzone">
            <div className="fileUploadInfo">
              <Box sx={{ width: '100%' }}>
                <Collapse in={fileUploadDescOpen}>
                  <Alert
                    action={
                      <IconButton
                        aria-label="close"
                        color="inherit"
                        size="small"
                        onClick={() => {
                          setFileUploadDescOpen(false);
                        }}
                      >
                        <CloseIcon fontSize="inherit" />
                      </IconButton>
                    }
                    sx={{ mb: 2 }}
                  >
                    Only jpg, jpeg, png, svg, ico, mkv, and mp4 are allowed
                  </Alert>
                </Collapse>
                {/* <Button
                  disabled={open}
                  variant="outlined"
                  onClick={() => {
                    setOpen(true);
                  }}
                >
                  Re-open
                </Button> */}
              </Box>
            </div>
            <Dropzone
              onChange={updateFiles}
              minHeight="300px"
              value={extFiles}
              accept="image/*, video/*"
              maxFiles={4}
              maxFileSize={10 * 1024 * 1024}
              label="Drag'n drop files here or click to browse"
              uploadConfig={{
                // autoUpload: true
                url: BASE_URL + "/file",
                cleanOnUpload: true
              }}
              onUploadStart={handleStart}
              onUploadFinish={handleFinish}
              fakeUpload
              actionButtons={{
                position: "after",
                abortButton: {},
                deleteButton: {},
                uploadButton: {
                  onClick: () => {
                    // Implement the upload logic here
                    // For example, you might trigger the upload when this button is clicked
                    // This could involve calling a function that handles the file upload process
                    handleUpload(); // Replace handleUpload() with your upload logic
                  },
                }
              }}
            >
              {extFiles.map((file) => (
                <FileMosaic
                  {...file}
                  key={file.id}
                  onDelete={onDelete}
                  onSee={handleSee}
                  onWatch={handleWatch}
                  onAbort={handleAbort}
                  onCancel={handleCancel}
                  resultOnTooltip
                  alwaysActive
                  preview
                  info
                />
              ))}
            </Dropzone>
            <FullScreen
              open={imageSrc !== undefined}
              onClose={() => setImageSrc(undefined)}
            >
              <ImagePreview src={imageSrc} />
            </FullScreen>
            <FullScreen
              open={videoSrc !== undefined}
              onClose={() => setVideoSrc(undefined)}
            >
              <VideoPreview src={videoSrc} autoPlay controls />
            </FullScreen>
          </div>
          <div className="titleInput">
            <TextField
              label="Title"
              variant="outlined"
              fullWidth
              color="warning"
              error={titleError}
              helperText={
                titleError
                  ? title.trim() === ''
                    ? "Title shouldn't be empty"
                    : title.length > 50 ? "Maximum character length is 50" : "Only alphabets and single spaces are allowed"
                  : ""
              }
              value={title}
              onChange={handleTitleChange}
              onBlur={handleBlur}
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
              id={titleId} // Dynamic ID based on titleId state
            />
          </div>
          <div className="descriptionInput">
            <TextField
              error={descriptionError}
              helperText={
                descriptionError
                  ? description.trim() === ''
                    ? "Description shouldn't be empty"
                    : description.length > 1000 ? "Maximum character length is 1000" : ""
                  : ""
              }
              value={description}
              onChange={handleDescriptionChange}
              onBlur={handleDescBlur}
              id={descriptionId}
              color="warning"
              label="Description"
              multiline
              fullWidth
              maxRows={4}
              minHeight={30}
              inputProps={{ style: { fontSize: 15 } }}
              InputLabelProps={{ style: { fontSize: 15 } }}
            />
            <Collapse in={descSpaceInfoOpen}>
              <Alert action={
                <IconButton
                  aria-label="close"
                  color="inherit"
                  size="small"
                  onClick={() => {
                    setDescSpaceInfoOpen(false);
                  }}
                >
                  <CloseIcon fontSize="inherit" />
                </IconButton>
              } severity="info">
                <AlertTitle>Info</AlertTitle>
                This is a description where — <strong>you can increase the lines, just click enter while typing</strong>
              </Alert>
            </Collapse>
          </div>
          <div className="tagInputContainer">
            <FormControl color="warning" sx={{ width: 200, fontSize: 100 }}>
              <InputLabel
                id="demo-multiple-chip-label"
                sx={{ fontSize: 15, height: 25 }}
                color="warning"
              >
                Tags
              </InputLabel>
              <Select
                labelId="demo-multiple-chip-label"
                id="demo-multiple-chip"
                multiple
                color="warning"
                value={categoryName}
                onChange={handleCategoryChange}
                onBlur={handleCateBlur}
                style={{ width: '100%', fontSize: '15' }}
                sx={{ fontSize: 15 }}
                error={categoryError}
                helperText={
                  categoryError
                    ? categoryName.length === 0
                      ? "Tags shouldn't be empty"
                      : "Maximum 3 tags allowed"
                    : ""
                }
                input={<OutlinedInput
                  id="select-multiple-chip" color="warning" style={{ width: '100%' }} label="Chip" />}
                renderValue={(selected) => (
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                    {selected.map((value) => (
                      <Chip key={value} label={value} />
                    ))}
                  </Box>
                )}
                MenuProps={MenuProps}
              >
                {categories.map((category) => (
                  <MenuItem
                    key={category}
                    value={category}
                    style={getStyles(category, categoryName, theme)}
                  >
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="TagError">
              {categoryEmptyError && <p>Tag shouldn't be empty</p>}
              {categoryName.length > 3 && <p>Maximum 3 tags are allowed</p>}
            </div>
          </div>
        </form>
      </section>
      <Dialog
        open={dialogOpen}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleDialogClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Unsaved changes"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            Your changes will be lost if you navigate away from this page. Are you sure you want to leave this page?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={CancelUpload}>Leave the page</Button>
        </DialogActions>
      </Dialog>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        limit={1}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme={selectedMode === "light" ? "light" : "dark"}
      />
    </>
  );
}

export default NewUpload;
