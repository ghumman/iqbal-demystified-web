import React from 'react'
import StaticContentService from './StaticContentServiceYaml'
var  YAML = require('yaml');

class ListPoemPage extends React.Component {


	  constructor(props) {
		   // let  YAML = require('yamljs');
		      super(props);
		      this.state = {
			            pictures: [],
			      	    listId: "List_001",
			      	    poemList: [],
			      	    bookName: [],
			      	    bookNameUrdu: "",
				    bookNameEnglish: "",
				    bookSections: [],
				    onePoem: "",
				    poemText: [],
				    poemObjects: []
			      	    

			          };

		  	}

	      getPoemList (listId) {

		    console.log("listId: " + listId);
	            var response = StaticContentService.getPoemList(listId);
		    console.log("response: ");
		    console.log(response);
		      /*
		      YAML.safeLoadAll(response, function (doc) {
			        console.log(doc);
		      });
		      */
		    console.log('[ true, false, maybe, null ]\n');
		    var aVarTestYaml = YAML.parse('[ true, false, maybe, null ]\n');
		    console.log(aVarTestYaml);
		    var yamlObject = YAML.parse(response.default)
		    // this.poemList = yamlObject
		    // this.setState({poemList: yamlObject.name});
		    console.log(yamlObject)
		    console.log("yamlObject.name.text[0]")
		    console.log(yamlObject.name[0].text)

		    

		    /*
		    this.state.bookName = yamlObject.name.map((item, key) =>
		    	<li key={item.text}>{item.text}</li>
		    );

		    console.log("bookName: ");
		    */

		    // var checkValueVar = yamlObject.sections.sectionName;

		    console.log("checkValueVar");
		    // console.log(checkValueVar);
		    // console.log(yamlObject.sections[1]);

		    // this.setState(poemText: yamlObject.sections[0].sectionName[0].text);
		    var checkValueVar = [];
		    /*
		    var checkValueVar = [];
		    for (var i = 0; i < this.state.bookSections.length; i++) {
		    	stationsArr.push(
			<div className="station">
				{this.data}
			</div>
			)
		    }
		    */
		    console.log("Value of yamlObject.sections.length");
		    console.log(yamlObject.sections.length);

		    console.log("Value of yamlObject.sections[0].sectionName.length");
		    console.log(yamlObject.sections[0].sectionName.length);

		    // checkValueVar[0] = yamlObject.sections[0].sectionName[0].text;
		    // checkValueVar[1] = yamlObject.sections[0].sectionName[1].text;			

		    for (var i=0; i<yamlObject.sections.length; i++) {

		    try {
		    	if (yamlObject.sections[i].sectionName[0]) {
		    		console.log(" sectionName exists" );
			    	for (var j=0; j<yamlObject.sections[i].sectionName.length; j++)
					// checkValueVar.push(yamlObject.sections[i].sectionName[j].text);
					this.state.poemText.push(yamlObject.sections[i].sectionName[j].text);
			}
		    }

		    catch(e) {
		    	if (yamlObject.sections[i].poems[0].poemName[0]) {
		    		console.log(" poems[0].poemName[0] exists" );

			    	for (var j=0; j<yamlObject.sections[i].poems.length; j++)
			    		for (var k=0; k<yamlObject.sections[i].poems[j].poemName.length; k++)
					// checkValueVar.push(yamlObject.sections[i].poems[j].poemName[k].text);
					this.state.poemText.push(yamlObject.sections[i].poems[j].poemName[k].text);
					// this.state.poemObject.push(yamlObject.sections[i].poems[j]);
					this.setState({poemObject: yamlObject.sections[i].poems[j]});
					


			}
		    }
		    }
		    console.log("Value of poemObject: ");
		    console.log(this.state.poemObject);

		    /*
		    	for (var j=0; j<yamlObject.sections.length; i++) {

			checkValueVar
		    }
		    */
		    // this.setState({poemText: checkValueVar});

		    console.log(checkValueVar);
		    console.log(yamlObject.sections[0].sectionName[0].text);

		    
		    try {
		    this.state.bookName = yamlObject.sections[0].sectionName.map((item, key) =>
		    	<li key={item.text}>{item.text}</li>
		    );

		    }
		    catch(e) {
			    console.log("caught error");
		    }
		    console.log("bookName: ");

		    // console.log(this.state.bookNameUrdu + "");
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
		    // console.log("txt: ");
		    // console.log(txt)

	      }
	  componentDidMount() {
	      // retrive the data
				let bookName = this.props.location.state.detail;
				this.getPoemList(bookName);
		    // this.getPoemList("List_001");
		      // fetch("https://api.example.com/items")
		      // fetch("http://icanmakemyownapp.com/iqbal/v3/get-list-of-lists.php", { mode: 'no-cors'})
		      // fetch("https://ghummantech.000webhostapp.com/react_test.txt", { mode: 'no-cors'})
		      // fetch('/get-list-of-lists.php')
		      // fetch('https://randomuser.me/api/?results=500')
		      // test fetch using listId: List_001
		     /*
		      fetch('/get-list.php?listId=List_001', {
		      	method: 'get',
			headers: {'Content-Type':'application/text'},
		      })
		      // fetch('https://ghummantech.000webhostapp.com/react_test.php')
		        .then(res => {
				return res.text()
			}).then((responseJson) => {
				// console.log(responseJson);
				this.setState({pictures: responseJson});
			})
			*/
		    }

			render() {
				// const { pictures, listId, poemList, bookNameUrdu, bookNameEnglish, poemName, onePoem } = this.state;
				// const items = this.state.poemName[1].poems[0].poemName.map((item, key) =>
				var items = this.state.bookSections.map((item, key) =>
					<li key={item.sectionName}>{item.sectionName}</li>
				);
				var items2 = items.map((item, key) =>
					<li key={item.text}>{item.text}</li>
				);

				var item3 = this.state.poemText.map(
					txt => <p>{txt}</p>	
				);
				/*
				var items4 = this.state.poemObject.map((item, key) =>
					<li key={item.id}>{item.id}</li>
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

				return (
					<div>
					{/*{this.state.poemName.map(station => <div> {station} </div>)} */}
					{/*{this.state.bookSections.map(home => <div>{home.name}</div>)}*/}
					{/*{this.state.bookSections.map(home => <div>{home.sectionName}</div>)}*/}
					{/*{this.state.bookSections.map(home => <div>{home.sectionName.map(home2 => <div>{home2.lang}</div>)}</div>)}*/}
					{/*{items.map(station => <div>{station.sectionName}</div>)}*/}

					{/*{this.state.poemText}*/}

					<div>
					{/*{this.state.poemText.map(txt => <p>{txt}</p>)}*/}
					{/*{this.state.poemText[0]}
					   {this.state.poemText[1]}
					   {this.state.poemText[2]}
					   */}
					{/*{item3}
						{items4}
						*/}
					</div>

					{/*{this.state.bookName[1]}

					{items2.length}
					<p>
					aVar: {aVar}
					hello world 2
					{this.props.location.state.detail}
					</p>
					*/}
					{/*{this.state.bookNameUrdu}
					{this.state.bookNameEnglish}*/}
					{/*{bookNameUrdu}
					{bookNameEnglish}
					{onePoem}
					*/}
					{/*					{poemName.map(poemName => <div>{poemName.poems.poemName[0].text}</div>)}*/}
					<div>
					{/*{poemName.map(poemName => <div>{poemName.sectionName[0]}</div>)}*/}
					{/*{items}*/}
					</div>
					{/*{this.state.poemName}*/}
					{/*{this.state.pictures}*/}
					</div>
				)
			}
}

		      // return <h1>I got following message : {this.props.location.state.detail}</h1>
export default ListPoemPage
