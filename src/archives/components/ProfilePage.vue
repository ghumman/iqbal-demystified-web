<template>

<div id="ProfilePage">

	<div v-if=" splitedFirstMessage == 'done'"> 

		<circle_login>{{splitedListUsername}}</circle_login>

	</div>
	
	<div v-else>

		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>

	</div>

        <h1>My Profile</h1>


	<div class="center" ></br>{{username}}</br></br></div>

	Now you can write comments!</br>
	You can also vote to others' comments!</br>
	More profile features coming soon!</br></br>
	

	<router-link :to="{ name: 'ChangePasswordPage', query: {messageFromSigninPage:profileSigninMessage}}"><button>CHANGE PASSWORD</button></router-link>


	<button v-on:click="sign_out()">SIGN OUT</button></br></br>
<!-- 
<select id="box1" onChange="show_leader(this);">
  <option value="volvo">Volvo</option>
  <option value="saab">Saab</option>
  <option value="opel">Opel</option>
  <option value="audi">Audi</option>
</select>
-->


<!-- 
<select v-model="selected" @change="show_leader()">
  <option value="discussion">Discussion</option>
  <option value="word-meanings">Word Meanings</option>
</select>
<span>Selected: {{ selected }}</span> 
-->

	
   <table>
	<tr><th>Leaderboard</th><th> <!-- <div>
  <b-dropdown id="ddown1" text="Select Contribution Type" class="m-md-2">
    <b-dropdown-item v-on:click="show_discussion_leader()">Discussions</b-dropdown-item>
    <b-dropdown-item v-on:click="show_word_leader()">Word Meanings</b-dropdown-item>
  </b-dropdown>
</div> -->
<select v-model="selected" @change="show_leader()">
  <option value="discussion">Discussion</option>
  <option value="word-meanings">Word Meanings</option>
</select>
	</th> <!-- <th>{{dropdownText}}</th> --> </tr>
	<tr><th>Name</th> <th>Points</th></tr>
	</br></br>
	
  <tr class="columns" v-for="(leader_entry,index) in leaderBoardTextEvenDiscussion" > 
	<!-- <td v-if="selectBoard == 0">{{leaderBorardTextEvenDiscussion[index]}}</td> <td v-if="selectBoard == 0">{{leaderBoardTextOddDiscussion[index]}}</td> -->
	<td v-show="selectBoard == 0">{{leader_entry}}</td> <td v-show="selectBoard == 0">{{leaderBoardTextOddDiscussion[index]}}</td>
	<td v-show="selectBoard == 1">{{leaderBoardTextEvenWord[index]}}</td> <td v-show="selectBoard == 1">{{leaderBoardTextOddWord[index]}}</td>
  </tr>

   </table>

</div>

</template>

<script>
import Vue from 'vue'
// import BootstrapVue from 'bootstrap-vue'

// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'

// import vuex_kind_of_global from '@/store/vuex_kind_of_global'

var $ = require('jquery')
window.jQuery = $

export default {
	name: 'ProfilePage',
	// props
	/*
	props: {
   		// messageFromSigninPage: {
   		myName: {
    			type: String,
			required: true
   		}
  	},
	*/

  	created () {
    		this.scrollToTop(),
    		// this.getPoem(this.$route.query.poemId)
    		this.profileSigninMessage = this.$route.query.messageFromSigninPage;
    		this.get_username();
    		this.get_leader_board();
		// vuex_kind_of_global.commit('increment');
		// store.commit('increment');
  	},

mounted() {
  this.$root.$on('bv::dropdown::show', (bvEvent) => {
    console.log('Dropdown is about to be shown', bvEvent)
  }), 
  console.log("Inside mounted");
  console.log("Value of this.selected");
  console.log(this.selected);
},

        data () {
		return {
      			leaderBoardText: [],
      			leaderBoardTextEven: [],
      			leaderBoardTextOdd: [],
      			leaderBoardTextEvenDiscussion: [],
      			leaderBoardTextOddDiscussion: [],
      			leaderBoardTextEvenWord: [],
      			leaderBoardTextOddWord: [],
			profileSigninMessage: "",
			selectBoard: 0,
      			username: "",
			dropdownText: "Discusssions",
      			selected: "discussion",
		}
	},
	methods: {
show_leader(){
	console.log("Inside myFunction");
	console.log("Value of this.selected");
	console.log(this.selected);
	if (this.selected == "discussion"){
		console.log("going to show discussion leader");
		this.show_discussion_leader();
		
	}
		
	else if (this.selected == "word-meanings"){
		console.log("going to show word leader");
		this.show_word_leader();

	}
	
},

	   scrollToTop() {
                window.scrollTo(0,0);
           },
	sign_out(){

		this.$router.push({path: '/'});

	},

show_discussion_leader(){

this.dropdownText = "Discussions";
console.log("show discussion leader");
	this.selectBoard = 0;
        // Vue.set(this.selectBoard,0);

console.log("value of this.selectBoard");
console.log(this.selectBoard);
},
show_word_leader(){
this.dropdownText = "Word Meanings";
console.log("show word leader");
	this.selectBoard = 1;

console.log("value of this.selectBoard");
console.log(this.selectBoard);
},

    async get_leader_board() {

	console.log("Inside get_leaser_board")
	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://www.icanmakemyownapp.com/iqbal/v3/leaderboard.php',
                	type: 'GET',
                 	dataType: 'text',
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
			
      				this.leaderBoardText = data.split(",");
				console.log(this.leaderBoardText);
				this.leaderBoardText.splice(-1,1);
				console.log(this.leaderBoardText);
				for (var i = 0; i < this.leaderBoardText.length; i++) {
    					if(i % 2 === 0) { // index is even
        					this.leaderBoardTextEven.push(this.leaderBoardText[i]);
    					}
					else {
        					this.leaderBoardTextOdd.push(this.leaderBoardText[i]);
					}
				}	
				for (var i = 0; i < this.leaderBoardTextEven.length; i++) {
    					if(i < 10 ) { // index is even
        					this.leaderBoardTextEvenDiscussion.push(this.leaderBoardTextEven[i]);
        					this.leaderBoardTextOddDiscussion.push(this.leaderBoardTextOdd[i]);
    					}
					else {
        					this.leaderBoardTextEvenWord.push(this.leaderBoardTextEven[i]);
        					this.leaderBoardTextOddWord.push(this.leaderBoardTextOdd[i]);
					}
				}	
				console.log("Value of this.leaderBoardTextEvenDiscussion");
				console.log(this.leaderBoardTextEvenDiscussion);
				console.log("Value of this.leaderBoardTextOddDiscussion");
				console.log(this.leaderBoardTextOddDiscussion);
				console.log("Value of this.leaderBoardTextEvenWord");
				console.log(this.leaderBoardTextEvenWord);
				console.log("Value of this.leaderBoardTextOddWord");
				console.log(this.leaderBoardTextOddWord);
	

                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}
	}	// if username not empty ends
	else{
		alert("You are you not logged in. Please Login to give your feedback.");
	}

	console.log("messageSher sent to send sher message function");
	console.log(this.messageSher);
    },

    get_username(){
console.log ("Value of box1 option:selectedtext() ");
console.log ($("#box1 option:selected").text());
	
	try{
	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");
	

	console.log("Inside splitedList2")
	console.log(newArr[0])
	console.log(newArr[1])
	this.username = newArr[1]
	// return newArr[0];
	
	}
	catch(err){
		return "Error"
	}
    }
	
	},	// methods end
	
  computed: {
    splitedFirstMessage(){
	try{
	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");
	

	console.log("Inside splitedList2")
	console.log(newArr[0])
	console.log(newArr[1])
	// this.username = newArr[1]
	return newArr[0];
	
	}
	catch(err){
		return "Error"
	}
    },

    splitedListUsername(){

	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");
	// let firstChar = newArr[1].charAt(0);
	console.log(newArr[1].charAt(0).toUpperCase())
	return newArr[1].charAt(0).toUpperCase()
    }

  }
}

</script>

<style scoped>

.center {
  font-size: 30px;
  margin: auto;
  width: 50%;
  border: 3px solid green;
  padding: 10px;
  border-radius: 25px;
}


rectangle {
  height: 38px;
  line-height: 18px;
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


table {
  border-collapse: collapse;
  width: 100%;
text-align: center;
}

/*
th {
  height: 50px;
  // vertical-align: bottom;
  vertical-align: middle;
text-align: center;
  // background-color: #CCC;
  // colspan: 100;
}

td {
  height: 50px;
  // vertical-align: bottom;
  vertical-align: middle;
  align: left;
text-align: center;
  // background-color: #CCC;
  // colspan: 100;
}
*/
/*
td {
	column-width: 1000px;
}
*/
/*

tr{
vertical-align:top;
}
p{
width:80px;
}
*/
no_formatting {

}

.ui-helper-center {
  // width: 50%;
  width: 20%;

  border: 2px solid black;
  padding: 25px;
  margin: 25px;

  // border-style: solid;
  // border-width: thin;
// outline: thin solid
}

username_display {

  font-size: 200%;
}
</style>
