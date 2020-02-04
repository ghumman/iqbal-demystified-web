import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

// import logo from './IqbalPic.jpg';
import iconSignIn from './../../assets/android_app_assets/icon_signed_in.png';
import iconBest from './../../assets/android_app_assets/icon_best.png';
import iconDiscussion from './../../assets/android_app_assets/icon_discussion.png';
import iconSearch from './../../assets/android_app_assets/icon_search.png';
import iconInfo from './../../assets/android_app_assets/icon_info.png';

// for formatting
import './BottomSectionMainPage.css';
import PropTypes from 'prop-types';

class TabView2 extends React.Component {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	state = {
		username: '',
		password: '',
		signinConfirmation: '',
		gotoPage: ''
	}

	onSubmit = (pageName) => {
		if (pageName === 'Intikhab') {
			this.props.history.push({
				pathname: '/ListPoemPage',
				state: { detailBook: 'List_Editor_Pick', profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}
		else {
			this.props.history.push({
				pathname: pageName,
				state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}
	}

	componentDidMount() {
		window.scrollTo(0, 0);
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });

			if (this.props.location.state.profileSigninConfirmation !== 'done') {

				this.setState({ signinVar: 'Sign In' });

				this.setState({ signinConfirmation: 'not signed in' });
				this.setState({ username: '' });
				this.setState({ gotoPage: 'RegisterPage' });

			}
			else {
				this.setState({ gotoPage: 'ProfilePage' });
			}
		}
		catch (e) {

			this.setState({ signinConfirmation: 'not signed in' });
			this.setState({ username: '' });
			this.setState({ gotoPage: 'RegisterPage' });
		}
	}

	render() {
		return (
			<div className="App">
				<header className="App-header">
					<div>

						<Container>
							<Row>
								<Col><img src={iconSignIn} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit(this.state.gotoPage)} /><div className="tab2Text"> PROFILE </div></Col>
								<Col><img src={iconBest} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('Intikhab')} /><div className="tab2Text"> INTIKHAB </div></Col>
								<Col><img src={iconDiscussion} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('CommentPage')} /><div className="tab2Text"> COMMENTS </div></Col>
							</Row>
							<Row>
								<Col><img src={iconSearch} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('SearchPage')} /><div className="tab2Text"> SEARCH </div></Col>
								<Col><img src={iconInfo} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('InfoPage')} /><div className="tab2Text"> INFO </div></Col>
							</Row>
						</Container>

					</div>

				</header>
			</div>
		);
	}	// render extend

}	// class TabView2 ends

export default TabView2;
