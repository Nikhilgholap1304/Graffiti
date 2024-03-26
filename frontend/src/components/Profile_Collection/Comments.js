import { useEffect, useState, useRef, useContext } from 'react';
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import ListItemText from '@mui/material/ListItemText';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Paper from '@mui/material/Paper';
import Fab from '@mui/material/Fab';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListSubheader from '@mui/material/ListSubheader';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import MenuIcon from '@mui/icons-material/Menu';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import MoreIcon from '@mui/icons-material/MoreVert';
import SendIcon from '@mui/icons-material/Send';
import LoadingButton from '@mui/lab/LoadingButton';
import Stack from '@mui/material/Stack';
import { ToastContainer, toast } from "react-toastify";
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Snackbar from '@mui/material/Snackbar';
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const Comments = ({
  // designId , openCommentSection, setOpenCommentSection 
}) => {

  const [comment, setComment] = useState('');
  const [commentTitle, setCommentTitle] = useState('');
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [commentError, setCommentError] = useState(false);
  const [messages, setMessages] = useState([])

  const [loader, setLoader] = useState(false);

  const [openSnackbar, setOpenSnackbar] = useState(false);

  const sessionToken = localStorage.getItem('sessionToken');
  const [userPic, setUserPic] = useState('');
  const [userName, setUserName] = useState('');
  const Navigate = useNavigate();

  const { designId } = useParams();

  const handleClickSnackbar = () => {
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnackbar(false);
  };

  // const handleLoaderClose = () => {
  //   setLoader(false);
  // };
  // const handleLoaderOpen = () => {
  //   setLoader(true);
  // };

  const [selectedMode, setSelectedMode] = useState(() => {
    const storedMode = localStorage.getItem('selectedMode');
    return storedMode;
  });


  const handleCommentSend = (e) => {
    if (!commentTitle.trim()) {
      setTitleError(true);
      return;
    } else {
      setTitleError(false);
    }
    if (!comment.trim()) {
      setCommentError(true);
      return;
    } else {
      setCommentError(false);
    }
    setLoading(true);


    const sendComment = async () => {
      try {
        if (comment) {
          const config = {
            headers: {
              "Authorization": sessionToken
            }
          }
          const res = await axios.post(`/post_comment/${designId}`, { comment, commentTitle }, config);
          if (res.status === 200) {
            setMessages(res.data.messages);
            setLoading(false);
            handleClickSnackbar()
          }
        }
      } catch (error) {
        console.error('Error adding comment:', error);
      }
    };
    // Invoke the asynchronous function immediately
    setTimeout(() => {
      sendComment();
      inputRef.current.focus();
      setComment('');
      setCommentTitle('');
    }, 1500);
  };
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const config = {
          headers: {
            'Authorization': sessionToken
          }
        }
        const res = await axios.get(`/get_comment/${designId}`, config); // Ensure correct URL format
        if (res.status === 200) {
          setMessages(res.data.messages);
          setUserPic(res.data.userPic);
          setUserName(res.data.userName);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
        // Handle error (e.g., display error message)
      }
    };

    fetchComments();
  }, []);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
    console.log(e.target.value);
    setCommentError(false);
  }
  const handleCommentTitleChange = (e) => {
    setCommentTitle(e.target.value);
    console.log(e.target.value);
    setTitleError(false);
  }

  useEffect(() => {
    setLoader(true);
    setTimeout(() => {
      setLoader(false);
    }, 3000);
  }, [])
  // if (openCommentSection === true) {
  // }
  // const handleClickOpen = () => {
  //   setOpenCommentSection(true);
  //   setLoader(true);
  //   setTimeout(() => {
  //     setLoader(false);
  //   }, 2000);
  // };


  const handleClose = () => {
    // setOpenCommentSection(false);
    Navigate(-1)
  }


  return (
    <React.Fragment>
      <CssBaseline />
      <Dialog
        fullScreen
        open={true}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Comments
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <Paper square sx={{ mb: '200px' }}>
          <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
            Inbox
          </Typography>
          {messages.length === 0 &&
            <Typography variant="h5" gutterBottom component="div" sx={{ p: 2, pb: 0 }}>
              No Comments yet...
            </Typography>
          }
          <List sx={{ mb: 2 }}>
            {messages.length !== 0 && messages.map(({ _id, userName, title, body, UserPic, timestamp }) => {
              const messageDate = new Date(timestamp);
              const currentDate = new Date();
              const yesterday = new Date(currentDate);
              yesterday.setDate(yesterday.getDate() - 1);

              let subheader = '';
              if (messageDate.toDateString() === currentDate.toDateString()) {
                subheader = 'Today';
              } else if (messageDate.toDateString() === yesterday.toDateString()) {
                subheader = 'Yesterday';
              } else {
                subheader = messageDate.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
              }

              return (
                <React.Fragment key={_id}>
                  {subheader && (
                    <ListSubheader sx={{ bgcolor: 'background.paper' }}>
                      {subheader}
                    </ListSubheader>
                  )}

                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar alt="Profile Picture" src={UserPic ? UserPic : ''} >
                        {/* {!UserPic && userName.length > 0 ? userName.charAt(0) : ''} */}
                        {!UserPic && userName && userName.length > 0 ? userName.charAt(0) : ''}
                      </Avatar>
                    </ListItemAvatar>
                    <Stack>
                      <Typography variant="body2" color="primary">
                        {userName}
                      </Typography>
                      <ListItemText primary={title} secondary={body} sx={{ margin: 0 }} />
                    </Stack>
                  </ListItemButton>
                </React.Fragment>
              );
            })}
          </List>
        </Paper>
        <AppBar position="fixed" color="inherit" sx={{ top: 'auto', bottom: 0 }}>
          <Toolbar fullWidth sx={{ padding: "20px 10px" }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', width: "100%" }}>
              <Avatar sx={{ color: 'action.active', mr: 2 }} src={userPic ? userPic : ''} />
              {!userPic && userName.length > 0 ? userName.charAt(0) : ''}
              <Stack direction='column' fullWidth sx={{ width: '100%' }} spacing={1}>
                <TextField
                  error={titleError}
                  id="filled-basic"
                  label="Title"
                  variant="filled"
                  value={commentTitle}
                  onChange={handleCommentTitleChange}
                  helperText={titleError ? 'Title cannot be empty' : ''}
                  placeholder='Add a comment title...'
                />
                <TextField
                  error={commentError}
                  fullWidth
                  id="filled-multiline-static"
                  label="Comment"
                  multiline
                  variant="filled"
                  value={comment}
                  onChange={handleCommentChange}
                  placeholder='Add a comment...'
                  autoFocus
                  inputRef={inputRef}
                  helperText={commentError ? 'Comment cannot be empty' : ''}
                  InputProps={{
                    endAdornment: (
                      <LoadingButton
                        size="medium"
                        onClick={handleCommentSend}
                        endIcon={<SendIcon />}
                        loading={loading}
                        loadingPosition="end"
                        variant="contained"
                        sx={{ minWidth: '7.5rem' }}
                      >
                        <span>Send</span>
                      </LoadingButton>
                    ),
                  }}
                >
                </TextField>
              </Stack>
            </Box>
          </Toolbar>
        </AppBar>
        <Backdrop
          sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
          open={loader}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
        <Snackbar
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          open={openSnackbar}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          message="Comment added..."
        />
      </Dialog>
    </React.Fragment >
  );
}

export default Comments