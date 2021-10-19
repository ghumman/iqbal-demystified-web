import React from 'react';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';

import PropTypes from 'prop-types';
import Header from '../header/Header';

class InfoPage extends React.Component<any, any> {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	constructor(props: any) {
		super(props);
		this.state = {

			username: '',
			password: '',
			signinConfirmation: ''
		};
	}


	componentDidMount() {
		window.scrollTo(0, 0);
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
		}

		catch (e) {
			// TODO
		}
	}

	signMeIn = () => {

		if (this.state.username === '') {
			this.props.history.push({
				pathname: '/RegisterPage',
				state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}

	}

	render() {

		var infoText = 'Developer:\n\nAhmed Ghumman\n\n';
		var infoText2 = '\n\nFor suggestions and reporting bugs: admin@ghummantech.com\n\nSpecial thanks to Iqbal Demystified Android App Developers:\n\nAZEEM GHUMMAN\n\nFAIZAN KHAN\n\nاخلاص عمل مانگ نيا گان کہن سے\n\'!شاہاں چہ عجب گر بنوازند گدا را\'\n\nMay Allah give them reward for making the code open source.';

		var infoTextTokens = infoText.split('\n').map((item, key) => {
			return <span key={key}>{item}<br /></span>;
		});
		var infoTextTokens2 = infoText2.split('\n').map((item, key) => {
			return <span key={key}>{item}<br /></span>;
		});


		var signinMessageLocal = '';
		if (this.state.signinConfirmation === 'done') {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase();
		}
		else {
			signinMessageLocal = 'Sign In';
		}

		return (
			<span>
				<Header {...this.props} />
				<div className="text-center">

					<div>
						{infoTextTokens}
					</div>
					<a href="https://www.ghummantech.com/"> https://www.ghummantech.com </a>
					<div className="sherPageText">
						{infoTextTokens2}
					</div>
				</div>
			</span>
		);	// return ends
	}	// render function ends
}	// class ends

export default InfoPage;
