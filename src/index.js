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
import TabView1 from './TabView1';
import TabView2 from './TabView2';

// for 3 tiers of heirarcy
import ListPoemPage from './ListPoemPage'
import PoemPage from './PoemPage'
import SherPage from './SherPage'

// for User account interaction
import RegisterPage from './RegisterPage'
import SigninPage from './SigninPage'
import ForgotPasswordPage from './ForgotPasswordPage'
import ProfilePage from './ProfilePage'
import ChangePasswordPage from './ChangePasswordPage'

// following are present in TabView2, apart from other pages
import InfoPage from './InfoPage'
import CommentPage from './CommentPage'
import SearchPage from './SearchPage'

// for some default use
import * as serviceWorker from './serviceWorker';


const routing = (
	  <Router>
	    <div>
	      {/* Inside JSX use this format to give comments*/}
	      <Route exact path="/" component={TabView1} />
	      <Route exact path="/" component={TabView2} />

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
