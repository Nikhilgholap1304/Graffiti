import React, { useEffect, useState, useContext, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from "../../Contexts/AuthContext.js";
import { faRectangleXmark, faXmark, faPlus } from "@fortawesome/free-solid-svg-icons";
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { LuPaintbrush2 } from 'react-icons/lu';
import { HiOutlineSearch } from 'react-icons/hi';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/light_dark_mode.css";
import DesignStyle from "./AdminStyle/Designs.module.css"
import Graffiti_logo from "../img/graffiti_tri2.png";
import Default_panda from "../img/default_panda.png"
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
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
import 'react-image-lightbox/style.css';
import { color } from 'framer-motion';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ToastContainer, toast } from "react-toastify";
import LoadingButton from '@mui/lab/LoadingButton';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import LinearProgress from '@mui/material/LinearProgress';
import BookmarkAddRoundedIcon from '@mui/icons-material/BookmarkAddRounded';
import BookmarkAddedRoundedIcon from '@mui/icons-material/BookmarkAddedRounded';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import Pagination from '@mui/material/Pagination';
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import NotFound from "../img/NotFound.png";
import PropTypes from 'prop-types';
import AdminNavbar from "./AdminNavbar";
import Comments from "./Comments"
import { ColorModeContext } from '../../Contexts/ColorModeContext';
const drawerWidth = 240;

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

const Designs = () => {
  const [searchValue, setSearchValue] = useState('');
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [openFullyDesign, setOpenFullyDesign] = useState(false);
  const [isFullyOpenDesignScrolled, setIsFullyOpenDesignScrolled] = useState(false);
  const [emptyDesign, setEmptyDesign] = useState(true);
  const [uploadedDesign, setUploadedDesign] = useState([]);
  const [singleDesign, setSingleDesign] = useState([]);
  const [singleDesignUD, setSingleDesignUD] = useState([]);
  const [profilePic, setProfilePic] = useState();
  const [isDesignLoading, setIsDesignLoading] = useState(true);
  const [isEmptyMsgCirLoader, setEmptyMsgCirLoader] = useState(true);
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
  const [isFilteredDesign, setIsFilteredDesign] = useState(uploadedDesign);
  const [isSearchSessionActive, setIsSearchSessionActive] = useState(false)
  const { sessionAdminId } = useContext(AuthContext);
  const [usersBadgeData, setUsersBadgeData] = useState([]);
  const [page, setPage] = useState(1);
  const [isSearchHeaderVisible, setIsSearchHeaderVisible] = useState(true);
  const [openCommentSection, setOpenCommentSection] = useState(false);
  const [generalDesignId, setGeneralDesignId] = useState(null);
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const headerRef = useRef(null);

  const AdminSessionToken = localStorage.getItem('AdminSessionToken');

  const scrollThreshold = 200;
  const { toggleMode, mode } = useContext(ColorModeContext)
  const Navigate = useNavigate();
  const IdentifyMode = () => {
    if (mode === 'light') {
      return 'light'
    } else if (mode === 'dark') {
      return 'dark'
    } else if (mode === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.pageYOffset;
      const isScrolledDown = prevScrollPos < currentScrollPos;
      if (Math.abs(currentScrollPos - prevScrollPos) > scrollThreshold) {
        setIsSearchHeaderVisible(!isScrolledDown || currentScrollPos === 0 || currentScrollPos < scrollThreshold);
        setPrevScrollPos(currentScrollPos);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [prevScrollPos, scrollThreshold]);

  const designsPerPage = 12;

  const progressRef = useRef(() => { });

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Function to handle input value change
  const handleInputChange = (event) => {
    setIsSearchSessionActive(true)
    const query = event.target.value;
    setSearchValue(query);
    const filteredDesigns = uploadedDesign.filter((design) =>
      design.title.toLowerCase().includes(query.toLowerCase())
    );
    // Update the displayed designs
    setIsFilteredDesign(filteredDesigns);
  };

  // Function to clear the input field
  const handleClearInput = () => {
    setIsSearchSessionActive(false)
    setSearchValue('');
    const filteredDesigns = uploadedDesign.filter((design) =>
      design.title.includes('')
    );
    // Update the displayed designs
    setIsFilteredDesign(filteredDesigns);
  };

  const handleSearchClick = () => {
    setIsSearchSessionActive(true)
    const filteredDesigns = uploadedDesign.filter((design) =>
      design.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    // Update the displayed designs
    setIsFilteredDesign(filteredDesigns);
  }
  const handlePreSearchValues = (value) => {
    setIsSearchSessionActive(true)
    setSearchValue(value);
    const filteredDesigns = uploadedDesign.filter((design) =>
      design.title.toLowerCase().includes(value.toLowerCase())
    );
    // Update the displayed designs
    setIsFilteredDesign(filteredDesigns);
  }

  useEffect(() => {
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
          Authorization: AdminSessionToken,
        },
      };
      const res = await axios.get(`/fetch_Individual_design_admin/${designId.toString()}`, config);
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
      const res = await axios.post(`/like_design_admin/${designId}`, null, {
        headers: {
          Authorization: AdminSessionToken, // Include your authorization token here
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
      const res = await axios.post(`/bookmark_design_admin/${designId}`, null, {
        headers: {
          Authorization: AdminSessionToken, // Include your authorization token here
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
    const fetchDesignData = async () => {
      try {
        const res = await axios.get(`/fetch_admin_general_design_data`)
        if (!res.data || res.data.length === 0 || res.status === 404) {
          console.log('No file Uploaded');
          setEmptyDesign(true);
          setTimeout(() => {
            setEmptyMsgCirLoader(false)
          }, 1500);
        } else if (res.status === 200) {
          // console.log(res.data);
          setUploadedDesign(res.data.designs);
          console.log('uploadedDesign :', uploadedDesign.length === 0);
          setEmptyDesign(false)
          setTimeout(() => {
            setEmptyMsgCirLoader(false)
            console.log("getting here")
          }, 1500);
          setTimeout(() => {
            setIsDesignLoading(false); // Set isLoading to false after 2 seconds
          }, 3000);
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
    fetchDesignData();
  }, [
    // setUploadedDesign, openFullyDesign, setSingleDesign, handleToggleLike, handleToggleBookMark
  ])

  const isDesigner = (designUserId) => {
    const designerUsers = usersBadgeData.filter(user => user.hasDesignerBadge);
    return designerUsers.some(user => user.userId === designUserId);
  };

  useEffect(() => {
    if (isEmptyMsgCirLoader)
      setIsFilteredDesign(uploadedDesign);
  }, [uploadedDesign])

  const totalDesigns = isFilteredDesign.length;
  const totalPages = Math.ceil(totalDesigns / designsPerPage);

  const handlePageChange = (event, value) => {
    setPage(value);
    setIsDesignLoading(true);
    setTimeout(() => {
      setIsDesignLoading(false);
    }, 1000);
  };

  const startIndex = (page - 1) * designsPerPage;
  const endIndex = startIndex + designsPerPage;
  const currentDesigns = isSearchSessionActive ? isFilteredDesign.slice(startIndex, endIndex) : uploadedDesign.slice(startIndex, endIndex);

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
      console.log(reportReason);
      const config = {
        method: 'POST',
        headers: {
          Authorization: AdminSessionToken
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
    } catch (err) {
      console.log(err);
    }
  }
  const signOutCancel = async () => {
    if (loading === false) {
      setConfirmDelActive(null)
    }
  }
  const handleDownload = async () => {
    setDownloadInProgress(true);
    setProgress(0);
    setBuffer(10);
    setTimeout(async () => {
      try {
        const response = await axios.get(`/download_design_admin/${singleDesign._id}`, {
          headers: {
            'Authorization': AdminSessionToken
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

  const DeleteDesign = async () => {
    console.log("on frontend way to delete")
    try {
      if (AdminSessionToken) {
        const config = {
          method: 'POST',
          headers: {
            Authorization: AdminSessionToken,
          },
        };

        const res = await fetch(`/delete_design_admin/${singleDesign._id}`, config);
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
          if (res.data.RemovingBadge === true) {
            setTimeout(() => {
              toast("Oops, your designer badge is been taken")
            }, 2000);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  }


  useEffect(() => {
    const filteredDesigns = uploadedDesign.filter((design) =>
      design.title.toLowerCase().includes(searchValue.toLowerCase())
    );
    setIsFilteredDesign(filteredDesigns);
  }, [openFullyDesign, setSingleDesign, handleToggleLike, handleToggleBookMark, isSearchSessionActive, uploadedDesign])

  const handleMessageClicked = (designId) => {
    setOpenCommentSection(true)
    setGeneralDesignId(designId);
  }

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <AdminNavbar />
        <section className={`search_header admin ${isSearchHeaderVisible ? 'active' : ''}`}>
          <div className="graffiti_logo">
            <img src={Graffiti_logo} alt="Graffiti_logo" />
          </div>
          <div className="search_cont">
            <div className="brush_ico"><LuPaintbrush2 className="brush_ico_svg" /></div>
            <input
              type="text"
              class="search_input_bar"
              placeholder="Search all assets"
              value={searchValue}
              onChange={handleInputChange}
            />
            <div className={`cancel_ico ${searchValue.length > 0 ? 'active' : ''}`}
              onClick={handleClearInput}
            >
              <FontAwesomeIcon icon={faXmark} />
            </div>

            <div className="search_ico"
              onClick={handleSearchClick}
            ><HiOutlineSearch /></div>
          </div>
        </section>
        <Box
          component="main"
          sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
        >
          <Toolbar />
          <Toolbar />
          <Breadcrumbs aria-label="breadcrumb" sx={{ mt: 2 }}>
            <Link
              underline="hover"
              color="inherit"
              onClick={() => Navigate("/Admin/Dashboard")}
              sx={{ cursor: "pointer" }}
            >
              Dashboard
            </Link>
            <Link
              underline="hover"
              color="text.primary"
              onClick={() => Navigate("/Admin/UsersData")}
              aria-current="page"
              sx={{ cursor: "pointer" }}
            >
              Reported Designs
            </Link>
          </Breadcrumbs>
          <Typography variant='h5' sx={{ my: 2 }}>
            Reported Designs
          </Typography>
          {/* Card section starts */}
          {isEmptyMsgCirLoader ? (
            <div className={DesignStyle.CirculerP}>
              <CircularProgress sx={{ color: "primary.main" }} />
            </div>
          ) : (
            <>

              {!emptyDesign || !uploadedDesign === 0 ? (
                <section className={DesignStyle.CardSection}>
                  <ul className={DesignStyle.CardSectionContainer}>
                    {searchValue && (
                      <div className="resultTextCont">
                        <h3>Showing results for <b>{searchValue}</b></h3>
                      </div>
                    )}
                    <Comments designId={generalDesignId !== null && generalDesignId} openCommentSection={openCommentSection} setOpenCommentSection={setOpenCommentSection} />
                    {currentDesigns.map((design, index) => (
                      <li className={DesignStyle.Card} key={design._id}>
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
                            <div className={DesignStyle.CardFrontImageContainer}
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
                              <div className={DesignStyle.HoverTitle_LikeCont}>
                                <div className={DesignStyle.innerHoverTLCont}>
                                  <p className={DesignStyle.HvrDesignTitle}>
                                    {design.title}
                                  </p>
                                  <div className={DesignStyle.HvrDesignLike_BMCont}>
                                    <div className={DesignStyle.Like_cont}>
                                      <IconButton onClick={(e) => handleToggleLike(design._id, e)} className={DesignStyle.FavIconCont} style={{
                                        color: '#666',
                                        background: '#fff'
                                      }} disabled>
                                        {(design.likes.includes(sessionAdminId)) ? (
                                          <FavoriteIcon className={DesignStyle.FavIcon} style={{fontSize: '1.5rem'}}/>
                                        ) : (
                                          <FavoriteBorderIcon className={DesignStyle.FavIcon} style={{fontSize: '1.5rem'}}/>
                                        )}
                                      </IconButton>
                                      <span className={DesignStyle.LikeToolTip}>{(design.likes.includes(sessionAdminId)) ? (
                                        'Unlike'
                                      ) : (
                                        'Like'
                                      )}</span>
                                    </div>
                                    <div className={DesignStyle.BookMark_cont}>
                                      <IconButton className={DesignStyle.BookMarkIconCont} 
                                      style={{
                                        color: '#666',
                                        background: '#fff'
                                      }} 
                                      onClick={(e) => handleToggleBookMark(design._id, e)} disabled>
                                        {(design.bookmarks.includes(sessionAdminId)) ? (
                                          <BookmarkAddedRoundedIcon className={DesignStyle.BM_Icon} style={{fontSize: '1.5rem'}}/>
                                        ) : (
                                          <BookmarkAddOutlinedIcon className={DesignStyle.BM_Icon} style={{fontSize: '1.5rem'}}/>
                                        )}
                                      </IconButton>
                                      <span className={DesignStyle.BMToolTip}>{(design.bookmarks.includes(sessionAdminId)) ? (
                                        'Unpin'
                                      ) : (
                                        'Pin'
                                      )}</span>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className={DesignStyle.CardLowerPart}>
                              <div className={DesignStyle.CardUploadersNamePicCont}>
                                <StyledBadge
                                  overlap="circular"
                                  anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                  variant={isDesigner(design.userId) === true ? "dot" : "standard"}
                                  className={DesignStyle.CardUploadersPicCont}
                                >
                                  <Avatar alt="Design" src={design.UserPic || Default_panda} style={{ width: "35px", height: "35px" }} />
                                </StyledBadge>
                                <Button color="primary" variant="text" className={`MuiButtonBase-root ${DesignStyle.CardUploadersNameCont}`} style={{ marginLeft: '0.5rem', textTransform: 'none' }}>
                                  <p style={{
                                    margin: '0rem',
                                    textTransform: 'none',
                                    overflow: 'hidden',
                                    textOverflow: 'ellipsis',
                                    whiteSpace: 'nowrap',
                                    maxWidth: '7rem',
                                  }}
                                    className={DesignStyle.CardUploaderName}>{design.userName}</p>
                                </Button>
                              </div>
                              <div className={DesignStyle.Card_Comments_Views_LikeCont}>
                                <div className={DesignStyle.CardComments}>
                                  <IconButton size="small" onClick={() => handleMessageClicked(design._id)}>
                                    <CommentIcon size="small" fontSize='1.3rem' />
                                  </IconButton>
                                  <p className={DesignStyle.noOfComments} style={{ fontSize: "1.1rem" }}>
                                    {design.commentsCount ? design.commentsCount : 0}
                                  </p>
                                </div>
                                <div className={DesignStyle.CardViews}>
                                  <IconButton size="small" disabled>
                                    <RemoveRedEyeIcon size="small" fontSize='1.3rem' />
                                  </IconButton>
                                  <p className={DesignStyle.noOfViews} style={{ fontSize: "1.1rem" }}>
                                    {design.views.length}
                                  </p>
                                </div>
                                <div className={DesignStyle.CardLikes}>
                                  <IconButton onClick={(e) => handleToggleLike(design._id, e)} size="small" disabled>
                                    {(design.likes.includes(sessionAdminId)) ? (
                                      <FavoriteIcon className={DesignStyle.CardLikeOuter} fontSize='1.3rem' />
                                    ) : (
                                      <FavoriteBorderIcon className={DesignStyle.CardLikeOuter} fontSize='1.3rem' />
                                    )}
                                  </IconButton>
                                  <p className={DesignStyle.noOfLikes} style={{ fontSize: "1.1rem" }}>
                                    {design.likes.length}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                    {uploadedDesign.length <= 0 ? (
                      <div className={DesignStyle.NotFoundDesignCont}>
                        <img src={NotFound} alt="" />
                        <h1>It looks like Design has not found !</h1>
                      </div>
                    ) : ''}
                  </ul>
                </section>
              ) : (
                <>
                  <section className={`${DesignStyle.blank_msg} ${DesignStyle.admin}`}>
                    <div className={DesignStyle.AnimatedSvgContainer}>
                      <img src={NotFound} alt="Gif" autoPlay />
                    </div>
                    <h1 className={DesignStyle.EmptyMsg}>
                      It looks like designs can't be found
                    </h1>
                  </section>
                </>
              )
              }
            </>
          )}
          {!isEmptyMsgCirLoader &&
            (
              <section className={DesignStyle.Pagination}>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={handlePageChange} />
              </section>
            )}
        </Box>
      </Box >
      <section className={`${DesignStyle.Main_Fully_Open_Design} ${openFullyDesign == true ? DesignStyle.active : ''}`} onClick={handleCloseFullyOpenDesign} >
        <IconButton className={DesignStyle.IconButtonClose} onClick={handleCloseFullyOpenDesign}>
          <FontAwesomeIcon icon={faXmark} className={DesignStyle.XmarkIco} />
        </IconButton>
        <div className={DesignStyle.FullyOpenDesignSection} ref={StickyHeaderFODRef}>
          <div className={DesignStyle.InnerFullyOpenDesign} onClick={(e) => e.stopPropagation()}>
            <div className={DesignStyle.InnerFullyOpenDesignCont}>
              <div className={DesignStyle.FOD_title_cont}>
                <h1 className={DesignStyle.FOD_title}>
                  {isFODLoading ? (
                    <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100px", height: "50px" }} id="FOD_title_skele" />

                  ) : (
                    `${singleDesign.title}`
                  )}
                </h1>
              </div>
              <div className={`${DesignStyle.sticky_header} ${isFullyOpenDesignScrolled ? 'active' : ''}`} >
                <div className={DesignStyle.sticky_header_cont}>
                  <div className={DesignStyle.sticky_header_user_cont}>
                    {isFODLoading ? (
                      <Skeleton variant="circular" width={40} height={40} className={DesignStyle.Circular_skele} />
                    ) : (
                      <StyledBadge
                        overlap="circular"
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        variant="dot"
                      >
                        <Avatar alt="Remy Sharp" src={singleDesignUD[1]} />
                      </StyledBadge>
                    )}
                    <div className={DesignStyle.user_details}>
                      <h3 className={DesignStyle.user_name}>
                        {isFODLoading ? (
                          <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "100px", height: "30px" }} id="user_name_skele" />
                        ) : (
                          `${singleDesignUD[0]}`
                        )}
                      </h3>
                    </div>
                  </div>
                </div>
                <div className={DesignStyle.sticky_header_like_message_cont}>
                  {isFODLoading ? (
                    <>
                      <Skeleton variant="circular" width={40} height={40} className={DesignStyle.Circular_skele} />
                      <Skeleton variant="circular" width={40} height={40} className={DesignStyle.Circular_skele} />
                    </>
                  ) : (
                    <>
                      <IconButton onClick={(e) => handleToggleLike(singleDesign._id, e)} disabled
                        className={DesignStyle.Sticky_Ico} title='like this design'>
                        {singleDesign.likes.includes(singleDesign.userId) ? (
                          <FavoriteIcon className={DesignStyle.FODLikeIco} style={{
                            fontSize: "2rem"
                          }} />
                        ) : (
                          <FavoriteBorderIcon className={DesignStyle.FODLikeIco} style={{
                            fontSize: "2rem"
                          }} />
                        )}
                      </IconButton>
                      <IconButton className={DesignStyle.Sticky_Ico} title='put a comment' onClick={() => handleMessageClicked(singleDesign._id)}
                        style={{
                          fontSize: "2rem"
                        }} >
                        <CommentIcon style={{
                          fontSize: "2rem"
                        }} />
                      </IconButton>
                    </>
                  )}
                </div>
              </div>
              {isFODLoading ? (
                <Skeleton variant="rectangular" sx={{
                  borderRadius: '5px',
                  width: "100%",
                  height: "50px",
                }} id="accordian_skele" />
              ) : (
                <Accordion sx={{
                  width: '100%',
                  borderRadius: '0.5rem',
                  marginTop: '2rem',
                  '&::before': {
                    display: 'none'
                  },
                }}>
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

              <div className={DesignStyle.design_cont}>
                <ul className={DesignStyle.inner_design_cont}>
                  {singleDesign.files && singleDesign.files.map((file, index) => (
                    <li key={index} className={DesignStyle.design_img_cont}>
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
                    style={{ zIndex: 1201 }}
                  />
                )}
              </div>
              <div className={DesignStyle.design_description_cont}>
                <h3 className={DesignStyle.design_description}>
                  {isFODLoading ? (
                    <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "50vw", height: "60px" }} animation="wave" id='description_skele' />
                  ) : (
                    `${singleDesign.description}`
                  )}
                </h3>
              </div>
              <div className={DesignStyle.design_tags_cont}>
                {isFODLoading ? (
                  <Skeleton variant="rectangular" sx={{ borderRadius: '5px', width: "70%", height: "60px" }} animation="wave" id='design_tags_cont_skele' />
                ) : (
                  <>
                    {
                      singleDesign.tags && singleDesign.tags.map((tag, index) => (
                        <Chip variant="outlined" color="warning" label={tag} className={DesignStyle.Tag_Chips} key={index} style={{
                          padding: "1.6rem 0.5rem"
                          , borderRadius: "0.5rem"
                        }} />
                      ))
                    }
                  </>
                )}
              </div>
            </div>
            <div className={DesignStyle.design_sidebar_wrapper}>
              <div className={DesignStyle.design_sidebar_icon_cont}>
                <IconButton className={DesignStyle.sidebar_Icos} tipname='report' onClick={setReportDialogOpen} disabled
                  style={{
                    fontSize: "2rem"
                  }}>
                  <ReportGmailerrorredRoundedIcon style={{
                    fontSize: "2rem"
                  }} />
                </IconButton>
                <IconButton className={DesignStyle.sidebar_Icos} tipname='download' onClick={handleDownload} disabled={downloadInProgress}
                  style={{
                    fontSize: "2rem"
                  }}>
                  <SimCardDownloadRoundedIcon style={{
                    fontSize: "2rem"
                  }} />
                </IconButton>
                <IconButton className={DesignStyle.sidebar_Icos} tipname='delete' onClick={() => setConfirmDelActive(true)}
                  style={{
                    fontSize: "2rem"
                  }}>
                  <DeleteRoundedIcon style={{
                    fontSize: "2rem"
                  }} />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </section>
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
          <CloseIcon className={DesignStyle.CloseBtn} />
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

      <section className={`${DesignStyle.signout_all_popup} ${DesignStyle.confirmdelete} ${confirmDelActive ? DesignStyle.active : ''}`}>
        <div className={DesignStyle.signout_all_popup_cont}>
          <div className={DesignStyle.signout_all_popup_box}>
            <h1>Are you sure you want to delete design?</h1>
            <p>You or anyone won't be able to access the design once deleted.</p>
            <div className={DesignStyle.signout_all_btns}>
              <Button variant="contained" className={DesignStyle.cancel_btn} onClick={() => loading === false && setConfirmDelActive(false)}>Cancel</Button>
              <LoadingButton onClick={handleConfirmClick}
                loading={loading} variant="contained" sx={{ color: "white" }} size="large" className={DesignStyle.Sign_out_all_btn}>Delete the design</LoadingButton>
            </div>
          </div>
          <div className={DesignStyle.close_btn_cont}>
            <IconButton aria-label="delete" size="large" id="cls_icon_inner_cont" onClick={() => loading === false && setConfirmDelActive(false)}>
              <CloseRoundedIcon style={{ fontSize: "2rem" }} className={DesignStyle.cls_icon} sx={{ color: "white" }} />
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

export default Designs
