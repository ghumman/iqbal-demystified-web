/* eslint-disable no-unused-vars */
import React from 'react';

import Header from '../header/Header';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';

import { backendUrl } from '../backend-url.js'
import PropTypes from 'prop-types';

import $ from 'jquery';
declare var window: any;
window.$ = window.jQuery = $;


class ChangePassword extends React.Component<any, any>  {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			username: '',
			password: '',
			signinConfirmation: '',

			currentPassword: '',
			newPassword1: '',
			newPassword2: '',
			newPassword: '',
			errorMessage: ''

		};

		this.handleChangeCurrentPassword = this.handleChangeCurrentPassword.bind(this);
		this.handleChangeNewPassword1 = this.handleChangeNewPassword1.bind(this);
		this.handleChangeNewPassword2 = this.handleChangeNewPassword2.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handlechange
	handleChangeCurrentPassword(event: any) {
		this.setState({ currentPassword: event.target.value });
	}

	handleChangeNewPassword1(event: any) {
		this.setState({ newPassword1: event.target.value });
	}

	handleChangeNewPassword2(event: any) {
		this.setState({ newPassword2: event.target.value });
	}

	onSubmitSignin = () => {

		this.props.history.push({
			pathname: 'SigninPage',
			state: { none: 'none' }
		});

	}

	// handleSubmit
	handleSubmit(event: any) {
		event.preventDefault();
		if (this.state.currentPassword && this.state.newPassword1 && this.state.newPassword2) {
			if (this.state.newPassword1.trim() === this.state.newPassword2.trim()) {
				this.setState({ newPassword: this.state.newPassword1 });
				try {
					$.ajax({
						url: backendUrl + 'change-password.php',
						type: 'POST',
						dataType: 'text',
						data: { username: this.state.username, old_password: this.state.currentPassword, new_password: this.state.newPassword1 },
						success: (data) => {	// success funciton starts
							if (data.trim() === 'done') {
								alert('Password Successfully Changed');
								this.setState({ errorMessage: 'Password Successfully Changed' });
								this.setState({ signinConfirmation: true });

								this.props.history.push({
									pathname: '/',
									state: { profileUsername: this.state.username, profilePassword: this.state.newPassword1, profileSigninConfirmation: true }
								});

							}	// if data is equal to done ends
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
				}	// catch finishes
			}	// if passwords are same ends
			else {	// passwords are not same

				alert('Passwords do not match');
				this.setState({ errorMessage: 'Passwords do not match' });

			}	// if email not empty ends
		}	// if fields  are not empty ends

		else {
			alert('All fields are required');
			this.setState({ errorMessage: 'All fields are required' });
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
		}

		catch (e) {

			this.setState({ signinConfirmation: 'not signed in' });
			this.setState({ username: '' });
		}
	}


	render() {
		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">
					<h1>CHANGE PASSWORD</h1>
					<form onSubmit={this.handleSubmit}>

						<label>
							Current Password:
						<input type="text" value={this.state.currentPassword} onChange={this.handleChangeCurrentPassword} />
						</label>
						<p></p>

						<label>
							New Password:
						<input type="text" value={this.state.newPassword1} onChange={this.handleChangeNewPassword1} />
						</label>
						<p></p>

						<label>
							New Password(again):
						<input type="text" value={this.state.newPassword2} onChange={this.handleChangeNewPassword2} />
						</label>
						<p></p>

						<input type="submit" value="CHANGE PASSWORD!" />
					</form>
					<p onClick={() => this.onSubmitSignin()}>

						Already Registered?{'\n'}
					Login Here

				</p>

					<p>
						{this.state.errorMessage}
					</p>
				</div>
			</span>
		);	// return ends
	}	// render function ends
}	// class ends

export default ChangePassword;
