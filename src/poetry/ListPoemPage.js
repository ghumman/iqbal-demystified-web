import React from 'react'
import StaticContentService from '../StaticContentServiceYaml'

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';

import Divider from '@material-ui/core/Divider';

import PoemPage from './PoemPage';

var  YAML = require('yaml');

class ListPoemPage extends React.Component {
	constructor(props) {
    super(props);
    this.state = {

			// following three are normally passed to every page
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
	    poemObjects: []
    }	// this.state ends
	}	// constructor ends

	onSubmit = (poemNumber) => {

	  console.log("Value of poemNumber: ");
	  console.log(poemNumber);
	  if (poemNumber != 0)
	  {
		  this.props.history.push({
			    pathname: '/PoemPage',
			    state: { detailPoem: poemNumber, profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
		  })
	  }
	}

	getPoemList (listId) {

		console.log("listId: " + listId);
    var response = StaticContentService.getPoemList(listId);
    console.log("response: ");
    console.log(response);

    console.log('[ true, false, maybe, null ]\n');
    var aVarTestYaml = YAML.parse('[ true, false, maybe, null ]\n');

    console.log(aVarTestYaml);
    var yamlObject = YAML.parse(response)

    console.log("yamlObject : ")
    console.log(yamlObject)

    this.setState({poemList: yamlObject.sections});

    console.log("this.state.poemList : ")
    console.log(this.state.poemList);

    this.setState({poemListName: this.state.poemList.poems});

    console.log("this.state.poemListName : ")
    console.log(this.state.poemListName);

    console.log("yamlObject.name.text[0]")
    console.log(yamlObject.name[0].text)


    console.log("checkValueVar");

    var checkValueVar = [];

    console.log("Value of yamlObject.sections.length");
    console.log(yamlObject.sections.length);

    console.log("Value of yamlObject.sections[0].sectionName.length");
    console.log(yamlObject.sections[0].sectionName.length);

    for (var i=0; i<yamlObject.sections.length; i++) {
    	try {
	    	if (yamlObject.sections[i].sectionName[0]) {
	    		console.log(" sectionName exists" );
		    	for (var j=0; j<yamlObject.sections[i].sectionName.length; j++)
						this.state.poemText.push({"text" : yamlObject.sections[i].sectionName[j].text, "id" : '0'});
					}
    		}
    	catch(e) {
    		if (yamlObject.sections[i].poems[0].poemName[0]) {
	    		console.log(" poems[0].poemName[0] exists" );
		    	for (var j=0; j<yamlObject.sections[i].poems.length; j++){
		    		for (var k=0; k<yamlObject.sections[i].poems[j].poemName.length; k++)
							this.state.poemText.push({"text" : yamlObject.sections[i].poems[j].poemName[k].text, "id" : yamlObject.sections[i].poems[j].id})
						this.setState({poemObject: yamlObject.sections[i].poems[j]})
					}
				}	// if yamlObject.... ends
			}	// catch ends
		}	// for ends

    console.log("Value of poemObject: ");
    console.log(this.state.poemObject);

    console.log("checkValueVar");
    console.log(checkValueVar);
    console.log("yamlObject.sections[0].sectionName[0].text");
    console.log(yamlObject.sections[0].sectionName[0].text);


    try {
		  this.state.bookName = yamlObject.sections[0].sectionName.map((item, key) =>
		  	<li key={item.text}>{item.text}</li>
		  )
    }
    catch(e) {
	    console.log("caught error");
    }
    console.log("bookName: ");
    console.log(this.state.bookName);

    this.setState({bookNameUrdu: yamlObject.name[0].text});
    this.setState({bookNameEnglish: yamlObject.name[1].text});

    this.setState({bookSections: yamlObject.sections});

    console.log("bookNameUrdu: ");
    // console.log(this.state.bookNameUrdu + "");
    console.log(yamlObject.name[0].text);
    console.log("bookNameEnglish: ");
    // console.log(this.state.bookNameEnglish + "");
    console.log(yamlObject.name[1].text);

    console.log("yamlObject.sections[1].poems[0].poemName[0].text: ");
    console.log(yamlObject.sections[1].poems[0].poemName[0].text);

    this.setState({onePoem: yamlObject.sections[1].poems[0].poemName[0].text});
  }	// getPoemList ends

	componentDidMount() {
		window.scrollTo(0, 0)
  	// retrive the data
 		try {
			this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
			this.setState({username: this.props.location.state.profileUsername});
			this.setState({password: this.props.location.state.profilePassword});
			let bookName = this.props.location.state.detailBook;
			this.getPoemList(bookName);
		}
		catch(e) {
			console.log("Inside catch");
		}
	}

  signMeIn = () => {
	  if (this.state.username == "") {
	  	this.props.history.push({
		    pathname: '/RegisterPage',
		    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
	  }
  }

	render() {

		var item3 = this.state.poemText.map( (item) =>
			<p key={item.index} onClick={() => this.onSubmit(item.id)}> {item.text}<Divider/></p>
		);
		/*
		var item3 = this.state.poemText.map( (item) =>
			<li key={item.index} onClick={() => this.onSubmit(item.id)}> {item.text}: {item.id}</li>
		);
		*/

		var aVar = this.state.bookSections.length;
		console.log("hello world");
		console.log(this.state.bookSections);
		var stationsArr = []
		for (var i = 0; i < this.state.bookSections.length; i++) {
			stationsArr.push(
			<div className="station">
				{this.data}
			 </div>
				           )
		}

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
			<div class="text-right">
				{signinTag}
			</div>
			<div class="tabTitle">
				<p>
					{this.state.bookNameUrdu}
				</p>
				<p>
					{this.state.bookNameEnglish}
				</p>
			</div>
				<div class="text-center listPoemPageText">
					{item3}
				</div>
			</div>
			
			)
		}
}

		      // return <h1>I got following message : {this.props.location.state.detail}</h1>
export default ListPoemPage
