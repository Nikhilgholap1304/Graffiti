import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../../Contexts/AuthContext";
import "../style/light_dark_mode.css";
import Ni from "../img/Ni.png";
import Default_panda from "../img/default_panda.png";
import "./Prof_style/ProfileHeader.css";
import Graffiti_logo from "../img/graffiti_tri5.png";
import { ToastContainer, toast } from "react-toastify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { FiThumbsUp, FiDownload } from 'react-icons/fi';
import { Link, useNavigate, useLocation } from "react-router-dom";
import Skeleton from '@mui/material/Skeleton'
import axios from 'axios';
import { styled } from '@mui/material/styles';
import Badge from '@mui/material/Badge';
import Avatar from '@mui/material/Avatar';
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

const ProfileHeader = ({ indexID }) => {
  const location = useLocation();
  const Navigate = useNavigate();
  const [isScrollShadowActivated, setIsScrollShadowActivated] = useState(false);
  const [isShadeActive, setIsShadeActive] = useState(false);
  const [activeSubNav, setActiveSubNav] = useState(1);
  const { isLoggedIn, setIsLoggedIn, isPreloading, setIsPreloading, hasDesignerBadge } = useContext(AuthContext);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [imageUrl, setImageUrl] = useState(Default_panda);
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
    } else {
      document.body.classList.add("light-mode");
      document.body.classList.remove("dark-mode");
    }

  }, [selectedMode]);

  const handleGoBack = () => {
    Navigate('/Home'); // This will navigate to the previous page in the browser history
  };

  const handleHoverShadeenter = () => {
    setIsShadeActive(true);
  }
  const handleHoverShadeleave = () => {
    setIsShadeActive(false);
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Get the session token from where you have stored it (e.g., localStorage)
        const sessionToken = localStorage.getItem('sessionToken'); // Replace with your storage method

        if (sessionToken) {
          // Include the session token in the request headers
          const config = {
            headers: {
              Authorization: sessionToken,
            },
          };

          // Make a request to check if the user is logged in with the session token
          const response = await axios.get('/check-login', config);

          setIsLoggedIn(response.data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
          // Navigate("/Login");
          // localStorage.removeItem('sessionToken');
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollShadowActivated === false && window.scrollY >= 1) {
        setIsScrollShadowActivated(true);
      } else if (isScrollShadowActivated === true && window.scrollY <= 0) {
        setIsScrollShadowActivated(false);
      }
    }
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isScrollShadowActivated]);

  const profLogout = async () => {
    setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem('sessionToken');
      console.log("or here is the problem")
      Navigate("/Login");
    }, 2000);
    const myPromise = new Promise((resolve) =>
      setTimeout(resolve, 2000)
    );
    toast.promise(myPromise, {
      pending: "Logging out...",
      success: "Logout Successful",
      error: "Error"
    });
    const sessionToken = localStorage.getItem('sessionToken');
    const response = await fetch("/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: sessionToken,
      },
    });
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 200); // Adjust the value (200) to the desired scrolling threshold
    };
    window.addEventListener('scroll', handleScroll);
    // Cleanup by removing the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const fetchProfilePicture = async () => {
    try {
      const sessionToken = localStorage.getItem('sessionToken');
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
          setImageUrl(res.data);
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

  const handleNavigationClick = (path) => {
    switch (path) {
      case "/Profile":
        setActiveSubNav(1);
        setTimeout(() => {
          Navigate("/Profile")
        }, 500)
        break;
      case "/Upload":
        setActiveSubNav(2);
        Navigate("/Upload")
        break;
      case "/Pinned":
        setActiveSubNav(3);
        Navigate("/Pinned")
        break;
      case "/Liked":
        setActiveSubNav(4);
        Navigate("/Liked")
        break;
      case "/Downloads":
        setActiveSubNav(5);
        Navigate("/Downloads")
        break;

      default:
        break;
    }
    // else if (/* Add conditions for other paths */) {
    //   // Set the appropriate active sub-navigation item
    // }
  };

  const determineActiveSubNav = () => {
    const pathname = location.pathname;
    if (pathname === '/Profile') {
      setActiveSubNav(1);
    } else if (pathname === '/Upload') {
      setActiveSubNav(2);
    } else if (pathname === '/Pinned') {
      setActiveSubNav(3);
    } else if (pathname === '/Liked') {
      setActiveSubNav(4);
    } else if (pathname === '/Downloads') {
      setActiveSubNav(5);
    }
    // Add conditions for other paths
  };

  useEffect(() => {
    determineActiveSubNav();
  }, [location]);

  useEffect(() => {
    if (indexID) {
      setActiveSubNav(indexID);
    }
  }, indexID)

  return (
    <>
      <section className={`Header3 ${isShadeActive ? 'active' : ''}`}>
        <div className="back_btn_block">
          <button className="back_btn" onClick={handleGoBack}><i class="bi bi-chevron-left"></i><p className="bck_btn_txt">Back</p></button>
        </div>
        <div className="brand_cont profile_brand">
          <div className="brand_logo">
            <img src={Graffiti_logo} alt="" />
          </div>
          <h3 className="brand_logo_name" onClick={() => Navigate('/Home')}>Graffiti</h3>
        </div>
        <div className="profile_menu_wrap"
          onMouseEnter={handleHoverShadeenter}
          onMouseLeave={handleHoverShadeleave}
        >
          <ul className="profile_menu">
            {!isPreloading ? (
              <>
                <li className="profile_menu_item profile_page">
                  <input type="checkbox" id="profile_dropdown_check" onClick={() => setIsShadeActive(!isShadeActive)} />
                  <label htmlFor="profile_dropdown_check" className="profile_label"
                  >
                    <StyledBadge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      variant={hasDesignerBadge === true ? "dot" : "standard"}
                      className='profile_image_icon_cont' id='withBadge'
                    >
                      <Avatar alt="Remy Sharp" src={imageUrl} />
                    </StyledBadge>
                    {/* <a className="profile_image_icon_cont">
                      <img src={imageUrl} alt="" />
                    </a> */}
                  </label>
                  <ul className="profile_drop_menu">
                    <Link to="/Profile" >
                      <li className="profile_drop_menu_item">
                        <i class="bi bi-person-fill"></i> <a> Profile </a>
                      </li>
                    </Link>
                    <Link to="/Upload" >
                      <li className="profile_drop_menu_item">
                        <i class="bi bi-cloud-upload-fill"></i> <a> Upload </a>
                      </li>
                    </Link>
                    <Link to="/Home" >
                      <li className="profile_drop_menu_item">
                        <i class="bi bi-house-fill"></i> <a> Home </a>
                      </li>
                    </Link>
                    <li className="menu_item_last_items">
                      <div className="profile_drop_menu_item" onClick={profLogout}>
                        <i class="bi bi-box-arrow-right"></i> <a> Logout </a>
                      </div>
                    </li>
                  </ul>
                </li>
              </>
            ) : (
              <Skeleton variant="circular" width={window.innerWidth >= 500 ? 50 : 35} height={window.innerWidth >= 500 ? 50 : 35} id='skeleton' />
            )}
          </ul>
        </div>
      </section>
      <section className="prof_sub_header">
        <div className="sub_head_list_cont">
          <ul className={`active${activeSubNav}`}>
            <li onClick={() => handleNavigationClick("/Profile")}><i className="fa-regular fa-user"></i><p>Profile</p></li>
            <li onClick={() => handleNavigationClick("/Upload")}><i class="bi bi-file-earmark-arrow-up"></i><p>Uploads</p></li>
            <li onClick={() => handleNavigationClick("/Pinned")}><i class="bi bi-pin"></i><p>Pinned</p></li>
            <li onClick={() => handleNavigationClick("/Liked")}><FiThumbsUp className='i' /><p>Liked</p></li>
            <li onClick={() => handleNavigationClick("/Downloads")}><FiDownload className='i' /><p>Downloads</p></li>
          </ul>
        </div>
      </section>
      <div className={`scroll-to-top ${showScrollToTop ? 'scroll_top_active' : ''}`} onClick={handleScrollToTop}>
        <i class="bi bi-arrow-up-square-fill"></i>
      </div>
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
        theme={selectedMode === "light" ? "light" : "dark"}
      />
    </>
  );
}
export default ProfileHeader;