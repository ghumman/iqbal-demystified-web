import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import AddIcon from '@material-ui/icons/Add';
import ListItemText from '@material-ui/core/ListItemText';


const useStyles = makeStyles(theme => ({
    dialog: {
        position: 'absolute',
        right: 10,
        top: 10,
    }
}));

const SimpleDialog = (props) => {
    const classes = useStyles();
    const { onClose, open } = props;
  
    const handleClose = () => {
      onClose();
    };
  
    const handleListItemClick = () => {
      onClose();
    };
  
    return (
      <Dialog 
        classes={{
            paper: classes.dialog
        }}
      onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">User Profile</DialogTitle>
        <List>
          <ListItem autoFocus button onClick={() => handleListItemClick()}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>

          <ListItem autoFocus button onClick={() => handleListItemClick()}>
            <ListItemAvatar>
              <Avatar>
                <AddIcon />
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Add account" />
          </ListItem>

        </List>
      </Dialog>
    );
  };

  export default SimpleDialog; 
