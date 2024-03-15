import React, { createContext, useContext, useEffect, useState } from "react";
import Header from "../components/Header";
import ProfileHeader from "../components/Profile_Collection/ProfileHeader";
import { AuthContext } from "./AuthContext";
import axios from 'axios';

const AuthInclude = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedMode, setSelectedMode] = useState(() => {
    const storedMode = localStorage.getItem('selectedMode');
    return storedMode || 'light'; // Assuming 'light' as the default mode
  });

  const [sessionUserId, setSessionUserId] = useState('')
  const [sessionAdminId, setSessionAdminId] = useState('')
  const [name, setName] = useState('');
  const [rname, setRname] = useState('');
  const [email, setEmail] = useState('');
  const [hasDesignerBadge, setHasDesignerBadge] = useState(false);
  
  const [isPreloading, setIsPreloading] = useState(true);
  const sessionToken = localStorage.getItem('sessionToken');
  const AdminSessionToken = localStorage.getItem('AdminSessionToken');
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsPreloading(false);
    }, 2000); // 2000 milliseconds (2 seconds)

    return () => clearTimeout(timer);
  }, []);

  const fetch_name_rname = async () => {
    try {
      if (sessionToken) {
        const config = {
          headers: {
            Authorization: sessionToken,
          },
        };
        const res = await axios.get('/user-names', config)
        if (res.status === 401) {
          console.log("Unauthorized access without session");
        } else if (res.status === 500) {
          console.log('Internal Server error');
        } else if (res.status === 200) {
          console.log('Names fetched !');
          const { name, rname, email, hasDesignerBadge } = res.data;
          setName(name);
          setRname(rname);
          setEmail(email);
          setHasDesignerBadge(hasDesignerBadge);
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  
  useEffect(() => {
    fetch_name_rname();
  }, [])


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        if (sessionToken) {
          const config = {
            headers: {
              Authorization: sessionToken,
            }
          }
          const res = await axios.get('/getUserId', config);
          if (res.status === 200) {
            setSessionUserId(res.data.userId);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [sessionToken])

  useEffect(() => {
    const fetchAdminData = async () => {
      try {
        if (AdminSessionToken) {
          const config = {
            headers: {
              Authorization: AdminSessionToken,
            }
          }
          const res = await axios.get('/getAdminId', config);
          if (res.status === 200) {
            setSessionAdminId(res.data.adminId);
          }
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchAdminData();
  }, [AdminSessionToken])

  useEffect(() => {
    const fetchDesignerData = async () => {
      try {
          const res = await axios.get('/update_designer_badge');
          if (res.status === 200) {
            console.log("successfully fot designers badges")
          }
      } catch (error) {
        console.error('Error fetching designer data:', error);
      }
    };

    fetchDesignerData();
  }, [])

  const value = {
    isLoggedIn,
    setIsLoggedIn,
    selectedMode,
    setSelectedMode,
    name,
    setName,
    rname,
    setRname,
    email,
    setEmail,
    isPreloading,
    setIsPreloading,
    sessionUserId,
    sessionAdminId,
    hasDesignerBadge
  };
  return (
    <AuthContext.Provider value={value}>
      {props.children}
    </AuthContext.Provider>
  )
}

export default AuthInclude;