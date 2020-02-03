import React from 'react';

import ReactDOM from 'react-dom'

import { Route, Link, BrowserRouter as Router } from 'react-router-dom'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'



import urduFont from './poem_page.css'


// logo is used to display main allama iqbal picture
import logo from './../../assets/allam_iqbal_pic.jpg'

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

// to go to ListPoemPage when a book logo is pressed
import ListPoemPage from '../../ListPoemPage';

class TabView1 extends React.Component {
	state = {
		textvalue: 'Change me',
    id: "1",

    username: "",
    password: "",
    signinConfirmation: "",

    signinVar: "",

		key: 'home'
  }

  signMeIn = () => {

	  if (this.state.username == "") {
	  	this.props.history.push({
		    pathname: '/RegisterPage',
		    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
	  }
  }

  onSubmit = (bookNumber) => {
	  this.props.history.push({
		    pathname: '/ListPoemPage',
		    state: { detailBook: bookNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
	  })
	}

	// componentDidMount is used when you want to display this.state.xxxx and want to make sure that new value is displayed
	componentDidUpdate(prevProps, prevState) {
		  console.log("this.state.username")
		  console.log(this.state.username)

		  console.log("this.state.password")
		  console.log(this.state.password)

		  console.log("this.state.profileSigninConfirmation")
		  console.log(this.state.signinConfirmation)

		  console.log("this.state.signinVar")
		  console.log(this.state.signinVar)
	}

	// componentDidMount is called when after render function
	componentDidMount() {
		window.scrollTo(0, 0)
	// retrive the data
		try {
	  		this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
	  		this.setState({username: this.props.location.state.profileUsername});
				this.setState({password: this.props.location.state.profilePassword});
				if (this.props.location.state.profileSigninConfirmation != 'done') {
					console.log("Profile Signin Confirmation message is not done ")
					console.log("Something went wrong setting signinVar to Sign in again")
					this.setState({signinVar: "Sign In"})
				}
				else {
					console.log("You're signed in and profileSigninConfirmation message is done");
				}
			}
			catch (e) {
				console.log("Inside catch")
				console.log("Not signed in or just started the app");
				this.setState({signinConfirmation: 'not signed in'});
				this.setState({username: ''});
			}
	}

	render() {
		// decides when if logged in or not and display either sign in or first character of username
		let signinTag
		var signinMessageLocal = ""
		if (this.state.signinConfirmation  === "done") {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase()
		  signinTag = <button type="button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>
		}
		else {
			signinMessageLocal = "Sign In"
		  signinTag = <button type="button" class="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>
		}



	  return (



			<div>
		  	{/*
				<p class="myLine1">My awesome font</p>;
				<p class="myLine1">My awesome font</p>;
			*/}
<h3 class="text-right">{signinTag}</h3>
{/*<h3 class="text-center" style={{fontFamily: 'Sans Sarif'}}>Allama Iqbal</h3>*/}
<h3 class="text-center app-title">Allama Iqbal</h3>
<img src={logo}  class="rounded mx-auto d-block" alt="Allama Iqbal Image" />
{/*</div>

	    <div className="App">*/}

{/*
			<nav>
		  <div class="nav nav-tabs" id="nav-tab" role="tablist">
		    <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" onClick={() => this.tabClicked("urdu")} role="tab" aria-controls="nav-home" aria-selected="true">Home</a>
		    <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" onClick={() => this.tabClicked("farsi1")} role="tab" aria-controls="nav-profile" aria-selected="false">Profile</a>
		    <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" onClick={() => this.tabClicked("farsi2")} role="tab" aria-controls="nav-contact" aria-selected="false">Contact</a>
		  </div>
		</nav>
		<div class="tab-content" id="nav-tabContent">
		  <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
			<img src={urduBook1} className="App-logo" alt="logo"  onClick={() => this.onSubmit("List_002")}/>
			<img src={urduBook2} className="App-logo" alt="logo"  onClick={() => this.onSubmit("List_001")}/>
			<img src={urduBook3} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_004")}/>
			<img src={urduBook4} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_003")}/>
			</div>
		  <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">2</div>
		  <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">3</div>
		</div>

		*/}


		{/*<div style={{fontFamily: 'Jameel Noori Nastaleeq'}}>*/}
		<div class="tabTitle">
		<Tabs
			id="controlled-tab-example"
			activeKey={this.state.key}
			onSelect={key => this.setState({ key })}
			class="nav-tabs"
		>
			<Tab eventKey="home"  title="ﺍﺭﺩﻭ">
			<Container>
  <Row>
    <Col><img src={urduBook1}  class="rounded mx-auto d-block imgSizing" alt="logo"  onClick={() => this.onSubmit("List_002")} /></Col>
    <Col><img src={urduBook2} class="rounded mx-auto d-block imgSizing" alt="logo"  onClick={() => this.onSubmit("List_001")} /></Col>
  </Row>
  <Row>
    <Col><img src={urduBook3} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_004")} /></Col>
    <Col><img src={urduBook4} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_003")}/></Col>

  </Row>
</Container>

			</Tab>

			<Tab eventKey="profile"  title="(فارسی (۱">
			<Container>
  <Row>
     <Col><img src={farsi1Book1} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_006")}/></Col>
     <Col><img src={farsi1Book2} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_005")}/></Col>
  </Row>
  <Row>
     <Col><img src={farsi1Book3} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_007")}/></Col>
     <Col><img src={farsi1Book4} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_008")}/></Col>
  </Row>
			</Container>
			</Tab>
			<Tab eventKey="contact"  title="(فارسی (۲">
			<Container>
  <Row>
  <Col><img src={farsi2Book1} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_009")}/></Col>
  <Col><img src={farsi2Book2} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_010")}/></Col>
  </Row>
  <Row>
  <Col><img src={farsi2Book3} class="rounded mx-auto d-block imgSizing" alt="logo" onClick={() => this.onSubmit("List_011")}/></Col>
  </Row>
			</Container>
			</Tab>
		</Tabs>
		</div>


			{/*
			  <header className="App-header">
				  {signinTag}

					<p>Allama Iqbal</p>
					<img src={logo} className="App-logo" alt="logo" />
					*/}{/*
					<Tabs>
						<div label="ﺍﺭﺩﻭ">
				  		<img src={urduBook1} className="App-logo" alt="logo"  onClick={() => this.onSubmit("List_002")}/>
				  		<img src={urduBook2} className="App-logo" alt="logo"  onClick={() => this.onSubmit("List_001")}/>
				  		<img src={urduBook3} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_004")}/>
				  		<img src={urduBook4} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_003")}/> </div>
					  <div label="(ﻑﺍﺮﺳی  (۱">
				  		<img src={farsi1Book1} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_006")}/>
				  		<img src={farsi1Book2} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_005")}/>
				  		<img src={farsi1Book3} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_007")}/>
				  		<img src={farsi1Book4} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_008")}/>
					  </div>
					  <div label="(ﻑﺍﺮﺳی  (۲">
				  		<img src={farsi2Book1} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_009")}/>
				  		<img src={farsi2Book2} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_010")}/>
				  		<img src={farsi2Book3} className="App-logo" alt="logo" onClick={() => this.onSubmit("List_011")}/>
					  </div>
					</Tabs>
					*/}

				{/*</header>*/}
	    </div>
	  )
	}
}


export default TabView1;
