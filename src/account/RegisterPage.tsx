/* eslint-disable no-unused-vars */
import React from 'react';

import SigninPage from './SigninPage';
import Header from '../header/Header';

import TextField from '@material-ui/core/TextField';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';
import PropTypes from 'prop-types';

import { backendUrl } from '../backend-url.js'

import $ from 'jquery';
import { TextFields, Visibility, VisibilityOff } from '@material-ui/icons';
import { Button, FilledInput, FormControl, IconButton, InputAdornment, InputLabel, withStyles } from '@material-ui/core';
declare var window: any;
window.$ = window.jQuery = $;



const styles = theme => ({
	margin: {
		margin: theme.spacing(1),
	},
	textField: {
		width: '25ch',
	},
});

class Register extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			signinConfirmation: false,
			firstName: '',
			lastName: '',
			username: '',
			email: '',
			password1: '',
			password2: '',
			errorMessage: '',
			password: '',
			showPassword1: false,
			showPassword2: false,
		};

		this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleChangeUsername = this.handleChangeUsername.bind(this);
		this.handleChangeEmail = this.handleChangeEmail.bind(this);
		this.handleChangePassword1 = this.handleChangePassword1.bind(this);
		this.handleChangePassword2 = this.handleChangePassword2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}

	// handlechange
	handleChangeFirstName(event: any) {
		this.setState({ firstName: event.target.value });
	}

	handleChangeLastName(event: any) {
		this.setState({ lastName: event.target.value });
	}

	handleChangeUsername(event: any) {
		this.setState({ username: event.target.value });
	}

	handleChangeEmail(event: any) {
		this.setState({ email: event.target.value });
	}

	handleChangePassword1(event: any) {
		this.setState({ password1: event.target.value });
	}

	handleChangePassword2(event: any) {
		this.setState({ password2: event.target.value });
	}

	onSubmitSignin = () => {

		this.props.history.push({
			pathname: 'SigninPage',
			state: { none: 'none' }
		});
	}

	handleClickShowPassword1 = () => {
		this.setState(prevState => ({
			showPassword1: !prevState.showPassword1
		}));
	}

	handleMouseDownPassword1 = (event) => {
		event.preventDefault();
	};

	handleClickShowPassword2 = () => {
		this.setState(prevState => ({
			showPassword2: !prevState.showPassword2
		}));
	}

	handleMouseDownPassword2 = (event) => {
		event.preventDefault();
	};

	// handleSubmit
	handleSubmit(event: any) {

		if (this.state.password1.trim() === this.state.password2.trim()) {
			const st = this.state;
			if (st.firstName && st.lastName && st.username && st.email && st.password1 && st.password2) {
				this.setState({ password: this.state.password1 });
				try {
					$.ajax({
						url: backendUrl + 'create-account.php',
						type: 'POST',
						dataType: 'text',
						data: { first_name: this.state.firstName, last_name: this.state.lastName, username: this.state.username, password: this.state.password1, email: this.state.email },
						success: (data: any) => {	// success funciton starts

							if (data.trim() === 'Your account has been created! Please check your email and activate your account by clicking on a link that we have sent you in the email. Don\'t forget to check in your Junk folder.') {
								alert(data);
								this.setState({ signinConfirmation: true });

								this.props.history.push({
									pathname: '/',
									state: { profileUsername: this.state.username, profilePassword: this.state.password1, profileSigninConfirmation: true }
								});	// this.props.history.push ends
							}	// if data.trim... ends
							// else if account not registered
							else {
								alert('Unable to register your account:' + data);
								this.setState({ errorMessage: 'Unable to register your account:' + data });
							}
						}	// success function ends
					});	// ajax call ends
				}	// try ends
				catch (err) {
					alert('inside catch err');
					alert(err);
					this.setState({ errorMessage: err });
				}	// catch ends
			} // if fields are not empty finished
			else {
				this.setState({ errorMessage: 'Fields can not be empty' });
			}
		}	// if both passwords are same end
		else {
			this.setState({ errorMessage: 'Passwords are not same' });
		}
		event.preventDefault();
	}	// handleSubmit(event) ends
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {

		const { classes } = this.props;
		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">
					<h1 className="text-center"> REGISTER </h1>
					<form onSubmit={this.handleSubmit}>
						<TextField
							label="First Name"
							variant="outlined"
							value={this.state.firstName}
							onChange={this.handleChangeFirstName}
							required
						/>
						<p></p>

						<TextField
							label="Last Name"
							variant="outlined"
							value={this.state.lastName}
							onChange={this.handleChangeLastName}
							required
						/>
						<p></p>
						<TextField
							label="Username"
							variant="outlined"
							value={this.state.username}
							onChange={this.handleChangeUsername}
							required
						/>
						<p></p>
						<TextField
							label="Email"
							variant="outlined"
							value={this.state.email}
							onChange={this.handleChangeEmail}
							required
						/>
						<p></p>
						<FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
							<InputLabel htmlFor="filled-adornment-password">Password</InputLabel>
							<FilledInput
								type={this.state.showPassword1 ? 'text' : 'password'}
								value={this.state.password1}
								onChange={this.handleChangePassword1}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => this.handleClickShowPassword1()}
											onMouseDown={this.handleMouseDownPassword1}
											edge="end"
										>
											{this.state.showPassword1 ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<p></p>
						<FormControl className={clsx(classes.margin, classes.textField)} variant="filled">
							<InputLabel htmlFor="filled-adornment-password">Password (again)</InputLabel>
							<FilledInput
								type={this.state.showPassword2 ? 'text' : 'password'}
								value={this.state.password2}
								onChange={this.handleChangePassword2}
								endAdornment={
									<InputAdornment position="end">
										<IconButton
											aria-label="toggle password visibility"
											onClick={() => this.handleClickShowPassword2()}
											onMouseDown={this.handleMouseDownPassword2}
											edge="end"
										>
											{this.state.showPassword2 ? <Visibility /> : <VisibilityOff />}
										</IconButton>
									</InputAdornment>
								}
							/>
						</FormControl>
						<p></p>
						<Button type="submit" variant="contained" color="primary">
							REGISTER
						</Button>
					</form>
					<p onClick={() => this.onSubmitSignin()}>
						<Button href="#text-buttons" onClick={() => this.onSubmitSignin()}>
												Already Registered?
												Login Here
						</Button>
					</p>
					{this.state.errorMessage}
				</div>
			</span>
		);	// return ends
	}	// render function ends
}

export default withStyles(styles)(Register);
