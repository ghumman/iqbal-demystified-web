/////////////////////////////////////////////////////////////////
//	HTML
/////////////////////////////////////////////////////////////////

<template>
  <div>

	<div v-if=" splitedFirstMessage == 'done'"> 
		<circle_login>{{splitedListUsername}}</circle_login>
	</div>
	<div v-else>
		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>
	</div>

  <body class="fixed-nav sticky-footer" id="page-top">

  <!-- <div class="new_nav_tag" id="new_nav_tag">HELLO </div> -->

  <!-- display title of book -->
  <!-- also this header will be sticky -->

  <div class="sticky_header" id="sticky_header">
  	<!-- <div v-for="name in poemList.name">  -->
  		<!-- <tab_title class = "b">{{name.text}}</tab_title> -->
  		<tab_title class = "b">Search Results</tab_title>
  	<!-- </div> -->
  </div>

  <div class="rest_of_page" id="rest_of_page">

<!-- <fixed-header :fixed.sync="isFixed">
<div :class="{ 'is-fixed': isFixed }"> hello </div>
</fixed-header> -->

<!-- <router-link :to="'ExampleSimplePage'">Go to Example Sample Page</router-link> -->


<table>
  <!-- <div v-for="(section,index) in poemList.sections"> -->
  <!-- <div v-for="(section,index) in poemList"> -->
  <!-- <div v-for="(poem,index) in poemList"> -->
  <div v-for="(poem,index) in poemList.poems"> 

    <!-- <div v-if="section.sectionName">
    <b><tr><th> <tab_title class="a">{{ section.sectionName[0].text }}</tab_title> </br>( {{ section.sectionName[1].text }} )</br></br></th></tr></b>
    </div> -->
    

    <!-- <div v-for="(poem,index) in section.poems"> -->

      <div v-if=" index % 2 == 0">
      <router-link :to="{ path: 'PoemPage', query: { poemId: poem.id , messageFromSigninPage:profileSigninMessage}}"><tr><td><even_tab_color><tab_title class="a">{{ poem.poemName[0].text }}</tab_title> </br>( {{ poem.poemName[1].text }} )</br></br> </even_tab_color></td></tr></router-link>
      </div>

      <div v-else>
	<router-link :to="{ path: 'PoemPage', query: { poemId: poem.id , messageFromSigninPage:profileSigninMessage}}"><tr><td><odd_tab_color><tab_title class="a">{{ poem.poemName[0].text }}</tab_title> </br>( {{ poem.poemName[1].text }} )</br></br> </odd_tab_color></td></tr></router-link>
      </div>
    <!-- </div> -->

  </div>

</table> <!-- table ends-->

</div>	<!-- div for rest of page ends-->

  </body>
</div>
</template>

/////////////////////////////////////////////////////////////////
//	Javascript
/////////////////////////////////////////////////////////////////

<script>

// var $ = require('jquery')
// window.jQuery = $

// var yaml = require('js-yaml');
// var fs   = require('fs');
import fs from 'fs';
import path from 'path';
// import helloText from './hello.txt';


// import FixedHeader from 'vue-fixed-header'
import StaticContentService from '@/services/StaticContentServiceYaml'
// import StaticContentService from '@/services/StaticContentServiceLocal'
require('../assets/css/poem_page.css')

export default {
  components: {
    // FixedHeader
  },

  data () {
    return {
      profileSigninMessage: "",
      isFixed: true,
      poemList: []
    }
  },
  computed: {
    splitedFirstMessage(){
	try{
	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");
	
	console.log("Inside splitedList2")
	console.log(newArr[0])
	console.log(newArr[1])
	return newArr[0];
	}
	catch(err){
		return "Error"
	}
    },

    splitedListUsername(){

	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");

	console.log(newArr[1].charAt(0).toUpperCase())
	return newArr[1].charAt(0).toUpperCase()
    }
    
  },
  created () {
    this.scrollToTop(),
    this.getPoemListSearch(this.$route.query.listId),
    window.addEventListener('scroll', this.handleScroll),
    this.profileSigninMessage = this.$route.query.messageFromSigninPage
    // this.profileSigninMessage = $parent.$route.query.messageFromSigninPage;
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
      scrollToTop() {
      	window.scrollTo(0,0);
      },
    // async getPoemList (listId) {
    getPoemListSearch (listId) {

      var response = StaticContentService.getPoemListSearch(listId);
      // const response = await StaticContentService.getPoemList(listId);
      // const response = await StaticContentService.getPoemList(listId);
      // alert("I'm back");
      // console.log("Value of response inside ListPoem.vue");
      // console.log(response);
      // console.log("Value of yamlFile inside ListPoem.vue");
      // console.log(yamlFile);
      // if (yamlFile == response)
      //   console.log ("yamlFile == response");
      // else
      //   console.log ("yamlFile != response");

      // console.log("Value of response: " + response)

      // var yamlObject = YAML.parse(response.data)
      // var yamlObject = YAML.parse(yamlFile)
      // var yamlObject = YAML.parse(response)
      console.log("Reseponse");	
      console.log(response);	
      this.poemList = response;
      console.log("Value of urdu text: ");
      // console.log(this.poemList.poems[0].poemName[0].text);
      console.log(this.poemList);
      
      // console.log(yamlObject)

//////////////////////////////
// using vue reader
//////////////////////////////

/*
      const file = "hello.txt";
      const reader = new FileReader();

      reader.onload = e => this.$emit("load", e.target.result);
      console.log(reader.readAsText(file));
*/

/*
	var reader = new FileReader();
	// var fileToRead = document.querySelector('input').files[0];
	var fileToRead = "/hello.txt";

	// attach event, that will be fired, when read is end
	reader.addEventListener("loadend", function() {
   	// reader.result contains the contents of blob as a typed array
   	// we insert content of file in DOM here
   	// document.getElementById('file').innerText = reader.result;
   	console.log(reader.result);
	});

// start reading a loaded file
reader.readAsText(fileToRead);

*/
//////////////////
// Try fetch
//////////////////

/*
// fetch('hello.txt')
fetch("/hello.txt")
.then (function(data, name) {
	console.log("Value of data: " + JSON.stringify(data));	
	console.log("Value of data, name: " + JSON.stringify(name));	
})
.catch(function(error) {
	console.log("Value of error: " + error);	
});


*/

/*
fetch("/hello.txt")
.then (function(response) {
	console.log("Value of response: " + response.text);	

	// console.log("Value of data: " + JSON.stringify(data));	
	// console.log("Value of data, name: " + JSON.stringify(name));	
})
.catch(function(error) {
	console.log("Value of error: " + error);	
});

*/

/////////////////////////////
// Following worked at apache
/////////////////////////////

/*

// var myRequest = new Request("hello.txt");
// var myRequest = new Request("@components/hello.txt");
// var myRequest = new Request("src/components/hello.txt");
var myRequest = new Request("hello.txt");
      fetch(myRequest)
      .then(function(response) {
        if (!response.ok) {
          throw new Error("HTTP error, status = " + response.status);
        }
        return response.text();
      })
      .then(function(text) {
        // myArticle.innerHTML = text;
        alert(text);
        console.log("Value of text: " + text);
      })
      .catch(function(error) {
        // myArticle.innerHTML = '';
        // myArticle.appendChild(
        // document.createTextNode('Error: ' + error.message)
        // );
        console.log("Value of error: " + error);
      });

*/

/*

$.get('/src/components/hello.txt',{},function(content){
      let lines=content.split('\n');

       console.log(`"hello.txt" contains ${lines.length} lines`)
      console.log(`First line : ${lines[0]}`)

});

*/


/*
fs.readFile('/hello.txt', function(err, buf) {
  console.log(buf.toString());
});
*/

// console.log({ helloText });


/*

let fileContents = fs.readFileSync(path.join(__static, '/hello.txt'), 'utf8');

console.log(fileContents);

*/




/*
// Get document, or throw exception on error
try {
  var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  // var doc = yaml.safeLoad(fs.readFileSync('/home/ghumman/programming/heroku_cli/router-project/src/services/List_Editor_Pick.yaml', 'utf8'));
  // alert(doc);
  console.log(doc);
} catch (e) {
  console.log(e);
}
*/



      // const response = await StaticContentService.getPoemList(listId)


	////////////////////////////////////////////////////////
	//	Instead of getting yaml data file from another server,
	// 	trying to get it from local folder
	////////////////////////////////////////////////////////
	
/*

	var xmlhttp = new XMLHttpRequest();

	xmlhttp.onreadystatechange = function() {
  		// if (this.readyState == 4 && this.status == 200) {
  		if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
    			// myObj = JSON.parse(this.responseText);
    			// myObj = this.responseText;
    			// const response = this.responseText;
    			// const response = xmlhttp.responseText;
    			// document.getElementById("demo").innerHTML = myObj;
      			console.log("Value of response: " + xmlhttp.response);
      			// alert("Value of response: " + this.responseText);
      			alert("Value of response: " + xmlhttp.responseText);

      			// var yamlObject = YAML.parse(response.data)
      			// this.poemList = yamlObject
      			// parent.poemList = yamlObject
      			// console.log(yamlObject)
  		}
	};
	// xmlhttp.open("GET", "demo_file.php", true);
	// xmlhttp.open("GET", "test.php", true);
	// xmlhttp.open("GET", "./../assets/lists/List_001.yaml", true);
	// xmlhttp.open("GET", "../assets/lists/List_001.yaml", true);
	// xmlhttp.open("GET", "List_001.yaml", true);
	// xmlhttp.open("GET", "test.php", true);
	xmlhttp.open("GET", "/hello.txt", true);
	// xmlhttp.open("GET", "assets/poems/001/001_001.yaml", true);
	xmlhttp.send();
*/

///////////////////////////////
// Simple XMLHttpRequest
///////////////////////////////


/*

function reqListener () {
  console.log(this.responseText);
}
var oReq = new XMLHttpRequest();
oReq.addEventListener("load", reqListener);
oReq.open("GET", "http://www.example.org/example.txt");
// oReq.open("GET", "@components/hello.txt");
// oReq.open("GET", "hello.txt");
oReq.send();

*/

/*

function doGET(path, callback) {
    return new Promise(function(resolve, reject) {
        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                // The request is done; did it work?
                if (xhr.status == 200) {
                    // Yes, use `xhr.responseText` to resolve the promise
                    resolve(xhr.responseText);
                } else {
                    // No, reject the promise
                    reject(xhr);
                }
             }
        };
        xhr.open("GET", path);
        xhr.send();
    });
}

// Do the request
// doGET("/path/to/file")
doGET("hello.txt")
    .then(function(fileData) {
	alert(fileData);
        // Use the file data
    })
    .catch(function(xhr) {
        // The call failed, look at `xhr` for details
    });

*/


///////////////
// Try Ajax
///////////////

/*

$.ajax({
  type: 'GET',
  // url: '../code/GetItemsInDD.class.php?id=" + mID + "&method=" + method',
  // url: 'test.php',
  url: 'hello.txt',
  dataType: 'data',
  // url: 'file:///home/ghumman/programming/heroku_cli/router-project/src/components/test.php',
  // url: 'test.php',
  success: function (data) {
     // document.getElementById("ddItems").innerHTML = data; 
     alert(data); 
  },
  error: function (error) {
        alert("Error: " + error);
  }
});
*/



//////////////////////////////
//	Original code starts
//	from here
//////////////////////////////
/*
      console.log("Value of response: " + response)

      var yamlObject = YAML.parse(response.data)
      this.poemList = yamlObject
      console.log(yamlObject)
*/
    },

    
    handleScroll:function () {
        // alert('I can not control scroll function')
	// let myBanner =  document.getElementById("myHeader").text
	// let myBanner =  document.getElementById("myHeader")
        // alert(myBanner.innerText)
	let myBanner2 = document.getElementById("sticky_header")
	let restOfPage = document.getElementById("rest_of_page")
	// myBanner2.innerHTML = myBanner.innerText
	
	 if(window.pageYOffset > 150){
        	// alert(myBanner.innerText)
		myBanner2.style.position = 'sticky'; 
		// restOfPage.style.position = 'relative'; 
		myBanner2.style.top = 0;
		// myBanner2.style.right = "50%";
	}else{
		myBanner2.style.position = 'relative';
		myBanner2.style.top = 100;
		myBanner2.style.left = "0%";
		myBanner2.style.display = "inline-block";
	}	// else ends
     }	// handleScroll function ends
  }	// methods end
}	// export default ends
</script>

///////////////////////////////////////////////////////////////////
//	CSS
///////////////////////////////////////////////////////////////////
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

tab_title.a {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
}


tab_title.b {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: bold;
  font-style: normal;
  font-size: 250%;
}

/* .nav {
  postion: fixed;
} */

table {
  border: 1px solid black;
}

table {
  border-collapse: collapse;
  width: 100%;
}

td {
  height: 50px;
  vertical-align: bottom;
  // background-color: #CCC;
  // colspan: 100;
}

/*td {
  background-color: #dddddd;
  width: 100%;
  // border: 1px solid #dddddd;
  // padding: 8px;
}*/

/*td:nth-child(even) {background: #CCC}
td:nth-child(odd) {background: #FFF}

th:nth-child(even) {background: #CCC}
th:nth-child(odd) {background: #FFF}

tr:nth-child(even) {background: #CCC}
tr:nth-child(odd) {background: #FFF}*/


/*tr:nth-child(even) {
  background-color: white;
  width: 50%;
}*/

li {
    color: black;
}
even_tab_color {
  
    // background: #CCC;
    background: #FFF8DC;
    background-size: 100% 100%;
    // color: #777;
}
odd_tab_color {
    // background: #CCC;
    background: #FAEBD7;
    // background: #FFF;
    background-size: 100% 100%;
    // color: blue;
}

/* .new_nav_tag{
	// align: center;	
	// text-align: center;
	top: 0;
	left: 0%;
	position: fixed; 
} */

.sticky_header {
  /*padding: 10px 16px;
  background: #555;
  color: #f1f1f1;*/


      background: purple;
      // padding: 10px 0px;
      text-align: center;
      // position: absolute;
      width: 100%;


          list-style-type: none;
          display: inline-block;
          padding: 10px 40px;
          // padding: 5px 20px;
          text-align: center;
          border-left: 1px solid white;
          color: black;
          // font-size: 10px;
          // font-size: 18px;

}

rectangle {
  height: 38px;
  line-height: 18px;
  // width: 100px;
  //width: 50px;
  width: 70px;
  background-color:   #ADD8E6;
  color:   #006400;
  position:absolute;
  text-align: center;
  font-size: 12px;
  font-weight: bold;
  padding: 10px;
  top:0;
  right:0;
}

circle_login {
  color:   #000000;
  line-height: 25px;
  width: 50px;
  background-color: #FF0000;
  border-radius: 50%;
  position:absolute;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 10px;
  top:0;
  right:0;
}

</style>
