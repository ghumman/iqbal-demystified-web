import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import ListItemText from '@material-ui/core/ListItemText';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';


const useStyles = makeStyles(() => ({
  dialog: {
    position: 'absolute',
    right: 10,
    top: 10,
    background: 'purple',
    color: 'white',
    fontWeight: 'bold',
    fontSize: '20px',
  }
}));

const SimpleDialog = (props) => {
  const classes = useStyles();
  const { onClose, open } = props;
  const [signinConfirmation, setSigninConfirmation] = useState(false);

  const handleClose = () => {
    onClose();
  }

  const signOut = () => {
    onClose();
    props.history.push({
      pathname: '/',
      state: { profileSigninConfirmation: '', profileUsername: '', profilePassword: '' }
    });
  };


  useEffect(() => {
    try {
      if (props.location.state.profileSigninConfirmation) {
        setSigninConfirmation(true);
      } else {
        setSigninConfirmation(false);
      }

    } catch (err) {
      setSigninConfirmation(false);
    }
  }, [props])

  const onSubmit = (pageName: string) => {
    onClose();
    try {
      props.history.push({
        pathname: pageName,
        state: { ...props.location.state }
      });
    } catch (err) {
      props.history.push({
        pathname: pageName,
        state: ''
      });
    }
  }

  return (
    <Dialog
      classes={{
        paper: classes.dialog
      }}
      onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      { signinConfirmation && <span>
        <DialogTitle id="simple-dialog-title">User Profile</DialogTitle>
        <List>
          <ListItem autoFocus button onClick={() => onSubmit("ProfilePage")}>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="MY PROFILE" />
          </ListItem>

          <ListItem autoFocus button onClick={() => signOut()}>
            <ListItemAvatar>
              <Avatar>
                <ExitToAppIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="SIGN OUT" />
          </ListItem>

        </List>
      </span>
      }
      { !signinConfirmation && <span>
        <DialogTitle id="simple-dialog-title">SETTINGS</DialogTitle>
        <List>
          <ListItem autoFocus button onClick={() => onSubmit("RegisterPage")}>
            <ListItemAvatar>
              <Avatar>
                <AccountCircleIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="SIGN IN" />
          </ListItem>

        </List>
      </span>
      }
    </Dialog>
  );
};

export default SimpleDialog; 
