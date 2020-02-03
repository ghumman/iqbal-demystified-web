import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import {
	Route,
	Link,
	NavLink,
	Switch,
	BrowserRouter as Router
} from 'react-router-dom'

// this index.js sets TabView1 and TabView2 to / and sets the addressess for all other pages in this web application
import TopPortionMainPage from './pages/TopSectionMainPage/TopSectionMainPage';
import BottomSectionMainPage from './pages/BottomSectionMainPage/BottomSectionMainPage';

// for 3 tiers of heirarcy
import ListPoemPage from './poetry/ListPoemPage'
import PoemPage from './poetry/PoemPage'
import SherPage from './poetry/SherPage'

// for User account interaction
import RegisterPage from './account/RegisterPage'
import SigninPage from './account/SigninPage'
import ForgotPasswordPage from './account/ForgotPasswordPage'
import ProfilePage from './account/ProfilePage'
import ChangePasswordPage from './account/ChangePasswordPage'

// following are present in TabView2, apart from other pages
import InfoPage from './misc/InfoPage'
import CommentPage from './misc/CommentPage'
import SearchPage from './misc/SearchPage'

// for some default use
import * as serviceWorker from './serviceWorker';


const routing = (
	  <Router>
	    <div>
	      {/* Inside JSX use this format to give comments*/}
	      <Route exact path="/" component={TopPortionMainPage} />
	      <Route exact path="/" component={BottomSectionMainPage} />

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
)


const app = document.getElementById('root');

// ReactDOM.render(routing, document.getElementById('root'))
ReactDOM.render(routing, app);
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
