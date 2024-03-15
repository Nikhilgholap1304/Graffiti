import { React, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Container from '@mui/material/Container';
import InstagramIcon from '@mui/icons-material/Instagram';
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import FacebookIcon from '@mui/icons-material/Facebook';
import PinterestIcon from '@mui/icons-material/Pinterest';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import "./style/light_dark_mode.css";
import "./style/Home.css";
import "./style/Footer.css";

const Copyright = () => {
  return (
    <Typography variant="body2">
      {'Copyright © '}
      <Link href="http://localhost:3000/Home" sx={{ color: "#FFA000" }}>
        Graffiti
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const Footer = ({ specifyStyle }) => {
  const [currentStyle, setCurrentStyle] = useState(specifyStyle);
  return (
    <div>
      <Box
      className={currentStyle === 'DefaultCategory' ? 'DefaultCategoryFooter' : ''}
        component="footer"
        sx={{
          py: 3,
          px: 2,
          mt: 'auto',
          backgroundColor: (theme) =>
            theme.palette.mode === 'light'
              ? theme.palette.grey[200]
              : theme.palette.grey[800],
        }}
      >
        <Container maxWidth="sm">
          <Copyright />
        </Container>
        <Container maxWidth="sm" className="SocialConnections">
          <IconButton href="https://www.instagram.com/graffiti.ng?igsh=MWp5ZzUxajg0eTNxYg==">
            <InstagramIcon />
          </IconButton>
          <IconButton href="mailto:graffiti.13.io@gmail.com?subject=Feedback%20or%20Contact%20">
            <EmailRoundedIcon />
          </IconButton>
          <IconButton>
            <FacebookIcon />
          </IconButton>
          <IconButton>
            <PinterestIcon />
          </IconButton>
        </Container>
      </Box>
    </div>
  )
}

export default Footer
