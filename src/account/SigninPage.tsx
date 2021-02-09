/* eslint-disable no-unused-vars */
import React from 'react';

import Header from '../header/Header';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';
import PropTypes from 'prop-types';

import $ from 'jquery';
declare var window: any;
window.$ = window.jQuery = $;

// window.jQuery = $;

class Signin extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			errorMessage: '',
			username: '',
			password: '',
			signinConfirmation: false

		};

		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangePassword = this.handleChangePassword.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	login() {
		if (this.state.username !== '' && this.state.password !== '') {
			this.try_login(this.state.username, this.state.password);
		} else {
			alert('A username and password must be present');
			this.setState({ errorMessage: 'A username and password must be present' });
		}       // else if user or password are empty ends
	}      // function login ends

	async try_login(inputUsername: any, inputPassword: any) {
		try {
			$.ajax({
				url: 'https://www.icanmakemyownapp.com/iqbal/v3/login.php',
				type: 'POST',
				dataType: 'text',
				data: { username: inputUsername, password: inputPassword },

				success: (data: any) => {
					if (data === 'done') {
						this.setState({ errorMessage: 'Successfully Logged in' });
						// this.setState({ signinConfirmation: data });

						this.props.history.push({
							pathname: '/',
							state: { profileUsername: this.state.username, profilePassword: this.state.password, profileSigninConfirmation: true }
						});
					}
					else {
						this.setState({ errorMessage: data });
					}
				}	// success function ends
			});	// ajax call ends

		}	// try ends
		catch (err) {
			this.setState({ errorMessage: 'API call not successful' });
			alert('inside catch err');
			alert(err);
		}	// catch ends
	}	// async try_login ends

	handleChangeUsername(event: any) {
		this.setState({ username: event.target.value });
	}

	handleChangePassword(event: any) {
		this.setState({ password: event.target.value });
	}

	// handleSubmit
	handleSubmit(event: any) {
		this.login();
		event.preventDefault();
	}

	onSubmitRegister = () => {
		this.props.history.push({
			pathname: 'RegisterPage'
		});
	}

	onSubmitForgot = () => {
		this.props.history.push({
			pathname: 'ForgotPasswordPage'
		});
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">
					<h1>Sign In</h1>
					<form onSubmit={this.handleSubmit}>

						<label>
							Username:
						<input type="text" value={this.state.username} onChange={this.handleChangeUsername} />
						</label>
						<p></p>

						<label>
							Password:
						<input type="password" value={this.state.password} onChange={this.handleChangePassword} />
						</label>
						<p></p>

						<input type="submit" value="SIGN IN" />
					</form>

					<p onClick={() => this.onSubmitForgot()}>
						I Forgot My Password!
				</p>

					<p onClick={() => this.onSubmitRegister()}>
						Do not have an account? {'\n'}
					Register Here
				</p>
					{this.state.errorMessage}
				</div>
			</span>
		);
	}
}

export default Signin;
