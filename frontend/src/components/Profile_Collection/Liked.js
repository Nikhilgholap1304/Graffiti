import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import Button from '@mui/material/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import ProfileHeader from "./ProfileHeader.js";
import demoCardImage from "../img/genre2.jpg";
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import CommentIcon from '@mui/icons-material/Comment';
import ReportGmailerrorredRoundedIcon from '@mui/icons-material/ReportGmailerrorredRounded';
import SimCardDownloadRoundedIcon from '@mui/icons-material/SimCardDownloadRounded';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';
import CircularProgress from '@mui/material/CircularProgress';
import Skeleton from '@mui/material/Skeleton'
import axios from 'axios';
import './Prof_style/Upload.css'
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import AnimatedEmptyMsgMp4Light from "../img/AnimatedSvgLight.gif"
import AnimatedEmptyMsgMp4Dark from "../img/AnimatedSvgDark.gif"
import Accordion from '@mui/material/Accordion';
import AccordionActions from '@mui/material/AccordionActions';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Lightbox from 'react-image-lightbox';
import Default_panda from '../img/default_panda.png';
import 'react-image-lightbox/style.css';
import { color } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LinearProgress from '@mui/material/LinearProgress';
import Box from '@mui/material/Box';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import Footer from "../Footer.js";

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

const Liked = () => {

  const Navigate = useNavigate()
  const [openFullyDesign, setOpenFullyDesign] = useState(false);
  const [isFullyOpenDesignScrolled, setIsFullyOpenDesignScrolled] = useState(false);
  const [emptyDesign, setEmptyDesign] = useState(true);
  const [uploadedDesign, setUploadedDesign] = useState([]);
  const [singleDesign, setSingleDesign] = useState([]);
  const [singleDesignUD, setSingleDesignUD] = useState([]);
  const [profilePic, setProfilePic] = useState();
  const [isDesignLoading, setIsDesignLoading] = useState(true);
  const [isEmptyMsgCirLoader, setEmptyMsgCirLoader] = useState(true);
  const sessionToken = localStorage.getItem('sessionToken');
  const StickyHeaderFODRef = useRef(null);
  const [isDesignVidHovered, setIsDesignVidHovered] = useState(false);
  const [lightboxIsOpen, setLightboxIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isFODLoading, setIsFODLoading] = useState(true)
  const [likedDesigns, setLikedDesigns] = useState([]);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [reportReason, setReportReason] = useState('Vulger Content');
  const [confirmDelActive, setConfirmDelActive] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [buffer, setBuffer] = useState(10);
  const [downloadInProgress, setDownloadInProgress] = useState(false);

  const progressRef = React.useRef(() => { });
  React.useEffect(() => {
    progressRef.current = () => {
      if (progress > 100) {
        setProgress(0);
        setBuffer(10);
      } else {
        const diff = Math.random() * 10;
        const diff2 = Math.random() * 10;
        setProgress(progress + diff);
        setBuffer(progress + diff + diff2);
      }
    };
  });

  useEffect(() => {
    const timer = setInterval(() => {
      progressRef.current();
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  const handleConfirmClick = () => {
    setLoading(true);
    setTimeout(async () => {
      await DeleteDesign();
    }, 3000);
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (confirmDelActive && !e.target.closest(".signout_all_popup_box")) {
        // Clicked outside the modal, close it
        setConfirmDelActive(false);
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
  }, [confirmDelActive, setConfirmDelActive, loading, setLoading]);

  const handleClickReportDialogOpen = () => {
    setReportDialogOpen(true);
  };
  const handleCloseReportDialog = () => {
    setReportDialogOpen(false);
  };

  let DetailImages = null;
  if (singleDesign.files) {
    DetailImages = singleDesign.files.map(file => `data:${file.type};base64,${file.data}`);
  }

  const openLightbox = (index) => {
    setPhotoIndex(index);
    setLightboxIsOpen(true);
  };
  // Function to close the lightbox
  const closeLightbox = () => {
    setLightboxIsOpen(false);
  };

  const [selectedMode, setSelectedMode] = useState(() => {
    const storedMode = localStorage.getItem('selectedMode');
    return storedMode;
  });
  const handleUploadNavigate = () => {
    setTimeout(() => {
      Navigate('/NewUpload')
    }, 200);
  }
  const handleOpenFullyDesign = async (designId) => {
    setOpenFullyDesign(true)
    try {
      const config = {
        headers: {
          Authorization: sessionToken,
        },
      };
      const res = await axios.get(`/fetch_Individual_design/${designId.toString()}`, config);
      if (res.status === 401) {
        console.log("Unuthorized user")
      }
      else if (res.status === 403) {
        console.log("Unuthorized access to design")
      }
      else if (res.status === 200) {
        console.log("Success")
        setSingleDesign(res.data.designDetail);
        setSingleDesignUD(res.data.ShortUserDetails);
        setTimeout(() => {
          setIsFODLoading(false);
        }, 2000);
      }
    } catch (err) {
      console.log(err);
    }
  }

  const handleCloseFullyOpenDesign = () => {
    setOpenFullyDesign(false)
    setIsFODLoading(true)
  }
  useEffect(() => {
    const handleScroll = () => {
      const scrollFODPosition = StickyHeaderFODRef.current.scrollTop;
      // Set a threshold value based on when you want the border to change color
      const threshold = window.innerWidth < 950 ? (window.innerWidth < 670 ? 70 : 100) : 115;

      setIsFullyOpenDesignScrolled(scrollFODPosition > threshold);
    };
    // Attach the scroll event listener
    StickyHeaderFODRef.current.addEventListener('scroll', handleScroll);
    // Clean up the event listener on component unmount
    return () => {
      if (StickyHeaderFODRef.current) {
        StickyHeaderFODRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);
  // Function to handle liking a design
  const handleToggleLike = async (designId, e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(`/like_design/${designId}`, null, {
        headers: {
          Authorization: sessionToken, // Include your authorization token here
        },
      });
      if (res.status === 401) {
        console.log("Unauthorized access without session");
      } else if (res.status === 403) {
        console.log("Design not found");
      } else if (res.status === 200) {
        console.log("Liked or unliked design");
        const updatedLikes = res.data.likes;
        // setUploadedDesign((prevDesigns) =>
        //   prevDesigns.map((design) =>
        //     design._id === designId ? { ...design, likes: updatedLikes } : design
        //   )
        // );
        setSingleDesign(res.data.updatedDesign)
      }
    } catch (err) {
      console.log(err);
    }
    // if (likedDesigns.includes(designId)) {
    //   // Design is already liked, so dislike it
    //   setLikedDesigns(likedDesigns.filter(id => id !== designId));
    // } else {
    //   // Design is not liked, so like it
    //   setLikedDesigns([...likedDesigns, designId]);
    // }
  };
  const handleToggleBookMark = async (designId, e) => {
    e.stopPropagation();
    try {
      const res = await axios.post(`/bookmark_design/${designId}`, null, {
        headers: {
          Authorization: sessionToken, // Include your authorization token here
        },
      });
      if (res.status === 401) {
        console.log("Unauthorized access without session");
      } else if (res.status === 403) {
        console.log("Design not found");
      } else if (res.status === 200) {
        console.log("Bookmarked or Unbookmarked design");
        const updatedLikes = res.data.likes;
        // setUploadedDesign((prevDesigns) =>
        //   prevDesigns.map((design) =>
        //     design._id === designId ? { ...design, likes: updatedLikes } : design
        //   )
        // );
        setSingleDesign(res.data.updatedDesign)
      }
    } catch (err) {
      console.log(err);
    }
    // if (likedDesigns.includes(designId)) {
    //   // Design is already liked, so dislike it
    //   setLikedDesigns(likedDesigns.filter(id => id !== designId));
    // } else {
    //   // Design is not liked, so like it
    //   setLikedDesigns([...likedDesigns, designId]);
    // }
  };
  useEffect(() => {
    const fetchLikedDesignData = async () => {
      try {
        const config = {
          headers: {
            Authorization: sessionToken,
          },
        };
        const res = await axios.get('/fetch_liked_design_data', config);
        if (res.status === 401) {
          console.log("Unauthorized access without session");
        } else if (!res.data || res.data.length === 0 || res.status === 404) {
          console.log('No file Uploaded');
          setEmptyDesign(true);
          setTimeout(() => {
            setEmptyMsgCirLoader(false)
          }, 1500);
        } else if (res.status === 200) {
          // console.log(res.data);
          setProfilePic(res.data.profilePic)
          setUploadedDesign(res.data.designs);
          // console.log('uploadedDesign :', uploadedDesign);
          setEmptyDesign(false)
          setTimeout(() => {
            setEmptyMsgCirLoader(false)
          }, 1500);
          setTimeout(() => {
            setIsDesignLoading(false); // Set isLoading to false after 2 seconds
          }, 4000);
        }
      } catch (error) {
        console.error(error);
      }
    }
    if (uploadedDesign.length === 0) {
      setTimeout(() => {
        setEmptyMsgCirLoader(false)
        console.log("getting here")
      }, 5500)
    }
    fetchLikedDesignData();
  }, [sessionToken, setUploadedDesign, openFullyDesign, setSingleDesign, handleToggleLike])

  useEffect(() => {
    const DesignVideoFile = document.getElementById('DesignVideoFile');

    if (DesignVideoFile) {
      if (isDesignVidHovered) {
        DesignVideoFile.play();
      } else {
        DesignVideoFile.pause();
        DesignVideoFile.currentTime = 0;
      }
    }
  }, [isDesignVidHovered]);

  const handleReportRadioChange = (e) => {
    setReportReason(e.target.value);
  };

  const handleReportDesign = async () => {
    setReportDialogOpen(false);
    try {
      if (!sessionToken) {
        return console.log("Unauthorized");
      } else {
        console.log(reportReason);
        const config = {
          method: 'POST',
          headers: {
            Authorization: sessionToken
          },
          body: {
            reportReason
          },
        }
        const res = await fetch(`/report_design/${singleDesign._id}/${reportReason}`, config)
        // const res = await axios.post(`/report_design/${singleDesign._id}`, { reportReason }, config)
        if (res.status === 401) {
          return console.log('Unauthorized');
        } else if (res.status === 403) {
          const myPromise = new Promise((resolve) =>
            setTimeout(resolve, 1000)
          );
          toast.promise(myPromise, {
            pending: "Just a sec...",
          });
          toast.error('You had already reported');
        } else if (res.status === 200) {
          console.log("successfully reported");
          const myPromise = new Promise((resolve) =>
            setTimeout(resolve, 2000)
          );
          toast.promise(myPromise, {
            pending: "Just a sec...",
            success: "Successfully reported",
            error: "Error"
          });
        }
      }
    } catch (err) {
      console.log(err);
    }
  }
  const signOutCancel = async () => {
    if (loading === false) {
      setConfirmDelActive(null)
    }
  }
  const DeleteDesign = async () => {
    try {
      if (sessionToken) {
        const config = {
          method: 'POST',
          headers: {
            Authorization: sessionToken,
          },
        };

        const res = await fetch(`/delete_design/${singleDesign._id}`, config);
        // const res = await axios.delete('/logout-all', config)
        // console.log("imagefile: ", res.data)
        if (res.status === 401) {
          console.log("Design not found");
        } else if (res.status === 200) {
          console.log('Deleted the design');
          toast.success('Design deleted');
          setConfirmDelActive(false);
          setOpenFullyDesign(false);
          setIsFODLoading(true);
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }
  const handleDownload = async () => {
    setDownloadInProgress(true);
    setProgress(0);
    setBuffer(10);
    setTimeout(async () => {
      try {
        const response = await axios.get(`/download_design/${singleDesign._id}`, {
          headers: {
            'Authorization': sessionToken
          }
        }, {
          responseType: 'arraybuffer', // Important for handling binary data
          onDownloadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentCompleted = (loaded / total) * 100;
            setProgress(percentCompleted);
            setBuffer(percentCompleted + 10);
          }, // Specify the response type as 'blob'
        });

        // Create a temporary anchor element and trigger a click to download the file
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', `design_${singleDesign._id}_files.zip`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        setTimeout(() => {
          setDownloadInProgress(false);
        }, 500);
      } catch (error) {
        setDownloadInProgress(false);
        console.error('Error during download:', error);
        // Handle error, show a message to the user, etc.
      }
    }, 2000);
  };

  const handleMessageClicked = (designId) => {
    Navigate(`/Comments/${designId}`);
  }

  return (
    <>
      <ProfileHeader />
      {/* card phase starts */}
      {isEmptyMsgCirLoader ? (
        <div className="CirculerP" style={{ position: "absolute", display: "flex", width: "100%", height: '100%', alignItems: "center", justifyContent: "center" }}>
          <CircularProgress sx={{ color: "#eee" }} />
        </div>
      ) : (
        <>

          {!emptyDesign || !uploadedDesign === 0 ? (
            <section className="CardSection">
              <ul className="CardSectionContainer">
                {uploadedDesign.map((design, index) => (
                  <li className="Card" key={design._id}>
                    {isDesignLoading ? (
                      <>
                        <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100%", height: "200px" }} id="design_img_cont_skele" />
                        <div style={{ display: 'flex', alignItems: "center", width: "100%", justifyContent: "space-between", gap: "5px", overflow: "hidden" }}>
                          <Skeleton variant="circular" width={40} height={40} />
                          <Skeleton variant="rectangular" width={200} height={20} sx={{ borderRadius: '5px' }} />
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="CardFrontImageContainer"
                          onMouseEnter={() => setIsDesignVidHovered(true)}
                          onMouseLeave={() => setIsDesignVidHovered(false)}
                          onClick={() => handleOpenFullyDesign(design._id)}>
                          {design.files[0].type.startsWith('video/') ? (
                            <video
                              src={`data:${design.files[0].type};base64,${design.files[0].data}`}
                              id="DesignVideoFile"
                              autoPlay={false}
                              loop
                              muted
                              playsInline
                              alt={`File from ${design.title}`}></video>
                          ) : (
                            <img src={`data:${design.files[0].type};base64,${design.files[0].data}`} alt={`File from ${design.title}`} />
                          )}
                          <div className="HoverTitle_LikeCont">
                            <div className='innerHoverTLCont'>
                              <p className="HvrDesignTitle">
                                {design.title}
                              </p>
                              <div className="HvrDesignLike_BMCont">
                                <div className='Like_cont'>
                                  <IconButton onClick={(e) => handleToggleLike(design._id, e)} className='FavIconCont'>
                                    {design.likes.includes(design.userId) ? (
                                      <FavoriteIcon className='FavIcon' />
                                    ) : (
                                      <FavoriteBorderIcon className='FavIcon' />
                                    )}
                                  </IconButton>
                                  <span className='LikeToolTip'>{design.likes.includes(design.userId) ? (
                                    'Unlike'
                                  ) : (
                                    'Like'
                                  )}</span>
                                </div>
                                <div className='BookMark_cont'>
                                  <IconButton className='BookMarkIconCont' onClick={(e) => handleToggleBookMark(design._id, e)}>
                                    {design.bookmarks.includes(design.userId) ? (
                                      <BookmarkAddedRoundedIcon className='BM_Icon' />
                                    ) : (
                                      <BookmarkAddOutlinedIcon className='BM_Icon' />
                                    )}
                                  </IconButton>
                                  <span className='BMToolTip'>{design.bookmarks.includes(design.userId) ? (
                                    'Unpin'
                                  ) : (
                                    'Pin'
                                  )}</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="CardLowerPart">
                          <div className='CardUploadersName&PicCont'>
                            <IconButton className='CardUploadersPicCont'>
                              <img src={profilePic || Default_panda} alt="" />
                            </IconButton>
                            <Button variant="text" className='CardUploadersNameCont'>
                              <p className='CardUploaderName'>{design.userName}</p>
                            </Button>
                          </div>
                          <div className="Card_Comments_Views_LikeCont">
                            <div className="CardComments">
                              <IconButton onClick={() => handleMessageClicked(design._id)} >
                                <CommentIcon />
                              </IconButton>
                            <p className="noOfComments">
                              {design.commentsCount ? design.commentsCount : 0}
                            </p>
                          </div>
                          <div className="CardViews">
                            <IconButton>
                              <RemoveRedEyeIcon />
                            </IconButton>
                            <p className="noOfViews">
                              {design.views.length}
                            </p>
                          </div>
                          <div className="CardLikes">
                            <IconButton onClick={(e) => handleToggleLike(design._id, e)}>
                              {design.likes.includes(design.userId) ? (
                                <FavoriteIcon className='CardLikeOuter' />
                              ) : (
                                <FavoriteBorderIcon className='CardLikeOuter' />
                              )}
                            </IconButton>
                            <p className="noOfLikes">
                              {design.likes.length}
                            </p>
                          </div>
                        </div>
                      </div>
                  </>
                )}
              </li>
                ))}
            </ul>
            </section>
      ) : (
      <>
        <section className="blank_msg">
          <div className="AnimatedSvgContainer">
            <img src={`${selectedMode === 'light' ? AnimatedEmptyMsgMp4Light : AnimatedEmptyMsgMp4Dark}`} alt="Gif" autoPlay />
          </div>
          <h1 className="EmptyMsg">
            It looks like you haven't liked any of the designs,<br></br> To save the liked designs,search the designs and press the like button.
          </h1>
        </section>
      </>
      )
          }
    </>
  )
}
<section className={`Main_Fully_Open_Design ${openFullyDesign == true ? 'active' : ''}`} onClick={handleCloseFullyOpenDesign} >
  <IconButton className='IconButtonClose' onClick={handleCloseFullyOpenDesign}>
    <FontAwesomeIcon icon={faXmark} className='XmarkIco' />
  </IconButton>
  <div className="FullyOpenDesignSection" ref={StickyHeaderFODRef}>
    <div className="InnerFullyOpenDesign" onClick={(e) => e.stopPropagation()}>
      <div className="InnerFullyOpenDesignCont">
        <div className="FOD_title_cont">
          <h1 className="FOD_title">
            {isFODLoading ? (
              <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100px", height: "50px" }} id="FOD_title_skele" />

            ) : (
              `${singleDesign.title}`
            )}
          </h1>
        </div>
        <div className={`sticky_header ${isFullyOpenDesignScrolled ? 'active' : ''}`} >
          <div className="sticky_header_cont">
            <div className="sticky_header_user_cont">
              {isFODLoading ? (
                <Skeleton variant="circular" width={40} height={40} className='Circular_skele' />
              ) : (
                <StyledBadge
                  overlap="circular"
                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                  variant="dot"
                >
                  <Avatar alt="Remy Sharp" src={singleDesignUD[1]} />
                </StyledBadge>
              )}
              <div className="user_details">
                <h3 className="user_name">
                  {isFODLoading ? (
                    <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100px", height: "30px" }} id="user_name_skele" />
                  ) : (
                    `${singleDesignUD[0]}`
                  )}
                </h3>
              </div>
            </div>
          </div>
          <div className="sticky_header_like_message_cont">
            {isFODLoading ? (
              <>
                <Skeleton variant="circular" width={40} height={40} className='Circular_skele' />
                <Skeleton variant="circular" width={40} height={40} className='Circular_skele' />
              </>
            ) : (
              <>
                <IconButton onClick={(e) => handleToggleLike(singleDesign._id, e)}
                  className='Sticky_Ico' title='like this design'>
                  {singleDesign.likes.includes(singleDesign.userId) ? (
                    <FavoriteIcon className='FODLikeIco' />
                  ) : (
                    <FavoriteBorderIcon className='FODLikeIco' />
                  )}
                </IconButton>
                <IconButton className='Sticky_Ico' title='put a comment' onClick={() => handleMessageClicked(singleDesign._id)}>
                  <CommentIcon />
                </IconButton>
              </>
            )}
          </div>
        </div>
        {isFODLoading ? (
          <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100%", height: "50px" }} id="accordian_skele" />
        ) : (
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1-content"
              id="panel1-header"
            >
              File Types
            </AccordionSummary>
            <AccordionDetails>
              {singleDesign.files && singleDesign.files.map((file, index) => (
                <Chip key={index} label={file.type} />
              ))}
            </AccordionDetails>
          </Accordion>
        )}

        <div className="design_cont">
          <ul className="inner_design_cont">
            {singleDesign.files && singleDesign.files.map((file, index) => (
              <li key={index} className="design_img_cont">
                {isFODLoading ? (
                  <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100%", height: "100%" }} animation="wave" id='design_img_cont_skele' />
                ) : (
                  <>
                    {
                      (file.type.startsWith('video/')) ? (
                        <video
                          src={`data:${file.type};base64,${file.data}`}
                          id="FODdesignVidFile"
                          autoPlay
                          loop
                          muted
                          playsInline
                          alt={`File from ${file.filename}`}></video>
                      ) : (
                        <img
                          src={`data:${file.type};base64,${file.data}`} alt={`File from ${file.filename}`}
                          onClick={() => openLightbox(index)}
                        />
                      )
                    }
                  </>
                )}
              </li>
            ))
            }
          </ul>
          {/* Lightbox component */}
          {lightboxIsOpen && (
            <Lightbox
              mainSrc={DetailImages[photoIndex]}
              nextSrc={DetailImages[(photoIndex + 1) % DetailImages.length]}
              prevSrc={DetailImages[(photoIndex + DetailImages.length - 1) % DetailImages.length]}
              onCloseRequest={closeLightbox}
              onMovePrevRequest={() => setPhotoIndex((photoIndex + DetailImages.length - 1) % DetailImages.length)}
              onMoveNextRequest={() => setPhotoIndex((photoIndex + 1) % DetailImages.length)}
            />
          )}
        </div>
        <div className="design_description_cont">
          <h3 className='design_description'>
            {isFODLoading ? (
              <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "50vw", height: "60px" }} animation="wave" id='description_skele' />
            ) : (
              `${singleDesign.description}`
            )}
          </h3>
        </div>
        <div className="design_tags_cont">
          {isFODLoading ? (
            <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "70%", height: "60px" }} animation="wave" id='design_tags_cont_skele' />
          ) : (
            <>
              {
                singleDesign.tags && singleDesign.tags.map((tag, index) => (
                  <Chip variant="outlined" color="warning" label={tag} className='Tag_Chips' key={index} />
                ))
              }
            </>
          )}
        </div>
      </div>
      <div className="design_sidebar_wrapper">
        <div className="design_sidebar_icon_cont">
          <IconButton className='sidebar_Icos' tipname='report' onClick={setReportDialogOpen}>
            <ReportGmailerrorredRoundedIcon />
          </IconButton>
          <IconButton className='sidebar_Icos' tipname='download' onClick={handleDownload} disabled={downloadInProgress}>
            <SimCardDownloadRoundedIcon />
          </IconButton>
          <IconButton className='sidebar_Icos' tipname='delete' onClick={() => setConfirmDelActive(true)}>
            <DeleteRoundedIcon />
          </IconButton>
        </div>
      </div>
    </div>
  </div>
</section>
{
  !isEmptyMsgCirLoader &&
  <Footer specifyStyle="DefaultCategory" />
}
<BootstrapDialog
  onClose={handleCloseReportDialog}
  aria-labelledby="customized-dialog-title"
  open={reportDialogOpen}
>
  <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
    Report design
  </DialogTitle>
  <IconButton
    aria-label="close"
    onClick={handleCloseReportDialog}
    sx={{
      position: 'absolute',
      right: 8,
      top: 8,
      color: (theme) => theme.palette.grey[500],
    }}
  >
    <CloseIcon className='CloseBtn' />
  </IconButton>
  <DialogContent dividers>
    <Typography gutterBottom>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={reportReason}
          name="radio-buttons-group"
          onChange={handleReportRadioChange}
          value={reportReason}
        >
          <FormControlLabel value="Vulger Content" control={<Radio color='warning' />} label="Vulger Content" sx={{
            '& .MuiSvgIcon-root': {
              fontSize: 29,
            },
          }} />
          <FormControlLabel value="Violent or repulsive content" control={<Radio color='warning'
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 29,
              },
            }} />} label="Violent or repulsive content" />
          <FormControlLabel value="Hateful or abusive content" control={<Radio color='warning'
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 29,
              },
            }} />} label="Hateful or abusive content" />
          <FormControlLabel value="Harmful or dangerous act" control={<Radio color='warning'
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 29,
              },
            }} />} label="Harmful or dangerous act" />
          <FormControlLabel value="Spam or misleading" control={<Radio color='warning'
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 29,
              },
            }} />} label="Spam or misleading" />
          <FormControlLabel value="Copyright Violation" control={<Radio color='warning'
            sx={{
              '& .MuiSvgIcon-root': {
                fontSize: 29,
              },
            }} />} label="Copyright Violation" />
        </RadioGroup>
      </FormControl>
    </Typography>
  </DialogContent>
  <DialogActions>
    <Button autoFocus onClick={handleReportDesign}>
      Report
    </Button>
  </DialogActions>
</BootstrapDialog>
{/* add icon */ }
      <div className='tooltip' onClick={handleUploadNavigate}>
        <IconButton className='iconBtnPlus'>
          <FontAwesomeIcon icon={faPlus} className='plusIco' />
          <div className="toolmsg">
            Add design
          </div>
        </IconButton>
      </div>
      <section className={`signout_all_popup ${confirmDelActive ? 'active' : ''}`}>
        <div className="signout_all_popup_cont">
          <div className="signout_all_popup_box">
            <h1>Are you sure you want to delete design?</h1>
            <p>You or anyone won't be able to access the design once deleted.</p>
            <div className="signout_all_btns">
              <Button variant="contained" className="cancel_btn" onClick={() => loading === false && setConfirmDelActive(false)}>Cancel</Button>
              <LoadingButton onClick={handleConfirmClick}
                loading={loading} variant="contained" sx={{ color: "white" }} size="large" className="Sign_out_all_btn">Delete the design</LoadingButton>
            </div>
          </div>
          <div className="close_btn_cont">
            <IconButton aria-label="delete" size="large" id="cls_icon_inner_cont" onClick={() => loading === false && setConfirmDelActive(false)}>
              <CloseRoundedIcon style={{ fontSize: "2rem" }} className="cls_icon" sx={{ color: "white" }} />
            </IconButton>
          </div>
        </div>
      </section>
{
  downloadInProgress && (
    <Box sx={{ width: '100%', position: 'fixed', top: '0', right: '0', left: '0', marginBottom: '2rem', zIndex: 1000 }}>
      <LinearProgress variant="buffer" value={progress} valueBuffer={buffer} color='warning' />
    </Box>
  )
}
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
  )
}

export default Liked;