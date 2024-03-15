import ProfileHeader from "./ProfileHeader"
import { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import IconButton from '@mui/material/IconButton';
import LoadingButton from '@mui/lab/LoadingButton';
import { Bsx } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import CloseIcon from '@mui/icons-material/Close'
import Alert from '@mui/material/Alert';
import axios from 'axios';
import { AuthContext } from "../../Contexts/AuthContext";
import Default_panda from "../img/default_panda.png";
import Button from '@mui/material/Button';
import "./Prof_style/Profile.css";
import LockIcon from '@mui/icons-material/Lock';
import Skeleton from '@mui/material/Skeleton';
import Footer from "../Footer.js";
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));


const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    backgroundColor: '#44b700',
    color: '#44b700',
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    '&::after': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      animation: 'ripple 1.2s infinite ease-in-out',
      border: '1px solid currentColor',
      content: '""',
    },
  },
  '@keyframes ripple': {
    '0%': {
      transform: 'scale(.8)',
      opacity: 1,
    },
    '100%': {
      transform: 'scale(2.4)',
      opacity: 0,
    },
  },
}));


const Profile = () => {
  const Navigate = useNavigate()
  const [imageUrl, setImageUrl] = useState(Default_panda);

  const {
    name,
    rname,
    email,
    isLoggedIn,
    setIsLoggedIn,
    isPreloading,
    setIsPreloading,
    hasDesignerBadge
  } = useContext(AuthContext);

  const [passwordInput, setPasswordInput] = useState('');
  const [imagefile, setImagefile] = useState();
  const [isScrollShadowActivated, setIsScrollShadowActivated] = useState(false);
  const [confirmActive, setConfirmActive] = useState(false);
  const [proceedActive, setProceedActive] = useState(false);
  const [isNameEditing, setIsNameEditing] = useState(false);
  //for signout loading btn
  const [editedNameValue, setEditedNameValue] = useState(name);
  const [loading, setLoading] = useState(false);
  const [ploading, setPloading] = useState(false);
  //for real name
  const [isRNameEditing, setIsRNameEditing] = useState(false);
  const [editedRNameValue, setEditedRNameValue] = useState(rname);
  const [selectedImage, setSelectedImage] = useState(null);
  const [nameError, setNameError] = useState('');
  const [rnameError, setRNameError] = useState('');
  const [designerBadgeInfoOpen, setDesignerBadgeInfoOpen] = useState(true);

  const [selectedMode, setSelectedMode] = useState(() => {
    const storedMode = localStorage.getItem('selectedMode');
    return storedMode || 'light'; // Assuming 'light' as the default mode
  });

  const apiUrl = 'http://localhost:5000';

  const handleClick = () => {
    setLoading(true);
    setTimeout(async () => {
      await LogoutAll();
    }, 3000);
  }
  const handlePClick = () => {
    setPloading(true);
    setTimeout(async () => {
      await deleteAccount(passwordInput);
    }, 2000);
  }

  const fileInputRef = useRef(null);

  const handleEditNameClick = () => {
    setIsNameEditing(true);
    setEditedNameValue(name);
  };

  const handleCancelNameClick = () => {
    setIsNameEditing(false);
    setEditedNameValue(name);
  };

  const handleSaveNameClick = () => {
    try {
      if (rnameError === "") {
        setIsNameEditing(false);
        if (sessionToken) {
          setTimeout(async () => {
            const config = {
              headers: {
                Authorization: sessionToken
              }
            }
            const res = axios.put('/update-profile-name', { newName: editedNameValue }, config);
            if (res.status === 401) {
              console.log("unauthorized");
            } else if (res.status === 400) {
              console.log('No name Uploaded');
            } else if (res.status === 500) {
              console.log('Internal Server error');
            } else if (res.status === 200) {
              console.log('Name Changed successfully');
            }
          }, 2000);
          setTimeout(async () => {
            window.location.reload();
          }, 5500);
          const myPromise = new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );
          toast.promise(myPromise, {
            pending: "Modifying...",
            success: "Changes saved",
            error: "Error"
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleInputNameChange = (e) => {
    const newName = e.target.value;
    setEditedNameValue(newName);
    validateName(newName)
  };
  const handleInputRNameChange = (e) => {
    const newRname = e.target.value;
    setEditedRNameValue(newRname);
    validateRName(newRname)
  };
  const handleEditRNameClick = () => {
    setIsRNameEditing(true);
    setEditedRNameValue(rname);
  };

  const handleCancelRNameClick = () => {
    setIsRNameEditing(false);
    setEditedRNameValue(rname);
  };

  const handleSaveRNameClick = () => {
    try {
      if (nameError === "") {
        setIsRNameEditing(false);
        if (sessionToken) {
          setTimeout(() => {
            const config = {
              headers: {
                Authorization: sessionToken
              }
            }
            const res = axios.put('/update-profile-rname', { newRName: editedRNameValue }, config);
            if (res.status === 401) {
              console.log("unauthorized");
            } else if (res.status === 400) {
              console.log('No name Uploaded');
            } else if (res.status === 500) {
              console.log('Internal Server error');
            } else if (res.status === 200) {
              console.log('RName Changed successfully');
            }
          }, 2000);
          setTimeout(async () => {
            window.location.reload();
          }, 5500);
          const myPromise = new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );
          toast.promise(myPromise, {
            pending: "Uploading...",
            success: "Changes Saved",
            error: "Error"
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleNameSubmit = (e) => {
    e.preventDefault();
  };
  const handleRnameSubmit = (e) => {
    e.preventDefault();
  };
  const toBase64 = (imagefile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imagefile);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
  // Function to handle when a new image is selected
  const handleImageChange = (e) => {
    console.log('handleImageChange called');
    const fileInput = e.target;
    const file = fileInput.files[0];
    if (!file) {
      setSelectedImage(null);
      console.log('No file selected');
      toast.error("No file selected");
      return;
    }
    const maxSizeInBytes = 1024 * 1024; // 1MB
    if (file.size > maxSizeInBytes) {
      setSelectedImage(null);
      console.log('File size exceeds the limit (1MB)');
      toast.warning("File must be less than 1mb ");
      fileInput.value = '';
      return;
    } else {
      setSelectedImage(file)
      handlePropicUpload(file);
      // console.log("file is there")
      const imgBlob = URL.createObjectURL(file)
      // console.log(imgBlob)
    }
  };
  const sessionToken = localStorage.getItem('sessionToken');
  // if (!sessionToken) {
  //   Navigate("/Login")
  // }

  // Function to handle file upload
  const handlePropicUpload = async (file) => {
    let b64file = await toBase64(file);
    setSelectedImage(null);
    try {
      if (sessionToken) {
        setTimeout(async () => {
          const config = {
            headers: {
              Authorization: sessionToken,
            },
          };
          const res = await axios.post('/upload-profile-pic', { file: b64file }, config);

          if (res.status === 401) {
            console.log("unauthorized");
          } else if (res.status === 400) {
            console.log('No file Uploaded');
          } else if (res.status === 500) {
            console.log('Internal Server error');
          } else if (res.status === 200) {
            console.log('Profile picture uploaded successfully');
            setImageUrl(res.data)
          }
          setTimeout(async () => {
            window.location.reload(false);
          }, 3000);
        }, 2000);
        const myPromise = new Promise((resolve) =>
          setTimeout(resolve, 2000)
        );
        toast.promise(myPromise, {
          pending: "Setting profile picture...",
          success: "Changes Saved",
          error: "Error"
        });
      }
    } catch (error) {
      console.log(error)
    }
  };

  // Function to fetch the profile picture from the backend
  const fetchProfilePicture = async () => {
    try {
      if (sessionToken) {
        const config = {
          headers: {
            Authorization: sessionToken,
          },
        };
        const res = await axios.get('/profile-pic', config)
        // console.log("imagefile: ", res.data)
        if (res.status === 401) {
          console.log("Unauthorized access without session");
        } else if (res.status === 404) {
          console.log('No file Uploaded');
        } else if (res.status === 500) {
          console.log('Internal Server error');
        } else if (res.status === 200) {
          console.log('Profile picture uploaded successfully');
          setImageUrl(res.data)
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch the profile picture when the component mounts
  useEffect(() => {
    fetchProfilePicture();
  }, []);

  // Function to trigger the file input
  const handleImageUpload = () => {
    fileInputRef.current.click();
  };

  const handleImageRemove = async () => {
    // setSelectedImage(Default_panda); // Set to default image URL
    // // Optionally, you can reset the file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (imageUrl !== Default_panda) {
      try {
        const sessionToken = localStorage.getItem('sessionToken');

        if (sessionToken) {
          // Include the session token in the request headers
          setTimeout(async () => {
            const config = {
              headers: {
                Authorization: sessionToken,
              },
            };
            // Send a DELETE request to the backend to remove the profile picture
            const res = await axios.delete('/remove-profile-pic', config);
            if (res.status === 200) {
              console.log('Profile picture removed successfully');
              setImageUrl(Default_panda);
            } else {
              console.log('Internal server error');
            }
            setTimeout(async () => {
              window.location.reload(false);
            }, 5000);
          }, 2000);
          const myPromise = new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );
          toast.promise(myPromise, {
            pending: "Removing...",
            success: "Changes Saved",
            error: "Error"
          });
        }
      } catch (error) {
        console.error('Failed to remove the profile picture:', error);
      }
    } else {
      toast.error("This is a default pic !");
    }
  };

  const validateName = (value) => {
    let updatedErrors = "";
    if (value === "") {
      updatedErrors = "Name cannot be empty";
    } else if (value && !/^[A-Za-z]/.test(value)) {
      updatedErrors = "Name cannot start with a number";
    } else if (value && !/^[A-Za-z0-9_-]+$/.test(value)) {
      updatedErrors = "Invalid username";
    } else {
      updatedErrors = "";
    }
    setNameError(updatedErrors);
  };
  const validateRName = (value) => {
    let updatedRErrors = "";
    if (value === "") {
      updatedRErrors = "Name cannot be empty";
    } else if (value && !/^[A-Za-z]/.test(value)) {
      updatedRErrors = "Name cannot start with a number";
    } else {
      updatedRErrors = "";
    }
    setRNameError(updatedRErrors);
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (confirmActive && !e.target.closest(".signout_all_popup_box")) {
        // Clicked outside the modal, close it
        setConfirmActive(false);
      }
    };
    if (loading === false) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      if (loading === false) {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };
  }, [confirmActive, setConfirmActive, loading, setLoading]);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (proceedActive && !e.target.closest(".signout_all_popup_box")) {
        // Clicked outside the modal, close it
        setProceedActive(false);
        setPasswordInput(null)
      }
    };
    if (ploading === false) {
      document.addEventListener("mousedown", handleOutsideClick);
    }

    return () => {
      // Cleanup: remove the event listener when the component unmounts
      if (ploading === false) {
        document.removeEventListener("mousedown", handleOutsideClick);
      }
    };
  }, [proceedActive, setProceedActive, ploading, setPloading]);

  const LogoutAll = async () => {
    try {
      if (sessionToken) {
        const config = {
          headers: {
            Authorization: sessionToken,
          },
        };
        const res = await axios.delete('/logout-all', config)
        // console.log("imagefile: ", res.data)
        if (res.status === 404) {
          console.log("Unauthorized access without session");
        } else if (res.status === 500) {
          console.log('Internal Server error');
        } else if (res.status === 200) {
          console.log('Logged out from all devices succedded');
          Navigate("/login");
          localStorage.removeItem('sessionToken');
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlePasswordChange = async (e) => {
    const password = e.target.value;
    setPasswordInput(password)
  }

  const deleteAccount = async (password) => {
    try {
      // Get the entered password from the input field

      if (!password) {
        // Handle the case where the password is empty
        toast.error('Password is empty !')
        setPloading(false)
        return;
      }

      // console.log('Frontend - deletePassword:', deletePassword);
      const sessionToken = localStorage.getItem('sessionToken');
      // console.log('session - deletePassword:', sessionToken);
      if (sessionToken) {
        const config = {
          headers: {
            Authorization: sessionToken,
          },
        };

        // console.log(password)
        const res = await fetch("/account-delete", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: sessionToken,
          },
          body: JSON.stringify({
            password,
          }),
        });

        if (res.status === 404) {
          console.log('Unauthorized access without session');
        } else if (res.status === 500) {
          console.log('Internal Server error');
        } else if (res.status === 401) {
          console.log("Invalid Password")
          setPloading(false)
          toast.error("Invalid Password");
        } else if (res.status === 200) {
          Navigate("/Home")
          const deletemsg = "Account delete successful"
          localStorage.setItem("AccountDeleteSuccess", deletemsg);
          localStorage.removeItem('sessionToken');
          console.log('Account deleted successfully');
          // Handle any additional actions you need
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
    setPloading(false)
  };

  useEffect(() => {

    const documentHeight = document.documentElement.scrollHeight;

    // Calculate the bottom position of the viewport
    const bottomPosition = window.scrollY + window.innerHeight;

    const handleScroll = () => {
      if (isScrollShadowActivated && bottomPosition >= documentHeight) {
        setIsScrollShadowActivated(false);
      }

      if (isScrollShadowActivated === false && window.scrollY >= 1) {
        setIsScrollShadowActivated(true);
      } else if (isScrollShadowActivated === true && window.scrollY <= 0) {
        setIsScrollShadowActivated(false);
      } else if (isScrollShadowActivated && bottomPosition >= documentHeight) {
        setIsScrollShadowActivated(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollShadowActivated]);

  const signOutCancel = async () => {
    if (ploading === false) {
      setProceedActive(false)
      setConfirmActive(null)
    }
  }

  return (
    <>
      <ProfileHeader />
      <section className="profile_compartment">
        <div className="profile_inside_compartment">
          <div className="profile_view_compartment">
            <div className="profile_view_inner_container">
              <form encType="multipart/form-data">
                <input
                  type="file"
                  accept="image/*" // Accept only image files
                  onChange={handleImageChange}
                  ref={fileInputRef}
                  id="propic"
                  style={{ display: 'none' }}
                />
              </form>
              <label htmlFor="propic">
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant={hasDesignerBadge === true ? "dot" : "standard"}
                  onClick={handleImageUpload}
                  className="figure"
                  style={isPreloading ? { background: "transparent", border: "none" } : {}}
                >
                  {!isPreloading ? (
                    <Avatar alt="Remy Sharp" src={imageUrl} />
                  ) : (
                    <Skeleton variant="circular" width={112} height={112} />
                  )}
                </StyledBadge>
                {/* <figure style={isPreloading ? { background: "transparent", border: "none" } : {}}>
                  {!isPreloading ? (
                    <img
                      src={imageUrl}
                      alt="Selected"
                    />
                  ) : (
                    <Skeleton variant="circular" width={112} height={112} />
                  )}
                </figure> */}
              </label>
              <div className="user_texts">
                {!isPreloading ? (
                  <h4 className="user_text_name" style={{ color: "#fff" }}>{name}</h4>
                ) : (
                  <Skeleton width={100} height={40} />
                )}
                {!isPreloading ? (
                  <p className="user_text_email">{email}</p>
                ) : (
                  <Skeleton width={150} height={40} />
                )}
              </div>
            </div>
          </div>
          <div className="profile_edit_compartment">
            {hasDesignerBadge && (
              <div className="designerBadgeInfo">
                <Box sx={{ width: '100%' }}>
                  <Collapse in={designerBadgeInfoOpen}>
                    <Alert
                      action={
                        <IconButton
                          aria-label="close"
                          color="inherit"
                          size="small"
                          onClick={() => {
                            setDesignerBadgeInfoOpen(false);
                          }}
                        >
                          <CloseIcon fontSize="inherit" />
                        </IconButton>
                      }
                      sx={{ mb: 2 }}
                    >
                      Hello designer ! You has a designers badge since you have uploaded 3 or more than 3 designs else it would be reverted back
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
            )}
            <h1 className="account_title">Account Setting</h1>
            <div className="edit_pic_outer_container">
              <h5 className="photo_change_title">Profile Photo</h5>
              <div className="edit_pic_compartment">
                <div className="photo_change_container">
                  {!isPreloading ? (
                    <figure onClick={handleImageUpload}>
                      <span className="hover_cover">
                        <i class="bi bi-camera"></i>
                      </span>
                      <img src={imageUrl} />
                    </figure>
                  ) : (
                    <Skeleton variant="circular" width={84} height={84} id="skeleton1" />
                  )}
                </div>
                <div className="photo_button_container">
                  <button className="remove_pic_btn" onClick={handleImageRemove}>Remove photo</button>
                  <button className="change_pic_btn" onClick={handleImageUpload}>Change photo</button>
                </div>
              </div>
              <hr className="break_line" />
            </div>
            {/*  */}
            <div className="edit_name_outer_container">
              <h5 className="name_change_title">Name</h5>
              {!isNameEditing ? (
                <div className="edit_name_compartment">
                  <div className="name_change_container">
                    {!isPreloading ? (
                      <h4>{name}</h4>
                    ) : (
                      <Skeleton width={window.innerWidth >= 361 ? 200 : 130} height={40} id="skeleton1" />
                    )}
                  </div>
                  <div className="name_button_container">
                    <button className="edit_name_btn" onClick={handleEditNameClick}>Edit</button>
                  </div>
                </div>
              ) : (
                <div className="edit_name_compartment">
                  <div className="edit_name_compartment_error" >
                    <form className="edit_name_inner_compartment" action="" onSubmit={handleNameSubmit}>
                      <div className="name_input_container">
                        <input type="text" name="name" id="name" value={editedNameValue}
                          onChange={handleInputNameChange} autoFocus />
                      </div>
                      <div className="input_btn_container">
                        <button className="Cancel_btn" onClick={handleCancelNameClick}>Cancel</button>
                        <button type="submit" className="Save_btn" onClick={handleSaveNameClick} disabled={nameError === "" && editedNameValue !== name ? false : true}>Save</button>
                      </div>
                    </form>
                    {nameError && <p className="error_name">{nameError}</p>}
                  </div>
                </div>
              )
              }
              <hr className="break_line" />
            </div>
            {/*  */}
            <div className="edit_email_outer_container">
              <h5 className="email_change_title">Email</h5>
              <div className="edit_email_compartment">
                <div className="email_change_container">
                  {!isPreloading ? (
                    <h4>{email}</h4>
                  ) : (
                    <Skeleton width={window.innerWidth >= 361 ? 230 : 140} height={40} id="skeleton1" />
                  )}
                </div>
                <div className="email_button_container">
                  <button className="edit_email_btn" disabled >Edit</button>
                </div>
              </div>
              <div className="caption">
                <h2 className="caption_text">Email cannot be changed.</h2>
              </div>
              <hr className="break_line" />
            </div>
            {/* for real name */}
            <div className="edit_name_outer_container">
              <h5 className="name_change_title">Real name</h5>
              {!isRNameEditing ? (
                <div className="edit_name_compartment">
                  <div className="name_change_container">
                    {!isPreloading ? (
                      <h4>{rname}</h4>
                    ) : (
                      <Skeleton width={window.innerWidth >= 361 ? 200 : 130} height={40} id="skeleton1" />
                    )}
                  </div>
                  <div className="name_button_container">
                    <button className="edit_name_btn" onClick={handleEditRNameClick}>Edit</button>
                  </div>
                </div>
              ) : (
                <div className="edit_name_compartment">
                  <div className="edit_name_compartment_error" >
                    <form className="edit_name_inner_compartment" action="" onSubmit={handleRnameSubmit}>
                      <div className="name_input_container">
                        <input type="text" name="rname" id="rname" value={editedRNameValue}
                          onChange={handleInputRNameChange} autoFocus />
                      </div>
                      <div className="input_btn_container">
                        <button className="Cancel_btn" onClick={handleCancelRNameClick}>Cancel</button>
                        <button className="Save_btn" onClick={handleSaveRNameClick} disabled={rnameError === "" && editedRNameValue !== rname ? false : true}>Save</button>
                      </div>
                    </form>
                    {rnameError && <p className="error_name">{rnameError}</p>}
                  </div>
                </div>
              )
              }
              <hr className="break_line" />
            </div>
            {/*  */}
            <div className="edit_password_outer_container">
              <h5 className="password_change_title">Password</h5>
              <div className="edit_password_compartment">
                <div className="password_change_container">
                  {!isPreloading ? (
                    <h4 className="pass_text">*************</h4>
                  ) : (
                    <Skeleton width={window.innerWidth >= 361 ? 200 : 130} height={40} id="skeleton1" />
                  )}
                </div>
                <div className="password_button_container">
                  <Link to="/forgot" >
                    <button className="edit_password_btn" >Change</button>
                  </Link>
                </div>
              </div>
              <div className="caption">
                <h2 className="caption_text">You would be redirected to <Link to="/forgot"> <span>password reset page</span> </Link> for security purpose</h2>
              </div>
              <hr className="break_line" />
            </div>
            {/*  */}
            <div className="edit_security_outer_container">
              <h5 className="security_change_title">Signout from all devices</h5>
              <div className="edit_security_compartment">
                <div className="security_change_container">
                  <h4 className="security_info_text">Logged in on a shared device but forgot to sign out ?  End all sessions by signing out from all devices.</h4>
                </div>
                <div className="security_button_container">
                  <button className="edit_security_btn" onClick={() => setConfirmActive(true)}>Signout from all devices</button>
                </div>
              </div>
              <hr className="break_line" />
            </div>
            {/*  */}
            <div className="edit_closeA_outer_container">
              <h5 className="closeA_change_title">Delete your account</h5>
              <div className="edit_closeA_compartment">
                <div className="closeA_change_container">
                  <h4 className="closeA_info_text">By deleting your account, you'll no longer be able to access any of your designs or log in to Graffiti.</h4>
                </div>
                <div className="closeA_button_container">
                  <button className="edit_closeA_btn" onClick={() => setProceedActive(true)} >Delete account</button>
                </div>
              </div>
              <hr className="break_line" />
            </div>
          </div>
        </div>
      </section >
      <section className={`signout_all_popup ${confirmActive ? 'active' : ''}`}>
        <div className="signout_all_popup_cont">
          <div className="signout_all_popup_box">
            <h1>Are you sure you want to sign out of all devices?</h1>
            <p>Log back in after to resume using Graffiti, as well as on your other devices.</p>
            <div className="signout_all_btns">
              <Button variant="contained" className="cancel_btn" onClick={() => loading === false && setConfirmActive(false)}>Cancel</Button>
              <LoadingButton onClick={handleClick}
                loading={loading} variant="contained" sx={{ color: "white" }} size="large" className="Sign_out_all_btn">Signout of all devices</LoadingButton>
            </div>
          </div>
          <div className="close_btn_cont">
            <IconButton aria-label="delete" size="large" id="cls_icon_inner_cont" onClick={() => loading === false && setConfirmActive(false)}>
              <CloseRoundedIcon style={{ fontSize: "2rem" }} className="cls_icon" sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      </section>
      <section className={`signout_all_popup ${proceedActive ? 'active' : ''} proceed`}>
        <div className="signout_all_popup_cont">
          <div className="signout_all_popup_box">
            <h1>Are you sure you want to delete your account?</h1>
            <p>The following will be deleted respectively :
              <ul>
                <li>All the profile details</li>
                <li>Every uploaded designs by you</li>
                <li>Downloads and history contents</li>
              </ul>
            </p>
            <form action="">
              <p>
                Enter the password of this account if you want to proceed :
              </p>
              <div className="delete_input_container"><div className="i_cont">
                <LockIcon size="small" className="i" />
              </div>
                <input
                  type="text"
                  autoFocus
                  placeholder="Enter password"
                  id="passwordInput"
                  value={passwordInput}
                  onChange={handlePasswordChange}>
                </input>
              </div>
            </form>
            <div className="signout_all_btns">
              <Button variant="contained" className="cancel_btn" onClick={signOutCancel}>Cancel</Button>
              <LoadingButton onClick={handlePClick}
                loading={ploading} variant="contained" sx={{ color: "white" }} size="large" className="Sign_out_all_btn" id="Sign_out_all_btn">Delete Account</LoadingButton>
            </div>
          </div>
          <div className="close_btn_cont">
            <IconButton aria-label="delete" size="large" id="cls_icon_inner_cont" onClick={() => ploading === false && setProceedActive(false)}>
              <CloseRoundedIcon style={{ fontSize: "2rem" }} className="cls_icon" sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div >
      </section >
      <div className={`scroll_shadow ${isScrollShadowActivated === true ? 'active' : ''}`}>
        <div className="scroll_shadow_top"></div>
        <div className="scroll_shadow_bottom"></div>
      </div>
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
        theme={selectedMode === "dark" ? "dark" : "light"}
      />
    </>
  );
}
export default Profile;