/* eslint-disable no-unused-vars */
import React from 'react';

import Header from '../header/Header';

import { backendUrl } from '../backend-url.js'

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';
import PropTypes from 'prop-types';

import $ from 'jquery';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, TextField, withStyles } from '@material-ui/core';
import clsx from 'clsx';
import { Visibility, VisibilityOff } from '@material-ui/icons';
declare var window: any;
window.$ = window.jQuery = $;

// window.jQuery = $;

const styles = theme => ({
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
	errorMessages: {
		color: 'red',
	}
});

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
			signinConfirmation: false,
			showPassword: false,
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
				url: backendUrl + 'login.php',
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

	handleClickShowPassword = () => {
		this.setState(prevState => ({
			showPassword: !prevState.showPassword
		}));
	}

	handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	render() {
		const { classes } = this.props;
		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">
					<h1>Sign In</h1>
					<form onSubmit={this.handleSubmit}>

						<TextField
							label="Username"
							variant="outlined"
							value={this.state.username}
							onChange={this.handleChangeUsername}
							required
						/>
						<p></p>
						<FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
							<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
							<FilledInput
								type={this.state.showPassword ? 'text' : 'password'}
								value={this.state.password}
								onChange={this.handleChangePassword}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => this.handleClickShowPassword()}
											onMouseDown={this.handleMouseDownPassword}
											edge="end"
										>
											{this.state.showPassword ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<p></p>
						<Button type="submit" variant="contained" color="primary">
							SIGN IN
						</Button>
					</form>

					<p>
						<Button color="primary" onClick={() => this.onSubmitForgot()}>
							I Forgot My Password!
						</Button>
					</p>

					<p>
						<Button color="primary" onClick={() => this.onSubmitRegister()}>
							Do not have an account? {'\n'}
							Register Here
						</Button>
					</p>
					<span className={classes.errorMessages}>
					{this.state.errorMessage}
					</span>
				</div>
			</span>
		);
	}
}

export default withStyles(styles)(Signin);

