import React from 'react'
import StaticContentService from '../misc/StaticContentServiceYaml'

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';

var  YAML = require('yaml');

class PoemPage extends React.Component {
	constructor(props) {
		super(props);
    this.state = {
		  username: "",
		  password: "",
		  signinConfirmation: "",

		  listId: "List_001",
		  poemList: [],
		  poemNameUrdu: "",
		  poemNameEnglish: "",
		  poemText: [],
		  poemTextNew: [],
		  poemObjects: []
		}
	}

  onSubmit = (sherNumber) => {
	  this.props.history.push({
		    pathname: '/SherPage',
		    state: { detailSher: sherNumber , profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password }
	  })
	}

	getPoem (listId) {

		console.log("listId: " + listId);
	  var response = StaticContentService.getPoem(listId);
	  console.log("response: ");
	  console.log(response);


	  var yamlObject = YAML.parse(response)
	  console.log("yamlObject : ")
	  console.log(yamlObject)

        let newArr = [yamlObject.sher]
        console.log("Value of newArr")
        console.log(newArr)
        console.log("newArr.sherContent[0].text")
        console.log(yamlObject.sher[0].sherContent[0].text)

          yamlObject.sher.map(el => {
	     try{
		    el.sherContent[0].text = el.sherContent[0].text.split('|')
		    console.log(el.sherContent[0].text)
	    }catch (err) {
		    		console.log("zero catch")
	    }
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) { 
		    		console.log("first catch")
				el.sherContent.push({"text": ["#translation missing", "#translation missing"]})

				console.log(el.sherContent[1].text)
	  }
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {
		    		console.log("second catch")
				el.sherContent.push({"text": ["#translation missing", "#translation missing"]})
				console.log(el.sherContent[2].text)
	    
	    }
            return el.sherContent;
          })


        console.log("Value of newArr")
        console.log(newArr)

        console.log("Value of newArr[0]")
        console.log(newArr[0])

        console.log("Value of newArr[1]")
        console.log(newArr[1])

        console.log("Value of newArr.length")
        console.log(newArr[0].length)

        this.setState({
            poemTextNew: newArr[0]
        })
	  this.setState({poemNameUrdu: yamlObject.heading[0].text});
	  this.setState({poemNameEnglish: yamlObject.heading[1].text});

	  console.log("poemNameUrdu: ");
	  console.log(yamlObject.heading[0].text);
	  console.log("poemNameEnglish: ");
	  console.log(yamlObject.heading[1].text);

	}

	componentDidMount() {
		window.scrollTo(0, 0)
	  // retrive the data
	 	try {

			this.setState({signinConfirmation: this.props.location.state.profileSigninConfirmation});
			this.setState({username: this.props.location.state.profileUsername});
			this.setState({password: this.props.location.state.profilePassword});

			let poemName = this.props.location.state.detailPoem;
			console.log("In poempage.js inside componentdidmount");
			this.getPoem(poemName);
		}
		catch(e) {
			console.log("Inside catch");
		}
	}

	signMeIn = () => {

	  if (this.state.username === "") {
	  	this.props.history.push({
		    pathname: '/RegisterPage',
		    state: { profileSigninConfirmation : this.state.signinConfirmation, profileUsername : this.state.username, profilePassword: this.state.password}
	  	})
	  }
	}


	render() {
		var item3 = this.state.poemTextNew.map( (item, index) =>
			<p key={item.index} onClick={() => this.onSubmit(item.id)}> {item.sherContent[0].text[0]}<br/>{item.sherContent[0].text[1]}<br/>{item.sherContent[1].text[0]}<br/>{item.sherContent[1].text[1]}</p>
		)
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
					{this.state.poemNameUrdu}
				</p>

				<p>
					{this.state.poemNameEnglish}
				</p>
			</div>

				<div class="text-center listPoemPageText">
				{item3}
				</div>
			</div>
		)
	}	// render function ends

}	// class ends
export default PoemPage
