import React from 'react'
import StaticContentService from '../StaticContentServiceYaml'
// import Tabs from './Tabs'

// for formatting
import '../main_page/TopSectionMainPage/TopSectionMainPage.css';

import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'

// import PoemPage from './PoemPage';

var YAML = require('yaml')

var $ = require('jquery')
window.jQuery = $

class CommentsPage extends React.Component {


    constructor(props) {
        super(props);
        this.state = {
            username: "",
            password: "",
            signinConfirmation: "",

            listId: "List_001",
            sherText: [],
            wordText: [],
            poemText: [],
            sherObjects: [],
            sherGeneralDiscussionServerResponse: [],
            sherDiscussionDetail: [],
            wordDiscussionDetail: [],

            recentData: [],
            popularData: [],

            testString: "",
	    key: 'home'

        }

    }

    onSubmit = (sherNumber) => {
        this.props.history.push({
            pathname: '/SherPage',
            state: {
                detailSher: sherNumber,
                profileSigninConfirmation: this.state.signinConfirmation,
                profileUsername: this.state.username,
                profilePassword: this.state.password
            }
        })
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
                    console.log("data");
                    console.log(data);
                    this.getRecentSher(data);

                } // success function ends
            }); // ajax call ends
        } catch (err) {
            alert("inside catch err");
            alert(err);
            this.message = err;
        }

    }

    getRecentSher(sherRecentList) {
        var response = StaticContentService.getRecentSher(sherRecentList)
        let newArr = [response.sher]
        console.log("Value of newArr")
        console.log(newArr)
        console.log("newArr.sherContent[0].text")
        console.log(response.sher[0].sherContent[0].text)

        response.sher.map(el => {
            el.sherContent[0].text = el.sherContent[0].text.split('|')
            console.log(el.sherContent[0].text)
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) {}
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {}
            return el.sherContent = el.sherContent
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
            recentData: newArr[0]
        })

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
                    console.log("data");
                    console.log(data);
                    this.getPopularSher(data);

                } // success function ends
            }); // ajax call ends
        } catch (err) {
            alert("inside catch err");
            alert(err);
            this.message = err;
        }

    }

    getPopularSher(sherPopularList) {
        var response = StaticContentService.getRecentSher(sherPopularList)
        let newArrPopular = [response.sher]
        console.log("Value of newArrPopular")
        console.log(newArrPopular)
        console.log("I am at this point")

        response.sher.map(el => {
            el.sherContent[0].text = el.sherContent[0].text.split('|')
            console.log(el.sherContent[0].text)
            try {
                el.sherContent[1].text = el.sherContent[1].text.split('|')
                console.log(el.sherContent[1].text)
            } catch (err) {}
            try {
                el.sherContent[2].text = el.sherContent[2].text.split('|')
            } catch (err) {}
            return el.sherContent = el.sherContent
        })

        this.setState({
            popularData: newArrPopular[0]
        })
    }

    ////////////////////////////////////////////////////////////////////
    //	Popular Function Ends
    ///////////////////////////////////////////////////////////////////

    async getSherGeneralDiscussion(sherName) {
        try {
            $.ajax({
                url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
                type: 'POST',
                dataType: 'text',
                data: {
                    sher: sherName,
                    discussion_type: "general"
                },
                success: (data) => { // success funciton starts
                    var sherArray = sherName.split("_");

                    const yamlFile = require('!raw-loader!./../assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');

                    console.log("After calling yamlFiles");
                    console.log("Value of yamlFile");
                    console.log(yamlFile);


                    var sherIndex = sherArray[2] - 1;


                    var yamlObject = YAML.parse(yamlFile.default);

                    console.log("this is the sher text");
                    console.log(yamlObject.sher[sherIndex].sherContent[0].text);

                    var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

                    // this.sherText = sherTextTemp.split('|');
                    var sherTextLocal = sherTextTemp.split('|');
                    this.setState({
                        sherText: sherTextLocal
                    });

                    console.log("this.state.sherText");
                    console.log(this.state.sherText);

                    // this.wordText = this.state.sherText[0].split(" ").concat(this.sherText[1].split(" "));
                    // this.state.wordText = this.state.sherText[0].split(" ").concat(this.sherText[1].split(" "));

                    var wordTextLocal = this.state.sherText[0].split(" ").concat(this.state.sherText[1].split(" "));

                    // this.setState({wordText : this.state.sherText[0].split(" ").concat(this.state.sherText[1].split(" "))});

                    var ii;
                    console.log("Original array: ")
                    // for (ii=0; ii<this.wordText.length;ii++)
                    for (ii = 0; ii < wordTextLocal.length; ii++)
                        // console.log(this.wordText[ii]);
                        console.log(wordTextLocal[ii]);
                    for (ii = 0; ii < wordTextLocal.length; ii++) {
                        if (wordTextLocal[ii] == "" || wordTextLocal[ii] == " " || wordTextLocal[ii] == "،") {
                            // if (this.wordText[ii] == " "){
                            wordTextLocal.splice(ii, 1);
                            ii--;
                            console.log("inside if Value of wordTextLocal[ii]");
                            console.log(ii);
                            console.log(wordTextLocal[ii]);
                        } else {
                            console.log("inside else before replace Value of wordTextLocal[ii]");
                            console.log(ii);
                            console.log(wordTextLocal[ii]);

                            wordTextLocal[ii] = wordTextLocal[ii].replace(/[|&!;$%@"<>()+,]/g, "");
                            console.log("inside else Value of wordTextLocal[ii]");
                            console.log(ii);
                            console.log(wordTextLocal[ii]);

                        }

                    }
                    console.log("wordTextLocal.length");
                    console.log(wordTextLocal.length);
                    for (ii = 0; ii < wordTextLocal.length; ii++)
                        console.log(wordTextLocal[ii]);

                    if (wordTextLocal[6] == "")
                        console.log("Empty string");
                    else if (wordTextLocal[6] == " ")
                        console.log("Space string");
                    else {
                        console.log("Neither empty nor space: ");
                        console.log(wordTextLocal[6]);
                    }

                    // make wordTextLocal equal to this.state.wordText
                    this.setState({
                        wordText: wordTextLocal
                    });

                    var poemTextLocal = yamlObject.heading[0].text;
                    var sherGeneralDiscussionServerResponseLocal = data;

                    console.log("poemTextLocal: ");
                    console.log(poemTextLocal);

                    console.log("sherGeneralDiscussionServerResponseLocal");
                    console.log(sherGeneralDiscussionServerResponseLocal);

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
            alert("inside catch err");
            alert(err);
            this.message = err;
        }

    }


    getSherDiscussion(sherGeneralDiscussionServerResponse) {
        var response = StaticContentService.getSherDiscussion(sherGeneralDiscussionServerResponse)
        var sherDiscussionDetailLocal = JSON.parse(response)

        console.log("Value of sherDiscussionDetailLocal:")
        console.log(sherDiscussionDetailLocal)
        console.log("Value of sherDiscussionDetailLocal.length:")
        console.log(sherDiscussionDetailLocal.length)
        for (var i = 0; i < sherDiscussionDetailLocal.length; i++) {

            console.log("Value of sherDiscussionDetailLocal[i].data:")
            console.log(sherDiscussionDetailLocal[i].text)
            console.log(decodeURI(sherDiscussionDetailLocal[i].text))

            sherDiscussionDetailLocal[i].text = decodeURI(sherDiscussionDetailLocal[i].text)


            console.log("Value of sherDiscussionDetailLocal[i].data:");
            console.log(sherDiscussionDetailLocal[i].text);

        }

        this.setState({
            sherDiscussionDetail: sherDiscussionDetailLocal
        });
    }


    async getSherWordDiscussion(sherName) {
        try {
            $.ajax({
                url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
                type: 'POST',
                dataType: 'text',
                data: {
                    sher: sherName,
                    discussion_type: "word-meanings"
                },
                success: (data) => { // success funciton starts
                    var sherWordDiscussionServerResponse = data;
                    console.log("sherWordDiscussionServerResponse")
                    console.log(sherWordDiscussionServerResponse)

                    this.getWordDiscussion(sherWordDiscussionServerResponse)
                } // success function ends
            }); // ajax call ends
        } catch (err) {
            alert("inside catch err");
            alert(err);
            this.message = err;
        }

    }

    getWordDiscussion(sherWordDiscussionServerResponse) {
        var wordDiscussionDetailLocal = JSON.parse(sherWordDiscussionServerResponse)
        console.log("wordDiscussionDetailLocal");
        console.log(wordDiscussionDetailLocal);

        for (var i = 0; i < wordDiscussionDetailLocal.length; i++) {

            wordDiscussionDetailLocal[i].text = decodeURI(wordDiscussionDetailLocal[i].text);

        }
        this.setState({
            wordDiscussionDetail: wordDiscussionDetailLocal
        });

    }



    componentDidUpdate(prevProps, prevState) {

        console.log("this.state.recentData")
        console.log(this.state.recentData)
    }

    componentDidMount() {
	    window.scrollTo(0, 0)
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

            this.getSherRecentListFromServer()
            this.getSherPopularListFromServer()
            console.log("In poempage.js inside componentdidmount");

        } catch (e) {

            console.log("Inside catch");

        }
    }


    signMeIn = () => {

        if (this.state.username == "") {
            this.props.history.push({
                pathname: '/RegisterPage',
                state: {
                    profileSigninConfirmation: this.state.signinConfirmation,
                    profileUsername: this.state.username,
                    profilePassword: this.state.password
                }
            })
        }

    }

    testFunc = () => {
        this.setState({
            testString: "hello"
        })
    }

    render() {
            var itemsRecent = this.state.recentData.map((item, index) =>
                <
                span key = {
                    item.index
                }
                onClick = {
                    () => this.onSubmit(item.id)
                } > {
                    item.sherContent[0].text[0]
                } < br / > {
                    item.sherContent[0].text[1]
                } < br / > {
                    item.sherContent[1].text[0]
                } < br / > {
                    item.sherContent[1].text[1]
                } < br / > < br / > < /span>
            );

            var itemsPopular = this.state.popularData.map((item, index) =>
                <
                span key = {
                    item.index
                }
                onClick = {
                    () => this.onSubmit(item.id)
                } > {
                    item.sherContent[0].text[0]
                } < br / > {
                    item.sherContent[0].text[1]
                } < br / > {
                    item.sherContent[1].text[0]
                } < br / > {
                    item.sherContent[1].text[1]
                } < br / > < br / > < /span>
            );

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
              <div >
		<div class="text-right">
                {signinTag}
		</div>

		<div class="tabTitle">
		<Tabs
			id="controlled-tab-example"
			activeKey={this.state.key}
			onSelect={key => this.setState({ key })}
			class="nav-tabs"
		>
			<Tab eventKey="home"  title="RECENT">
                    {itemsRecent}
		    	</Tab>
			<Tab eventKey="profile"  title="POPULAR">
                    {itemsPopular}
		    	</Tab>
                  </Tabs>
	       </div>
              </div>
            )
    }
}

// return <h1>I got following message : {this.props.location.state.detail}</h1>
export default CommentsPage
