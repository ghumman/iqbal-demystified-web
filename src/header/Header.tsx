import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Avatar from '@material-ui/core/Avatar'

import { useState } from 'react'
import Drawer from '@material-ui/core/Drawer'


import logo from './../assets/allam_iqbal_pic.jpg';

import SimpleDialog from './../simpleDialog/SimpleDialog';
import MenuList from './../menuList/MenuList';

import { blue } from '@material-ui/core/colors';



const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
    },
    appbarStyle: {
        background: "purple",
    },
    menuButton: {
      marginRight: theme.spacing(2),
      color: 'white',
    },
    title: {
      flexGrow: 1,
      display: 'flex',
      alignItems: 'center',
      marginLeft: '10px',
      fontWeight: 'bold',
      fontFamily: "Times New Roman, Times, serif"
    },
    photo: {
      height: '45px',
      width: '75px',
    },
    photoIcon: {
        height: '25px',
        width: '25px',
    },
    list: {
      width: 250,
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
      },
    img: {
        maxWidth: "8%",
        height: "auto",
        width: "auto",
    }, 
    paper: {
      background: "purple",
      color: 'white'
    }
  }))
  

const Header = (props) => {
    const classes = useStyles()
    const [drawerOpen, setDrawerOpen] = useState(false)
    const [open, setOpen] = useState(false);
    const [signinConfirmation, setSigninConfirmation] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };
    
    const toggleDrawer = open => event => {
        if (
          event.type === 'keydown' &&
          (event.key === 'Tab' || event.key === 'Shift')
        ) {
          return
        }
        setDrawerOpen(open)
      }

      const 	signMeIn = () => {
          props.history.push({
            pathname: '/RegisterPage',
            state: { profileSigninConfirmation: '', profileUsername: '', profilePassword: '' }
          });
      }

      useEffect(() => {
        if (props.location.state) {
          setSigninConfirmation(props.location.state.profileSigninConfirmation);
          setUsername(props.location.state.profileUsername);
          setPassword(props.location.state.profilePassword);
        }
      }, [props.location]);

      let signinTag;
      let signinMessageLocal;
      if (signinConfirmation === true && username !== '') {
        signinMessageLocal = username.charAt(0).toUpperCase();
        signinTag = <button onClick={handleClickOpen} type="button" className="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>;
      }
      else {
        signinMessageLocal = 'Sign In';
        // signinTag = <button type="button" className="btn btn-primary" onClick={() => signMeIn()}> {signinMessageLocal} </button>;
        signinTag = <button type="button" className="btn btn-primary" onClick={handleClickOpen}> {signinMessageLocal} </button>;
      }
    
    return (
        <div className={classes.root}>
                  <AppBar className={classes.appbarStyle} position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            aria-label="menu"
          >
            <MenuIcon onClick={toggleDrawer(true)} {...props}/> 
            <Drawer
              classes={{ paper: classes.paper }}
              anchor={'left'}
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <MenuList  toggleDrawer={toggleDrawer} {...props}/>
            </Drawer>
          </IconButton>
          <Typography variant="h6" className={classes.title}>

            <img className={classes.img} src={logo} alt="Allama Iqbal" />


            <span className={classes.title}>ALLAMA IQBAL</span>

          </Typography>
          <h3 className="text-right">{signinTag}</h3>
          {/* <Button>
              Button
             <Avatar alt="User">
              JR
            </Avatar>
          </Button>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        Open simple dialog
      </Button> */}
      <SimpleDialog open={open} onClose={handleClose} {...props}/>
        </Toolbar>
      </AppBar>
        </div>
    )
}

export default Header;