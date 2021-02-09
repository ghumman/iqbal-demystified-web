import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import {
	Route,
	BrowserRouter as Router
} from 'react-router-dom';

import TopPortionMainPage from './main_page/TopSectionMainPage/TopSectionMainPage';
import BottomSectionMainPage from './main_page/BottomSectionMainPage/BottomSectionMainPage';
import MainPage from './main_page/MainPage/MainPage';

// for 3 tiers of heirarcy
import ListPoemPage from './poetry/ListPoemPage';
import PoemPage from './poetry/PoemPage';
import SherPage from './poetry/SherPage';

// for User account interaction
import RegisterPage from './account/RegisterPage';
import SigninPage from './account/SigninPage';
import ForgotPasswordPage from './account/ForgotPasswordPage';
import ProfilePage from './account/ProfilePage';
import ChangePasswordPage from './account/ChangePasswordPage';

import InfoPage from './misc/InfoPage';
import CommentPage from './misc/CommentPage';
import SearchPage from './misc/SearchPage';

// for some default use
import * as serviceWorker from './misc/serviceWorker';


const routing = (
	<Router  basename={process.env.PUBLIC_URL}>
		<div>
			{/* Inside JSX use this format to give comments*/}
			{/* <Route exact path="/" component={TopPortionMainPage} /> */}
			{/* <Route exact path="/" component={BottomSectionMainPage} /> */}
			<Route exact path="/" component={MainPage} />

			<Route path="/ListPoemPage" component={ListPoemPage} />
			<Route path="/PoemPage" component={PoemPage} />
			<Route path="/SherPage" component={SherPage} />

			<Route path="/RegisterPage" component={RegisterPage} />
			<Route path="/SigninPage" component={SigninPage} />
			<Route path="/ForgotPasswordPage" component={ForgotPasswordPage} />
			<Route path="/ProfilePage" component={ProfilePage} />
			<Route path="/ChangePasswordPage" component={ChangePasswordPage} />

			<Route path="/InfoPage" component={InfoPage} />
			<Route path="/CommentPage" component={CommentPage} />
			<Route path="/SearchPage" component={SearchPage} />

		</div>
	</Router>
);


const app = document.getElementById('root');

ReactDOM.render(routing, app);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
