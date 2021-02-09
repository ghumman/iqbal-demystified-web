import React, { useEffect, useState } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from '../../header/Header';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// following are books in first tab - Urdu
import urduBook1 from './../../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg';
import urduBook2 from './../../assets/android_app_assets/book_bang_ae_dara_urdu_1.jpg';
import urduBook3 from './../../assets/android_app_assets/book_armaghan_ae_hijaz_urdu_4.jpg';
import urduBook4 from './../../assets/android_app_assets/book_zarb_ae_kaleem_urdu_3.jpg';

// following are books in second tab - Farsi 1
import farsi1Book1 from './../../assets/android_app_assets/book_rumuz_ae_bekhudi_persian_6.jpg';
import farsi1Book2 from './../../assets/android_app_assets/book_asrar_ae_khudi_persian_5.jpg';
import farsi1Book3 from './../../assets/android_app_assets/book_payam_ae_hijaz_persian_7.jpg';
import farsi1Book4 from './../../assets/android_app_assets/book_zabur_ae_ajam_persian_8.jpg';

// following are books in second tab - Farsi 2
import farsi2Book1 from './../../assets/android_app_assets/book_javed_nama_persian_9.jpg';
import farsi2Book2 from './../../assets/android_app_assets/book_pas_cheh_bayad_kard_persian_10.jpg';
import farsi2Book3 from './../../assets/android_app_assets/book_armaghan_ae_hijaz_persian_11.jpg';


interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: any;
  value: any;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: "100%",
  },
  imgSizing: {
    border: "1px solid #ddd",
    borderRadius: "4px",
    padding: "5px",
    width: "250px",
    height: "auto",
    backgroundColor: "purple"
  }, 
  customFont: {
      fontFamily: "Jameel",
      color: "black",
      fontWeight: "bold",
      fontSize: "30px"
  }
}));

export default function MainPage(props) {
  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [signinConfirmation, setSigninConfirmation] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index: number) => {
    setValue(index);
  };

  const onSubmit = (bookNumber: any) => {
      props.history.push({
          pathname: '/ListPoemPage',
          state: { detailBook: bookNumber, profileSigninConfirmation: signinConfirmation, profileUsername: username, profilePassword: password },
          ...props
      });
  }

  useEffect(() => {

    if (props.location.state) {
      setSigninConfirmation(props.location.state.profileSigninConfirmation);
      setUsername(props.location.state.profileUsername);
      setPassword(props.location.state.profilePassword);
    }
  }, [props.location]);

  return (
      <span>
          <Header {...props}/>
    <div className={classes.root}>
      <AppBar position="static" color="default">
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          variant="fullWidth"
          aria-label="full width tabs example"
        >
          <Tab className={classes.customFont} label="اردو" {...a11yProps(0)} />
          <Tab className={classes.customFont} label="(فارسی (۱" {...a11yProps(1)} />
          <Tab className={classes.customFont} label="(فارسی (۲" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
      >
        <TabPanel value={value} index={0} dir={theme.direction}>
        <Container>
								<Row>
									<Col><img src={urduBook1} className={classes.imgSizing} alt="logo" onClick={() => onSubmit('List_002')} /></Col>
									<Col><img src={urduBook2} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_001')} /></Col>
								</Row>
								<Row>
									<Col><img src={urduBook3} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_004')} /></Col>
									<Col><img src={urduBook4} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_003')} /></Col>

								</Row>
							</Container>
        </TabPanel>
        <TabPanel value={value} index={1} dir={theme.direction}>
        <Container>
								<Row>
									<Col><img src={farsi1Book1} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_006')} /></Col>
									<Col><img src={farsi1Book2} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_005')} /></Col>
								</Row>
								<Row>
									<Col><img src={farsi1Book3} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_007')} /></Col>
									<Col><img src={farsi1Book4} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_008')} /></Col>
								</Row>
							</Container>
        </TabPanel>
        <TabPanel value={value} index={2} dir={theme.direction}>
        <Container>
								<Row>
									<Col><img src={farsi2Book1} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_009')} /></Col>
									<Col><img src={farsi2Book2} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_010')} /></Col>
								</Row>
								<Row>
									<Col><img src={farsi2Book3} className={classes.imgSizing}  alt="logo" onClick={() => onSubmit('List_011')} /></Col>
								</Row>
							</Container>
        </TabPanel>
      </SwipeableViews>
    </div>
    </span>
  );
}