import React from 'react';
import ReactDOM from 'react-dom/client';
import Register from './components/Register';
import Login from './components/Login';
import Reset from './components/Reset';
import Forgot from './components/Forgot';
import Header from './components/Header';
import EmailVerificationPage from './components/EmailVerificationPage';
import ErrorPage from './components/errorPage';
import Home from './components/Home';
import NewUpload from './components/Profile_Collection/NewUpload'
import WebDesign from './components/CategoryComponent/WebDesign';
import Vector from './components/CategoryComponent/Vector';
import Illustrations from './components/CategoryComponent/Illustrations';
import Decoratives from './components/CategoryComponent/Decoratives';
import MinimilisticDesigns from './components/CategoryComponent/MinimilisticDesigns';
import AnimatedDesigns from './components/CategoryComponent/AnimatedDesigns';
import Fonts from './components/CategoryComponent/Fonts';
import Paralax from './components/CategoryComponent/Paralax';
import Themes from './components/CategoryComponent/Themes';
import LandingPages from './components/CategoryComponent/LandingPages';
import Portfolios from './components/CategoryComponent/Portfolios';
import ProfileHeader from './components/Profile_Collection/ProfileHeader';
import Profile from './components/Profile_Collection/Profile';
import Upload from './components/Profile_Collection/Upload';
import Pinned from './components/Profile_Collection/Pinned';
import Liked from './components/Profile_Collection/Liked';
import Downloads from './components/Profile_Collection/Downloads';
import AuthInclude from "./Contexts/AuthInclude";
import Dashboard from "./components/Admin/Dashboard";
import UsersData from "./components/Admin/UsersData";
import DesignersData from "./components/Admin/DesignersData";
import UploadersData from "./components/Admin/UploadersData";
import Designs from "./components/Admin/Designs";
import ReportedData from "./components/Admin/ReportedData";
import Comments from "./components/Profile_Collection/Comments";
import { ColorContextProvider } from './Contexts/ColorModeContext.js';
import { BrowserRouter, Routes, Route, Outlet, Router } from 'react-router-dom';
import './index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import reportWebVitals from './reportWebVitals';

const withColorContext = (Component) => {
  return (props) => (
    <ColorContextProvider>
      <Component {...props} />
    </ColorContextProvider>
  );
};

const DashboardWithColorContext = withColorContext(Dashboard);
const UsersDataWithColorContext = withColorContext(UsersData);
const DesignersDataWithColorContext = withColorContext(DesignersData);
const UploadersDataWithColorContext = withColorContext(UploadersData);
const DesignsWithColorContext = withColorContext(Designs);
const ReportedDataWithColorContext = withColorContext(ReportedData);
const CommentsWithColorContext = withColorContext(Comments);

export default function Index() {
  return (
    <AuthInclude>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="Vector" element={<Vector />} />
          <Route path="Illustrations" element={<Illustrations />} />
          <Route path="Decoratives" element={<Decoratives />} />
          <Route path="MinimilisticDesigns" element={<MinimilisticDesigns />} />
          <Route path="AnimatedDesigns" element={<AnimatedDesigns />} />
          <Route path="Fonts" element={<Fonts />} />
          <Route path="Paralax" element={<Paralax />} />
          <Route path="Themes" element={<Themes />} />
          <Route path="LandingPages" element={<LandingPages />} />
          <Route path="Portfolios" element={<Portfolios />} />
          <Route path='Register' element={<Register />} />
          <Route path="Forgot" element={<Forgot />} />
          <Route path="reset_password" element={<Reset />} />
          <Route path="verify_email" element={<EmailVerificationPage />} />
          <Route path="newUpload" element={<NewUpload />} />
          <Route path="Home" element={<Home />} />
          <Route path="WebDesign" element={<WebDesign />} />
          <Route index path="Login" element={<Login />} />
          <Route path="upload" element={<Upload />} />
          <Route path='Profile' element={<Profile />} />
          <Route path="Pinned" element={<Pinned />} />
          <Route path="Liked" element={<Liked />} />
          <Route path="Downloads" element={<Downloads />} />
          <Route path="/Admin/Dashboard" element={<DashboardWithColorContext />} />
          <Route index path="/Admin/UsersData" element={<UsersDataWithColorContext />} />
          <Route path="/Admin/DesignersData" element={<DesignersDataWithColorContext />} />
          <Route path="/Admin/UploadersData" element={<UploadersDataWithColorContext />} />
          <Route path="/Admin/Designs" element={<DesignsWithColorContext />} />
          <Route path="/Admin/ReportedData" element={<ReportedDataWithColorContext />} />
          <Route path="/Comments/:designId" element={<CommentsWithColorContext />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthInclude>
  )
}


// If you want to start measuring performance in your Index pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Index />);














reportWebVitals();