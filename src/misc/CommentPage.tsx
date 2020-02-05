import React from 'react';
import StaticContentService from './StaticContentServiceYaml';

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import PropTypes from 'prop-types';

import $ from 'jquery';
import YAML from 'yaml';

declare var window : any;
window.$ = window.jQuery = $;

// window.jQuery = $;

class CommentsPage extends React.Component<any, any> {

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

			listId: 'List_001',
			sherText: [],
			wordText: [],
			poemText: [],
			sherObjects: [],
			sherGeneralDiscussionServerResponse: [],
			sherDiscussionDetail: [],
			wordDiscussionDetail: [],

			recentData: [],
			popularData: [],

			testString: '',
			key: 'home', 
			message: ''

		};

	}

	onSubmit = (sherNumber: any) => {
		this.props.history.push({
			pathname: '/SherPage',
			state: {
				detailSher: sherNumber,
				profileSigninConfirmation: this.state.signinConfirmation,
				profileUsername: this.state.username,
				profilePassword: this.state.password
			}
		});
	}


	////////////////////////////////////////////////////////////////////
	//	Recent Function starts
	///////////////////////////////////////////////////////////////////

	async getSherRecentListFromServer() {
		try {
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent',
				type: 'GET',
				dataType: 'text',
				success: (data) => { // success funciton starts
					this.getRecentSher(data);

				} // success function ends
			}); // ajax call ends
		} catch (err) {
			alert('inside catch err');
			alert(err);
			this.setState({message: err})
		}

	}

	getRecentSher(sherRecentList: any) {
		var response = StaticContentService.getRecentSher(sherRecentList);
		let newArr = [response.sher];

		response.sher.map((el: any) => {
			el.sherContent[0].text = el.sherContent[0].text.split('|');
			try {
				el.sherContent[1].text = el.sherContent[1].text.split('|');
			} catch (err) {
				// TODO
			}
			try {
				el.sherContent[2].text = el.sherContent[2].text.split('|');
			} catch (err) { 
				// TODO 
			}
			return el.sherContent;
		});


		this.setState({
			recentData: newArr[0]
		});

	}
	////////////////////////////////////////////////////////////////////
	//	Recent Function Ends
	///////////////////////////////////////////////////////////////////

	////////////////////////////////////////////////////////////////////
	//	Popular Function Starts
	///////////////////////////////////////////////////////////////////

	async getSherPopularListFromServer() {
		try {
			// var element = this;
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=popular',
				type: 'GET',
				dataType: 'text',
				success: (data) => { // success funciton starts
					this.getPopularSher(data);

				} // success function ends
			}); // ajax call ends
		} catch (err) {
			alert('inside catch err');
			alert(err);
			this.setState({message: err})
		}

	}

	getPopularSher(sherPopularList: any) {
		var response = StaticContentService.getRecentSher(sherPopularList);
		let newArrPopular = [response.sher];

		response.sher.map((el: any) => {
			el.sherContent[0].text = el.sherContent[0].text.split('|');
			try {
				el.sherContent[1].text = el.sherContent[1].text.split('|');
			} catch (err) { 
				// TODO 
			}
			try {
				el.sherContent[2].text = el.sherContent[2].text.split('|');
			} catch (err) { 
				// TODO 
			}
			return el.sherContent;
		});

		this.setState({
			popularData: newArrPopular[0]
		});
	}

	////////////////////////////////////////////////////////////////////
	//	Popular Function Ends
	///////////////////////////////////////////////////////////////////

	async getSherGeneralDiscussion(sherName: any) {
		try {
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
				type: 'POST',
				dataType: 'text',
				data: {
					sher: sherName,
					discussion_type: 'general'
				},
				success: (data) => { // success funciton starts
					var sherArray = sherName.split('_');

					// eslint-disable-next-line no-undef
					const yamlFile = require('!raw-loader!./../assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');


					var sherIndex = sherArray[2] - 1;


					var yamlObject = YAML.parse(yamlFile.default);


					var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

					// this.sherText = sherTextTemp.split('|');
					var sherTextLocal = sherTextTemp.split('|');
					this.setState({
						sherText: sherTextLocal
					});


					var wordTextLocal = this.state.sherText[0].split(' ').concat(this.state.sherText[1].split(' '));

					var ii;
					for (ii = 0; ii < wordTextLocal.length; ii++) {
						if (wordTextLocal[ii] === '' || wordTextLocal[ii] === ' ' || wordTextLocal[ii] === '،') {
							wordTextLocal.splice(ii, 1);
							ii--;
						} else {

							wordTextLocal[ii] = wordTextLocal[ii].replace(/[|&!;$%@"<>()+,]/g, '');

						}

					}

					this.setState({
						wordText: wordTextLocal
					});

					var poemTextLocal = yamlObject.heading[0].text;
					var sherGeneralDiscussionServerResponseLocal = data;


					this.setState({
						poemText: poemTextLocal
					});
					this.setState({
						sherGeneralDiscussionServerResponse: sherGeneralDiscussionServerResponseLocal
					});

					this.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);

				} // success function ends
			}); // ajax call ends
		} catch (err) {
			alert('inside catch err');
			alert(err);
			this.setState({message: err});
		}

	}


	getSherDiscussion(sherGeneralDiscussionServerResponse: any) {
		var response = sherGeneralDiscussionServerResponse;
		var sherDiscussionDetailLocal = JSON.parse(response);

		for (var i = 0; i < sherDiscussionDetailLocal.length; i++) {

			sherDiscussionDetailLocal[i].text = decodeURI(sherDiscussionDetailLocal[i].text);

		}

		this.setState({
			sherDiscussionDetail: sherDiscussionDetailLocal
		});
	}


	async getSherWordDiscussion(sherName: any) {
		try {
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
				type: 'POST',
				dataType: 'text',
				data: {
					sher: sherName,
					discussion_type: 'word-meanings'
				},
				success: (data) => { // success funciton starts
					var sherWordDiscussionServerResponse = data;

					this.getWordDiscussion(sherWordDiscussionServerResponse);
				} // success function ends
			}); // ajax call ends
		} catch (err) {
			alert('inside catch err');
			alert(err);
			this.setState({message: err});
		}

	}

	getWordDiscussion(sherWordDiscussionServerResponse: any) {
		var wordDiscussionDetailLocal = JSON.parse(sherWordDiscussionServerResponse);

		for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {

			wordDiscussionDetailLocal[i].text = decodeURI(wordDiscussionDetailLocal[i].text);

		}
		this.setState({
			wordDiscussionDetail: wordDiscussionDetailLocal
		});

	}

	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {


			this.setState({
				signinConfirmation: this.props.location.state.profileSigninConfirmation
			});
			this.setState({
				username: this.props.location.state.profileUsername
			});
			this.setState({
				password: this.props.location.state.profilePassword
			});

			this.getSherRecentListFromServer();
			this.getSherPopularListFromServer();

		} catch (e) {

			// TODO 

		}
	}


	signMeIn = () => {

		if (this.state.username === '') {
			this.props.history.push({
				pathname: '/RegisterPage',
				state: {
					profileSigninConfirmation: this.state.signinConfirmation,
					profileUsername: this.state.username,
					profilePassword: this.state.password
				}
			});
		}

	}

	testFunc = () => {
		this.setState({
			testString: 'hello'
		});
	}

	render() {
		var itemsRecent = this.state.recentData.map((item: any) =>
			<span key={item.index} onClick={() => this.onSubmit(item.id)}>
				{
					item.sherContent[0].text[0]
				}
				< br /> {
					item.sherContent[0].text[1]
				} < br /> {
					item.sherContent[1].text[0]
				} < br /> {
					item.sherContent[1].text[1]
				} < br /> < br />
			</span>
		);

		var itemsPopular = this.state.popularData.map((item: any) =>
			<span key={item.index} onClick={() => this.onSubmit(item.id)}> {
				item.sherContent[0].text[0]
			} < br /> {
				item.sherContent[0].text[1]
			} < br /> {
				item.sherContent[1].text[0]
			} < br /> {
				item.sherContent[1].text[1]
			} < br /> < br /> </span>
		);

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
			<div >
				<div className="text-right">
					{signinTag}
				</div>

				<div className="tabTitle">
					<Tabs
						id="controlled-tab-example"
						activeKey={this.state.key}
						onSelect={(key: any) => this.setState({ key })}
						className="nav-tabs"
					>
						<Tab eventKey="home" title="RECENT">
							{itemsRecent}
						</Tab>
						<Tab eventKey="profile" title="POPULAR">
							{itemsPopular}
						</Tab>
					</Tabs>
				</div>
			</div>
		);
	}
}

// return <h1>I got following message : {this.props.location.state.detail}</h1>
export default CommentsPage;
