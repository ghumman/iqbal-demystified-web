////////////////////////////////////////
//	HTML
////////////////////////////////////////
<!-- <link rel="stylesheet" media="screen"  type="text/css"/> -->
<template>

<div id="TabView1" class="container">

	<div v-if=" splitedFirstMessage == 'done'"> 

		<circle_login>{{splitedListUsername}}</circle_login>

	</div>

	<!-- If you are not signed in show rectangle 
	with label sign in. and if clicked go to register page-->
	
	<div v-else>

		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>

	</div>

 	
    <!-- number of tabs and their titles--> 
    <div class="tabs">
        <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]"><tab_title>Recent</tab_title></a>
        <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]"><tab_title>Popular</tab_title></a>
    </div>


    <div class="content">
	
	<!-- contents of first tab -->
        <div v-if="activetab === 1" class="tabcontent">
	
  <!-- <div v-for="(verse,index) in poemDetail.sher" -->
  <!-- <div v-for="(verse,index) in splitedListRecent" :key="verse.id" text-align = "center"> -->

  <!-- <div v-for="(verse,index) in poemDetailRecentSplit.sher"> 
	{{verse.sherContent[0].text[0]}}</br>
  </div> -->
	
  <div v-for="(verse,index) in poemDetailRecent.sher"> 
  <!-- <div v-for="(verse,index) in poemDetailRecentSplit.sher"> -->


      <div v-if=" verse.sherContent[1] != undefined"> 

    	<!-- <tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text}}</poem_title></br> {{verse.sherContent[1].text}} </br></br></even_tab_color></td></tr> -->

	<tr ><td class="ui-helper-center" ><even_tab_color ><poem_text v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_text></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></router-link>

</even_tab_color></td></tr>

</br>
</br>

	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle(index)">{{verse.sherContent[0].text}}</br>{{verse.sherContent[0].text}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">{{verse.sherContent[1].text}}</br>{{verse.sherContent[1].text}}</br></br></div></router-link>

</even_tab_color></td></tr> -->

		
	</div>
	
	<div v-else>
	
		
    	<!-- <tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text}}</poem_title></br> "Translation Missing" </br></br></even_tab_color></td></tr> -->

     	<tr align="center"><td class="ui-helper-center"><even_tab_color><poem_text v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_text></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">"Translation is missing"</br>"Please contribute"</br></br></div></router-link>

</even_tab_color></td></tr>

</br>
</br>

	</div>

      <!-- </div> -->

  </div> 
        
        </div>	<!-- First Tab contents end-->


	<!-- contents of second tab -->
        <div v-if="activetab === 2" class="tabcontent">

  <!-- <div v-for="(verse,index) in poemDetail.sher" -->
  <div v-for="(verse,index) in poemDetailPopular.sher"> 

  <!-- <div v-for="(verse,index) in splitedListPopular" :key="verse.id" text-align = "center"> -->

      <div v-if=" verse.sherContent[1] != undefined"> 

    	<!-- <tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text}}</poem_title></br> {{verse.sherContent[1].text}} </br></br></even_tab_color></td></tr> -->

    	<tr><td class="ui-helper-center"><even_tab_color><poem_text v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_text></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></router-link>

</even_tab_color></td></tr>

</br>
</br>
		
	</div>
	
	<div v-else>
	
		
    	<!-- <tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text}}</poem_title></br> "Translation Missing" </br></br></even_tab_color></td></tr> -->

    	<tr><td class="ui-helper-center"><even_tab_color><poem_text v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_text></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">"Translation is missing"</br>"Please contribute"</br></br></div></router-link>

</even_tab_color></td></tr>

</br>
</br>

	</div>


        </div>
        </div>



    </div> <!-- content of tabs finished -->
  
</div> <!-- div id=tab finished -->


</template>

////////////////////////////////////////
//	SCRIPT
////////////////////////////////////////
<script>

var $ = require('jquery')
window.jQuery = $

// import StaticContentService from '@/services/StaticContentService'
import StaticContentService from '@/services/StaticContentServiceYaml'
import Vue from 'vue';
require('../assets/css/poem_page.css')

export default {
	// name: 'TabView1',
	// el: '#TabView1',
        data () {
		return {
			profileSigninMessage: "",
			activetab: 1,
      			sherRecentList: "",
			sherPopularList: "",
      			poemDetailRecent: [],
      			poemDetailRecentSplit: [],
      			poemDetailPopular: [],
      			poemDetailPopularSplit: [],
      			isActive: []
		}
	},
	created () {
    		this.scrollToTop(),
		// this.getListOfLists()
    		// this.profileSigninMessage = this.$route.query.messageFromSigninPage;
    		// this.profileSigninMessage = $parent.$route.query.messageFromSigninPage;
    		// this.profileSigninMessage = this.$route.query.messageFromSigninPage;


		
    		this.profileSigninMessage = this.$route.query.messageFromSigninPage,
    		// this.getRecentSher(this.$route.query.poemId),
    		// this.getRecentSher(this.oneSher),
    		// this.getRecentSher(this.sherRecentList),
    		// this.getSherListsFromServer(),
    		this.getSherRecentListFromServer(),
    		this.getSherPopularListFromServer(),
    		// this.getPopularSher(this.sherPopularList),
    		window.addEventListener('scroll', this.handleScroll)

	},
  computed: {
    splitedList(){
        let newArr = [...this.poemDetail.sher]
      newArr.map(el => {
        // return el.codes = el.codes.split('|')
        // el.sherContent[0].text = el.sherContent[0].text.split('|')
        // el.sherContent[1].text = el.sherContent[1].text.split('|')
	// return el.sherContent;
	console.log("value of el.sher")
	//console.log(el.sher.sherContent[0].text)
	return el.sher = el.sher
      })
      return newArr
    },
    splitedListRecent(){
        // let newArr = [...this.poemDetailRecent.sher.sherContent[0]]
	console.log("Inside splitedListRecent")
	console.log("Before newArr = this.poemDetailRecent.sher")
	console.log("Value of this.poemDetailRecent")
	console.log(this.poemDetailRecent)
        let newArr = [...this.poemDetailRecent.sher]
	console.log("Entering Map")
      newArr.map(el => {
        // return el.codes = el.codes.split('|')
        // el.sherContent[0].text = el.sherContent[0].text.split('|')
        // el.sherContent[1].text = el.sherContent[1].text.split('|')
	// return el.sherContent;
	// console.log("value of el.text")
	// console.log(el.text)
	// console.log("value of el.sherContent[0].text")
	// console.log(el.sherContent[0].text)

	// console.log("value of el.sherContent[0].text")
	// console.log(el.sherContent[0].text)
	
	el.sherContent[0].text = el.sherContent[0].text.split('|')
	try{
	el.sherContent[1].text = el.sherContent[1].text.split('|')
	}	
	catch(err)
	{
	}
	try{
	el.sherContent[2].text = el.sherContent[2].text.split('|')
	}	
	catch(err)
	{
	}
	return el.sherContent = el.sherContent
      })
	console.log("Exiting Map")
	console.log("Value of newArr")
	console.log(newArr)
      return newArr
    },
    
    splitedListPopular(){
        let newArr = [...this.poemDetailPopular.sher]
      	newArr.map(el => {
		el.sherContent[0].text = el.sherContent[0].text.split('|')
		try{
			el.sherContent[1].text = el.sherContent[1].text.split('|')
		}	
		catch(err){}
		try{
			el.sherContent[2].text = el.sherContent[2].text.split('|')
		}	
		catch(err){}
		return el.sherContent = el.sherContent
      	})
      	return newArr
    },

    splitedFirstMessage(){
	try{

	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");
	
        // let newArr = this.profileSigninMessage.split(":");
	

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

        // let newArr = this.profileSigninMessage.split(":");

	// let firstChar = newArr[1].charAt(0);
	console.log(newArr[1].charAt(0).toUpperCase())
	return newArr[1].charAt(0).toUpperCase()
    }
    
  },

  methods: {

      scrollToTop() {
      	window.scrollTo(0,0);
      },

      toggle: function (index) {
	/*
	if (index == 0){
        this.isOn = !this.isOn;
	}
	*/
	
	// if (index == 1){
	// var vm = this;

	console.log("this isActive index");
	console.log(this.isActive[index]);
        
	if (this.isActive[index] == true) 
        	Vue.set(this.isActive,index,false);
	else 
        	Vue.set(this.isActive,index,true);

	console.log("Value of index");
	console.log(index);
	console.log("this isActive index");
	console.log(this.isActive[index]);
	// }
	/*
	console.log("Value of index");
	console.log(index);
	console.log("this isActive index");
	console.log(this.isActive[index]);
	
        this.isActive[index] = !this.isActive[index];
        this.isOn = !this.isOn;

	console.log("this isActive index");
	console.log(this.isActive[index]);
	}
	else {

        	this.isActive[1] = !this.isActive[1];

	}
	*/
	
      },
	
    async getSherRecentListFromServer() {
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=recent',
                	type: 'GET',
                 	dataType: 'text',
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				this.sherRecentList= data;
				console.log("this.sherRecentList");
				console.log(this.sherRecentList);
				
				this.getRecentSher(this.sherRecentList);

                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}

    },

    async getSherPopularListFromServer() {
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/feed.php?type=popular',
                	type: 'GET',
                 	dataType: 'text',
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				this.sherPopularList= data;
				console.log("this.sherPopularList");
				console.log(this.sherPopularList);
				
				this.getPopularSher(this.sherPopularList);

                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}

    },

    // async getRecentSher (sherList) {
    getRecentSher (sherRecentList) {
    // getPoem (poemId) {
      // const response = await StaticContentService.getRecentSher(sherList)
      // const response = StaticContentService.getRecentSher(sherList)
      var response = StaticContentService.getRecentSher(sherRecentList)
      // const response = StaticContentService.getPoem(poemId)
      // var response = StaticContentService.getPoem(poemId)
      // var yamlObject = YAML.parse(response.data)
      // var yamlObject = YAML.parse(response)
      // this.poemDetailRecent = yamlObject
      this.poemDetailRecent = response
      // console.log(yamlObject)

        let newArr = [...this.poemDetailRecent.sher]
	console.log("Value of newArr")
	console.log(newArr)
        // let newArr = [this.poemDetailRecent.sher]
        newArr.map(el => {
	el.sherContent[0].text = el.sherContent[0].text.split('|')
	console.log(el.sherContent[0].text) 
	try{
	el.sherContent[1].text = el.sherContent[1].text.split('|')
	console.log(el.sherContent[1].text) 
	}	
	catch(err)
	{
	}
	try{
	el.sherContent[2].text = el.sherContent[2].text.split('|')
	}	
	catch(err)
	{
	}
	return el.sherContent = el.sherContent
      })
      this.poemDetailRecentSplit = newArr
	console.log("Value of this.poemDetailRecentSplit")
	console.log(this.poemDetailRecentSplit)
	console.log("Value of this.poemDetailRecent")
	console.log(this.poemDetailRecent)
    }, 

    // async getRecentSher (sherList) {
    getPopularSher (sherPopularList) {
    // getPoem (poemId) {
      // const response = await StaticContentService.getRecentSher(sherList)
      // const response = StaticContentService.getRecentSher(sherList)
      var response = StaticContentService.getRecentSher(sherPopularList)
      // const response = StaticContentService.getPoem(poemId)
      // var response = StaticContentService.getPoem(poemId)
      // var yamlObject = YAML.parse(response.data)
      // var yamlObject = YAML.parse(response)
      // this.poemDetail = yamlObject
      this.poemDetailPopular = response
      // console.log(yamlObject)

        let newArrPopular = [...this.poemDetailPopular.sher]
	console.log("Value of newArrPopular")
	console.log(newArrPopular)
	console.log("I am at this point")
        // let newArr = [this.poemDetailPopular.sher]
        newArrPopular.map(el => {
	el.sherContent[0].text = el.sherContent[0].text.split('|')
	console.log(el.sherContent[0].text) 
	try{
	el.sherContent[1].text = el.sherContent[1].text.split('|')
	console.log(el.sherContent[1].text) 
	}	
	catch(err)
	{
	}
	try{
	el.sherContent[2].text = el.sherContent[2].text.split('|')
	}	
	catch(err)
	{
	}
	return el.sherContent = el.sherContent
      })
      this.poemDetailPopularSplit = newArrPopular
	console.log("Value of this.poemDetailPopularSplit")
	console.log(this.poemDetailPopularSplit)
	console.log("Value of this.poemDetailPopular")
	console.log(this.poemDetailPopular)
    }, 

    handleScroll:function () {
	let myBanner2 = document.getElementById("sticky_header")
	
	 if(window.pageYOffset > 100){
		// myBanner2.style.position = "fixed"; 
		myBanner2.style.position = 'sticky'; 
		myBanner2.style.top = 0;
	}else{
		myBanner2.style.position = 'relative';
		myBanner2.style.top = 100;
		myBanner2.style.left = "0%";
		myBanner2.style.display = "inline-block";
	}	// else ends
     }	// handleScroll function ends
  }
}
</script>

////////////////////////////////////////
//	CSS
////////////////////////////////////////
<style scoped>

    tab_title {
	font-family: 'Jameel Noori Nastaleeq';
    	font-weight: normal;
    	font-style: normal;
    }

    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {  
    max-width: 620px; 
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
}

/* Style the tabs */
.tabs {
    overflow: hidden;
  margin-left: 20px;
    margin-bottom: -2px;
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

/* Style the tab content */
.tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1
}

/*tab pictures style*/
.tab_pictures_class {

	width: 40%;
	height: auto;
	padding:10px;

	/*width:400px;
	height:400px;
	border:20;
	padding:10px;*/

}
/*
poem_title.poem_text {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
}


poem_title.poem_heading {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: bold;
  font-style: normal;
  font-size: 250%;
}
*/

poem_text {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
}


poem_heading {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: bold;
  font-style: normal;
  font-size: 250%;
}

/* .nav {
  postion: fixed;
} */

table {
  // border: 1px solid black;
}

table {
  border-collapse: collapse;
  // width: 100%;
}

.ui-helper-center {
  // width: 50%;
  width: 20%;

  border: 2px solid black;
  padding: 25px;
  margin: 25px;
  border-radius: 25px;

  // border-style: solid;
  // border-width: thin;
// outline: thin solid


}

/*
td {
  height: 50px;
  // vertical-align: bottom;
  vertical-align: middle;
  // background-color: #CCC;
  // colspan: 100;
}
*/

tr {
  border: 1px solid #dddddd;
  padding: 8px;
}

/*td {
  background-color: #dddddd;
  width: 100%;
  // border: 1px solid #dddddd;
  // padding: 8px;
}*/




li {
    color: black;
}
even_tab_color {
  
    // background: #CCC;
    background: #FFF8DC;
    background-size: 100% 100%;
    text-align: center;
    // color: #777;
}
odd_tab_color {
    // background: #CCC;
    background: #FAEBD7;
    // background: #FFF;
    background-size: 100% 100%;
    text-align: center;
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
      padding: 10px 0px;
      text-align: center;
      // position: absolute;
      width: 100%;


          list-style-type: none;
          display: inline-block;
          padding: 10px 40px;
          text-align: center;
          border-left: 1px solid white;
          color: black;
          font-size: 18px;

}
div.a {
  text-align: center;
}

/*
.rectangle {
  line-height: 50px;
  width: 100px;
  background-color:   #ADD8E6;
  position:absolute;
  text-align: center;
  font-size: 25px;
  font-weight: bold;
  padding: 10px;
  top:0;
  right:0;
}
*/

rectangle {
  // line-height: 50px;
  // line-height: 25px;
  // line-height: 12px;
  // height: 18px;
  height: 38px;
  line-height: 18px;
  // width: 100px;
  width: 70px;
  // width: 50px;
  background-color:   #ADD8E6;
  color:   #006400;
  position:absolute;
  text-align: center;
  // font-size: 25px;
  font-size: 12px;
  font-weight: bold;
  padding: 10px;
  top:0;
  right:0;
}

/*
.circle {
  // height: 50px;
  line-height: 50px;
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
*/

circle_login {
  // height: 50px;
  // line-height: 50px;
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

sher_wrapper {
// border: 20px solid skyblue;
  border-style: solid;
  border-width: thin;
outline: thin solid

}

</style>
