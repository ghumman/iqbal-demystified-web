/* eslint-disable no-unused-vars */
import React from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

// logo is used to display main allama iqbal picture
import logo from './../../assets/allam_iqbal_pic.jpg';

// following are books in first tab - Urdu
import urduBook1 from './../../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg';
import urduBook2 from './../../assets/android_app_assets/book_bang_ae_dara_urdu_1.jpg';
import urduBook3 from './../../assets/android_app_assets/book_armaghan_ae_hijaz_urdu_4.jpg';
import urduBook4 from './../../assets/android_app_assets/book_zarb_ae_kaleem_urdu_3.jpg';

// following are books in second tab - Farsi 1
import farsi1Book1 from './../../assets/android_app_assets/book_rumuz_ae_bekhudi_persian_6.jpg';
import farsi1Book2 from './../../assets/android_app_assets/book_asrar_ae_khudi_persian_5.jpg';
import farsi1Book3 from './../../assets/android_app_assets/book_payam_ae_hijaz_persian_7.jpg';
import farsi1Book4 from './../../assets/android_app_assets/book_zabur_ae_ajam_persian_8.jpg';

// following are books in second tab - Farsi 2
import farsi2Book1 from './../../assets/android_app_assets/book_javed_nama_persian_9.jpg';
import farsi2Book2 from './../../assets/android_app_assets/book_pas_cheh_bayad_kard_persian_10.jpg';
import farsi2Book3 from './../../assets/android_app_assets/book_armaghan_ae_hijaz_persian_11.jpg';

// for formatting
import './TopSectionMainPage.css';

import PropTypes from 'prop-types';

// to go to ListPoemPage when a book logo is pressed
import ListPoemPage from '../../poetry/ListPoemPage';

import Header from '../../header/Header'



class TopSectionMainPage extends React.Component <any, any>  {

	static propTypes = {
		location: PropTypes.object.isRequired,
		history: PropTypes.object.isRequired
	}

	state = {
		textvalue: 'Change me',
		id: '1',

		username: '',
		password: '',
		signinConfirmation: '',

		signinVar: '',

		key: 'home'
	}

	signMeIn = () => {

		if (this.state.username === '') {
			this.props.history.push({
				pathname: '/RegisterPage',
				state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}
	}

	onSubmit = (bookNumber: any) => {
		this.props.history.push({
			pathname: '/ListPoemPage',
			state: { detailBook: bookNumber, profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
		});
	}


	// componentDidMount is called when after render function
	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
			if (this.props.location.state.profileSigninConfirmation !== 'done') {
				this.setState({ signinVar: 'Sign In' });
			}
			else {
				// TODO
			}
		}
		catch (e) {
			this.setState({ signinConfirmation: 'not signed in' });
			this.setState({ username: '' });
		}
	}

	render() {
		// decides when if logged in or not and display either sign in or first character of username
		let signinTag;
		var signinMessageLocal = '';
		if (this.state.signinConfirmation === 'done') {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase();
			signinTag = <button type="button" className="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>;
		}
		else {
			signinMessageLocal = 'Sign In';
			signinTag = <button type="button" className="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>;
		}



		return (



			<div>
				<Header {...this.props}/>
				<h3 className="text-right">{signinTag}</h3>
				<h3 className="text-center app-title">Allama Iqbal</h3>
				<img src={logo} className="rounded mx-auto d-block" alt="Allama Iqbal" />

				<div className="tabTitle">
					<Tabs
						id="controlled-tab-example"
						activeKey={this.state.key}
						onSelect={(key:any) => this.setState({ key })}
						className="nav-tabs"
					>
						<Tab eventKey="home" title="ﺍﺭﺩﻭ">
							<Container>
								<Row>
									<Col><img src={urduBook1} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_002')} /></Col>
									<Col><img src={urduBook2} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_001')} /></Col>
								</Row>
								<Row>
									<Col><img src={urduBook3} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_004')} /></Col>
									<Col><img src={urduBook4} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_003')} /></Col>

								</Row>
							</Container>

						</Tab>

						<Tab eventKey="profile" title="(فارسی (۱">
							<Container>
								<Row>
									<Col><img src={farsi1Book1} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_006')} /></Col>
									<Col><img src={farsi1Book2} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_005')} /></Col>
								</Row>
								<Row>
									<Col><img src={farsi1Book3} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_007')} /></Col>
									<Col><img src={farsi1Book4} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_008')} /></Col>
								</Row>
							</Container>
						</Tab>
						<Tab eventKey="contact" title="(فارسی (۲">
							<Container>
								<Row>
									<Col><img src={farsi2Book1} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_009')} /></Col>
									<Col><img src={farsi2Book2} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_010')} /></Col>
								</Row>
								<Row>
									<Col><img src={farsi2Book3} className="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit('List_011')} /></Col>
								</Row>
							</Container>
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

export default TopSectionMainPage;
