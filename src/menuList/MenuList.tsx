import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import iconSignIn from './../assets/android_app_assets/icon_signed_in.png';
import iconBest from './../assets/android_app_assets/icon_best.png';
import iconDiscussion from './../assets/android_app_assets/icon_discussion.png';
import iconSearch from './../assets/android_app_assets/icon_search.png';
import iconInfo from './../assets/android_app_assets/icon_info.png';


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
        height: '40px',
        width: '40px',
        borderRadius: "50%",
    },
    list: {
      width: 250,
    },
    img: {
        maxWidth: "8%",
        height: "auto",
        width: "auto",
    }
  }))

const MenuList = (props) => {
    const classes = useStyles();
    const [loginStatusPage, setLoginStatusPage] = useState('')
    const { toggleDrawer, history, location } = props;

    useEffect(() => {
      try {
        if (location.state.profileSigninConfirmation ) {
          setLoginStatusPage("ProfilePage");
        } else {
          setLoginStatusPage("RegisterPage");
        }
      } catch(err) {}
    },[props])

    const onSubmit = (pageName:string) => {
      console.log("value of props: ");
      console.log(props);
      console.log('inside onSubmit');
      
      if (pageName === 'Intikhab') {
        history.push({
          pathname: '/ListPoemPage',
          state: { detailBook: 'List_Editor_Pick', ...location.state }
        });
      }
      else {
        history.push({
          pathname: pageName,
          state: { ...location.state }
        });
      }
    }

    return (
        <div
          className={classes.list}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>
            <ListItem button key={'Profile'} onClick={() => onSubmit(loginStatusPage)}>
              <ListItemIcon >
              <img src={iconSignIn} className={classes.photoIcon} alt="signin"/>
              </ListItemIcon>
              <ListItemText primary={'Profile'} />
            </ListItem>

            <ListItem button key={'Intikhab'} onClick={() => onSubmit("Intikhab")}>
              <ListItemIcon>
              <img src={iconBest} className={classes.photoIcon} alt="best"/>
              </ListItemIcon>
              <ListItemText primary={'Intikhab'} />
            </ListItem>

            <ListItem button key={'Comments'} onClick={() => onSubmit("CommentPage")}>
              <ListItemIcon>
              <img src={iconDiscussion} className={classes.photoIcon} alt="signin"/>
              </ListItemIcon>
              <ListItemText primary={'Comments'} />
            </ListItem>

            <ListItem button key={'Search'} onClick={() => onSubmit("SearchPage")}>
              <ListItemIcon>
              <img src={iconSearch} className={classes.photoIcon} alt="signin"/>
              </ListItemIcon>
              <ListItemText primary={'Search'} />
            </ListItem>

            <ListItem button key={'Info'}onClick={() => onSubmit("InfoPage")}>
              <ListItemIcon>
              <img src={iconInfo} className={classes.photoIcon} alt="signin"/>
              </ListItemIcon>
              <ListItemText primary={'Info'} />
            </ListItem>
          </List>
        </div>
      )
};

export default MenuList; 