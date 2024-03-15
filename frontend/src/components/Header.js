import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from "../Contexts/AuthContext";
import Graffiti_logo from "./img/graffiti_tri2.png";
import Default_panda from "./img/default_panda.png";
import brush from "./img/brush.png";
import Ni from "./img/Ni.png";
import "./style/Header.css";
import "./style/light_dark_mode.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretUp, faArrowTurnUp } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import Skeleton from '@mui/material/Skeleton'
import "react-toastify/dist/ReactToastify.css";

import axios from 'axios';
import zIndex from "@mui/material/styles/zIndex";
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

const Home = ({ headerIndex }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modeisOpen, setModeisOpen] = useState(false);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [isSubHeadClicked, setIsSubHeadClicked] = useState(false);
  const { isLoggedIn, setIsLoggedIn, isPreloading, setIsPreloading, hasDesignerBadge } = useContext(AuthContext);
  const [imageUrl, setImageUrl] = useState(Default_panda);
  const Navigate = useNavigate();

  const modeOptions = [
    { mode: 'light', icon: 'brightness-high-fill' },
    { mode: 'dark', icon: 'moon-stars-fill' },
    { mode: 'auto', icon: 'circle-half' },
  ];

  const [selectedMode, setSelectedMode] = useState(() => {
    const storedMode = localStorage.getItem('selectedMode');
    return storedMode || 'light'; // Assuming 'light' as the default mode
  });

  const handleModeClick = (mode) => {
    setSelectedMode(mode);
  };

  const handleHamburgerClick = () => {
    setIsActive(!isActive);
  };

  const handleSubHeaderClick = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth < 1301) {
      // Handle the click event here
      setIsSubHeadClicked(!isSubHeadClicked);
    }
  };

  useEffect(() => {
    localStorage.setItem('selectedMode', selectedMode);
    //based on system preference

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


  //for filteration during the hover
  // useEffect(() => {

  //   if (isOpen || modeisOpen) {
  //     document.body.classList.add('filter-active');
  //   } else {
  //     document.body.classList.remove('filter-active');
  //   }
  // }, [isOpen, modeisOpen]);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 10, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollToTop(scrollY > 200); // Adjust the value (200) to the desired scrolling threshold
    };

    if (!isActive) {
      window.addEventListener('scroll', handleScroll);
    }
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // useEffect(() => {
  //   // Apply or remove the 'no-scroll' class on the body element based on 'isActive'
  //   if (isActive) {
  //     document.body.classList.add('body_tilt');
  //   } else {
  //     document.body.classList.remove('body_tilt');
  //   }
  // }, [isActive]);

  const handleMouseEnter = () => {
    if (windowWidth > 1300) {
      setIsOpen(true);
    }
  };
  const handleMouseLeave = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [windowWidth]);
  //

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
          console.log(response.data.isLoggedIn);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkLoginStatus();
  }, []);

  useEffect(() => {
    const loginsuccess = localStorage.getItem("loginsuccess");
    const AccountDeleteSuccess = localStorage.getItem("AccountDeleteSuccess");
    if (loginsuccess) {
      toast.success(loginsuccess, { className: 'toast-message' });
      localStorage.removeItem("loginsuccess");
    }
    if (AccountDeleteSuccess) {
      toast.success(AccountDeleteSuccess, { className: 'toast-message' });
      localStorage.removeItem("AccountDeleteSuccess");
    }
  }, []);

  //fetch profile pic 
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

  const Logout = async () => {
    setTimeout(() => {
      setIsLoggedIn(false);
      localStorage.removeItem('sessionToken');
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

  return (
    <>
      <section className="Header"
      // style={{ zIndex: headerIndex }}
      >
        <label htmlFor="header_active" className={`navbar_shade ${(isActive || isOpen) ? 'active_navbar_shade' : ''}`} onClick={() => setIsActive(!isActive)}></label>
        <label htmlFor="header_active" className="active_mode_shade" ></label>
        <div className="Header_upper head_visi" style={(window.innerWidth >= 1300) ? { zIndex: headerIndex } : { zIndex: 3 }}>
          <div className={`Header_upper_brand ${isActive ? 'brand_active' : ''}`} onClick={() => Navigate('/Home')}>
            <div className="brand_logo">
              <img src={Graffiti_logo} alt="" />
            </div>
            <h3 className="brand_logo_name">Graffiti</h3>
          </div>
          <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={handleHamburgerClick}>
            <span class="bar"></span>
            <span class="bar"></span>
            <span class="bar"></span>
          </div>
          <div className={`Header_upper_lists ${isActive ? 'active' : ''}`} id="header_active" >
            <Link to="/WebDesign" className={window.location.pathname === '/WebDesign' ? 'list_active' : ''}>
              <p className={`upper_list ${window.location.pathname === '/WebDesign' ? 'list_active' : ''}`}>Web Designs</p>
            </Link>
            <Link to="/Vector" className={window.location.pathname === '/Vector' ? 'list_active' : ''}>
              <p className={`upper_list ${window.location.pathname === '/Vector' ? 'list_active' : ''}`}>Vectors</p>
            </Link>
            <Link to="/Illustrations" className={window.location.pathname === '/Illustrations' ? 'list_active' : ''}>
              <p className={`upper_list ${window.location.pathname === '/Illustrations' ? 'list_active' : ''}`}>Illustrations <span>New</span> </p>
            </Link>
            <Link to="/Themes" className={window.location.pathname === '/Themes' ? 'list_active' : ''}>
              <p className={`upper_list ${window.location.pathname === '/Themes' ? 'list_active' : ''}`}>Themes <span>New</span></p>
            </Link>
            <Link to="/LandingPages" className={window.location.pathname === '/LandingPages' ? 'list_active' : ''}>
              <p className={`upper_list ${window.location.pathname === '/LandingPages' ? 'list_active' : ''}`}>Landing Pages</p>
            </Link>
            <p className="Header_category"
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
              onClick={handleSubHeaderClick}
            >More<FontAwesomeIcon icon={faCaretUp} rotation={isSubHeadClicked || isOpen ? 0 : 180} className="caret" />
              <div className={`category_group ${isOpen ? 'visi_group' : ''} ${isSubHeadClicked ? 'visi_mobile_group' : ''}`} >
                <i className="bi bi-caret-up-fill"></i>
                <div className="category_col cat_col1">
                  {/* <Link to="/WebDesign" className={`category_item ${window.location.pathname === '/WebDesign' ? 'category_active' : ''}`}></Link> */}
                  <Link to="/Portfolios" className={`category_item ${window.location.pathname === '/Portfolios' ? 'category_active' : ''}`}>Portfolios</Link>
                  <Link to="/Fonts" className={`category_item ${window.location.pathname === '/Fonts' ? 'category_active' : ''}`}>Fonts</Link>
                  <Link to="/Decoratives" className={`category_item ${window.location.pathname === '/Decoratives' ? 'category_active' : ''}`}>Decoratives</Link>
                </div>
                <div className="category_col cat_col2">
                  <Link to="/AnimatedDesigns" className={`category_item ${window.location.pathname === '/AnimatedDesigns' ? 'category_active' : ''}`}>Animated Designs</Link>
                  <Link to="/Paralax" className={`category_item ${window.location.pathname === '/Paralax' ? 'category_active' : ''}`}>Paralax</Link>
                  <Link to="/MinimilisticDesigns" className={`category_item ${window.location.pathname === '/MinimilisticDesigns' ? 'category_active' : ''}`}>Minimalistic Designs</Link>
                </div>
              </div>
            </p>
          </div>
          <div className="Header_upper_sideButtons">
            {!isLoggedIn ? (
              <>
                {!isPreloading ? (
                  <>
                    <Link to="/Login" className="logreg_btn" id="login_btn">Log in</Link>
                    <Link to="/Register" className="logreg_btn" id="signup_btn">Sign up</Link>
                  </>
                ) : (
                  <Skeleton variant="rectangle" width={138} height={33} />
                )}
              </>
            ) : (
              <>
                {!isPreloading ? (
                  <div className="profile_menu_wrap">
                    <ul className="profile_menu">
                      <li className="profile_menu_item">
                        <input type="checkbox" id="profile_dropdown_check" />
                        <label htmlFor="profile_dropdown_check" className="profile_label">
                          {/* <a className="profile_image_icon_cont">
                            <img src={imageUrl} alt="" />
                          </a> */}
                          <StyledBadge
                            overlap="circular"
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            variant={hasDesignerBadge === true ? "dot" : "standard"}
                            className='profile_image_icon_cont'
                          >
                            <Avatar alt="" src={imageUrl} />
                          </StyledBadge>
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
                            <div className="profile_drop_menu_item" onClick={Logout}>
                              <i class="bi bi-box-arrow-right"></i> <a> Logout </a>
                            </div>
                          </li>
                        </ul>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Skeleton variant="circular" width={36} height={36} />
                )}
              </>
            )
            }

            <span className="divider"></span>

            <div className="mode_cont" onMouseEnter={() => setModeisOpen(true)}
              onMouseLeave={() => setModeisOpen(false)} onClick={() => setModeisOpen(!modeisOpen)}>
              <div className="moon_cont">
                <i className={`bi bi-${modeOptions.find((mode) => mode.mode === selectedMode).icon}`} id="moonstar"></i>
                <FontAwesomeIcon icon={faCaretUp} rotation={modeisOpen ? 0 : 180} className="caret" />
              </div>

              <div className={`mode_list ${modeisOpen ? 'visi_mode_list' : ''}`}>

                <div className={`mode_list_inners modelist1 ${selectedMode === 'light' ? 'mode_active' : ''}`}
                  onClick={() => handleModeClick('light')}>
                  <i className={`bi bi-brightness-high-fill ${selectedMode === 'light' ? 'icon_active' : ''}`}></i>
                  <p>Light</p>
                </div>

                <div
                  className={`mode_list_inners modelist2 ${selectedMode === 'dark' ? 'mode_active' : ''}`}
                  onClick={() => handleModeClick('dark')}>
                  <i className={`bi bi-moon-stars-fill ${selectedMode === 'dark' ? 'icon_active' : ''}`}></i>
                  <p>Dark</p>
                </div>

                <div
                  className={`mode_list_inners modelist3 ${selectedMode === 'auto' ? 'mode_active' : ''}`}
                  onClick={() => handleModeClick('auto')}>
                  <i className={`bi bi-circle-half ${selectedMode === 'auto' ? 'icon_active' : ''}`}></i> <p>Auto</p>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className={`scroll-to-top ${showScrollToTop ? 'scroll_top_active' : ''}`} onClick={handleScrollToTop}>
        <i class="bi bi-arrow-up-square-fill"></i>
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
};

export default Home;
