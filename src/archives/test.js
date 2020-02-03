import React from 'react'
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
/*
function test () {
		      return (	
			      <div>
			      	<h1 style={{color:'red',fontSize:'100px'}}>
			  		Hello this is test
			      		
			  	</h1>
			      {this.props.children}
			      	<Link to="Contact"> Contact </Link>
			      import { Route } from 'react-router-dom'

			      const Button = () => (
				        <Route render={({ history}) => (
						    <button
						      type='button'
						      onClick={() => { history.push('/TabView1') }}
						    >
						      Click Me!
						    </button>
						  )} />
			      )
			      </div>
		      );
}
*/

function test({ match }) {
	  return (
		      <div>
		        <h2>Topics</h2>
		        <ul>
		          <li>
		            <Link to={`${match.url}/rendering`}>Rendering with React</Link>
		          </li>
		          <li>
		            <Link to={`${match.url}/components`}>Components</Link>
		          </li>
		          <li>
		            <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
		          </li>
		        </ul>

		      </div>
		    );
}

export default test;
