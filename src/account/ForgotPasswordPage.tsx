/* eslint-disable no-unused-vars */
import React from 'react';

import PropTypes from 'prop-types';
import Header from '../header/Header';

import $ from 'jquery';
declare var window: any;
window.$ = window.jQuery = $;


class ForgotPassword extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			email: '',
			errorMessage: ''

		};

		this.handleChangeEmail = this.handleChangeEmail.bind(this);

		this.handleSubmit = this.handleSubmit.bind(this);
	}


	// handlechange
	handleChangeEmail(event: any) {
		this.setState({ email: event.target.value });
	}

	onSubmitSignin = () => {
		this.props.history.push({
			pathname: 'SigninPage',
			state: { none: 'none' }
		});
	}

	// handleSubmit
	handleSubmit(event: any) {

		if (this.state.email.trim() !== '') {
			try {
				$.ajax({
					url: 'https://www.icanmakemyownapp.com/iqbal/v3/forgot-password.php',
					type: 'POST',
					dataType: 'text',
					data: { email: this.state.email },
					success: (data) => {	// success funciton starts
						if (data.trim() === 'email sent') {
							alert('Email sent with the new password. Please check your email.');
							this.setState({ errorMessage: 'Email sent with the new password. Please check your email.' });

							this.props.history.push({
								pathname: 'SigninPage',
								state: { none: 'none' }
							});	// this.props.history.push ends

						}	// if data.trim == email sent ends
						else if (data.trim() === 'email not found') {
							alert('Could not found email in our system, please double check email address or create a new account.');
							this.setState({ errorMessage: 'Could not found email in our system, please double check email address or create a new account.' });
						}	// elese if ends
					}	// success function ends
				});	// ajax call ends

			}
			catch (err) {
				alert('inside catch err');
				alert(err);
				this.setState({ errorMessage: err });
			}	// catch ends
		}	// if email not empty ends
		else {
			alert('Email can not be empty');
			this.setState({ errorMessage: 'Email can not be empty' });
		}
		event.preventDefault();
	}
	componentDidMount() {
		window.scrollTo(0, 0);
	}

	render() {
		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">
					<h1>FORGOT PASSWORD</h1>
					<form onSubmit={this.handleSubmit}>
						<label>
							Email:
						<input type="text" value={this.state.email} onChange={this.handleChangeEmail} />
						</label>
						<p></p>
						<input type="submit" value="RESET MY PASSWORD!" />
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
	}	// render ends
}	// class ends

export default ForgotPassword;
