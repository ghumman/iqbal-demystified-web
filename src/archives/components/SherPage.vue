<template>
  <!-- <body class="poem_page" id="poem_page"> -->

  <div>

	<div v-if=" splitedFirstMessage == 'done'"> 

		<!-- <div class="circle">{{splitedListUsername}}</div> -->
		<circle_login>{{splitedListUsername}}</circle_login>

	</div>

	<!-- If you are not signed in show rectangle 
	with label sign in. and if clicked go to register page-->
	
	<div v-else>

		<!-- <router-link :to="{ path: 'RegisterPage'}"><div class="rectangle">SIGN IN</div></router-link> -->

		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>

	</div>

  <!-- <body class="fixed-nav sticky-footer" id="page-top"> -->

<!-- <div>Poem Title: {{poemText}}</br></br></div > -->
<!-- <ui-helper-center><poem_text>{{poemText}}</br></br></poem_text></ui-helper-center> -->
<!-- <ui-helper-center><div><poem_text>{{poemText}}</br></br></poem_text></div></ui-helper-center> -->
<poem_text class="ui-helper-center">{{poemText}}</poem_text>

</br></br>

<!-- Two TABs -->

    <!-- number of tabs and their titles--> 
    <div class="tabs">
        <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]"><tab_title>DISCUSSION</tab_title></a>
        <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]"><tab_title>WORD MEANINGS</tab_title></a>
    </div>


    <div class="content">
	
	<!-- contents of first tab -->
        <div v-if="activetab === 1" class="tabcontent">

		<!-- <div>Sher Title: </br>{{sherText[0]}}</br>{{sherText[1]}}</br></br></div > -->
		<!-- <ui-helper-center><poem_text></br>{{sherText[0]}}</br>{{sherText[1]}}</br></br></poem_text></ui-helper-center> -->
		<poem_text class="ui-helper-center"></br>{{sherText[0]}}</br>{{sherText[1]}}</br></br></poem_text>
</br></br>



            <p v-for="(item, idx) in sherDiscussionDetail">
		    <comments_wrap class="ui-helper-comments">
<p style="text-align:left;">{{ item.username }}<span style="float:right;">{{ item.timestamp }}</span></p>
		    </br>
                    {{ item.text }}</br>
		<!-- <button type="button" onclick="alert('Hello world!')">Like!</button> -->
		<button type="button" v-on:click="vote_like(item.id, idx)">Like!</button>
		    &emsp;SCORE: {{item.score}}&emsp;
		<button type="button" v-on:click="vote_dislike(item.id, idx)">Dislike!</button></br>
		<div v-show="isActive[idx]"> Unregister your vote first to like or dislike again.   <button type="button" v-on:click="vote_unregister(item.id, idx)">Unregister</button></div> 
		     </comments_wrap></br></br>
            </p>

<!-- 
<p v-for="item in sherDiscussionDetail">
	<p>
		username: {{item.username}}</br>
		timestamp: {{item.timestamp}}</br>
		text: {{item.text}}</br> 
		1
	</p>

</p> 
-->
<!-- <input v-model="messageSher" placeholder="Comments"></br></br> -->
<textarea v-model="messageSher" placeholder="Comments" rows="5" cols="100"></textarea></br></br>
<!-- <p>Message is: {{ messageSher }}</p> -->
<button v-on:click="send_sher_message()">SUBMIT</button>
        
        </div>	<!-- First Tab contents end-->


	<!-- contents of second tab -->
        <div v-if="activetab === 2" class="tabcontent">

            <!-- <div v-for="(word,index) in wordText"> -->
            <!-- <span v-for="(word,index) in wordText"> -->
            <span v-for="(word,index) in wordText.slice().reverse()"> 
		
		<!-- <p v-on:click="toggleWord(index,{{wordText.length}})">
		{{word}}
		</p> -->

		<poem_text_word class = "ui-helper-center-word" v-on:click="toggleWord(index, wordText.length)"> 
		{{word}}&nbsp;
		</poem_text_word> 

	    </span> 
	    <!-- </div> -->

			</br></br>
		<poem_text class="ui-helper-center">Word Selected: {{wordText[activeWordValue - 1]}}</poem_text></br></br>
	    


            <div v-for="(item, idx) in wordDiscussionDetail"> 
            <!-- <div v-for="(item, idx) in wordDiscussionDetail"> -->
		<div v-if="item.wordposition == activeWordValue">
			
		    <comments_wrap class="ui-helper-comments">
<p style="text-align:left;">{{ item.username }}<span style="float:right;">{{ item.timestamp }}</span></p>
		    </br>
                    {{ item.text }}</br>

		<button type="button" v-on:click="vote_like_word(item.id, idx)">Like!</button>
		    &emsp;SCORE: {{item.score}}&emsp;
		<button type="button" v-on:click="vote_dislike_word(item.id, idx)">Dislike!</button></br>
		<div v-show="isActiveWord[idx]"> Unregister your vote first to like or dislike again.   <button type="button" v-on:click="vote_unregister_word(item.id, idx)">Unregister</button></div> 


		<!-- <button type="button" onclick="alert('Hello world!')">Like!</button>
		    &emsp;SCORE: {{item.score}}&emsp;
		<button type="button" onclick="alert('Hello world!')">Dislike!</button></br> -->
		     </comments_wrap></br></br>

                    <!-- {{ item.username }}</br>
                    {{ item.timestamp }}</br>
                    {{ item.wordposition }}</br>
                    {{ item.text }}</br></br></br> -->

		</div> 
            </div>
		

<!-- <input v-model="messageWord" placeholder="edit me"> -->
<textarea v-model="messageWord" placeholder="Comments" rows="5" cols="100"></textarea></br></br>
<!-- <p>Message is: {{ messageWord }}</p> -->
	<button v-on:click="send_word_message()">SUBMIT</button>
        
        </div>



    </div> <!-- content of tabs finished -->

  <!-- </body> -->

</div>

</template>

<script>
// import StaticContentService from '@/services/StaticContentService'
import StaticContentService from '@/services/StaticContentServiceYaml'
import Vue from 'vue';

var $ = require('jquery')
window.jQuery = $

require('../assets/css/poem_page.css')

export default {
  data () {
    return {
      sherText: [],
      wordText: [],
      poemText: "",
      activetab: 1,
      profileSigninMessage: "",
      sherDiscussionDetail: "",
      wordDiscussionDetail: "",
      messageSher: "",
      messageWord: "",
      // isOpen: [],
      isOn: false,
      isActive: [],
      isActiveWord: [],
      activeWordValue: 1,

      username: "",
      password: "",

      sherGeneralDiscussionServerResponse: "",
      sherWordDiscussionServerResponse: ""
   

    }
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
    splitedList2(){
        // let newArr = [...this.poemDetail.sher.sherContent[0]]
        let newArr = [...this.poemDetail.sher]
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
	console.log(newArr[2])

	this.username = newArr[1]
	this.password = newArr[2]

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
  created () {
    this.scrollToTop(),
    this.profileSigninMessage = this.$route.query.messageFromSigninPage,
    this.getSherWordDiscussion(),
    this.getSherGeneralDiscussion(),
    // this.getSherDiscussion(this.$route.query.sherId),
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  props: ['item'],
  methods: {

      scrollToTop() {
      	window.scrollTo(0,0);
      },

    vote_unregister_word(comment_general_id, idx) {

	console.log("Value of idx");
	console.log(idx);

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	console.log("Value of this.username");
	console.log(this.username);

	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.username, password: this.password, is_like:0, is_cancel:1},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					this.toggle_word(idx);
					this.getSherWordDiscussion();	
				}
				else if (data == "invalid is_cancel value") {
					alert("Invalid is_cancel Value");
				}
	

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

    vote_dislike_word(comment_general_id, idx){

	console.log("Value of idx");
	console.log(idx);

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	console.log("Value of this.username");
	console.log(this.username);

	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.username, password: this.password, is_like:0, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherWordDiscussion();	
				else if (data == "vote already registered"){
					// alert("Vote is already registerd. ");
					this.toggle_word(idx);
					

				}
	

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

    vote_like_word(comment_general_id, idx) {

	console.log("Value of idx");
	console.log(idx);

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	console.log("Value of this.username");
	console.log(this.username);

	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "word-meanings", comment_id:comment_general_id, username: this.username, password: this.password, is_like:1, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherWordDiscussion();	
				else if (data == "vote already registered") {
					// alert("Vote is already registerd. ");
					this.toggle_word(idx);
				}
	

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

    vote_unregister(comment_general_id, idx) {

	console.log("Value of idx");
	console.log(idx);

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	console.log("Value of this.username");
	console.log(this.username);

	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.username, password: this.password, is_like:0, is_cancel:1},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote removed"){
					this.toggle(idx);
					this.getSherGeneralDiscussion();	
				}
				else if (data == "invalid is_cancel value") {
					alert("Invalid is_cancel Value");
				}
	

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

    vote_dislike(comment_general_id, idx){

	console.log("Value of idx");
	console.log(idx);

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	console.log("Value of this.username");
	console.log(this.username);

	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.username, password: this.password, is_like:0, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherGeneralDiscussion();	
				else if (data == "vote already registered"){
					// alert("Vote is already registerd. ");
					this.toggle(idx);
					

				}
	

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

    vote_like(comment_general_id, idx) {

	console.log("Value of idx");
	console.log(idx);

	console.log("Value of comment_general_id");
	console.log(comment_general_id);

	console.log("Value of this.username");
	console.log(this.username);

	if (this.username != ""){
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/vote.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "general", comment_id:comment_general_id, username: this.username, password: this.password, is_like:1, is_cancel:0},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				if (data == "vote registered")
					this.getSherGeneralDiscussion();	
				else if (data == "vote already registered") {
					// alert("Vote is already registerd. ");
					this.toggle(idx);
				}
	

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

    async getSherGeneralDiscussion() {
	this.activetab = 1;
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "general"},
                 	success: (data) => {	// success funciton starts
				// console.log("data");
				// console.log(data);
	
				var sherArray = this.$route.query.sherId.split("_");

				// console.log("Before calling yamlFiles");
        			const yamlFile = require('raw-loader!./../assets/poems/' + sherArray[0] + '/' + sherArray[0] + '_' + sherArray[1] + '.yaml');

				// console.log("After calling yamlFiles");


				var sherIndex = sherArray[2] - 1;

				// console.log("Value of yamlFile");

				// console.log(yamlFile);

				var yamlObject = YAML.parse(yamlFile);
				
				// console.log("this is the sher text");

				// console.log(yamlObject.sher[sherIndex].sherContent[0].text);
				
				var sherTextTemp = yamlObject.sher[sherIndex].sherContent[0].text;

				this.sherText = sherTextTemp.split('|')

				this.wordText = this.sherText[0].split(" ").concat(this.sherText[1].split(" "))
				var ii;
				console.log("Original array: ")
				for (ii=0; ii<this.wordText.length;ii++		)
					console.log(this.wordText[ii]);
				for (ii=0; ii<this.wordText.length; ii++){
				
					if (this.wordText[ii] == "" || this.wordText[ii] == " " || this.wordText[ii] == "،"){
					// if (this.wordText[ii] == " "){
						this.wordText.splice(ii,1);	
						ii--;
				console.log("inside if Value of wordText[ii]");
				console.log(ii);
				console.log(this.wordText[ii]);
					}
					else {
				console.log("inside else before replace Value of wordText[ii]");
				console.log(ii);
				console.log(this.wordText[ii]);
						this.wordText[ii] = this.wordText[ii].replace(/[|&!;$%@"<>()+,]/g, "");
				console.log("inside else Value of wordText[ii]");
				console.log(ii);
				console.log(this.wordText[ii]);

					}

				}
				console.log("this.wordText.length");
				console.log(this.wordText.length);
				for (ii=0; ii<this.wordText.length;ii++		)
					console.log(this.wordText[ii]);

				if (this.wordText[6] == "")
					console.log("Empty string");
				else if (this.wordText[6] == " ")
					console.log("Space string");
				else {
					console.log("Neither empty nor space: ");
					console.log(this.wordText[6]);
				}

				// this.sherText = yamlObject.sher[sherIndex].sherContent[0].text;
				this.poemText = yamlObject.heading[0].text;

				this.sherGeneralDiscussionServerResponse = data;
				// console.log("this.sherGeneralDiscussionServerResponse");
				// console.log(this.sherGeneralDiscussionServerResponse);
				
				this.getSherDiscussion(this.sherGeneralDiscussionServerResponse);

                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}

    },

    async getSherWordDiscussion() {
	this.activetab = 2;
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/get-discussion.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "word-meanings"},
                 	success: (data) => {	// success funciton starts
				// console.log("data");
				// console.log(data);
				this.sherWordDiscussionServerResponse = data;
				// console.log("this.sherWordDiscussionServerResponse");
				// console.log(this.sherWordDiscussionServerResponse);
				
				this.getWordDiscussion(this.sherWordDiscussionServerResponse);

                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}

    },
      toggleWord: function (index, total_number_of_words) {
	// var value = index;
	
        // Vue.set(this.activeWordValue,value);

	console.log("Value of index");
	console.log(index);

	console.log("Value of total_number_of_words");
	console.log(total_number_of_words);

	this.activeWordValue = total_number_of_words - index;

	console.log("Value of this.activeWordValue");
	console.log(this.activeWordValue);
      },
      toggle: function (index) {
	/*
	if (index == 0){
        this.isOn = !this.isOn;
	}
	*/
	
	// if (index == 1){
	// var vm = this;

	console.log("Value of index");
	console.log(index);

	console.log("this isActive index");
	console.log(this.isActive[index]);
        
	if (this.isActive[index] == true) 
        	Vue.set(this.isActive,index,false);
	else 
        	Vue.set(this.isActive,index,true);

	// console.log("Value of index");
	// console.log(index);
	// console.log("this isActive index");
	// console.log(this.isActive[index]);
	// }
	/*
	// console.log("Value of index");
	// console.log(index);
	// console.log("this isActive index");
	// console.log(this.isActive[index]);
	
        this.isActive[index] = !this.isActive[index];
        this.isOn = !this.isOn;

	// console.log("this isActive index");
	// console.log(this.isActive[index]);
	}
	else {

        	this.isActive[1] = !this.isActive[1];

	}
	*/
	
      },

      toggle_word: function (index) {
	/*
	if (index == 0){
        this.isOn = !this.isOn;
	}
	*/
	
	// if (index == 1){
	// var vm = this;

	console.log("Value of index");
	console.log(index);

	console.log("this isActiveWord index");
	console.log(this.isActiveWord[index]);
        
	if (this.isActiveWord[index] == true) 
        	Vue.set(this.isActiveWord,index,false);
	else 
        	Vue.set(this.isActiveWord,index,true);

	// console.log("Value of index");
	// console.log(index);
	// console.log("this isActiveWord index");
	// console.log(this.isActiveWord[index]);
	// }
	
      },

// send_sher_message(messageSher){
async send_sher_message(){
	console.log("Inside send_sher_message");
	console.log("Value of this.username");
	console.log(this.username);
	console.log("Value of this.password");
	console.log(this.password);
	// do not try pushing comment if message is empty
	if (this.messageSher.trim() != ""){
	
	// if user is not signed in, ask user to sign in
	if ((this.username.trim() != "") && (this.password.trim() != "")) {
	
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "general", username: this.username, password: this.password, comment_text: this.messageSher},
                 	success: (data) => {	// success funciton starts
				console.log("data");
				console.log(data);
				this.getSherGeneralDiscussion();	
	

                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}
	

	console.log("messageSher sent to send sher message function");
	console.log(this.messageSher);
	}	// if not logged in empty
	else{

		alert("Please login first to add comments.");
	}
	}	// if message is empty ends
	
	else {
		alert("Comments can not be empty");
	}
},

// send_word_message(messageWord){
async send_word_message(){
	console.log("messageWord sent to send word message function");
	console.log(this.messageWord);
	console.log("Inside send_word_message");
	console.log("Value of this.username");
	console.log(this.username);
	console.log("Value of this.password");
	console.log(this.password);
	// do not try pushing comment if message is empty
	if (this.messageWord.trim() != ""){
	
	// if user is not signed in, ask user to sign in
	if ((this.username.trim() != "") && (this.password.trim() != "")) {
	
	try{
		// var element = this;
		$.ajax({
			url: 'https://icanmakemyownapp.com/iqbal/v3/post-comment.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {sher: this.$route.query.sherId, discussion_type: "word-meanings", username: this.username, password: this.password, comment_text: this.messageWord, word_position: this.activeWordValue},
                 	success: (data) => {	// success funciton starts

				console.log("data");
				console.log(data);
				this.getSherWordDiscussion();
	
                 	}	// success function ends
		});	// ajax call ends
	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}

	console.log("messageSher sent to send sher message function");
	console.log(this.messageSher);

	}	// if not logged in empty
	else{

		alert("Please login first to add comments.");
	}
	}	// if message is empty ends
	
	else {
		alert("Comments can not be empty");
	}

},
   show_english_translation(index){
	var x = document.getElementById("index");
	console.log("Value of x");
	console.log(x);
	
	// var x = document.getElementById("index");

	// console.log(this.$refs.englishDivision);
	console.log("Value of index");
	console.log(index);
/*

  	if (x.style.display === "none") {
    		x.style.display = "block";
  	} else {
    		x.style.display = "none";
  	}
*/
   },

 // async getPoem (poemId) {
    getPoem (poemId) {
      // const response = await StaticContentService.getPoem(poemId)
      // const response = StaticContentService.getPoem(poemId)
      var response = StaticContentService.getPoem(poemId)
      // var yamlObject = YAML.parse(response.data)
      var yamlObject = YAML.parse(response)
      this.poemDetail = yamlObject
      console.log(yamlObject)	
      // this.isActive[0] = false
      // this.isActive[1] = false
      // this.isActive[2] = false
	// var i;
	// for (i=0; i<30;i++)
	//	this.isActive[i] = false
      this.isActive[0] = true;
	
    }, 

    getSherDiscussion(sherGeneralDiscussionServerResponse) {
      var response = StaticContentService.getSherDiscussion(sherGeneralDiscussionServerResponse)
      // var yamlObject = YAML.parse(response)
      // this.sherDiscussionDetail = yamlObject
      // console.log(yamlObject)	

      this.sherDiscussionDetail = JSON.parse(response)
      console.log("Value of this.sherDiscussionDetail:")
      console.log(this.sherDiscussionDetail)
      console.log("Value of this.sherDiscussionDetail.length:")
      console.log(this.sherDiscussionDetail.length)
      for (var i=0; i<this.sherDiscussionDetail.length; i++){

      console.log("Value of this.sherDiscussionDetail[i].data:")
      console.log(this.sherDiscussionDetail[i].text)
      
	
      console.log(decodeURI(this.sherDiscussionDetail[i].text))
      
      this.sherDiscussionDetail[i].text = decodeURI(this.sherDiscussionDetail[i].text)

      console.log("Value of this.sherDiscussionDetail[i].data:")
      console.log(this.sherDiscussionDetail[i].text)

	}
      // console.log("Value of this.sherDiscusssionDetail")	
      // console.log(this.sherDiscussionDetail)	
    },

    getWordDiscussion(sherWordDiscussionServerResponse) {
      // var response = StaticContentService.getSherDiscussion(sherGeneralDiscussionServerResponse)
      // var yamlObject = YAML.parse(response)
      // this.sherDiscussionDetail = yamlObject
      // console.log(yamlObject)	

      // this.sherDiscussionDetail = JSON.parse(response)

      this.wordDiscussionDetail = JSON.parse(sherWordDiscussionServerResponse)
      // console.log("Value of this.sherDiscusssionDetail")	
      // console.log(this.sherDiscussionDetail)	

      for (var i=0; i<this.wordDiscussionDetail.length; i++){
      
      		this.wordDiscussionDetail[i].text = decodeURI(this.wordDiscussionDetail[i].text)

	}

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
  // display: block;
  display: table-cell;
  // display:inline-block;
    vertical-align:middle;
    max-width:100%;
    max-height:100%;
// text-align: center;
    // width: 200px;
    // height: 100px;
    // line-height:97px;
  // display: table;
  // width:10000px;
  // display: flex;
    // justify-content: center;
    // margin-left: auto;
    // margin-right: auto;
  // left: 50%;
    // margin-left: auto;
    // margin-right: auto;
    // width: 600px;
    // width: 6px;
  
  // text-align: center;
  // margin:0 auto;
}

poem_text_word {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
  // display: inline;
  // display: block;
  // display: table-cell;
  display:inline-block;
  // display:flex;
    // vertical-align:middle;
    // max-width:100%;
    // max-height:100%;
// text-align: center;
    // width: 200px;
    // height: 100px;
    // line-height:97px;
  // display: table;
  // width:10000px;
  // display: flex;
    // justify-content: center;
    // margin-left: auto;
    // margin-right: auto;
  // left: 50%;
    // margin-left: auto;
    // margin-right: auto;
    // width: 600px;
    // width: 6px;
  
  // text-align: center;
  // margin:0 auto;
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
  border: 1px solid black;
}

table {
  border-collapse: collapse;
  width: 100%;
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

.ui-helper-center-word {
  // width: 50%;
  // width: 20%;
  // width: 2%;

  border: 2px solid black;
  padding: 10px;
  // margin: 25px;
  border-radius: 25px;

  // border-style: solid;
  // border-width: thin;
// outline: thin solid
}

.ui-helper-comments {
  // width: 50%;
  width: 20%;

  border: 2px solid red;
  padding: 25px;
  margin: 25px;
  border-radius: 25px;

  // border-style: solid;
  // border-width: thin;
// outline: thin solid
}

comments_wrap {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
  // display: block;
  display: table-cell;
  // display:inline-block;
    vertical-align:middle;
    max-width:100%;
    max-height:100%;
// text-align: center;
    // width: 200px;
    // height: 100px;
    // line-height:97px;
  // display: table;
  // width:10000px;
  // display: flex;
    // justify-content: center;
    // margin-left: auto;
    // margin-right: auto;
  // left: 50%;
    // margin-left: auto;
    // margin-right: auto;
    // width: 600px;
    // width: 6px;
  
  // text-align: center;
  // margin:0 auto;
}


td {
  height: 50px;
  // vertical-align: bottom;
  vertical-align: middle;
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

text_on_left {

}
text_on_right {

}

</style>
