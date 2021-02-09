import React from 'react';
// import Tabs from './Tabs';

// for formatting
// import '../main_page/TopSectionMainPage/TopSectionMainPage.css';


import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import Divider from '@material-ui/core/Divider';
import Header from '../header/Header';
import PropTypes from 'prop-types';

import $ from 'jquery';
import YAML from 'yaml';

import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Box from '@material-ui/core/Box';
import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import ThumbDownIcon from '@material-ui/icons/ThumbDown';

declare var window : any;
window.$ = window.jQuery = $;

const useStyles = (theme) => ({
	root: {
		display: "block",
		margin: "10px",
		textAlign: "center" as "center",
		borderStyle: "solid",
		borderRadius: "25px",
		background: "#FFFAFA",
	  },

	poetryBookTitle: {
		textAlign: "center" as "center",
		fontFamily: "Jameel",
		color: "red",
		fontSize: "40px",
		fontWeight: "bold" as "bold",
		fontStyle: "bold",
	  },
	
	  poetryPoemsList: {
		fontFamily: "Jameel",
		color: "black",
		fontSize: "30px",
		textAlign: "center" as "center",
	  },

	  poetryPoemsSectionsList: {
		fontFamily: "Jameel",
		color: "red",
		fontSize: "30px",
		textAlign: "center" as "center",
	  }, 

	  inputText: {
		  width: "90%",
		  margin: "20px"
	  }

});

class SherPage extends React.Component<any, any> {

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
			sherId: '',
			sherText: [],
			wordText: [],
			poemText: [],
			sherObjects: [],
			sherGeneralDiscussionServerResponse: [],
			sherDiscussionDetail: [],
			wordDiscussionDetail: [],
			mySelectedWord: '',
			mySelectedId: '-99',

			userMessageSher: '',
			userMessageWord: '',

			key: 'home', 
			message: ''
		};
		this.handleUserMessageSher = this.handleUserMessageSher.bind(this);
		this.handleUserMessageWord = this.handleUserMessageWord.bind(this);

		this.handleSubmitSher = this.handleSubmitSher.bind(this);
		this.handleSubmitWord = this.handleSubmitWord.bind(this);
	}

	handleUserMessageSher(event: any) {
		this.setState({ userMessageSher: event.target.value });
	}

	handleUserMessageWord(event: any) {
		this.setState({ userMessageWord: event.target.value });
	}


	handleSubmitSher(event: any) {
		this.send_sher_message();
		event.preventDefault();
	}

	handleSubmitWord(event: any) {
		this.send_word_message();
		event.preventDefault();
	}

	async send_sher_message() {

		// do not try pushing comment if message is empty
		if (this.state.userMessageSher.trim() !== '') {

			// if user is not signed in, ask user to sign in
			if ((this.state.username.trim() !== '') && (this.state.password.trim() !== '')) {

				try {
					// var element = this;
					$.ajax({
						url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
						type: 'POST',
						dataType: 'text',
						data: { sher: this.state.sherId, discussion_type: 'general', username: this.state.username, password: this.state.password, comment_text: this.state.userMessageSher },
						success: () => {	// success funciton starts
							this.getSherGeneralDiscussion(this.state.sherId);


						}	// success function ends
					});	// ajax call ends
				} catch (err) {
					alert('inside catch err');
					alert(err);
					// this.message = err;
				}
			}	// if not logged in empty
			else {

				alert('Please login first to add comments.');
			}
		}	// if message is empty ends

		else {
			alert('Comments can not be empty');
		}
	}

	async send_word_message() {

		// do not try pushing comment if message is empty
		if (this.state.userMessageWord.trim() !== '') {

			// if user is not signed in, ask user to sign in
			if ((this.state.username.trim() !== '') && (this.state.password.trim() !== '')) {

				try {
					$.ajax({
						url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
						type: 'POST',
						dataType: 'text',
						data: { sher: this.state.sherId, discussion_type: 'word-meanings', username: this.state.username, password: this.state.password, comment_text: this.state.userMessageWord, word_position: this.state.mySelectedId + 1 },
						success: () => {	// success funciton starts
							this.getSherWordDiscussion(this.state.sherId);

						}	// success function ends
					});	// ajax call ends
				} catch (err) {
					alert('inside catch err');
					alert(err);
					// this.message = err;
				}

			}	// if not logged in empty
			else {

				alert('Please login first to add comments.');
			}
		}	// if message is empty ends

		else {
			alert('Comments can not be empty');
		}

	}


	onSubmit = (sherNumber: any) => {
		this.props.history.push({
			pathname: '/SherPage',
			state: { detailSher: sherNumber, profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
		});
	}

	async getSherGeneralDiscussion(sherName: any) {
		try {
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
				type: 'POST',
				dataType: 'text',
				data: { sher: sherName, discussion_type: 'general' },
				success: (data) => {    // success funciton starts
					var sherArray = sherName.split('_');

					// eslint-disable-next-line no-undef
					const yamlFile = require('!raw-loader!./../assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');


					var sherIndex = sherArray[2] - 1;
					var yamlObject = YAML.parse(yamlFile.default);

					var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

					var sherTextLocal = sherTextTemp.split('|');
					this.setState({ sherText: sherTextLocal });

					var wordTextLocal = this.state.sherText[0].split(' ').concat(this.state.sherText[1].split(' '));
					var ii;
					for (ii = 0; ii < wordTextLocal.length; ii++) {	

						if (wordTextLocal[ii] === '' || wordTextLocal[ii] === ' ' || wordTextLocal[ii] === '،') {
							wordTextLocal.splice(ii, 1);
							ii--;
						}
						else {

							wordTextLocal[ii] = wordTextLocal[ii].replace(/[|&!;$%@"<>()+,]/g, '');

						}  // else ends

					} // for wordTextLocal.... ends
					let wordObjArr: any[] = []
					for ( let i=0; i<wordTextLocal.length; i++) {
						wordObjArr.push({'text' : wordTextLocal[i], 'id': i});
					}


					// make wordTextLocal equal to this.state.wordText
					this.setState({ wordText: wordObjArr });


					var poemTextLocal = yamlObject.heading[0].text;
					var sherGeneralDiscussionServerResponseLocal = data;
					this.setState({ poemText: poemTextLocal });
					this.setState({ sherGeneralDiscussionServerResponse: sherGeneralDiscussionServerResponseLocal });
				
					this.getSherDiscussion(sherGeneralDiscussionServerResponseLocal);
				}       // success function ends
			});     // ajax call ends

		} catch (err) {
			alert('inside catch err');
			alert(err);
			this.setState({message: err})
		}
	} // async getSherGeneralDiscussion ends


	getSherDiscussion(sherGeneralDiscussionServerResponse: any) {
		var response = sherGeneralDiscussionServerResponse;

		var sherDiscussionDetailLocal = JSON.parse(response);

		for (var i = 0; i < sherDiscussionDetailLocal.length; i++) {

			sherDiscussionDetailLocal[i].text = decodeURI(sherDiscussionDetailLocal[i].text);

		}
		this.setState({ sherDiscussionDetail: sherDiscussionDetailLocal });
	}


	async getSherWordDiscussion(sherName: any) {
		try {
			$.ajax({
				url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
				type: 'POST',
				dataType: 'text',
				data: { sher: sherName, discussion_type: 'word-meanings' },
				success: (data) => {    // success funciton starts

					var sherWordDiscussionServerResponse = data;


					this.getWordDiscussion(sherWordDiscussionServerResponse);

				}       // success function ends
			});     // ajax call ends
		}  // try ends
		catch (err) {
			alert('inside catch err');
			alert(err);
			// this.message = err;
		}  // catch ends
	}

	getWordDiscussion(sherWordDiscussionServerResponse: any) {
		var wordDiscussionDetailLocal = JSON.parse(sherWordDiscussionServerResponse);

		for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {

			wordDiscussionDetailLocal[i].text = decodeURI(wordDiscussionDetailLocal[i].text);

		}
		this.setState({ wordDiscussionDetail: wordDiscussionDetailLocal });

	}

	componentDidMount() {
		window.scrollTo(0, 0);
		// retrive the data
		try {
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
			this.setState({ sherId: this.props.location.state.detailSher });

			let sherName = this.props.location.state.detailSher;
			this.getSherGeneralDiscussion(sherName);
			this.getSherWordDiscussion(sherName);
		}  // try ends
		catch (e) {
			// TODO 
		} // catch ends
	} // componentDidMount ends

	signMeIn = () => {

		if (this.state.username === '') {
			this.props.history.push({
				pathname: '/RegisterPage',
				state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			});
		}
	}

	///////////////////////////////////////////////////////////
	//	Vote Like Word
	///////////////////////////////////////////////////////////

	vote_like_word(comment_general_id: any) {


		if (this.state.username !== '') {
			try {
				// var element = this;
				$.ajax({
					url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
					type: 'POST',
					dataType: 'text',
					data: { sher: this.state.sherId, discussion_type: 'word-meanings', comment_id: comment_general_id, username: this.state.username, password: this.state.password, is_like: 1, is_cancel: 0 },
					success: (data) => {	// success funciton starts
						if (data === 'vote registered')
							this.getSherWordDiscussion(this.state.sherId);
						else if (data === 'vote already registered') {
							alert('Vote is already registerd. Unregister vote first and then you can revote');
							// this.toggle_word(idx);
						}


					}	// success function ends
				});	// ajax call ends
			} catch (err) {
				alert('inside catch err');
				alert(err);
				// this.message = err;
			}
		}	// if username not empty ends
		else {
			alert('You are you not logged in. Please Login to give your feedback.');
		}
	}

	///////////////////////////////////////////////////////////
	//	Vote Dislike Word
	///////////////////////////////////////////////////////////

	vote_dislike_word(comment_general_id: any) {


		if (this.state.username !== '') {
			try {
				// var element = this;
				$.ajax({
					url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
					type: 'POST',
					dataType: 'text',
					data: { sher: this.state.sherId, discussion_type: 'word-meanings', comment_id: comment_general_id, username: this.state.username, password: this.state.password, is_like: 0, is_cancel: 0 },
					success: (data) => {	// success funciton starts
						if (data === 'vote registered')
							this.getSherWordDiscussion(this.state.sherId);
						else if (data === 'vote already registered') {
							alert('Vote is already registerd. Unregister vote first and then you can revote');
							// this.toggle_word(idx);


						}


					}	// success function ends
				});	// ajax call ends
			} catch (err) {
				alert('inside catch err');
				alert(err);
				this.setState({message: err});
			}
		}	// if username not empty ends
		else {
			alert('You are you not logged in. Please Login to give your feedback.');
		}
	}

	///////////////////////////////////////////////////////////
	//	Vote Unregister Word
	///////////////////////////////////////////////////////////

	vote_unregister_word(comment_general_id: any) {

		if (this.state.username !== '') {
			try {
				// var element = this;
				$.ajax({
					url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
					type: 'POST',
					dataType: 'text',
					data: { sher: this.state.sherId, discussion_type: 'word-meanings', comment_id: comment_general_id, username: this.state.username, password: this.state.password, is_like: 0, is_cancel: 1 },
					success: (data) => {	// success funciton starts
						if (data === 'vote removed') {
							// this.toggle_word(idx);
							this.getSherWordDiscussion(this.state.sherId);
							alert('Your vote is removed');
						}
						else if (data === 'invalid is_cancel value') {
							alert('You have not liked or disliked it yet.');
						}


					}	// success function ends
				});	// ajax call ends
			} catch (err) {
				alert('inside catch err');
				alert(err);
				// this.message = err;
			}
		}	// if username not empty ends
		else {
			alert('You are you not logged in. Please Login to give your feedback.');
		}
	}


	///////////////////////////////////////////////////////////
	//	Vote Like General
	///////////////////////////////////////////////////////////

	vote_like(comment_general_id: any) {

		if (this.state.username !== '') {
			try {
				// var element = this;
				$.ajax({
					url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
					type: 'POST',
					dataType: 'text',
					data: { sher: this.state.sherId, discussion_type: 'general', comment_id: comment_general_id, username: this.state.username, password: this.state.password, is_like: 1, is_cancel: 0 },
					success: (data) => {	// success funciton starts
						if (data === 'vote registered')
							this.getSherGeneralDiscussion(this.state.sherId);
						else if (data === 'vote already registered') {
							this.vote_unregister(comment_general_id)
						}


					}	// success function ends
				});	// ajax call ends
			} catch (err) {
				alert('inside catch err');
				alert(err);
				// this.message = err;
			}
		}	// if username not empty ends
		else {
			alert('You are you not logged in. Please Login to give your feedback.');
		}
	}


	///////////////////////////////////////////////////////////
	//	Vote Dislike General
	///////////////////////////////////////////////////////////

	vote_dislike(comment_general_id: any) {

		if (this.state.username !== '') {
			try {
				$.ajax({
					url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
					type: 'POST',
					dataType: 'text',
					data: { sher: this.state.sherId, discussion_type: 'general', comment_id: comment_general_id, username: this.state.username, password: this.state.password, is_like: 0, is_cancel: 0 },
					success: (data) => {	// success funciton starts
						if (data === 'vote registered')
							this.getSherGeneralDiscussion(this.state.sherId);
						else if (data === 'vote already registered') {
							this.vote_unregister(comment_general_id)
						}


					}	// success function ends
				});	// ajax call ends
			} catch (err) {
				alert('inside catch err');
				alert(err);
			}
		}	// if username not empty ends
		else {
			alert('You are you not logged in. Please Login to give your feedback.');
		}
	}

	///////////////////////////////////////////////////////////
	//	Vote Unregister General
	///////////////////////////////////////////////////////////


	vote_unregister(comment_general_id: any) {

		if (this.state.username !== '') {
			try {
				// var element = this;
				$.ajax({
					url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
					type: 'POST',
					dataType: 'text',
					data: { sher: this.state.sherId, discussion_type: 'general', comment_id: comment_general_id, username: this.state.username, password: this.state.password, is_like: 0, is_cancel: 1 },
					success: (data) => {	// success funciton starts
						if (data === 'vote removed') {
							// this.toggle(idx);
							this.getSherGeneralDiscussion(this.state.sherId);
							// alert('Your vote is removed');
						}
						// else if (data === 'invalid is_cancel value') {
						// 	alert('You have not liked or disliked it yet.');
						// }


					}	// success function ends
				});	// ajax call ends
			} catch (err) {
				alert('inside catch err');
				alert(err);
				// this.message = err;
			}
		}	// if username not empty ends
		else {
			alert('You are you not logged in. Please Login to give your feedback.');
		}
	}

	selectedWord(wordText: any, wordId: any) {
		this.setState({ mySelectedWord: wordText });
		this.setState({ mySelectedId: wordId });
	}

	render() {
		const { classes } = this.props;
		var sherText = this.state.sherText.map((item: any) =>
			<p key={item.index } className={classes.poetryPoemsList}> {item}</p>
		);

		var item5 = this.state.wordText.map((item: any) =>
			<span key={item.index}>
				<button type="button" className="btn btn-primary" onClick={() => this.selectedWord(item.text, item.id)}>
					{item.text} 
				</button>  
			</span>
			/*<span key={item.index}> {item}: {index}</span>*/
		);

		var userComments = this.state.sherDiscussionDetail.map((item: any) =>
		<div>
			<Card className={classes.root}>
				<CardContent>
				<Box
        display="flex"
      >
        <Box 
        m={1}
		p={1}
		
        >
          <ThumbUpIcon  onClick={() => this.vote_like(item.id)}/>
		  <div/>
		  {item.score}
		  <div/>
		  <ThumbDownIcon onClick={() => this.vote_dislike(item.id)}/>
        </Box>
        <Box
        display="flex"
		flexDirection="column"
		flexGrow={1}
      >
        <Box 

        p={4}
        >
			<span className={classes.poetryPoemsList}>
          		{item.text}
		  	</span>
        </Box>
        <Box 
        p={1}
        textAlign="center"
        >
          <span className="float-left">{item.username} </span>
		  <span className="float-right">{item.timestamp} </span>
        </Box>
        </Box>
        
      </Box>
					{/* <div key={item.id}> 
						<div className="float-left">
							<p> {item.username}</p>
						</div> 
						<div className="float-right">
							<p>  {item.timestamp}</p> 
						</div>
						<br /> 
						<p className={classes.poetryPoemsList}>
							{item.text}
							<br /><br /> 
							<button type="button" className="btn btn-primary px-2" onClick={() => this.vote_like(item.id)}> 
								LIKE 
							</button> 
							<span className="px-2">
								SCORE: {item.score}
							</span>
							<button type="button" className="btn btn-primary" onClick={() => this.vote_dislike(item.id)} >
								DISLIKE
							</button>
							<p></p>
							<button type="button" className="btn btn-primary" onClick={() => this.vote_unregister(item.id)} >
								UNREGISTER
							</button>
						</p>
						<Divider />
					</div> */}
				</CardContent>
			</Card>
			<div></div>
		</div>

		);


				var item7 = this.state.wordDiscussionDetail.map((item: any) => {
					if ((item.wordposition - 1) === this.state.mySelectedId)
						return (
							<div key={item.id}>
								<div className="float-left">
									<p> 
										{item.username}
									</p>
								</div> 
								<div className="float-right">
									<p>
										{item.timestamp}
									</p> 
								</div>
								<br /> 
								<p>
									{item.text}
									<br /><br /> 
									<button type="button" className="btn btn-primary" onClick={() => this.vote_like_word(item.id)}>
										LIKE 
									</button>
									<span className="px-2"> 
										SCORE: {item.score}
									</span>
									<button type="button" className="btn btn-primary" onClick={() => this.vote_dislike_word(item.id)}>
										DISLIKE
									</button>
									<p></p>
									<button type="button" className="btn btn-primary" onClick={() => this.vote_unregister_word(item.id)}>
										UNREGISTER
									</button>
								</p>
								<Divider />
							</div>
						);
					return null;
				}
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
			<div>
				<Header {...this.props}/>

				<div className={classes.poetryBookTitle}>
					{this.state.poemText}
				</div>
				<div>
					<Tabs
						id="controlled-tab-example"
						activeKey={this.state.key}
						onSelect={(key: any) => this.setState({ key })}
						className="nav-tabs"
					>
						<Tab eventKey="home" title="DISCUSSION">
							{sherText}
							{userComments}


							<form className={classes.poetryPoemsList} onSubmit={this.handleSubmitSher}>

								<label >
									Comments:
								</label>
								<p></p>

								<textarea className={classes.inputText} value={this.state.userMessageSher} onChange={this.handleUserMessageSher} ></textarea>

								<p></p>


								<input type="submit" value="SUBMIT" />
							</form>
						</Tab>

						<Tab class="sherPageText" eventKey="profile" title="WORD MEANING">
							{item5}
							<p></p>

							Selected Word: {this.state.mySelectedWord}
							<p></p>
							{item7}
							<form onSubmit={this.handleSubmitWord}>
								<label>
									Comments:
								</label>
								<p></p>
								<textarea value={this.state.userMessageWord} onChange={this.handleUserMessageWord} ></textarea>
								<p></p>

								<input type="submit" value="SUBMIT" />
							</form>
						</Tab>
					</Tabs>
				</div>
			</div>
		); // return ends
	}  // render function ends
} // class ends

export default withStyles(useStyles)(SherPage);
