import React from 'react'

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';


import ReactTable from 'react-table'
import 'react-table/react-table.css'

var $ = require('jquery')
window.jQuery = $


class ProfilePage extends React.Component {


	constructor(props) {
		super(props);
		this.state = {

			username: "",
			password: "",
			signinConfirmation: "",

			pictures: [],
			listId: "List_001",
			poemList: [],
			poemListName: [],
			bookName: [],
			bookNameUrdu: "",
			bookNameEnglish: "",
			bookSections: [],
			onePoem: "",
			poemText: [],
			poemObjects: [],

			leaderBoardText: [],
			leaderBoardTextEven: [],
			leaderBoardTextOdd: [],
			leaderBoardTextEvenDiscussion: [],
			leaderBoardTextEvenDiscussionName: [],
			leaderBoardTextOddDiscussion: [],
			leaderBoardTextOddDiscussionName: [],
			leaderBoardTextDiscussionConcat: [],
			leaderBoardTextEvenWord: [],
			leaderBoardTextEvenWordName: [],
			leaderBoardTextOddWord: [],
			leaderBoardTextOddWordName: [],
			leaderBoardTextWordConcat: [],

			dropdownState: 'discussion'

		};
		this.dropChange = this.dropChange.bind(this);

	}
	dropChange(event) {
		this.setState({ dropdownState: event.target.value });
	}


	componentDidUpdate(prevProps, prevState) {

		console.log("this.state.leaderBoardText")
		console.log(this.state.leaderBoardText)

		console.log("this.state.leaderBoardTextEven")
		console.log(this.state.leaderBoardTextEven)

		console.log("this.state.leaderBoardTextEvenDiscussion")
		console.log(this.state.leaderBoardTextEvenDiscussion)

		console.log("this.state.leaderBoardTextOddDiscussion")
		console.log(this.state.leaderBoardTextOddDiscussion)

		console.log("this.state.leaderBoardTextEvenWord")
		console.log(this.state.leaderBoardTextEvenWord)

		console.log("this.state.leaderBoardTextOddWord")
		console.log(this.state.leaderBoardTextOddWord)


	}

	componentDidMount() {
		window.scrollTo(0, 0)

		this.get_leader_board()
		// retrive the data
		try {
			console.log(this.state.leaderBoardTextOddWord)
			this.setState({ signinConfirmation: this.props.location.state.profileSigninConfirmation });
			this.setState({ username: this.props.location.state.profileUsername });
			this.setState({ password: this.props.location.state.profilePassword });
		}

		catch (e) {
			console.log("Inside catch");
		}
	}

	signMeIn = () => {

		if (this.state.username === "") {
			this.props.history.push({
				pathname: '/RegisterPage',
				state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
			})
		}

	}

	changePassword = () => {
		this.props.history.push({
			pathname: '/ChangePasswordPage',
			state: { profileSigninConfirmation: this.state.signinConfirmation, profileUsername: this.state.username, profilePassword: this.state.password }
		})

	}

	signOut = () => {
		this.props.history.push({
			pathname: '/',
			state: { profileSigninConfirmation: "", profileUsername: "", profilePassword: "" }
		})

	}


	async get_leader_board() {

		var leaderBoardTextLocal = []
		var leaderBoardTextEvenLocal = []
		var leaderBoardTextOddLocal = []
		var leaderBoardTextEvenDiscussionLocal = []
		var leaderBoardTextOddDiscussionLocal = []
		var leaderBoardTextEvenWordLocal = []
		var leaderBoardTextOddWordLocal = []

		console.log("Inside get_leaser_board")
		try {

			$.ajax({
				url: 'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',
				type: 'GET',
				dataType: 'text',
				success: (data) => {
					console.log("data");
					console.log(data);

					leaderBoardTextLocal = data.split(",");
					leaderBoardTextLocal.splice(-1, 1);
					for (var i = 0; i < leaderBoardTextLocal.length; i++) {
						if (i % 2 === 0) {
							leaderBoardTextEvenLocal.push(leaderBoardTextLocal[i]);
						}
						else {
							leaderBoardTextOddLocal.push(leaderBoardTextLocal[i]);
						}
					}
					for (var j = 0; j < leaderBoardTextEvenLocal.length; j++) {
						if (j < 10) {
							leaderBoardTextEvenDiscussionLocal.push(leaderBoardTextEvenLocal[j]);
							leaderBoardTextOddDiscussionLocal.push(leaderBoardTextOddLocal[j]);
							this.state.leaderBoardTextEvenDiscussionName.push({ "name": leaderBoardTextEvenLocal[j] });
							this.state.leaderBoardTextOddDiscussionName.push({ "points": leaderBoardTextOddLocal[j] });
							this.state.leaderBoardTextDiscussionConcat.push({ "name": leaderBoardTextEvenLocal[j], "points": leaderBoardTextOddLocal[j] });
						}
						else {
							leaderBoardTextEvenWordLocal.push(leaderBoardTextEvenLocal[j]);
							leaderBoardTextOddWordLocal.push(leaderBoardTextOddLocal[j]);
							this.state.leaderBoardTextEvenWordName.push({ "name": leaderBoardTextEvenLocal[j] });
							this.state.leaderBoardTextOddWordName.push({ "points": leaderBoardTextOddLocal[j] });
							this.state.leaderBoardTextWordConcat.push({ "name": leaderBoardTextEvenLocal[j], "points": leaderBoardTextOddLocal[j] });
						}
					}


					this.setState({ leaderBoardText: leaderBoardTextLocal })
					this.setState({ leaderBoardTextEven: leaderBoardTextEvenLocal })
					this.setState({ leaderBoardTextOdd: leaderBoardTextOddLocal })
					this.setState({ leaderBoardTextEvenDiscussion: leaderBoardTextEvenDiscussionLocal })
					this.setState({ leaderBoardTextOddDiscussion: leaderBoardTextOddDiscussionLocal })
					this.setState({ leaderBoardTextEvenWord: leaderBoardTextEvenWordLocal })
					this.setState({ leaderBoardTextOddWord: leaderBoardTextOddWordLocal })


				} // success finishes 
			})
		} catch (err) {
			alert("inside catch err");
			alert(err);
			this.message = err;
		}
		console.log("messageSher sent to send sher message function");
		// console.log(this.messageSher);
		console.log("ajax: this.state.leaderBoardTextEvenDiscussion");
		console.log(this.state.leaderBoardTextEvenDiscussion);

	}



	render() {




		let signinTag
		var signinMessageLocal = ""
		if (this.state.signinConfirmation === "done") {
			signinMessageLocal = this.state.username.charAt(0).toUpperCase()
			signinTag = <button type="button" class="btn btn-success btn-circle btn-lg"> {signinMessageLocal} </button>
		}
		else {
			signinMessageLocal = "Sign In"
			signinTag = <button type="button" class="btn btn-primary" onClick={() => this.signMeIn()}> {signinMessageLocal} </button>
		}






		const columns = [{
			Header: 'Leaderboard Name',
			accessor: 'name' // String-based value accessors!
		}, {
			Header: 'Points',
			accessor: 'points' // String-based value accessors!
		}]


		var myTable = ""

		if (this.state.dropdownState === 'discussion') {
			myTable = <ReactTable data={this.state.leaderBoardTextDiscussionConcat} columns={columns} />
		}
		else {
			myTable = <ReactTable data={this.state.leaderBoardTextWordConcat} columns={columns} />
		}
		return (
			<div>




				<div class="text-right">
					{signinTag}
				</div>
				<h1 class="text-center">My Profile</h1>
				<div class="text-center">
					<p>Now you can write comments!</p>
					<p>You can also vote to others' comments!</p>
					<p>More profile features coming soon!</p>


					<button onClick={() => this.changePassword()} > CHANGE PASSWORD </button>

					<button onClick={() => this.signOut()} > SIGN OUT </button>
				</div>
				<p>
					<select value={this.state.dropdownState} onChange={this.dropChange}>
						<option selected value="discussion">Discussion</option>
						<option value="word">Word Meanings</option>
					</select>
				</p>

				{myTable}

			</div>
		)
	}
}
export default ProfilePage
