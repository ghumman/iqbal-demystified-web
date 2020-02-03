import React from "react";
import './index.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Users from './users'

function Index() {
	  return <h2 style={{fontSize:'100px'}}>Home</h2>;
}

function About() {
	  return <h2 style={{fontSize:'100px'}}>About</h2>;
}


function AppRouter() {
	  return (
		      <Router>
		        <div>
		          <nav>
		            <ul>
		              <li>
		                <Link to="/" style={{fontSize:'100px'}}>Home</Link>
		              </li>
		              <li>
		                <Link to="/about/" style={{fontSize:'100px'}}>About</Link>
		              </li>
		              <li>
		                <Link to="Users" style={{fontSize:'100px'}}>Users</Link>
		              </li>
		            </ul>
		          </nav>

		          <Route path="/" exact component={Index} />
		          <Route path="/about/" component={About} />
		          <Route path="/users/" component={Users} />
		        </div>
		      </Router>
		    );
}

export default AppRouter;

