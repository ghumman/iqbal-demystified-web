<template>

<div id="SigninPage">
        <h1>Sign In</h1>
  <p>

     <input 
       type="text" 
       name="username" 
       v-model="input.username" 
       id="username" 
       placeholder="Username" 
     >
  
  </p>


  <p>
     <input 
       type="password" 
       name="password" 
       v-model="input.password" 
       id="password" 
       placeholder="Password" 
     >
  </p>

  <p>
    <input
      type="submit"
      value="SIGN IN"
      v-on:click="login()"
    >
  </p> 

<router-link :to="'registerpage'"><p>Do not have an account?</br> Register Here</p></router-link>
        
<p>{{message}}</p>

<div name="result" id="result"></div>

        <!-- <input type="password" name="password" v-model="input.password" placeholder="Password" /> </br></br> -->
        <!-- <button type="button" v-on:click="login()">Login</button> -->
	<!--<h2>{{input.username}}</h2>-->
</div>

</template>

<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"> -->

<script>
import AjaxUser from '@/services/AjaxUser'
// import jquery from 'jquery'
var $ = require('jquery')
window.jQuery = $
// require('jquery.backstretch)
// import StaticContentServiceUser from '@/services/StaticContentServiceUser'
// import StaticContentService from '@/services/StaticContentService'
export default {
	name: 'SigninPage',
        data () {
		return {
			message: "",
                	input: {
                    		username: "",
                    		password: ""
                	},
			mockAccount: {
				username: "test",
				password: "test"
			}
		}
	},
	methods: {
        	login() {
			this.message = "I'm a hidden message";
                	if(this.input.username != "" && this.input.password != "") {
                    		if(this.input.username == this.mockAccount.username && this.input.password == this.mockAccount.password) {

    					this.try_login(this.input.username, this.input.password);
    					// this.try_login("test", "test");
					
                        		// this.$emit("authenticated", true);
                        		// this.$router.replace({ name: "SearchPage" });
                    		} else {
                        		// console.log("The username and / or password is incorrect");
                        		alert("The username and / or password is incorrect");
                    		}
                	} else {
                    		// console.log("A username and password must be present");
                    		alert("A username and password must be present");
                	}	// else if user or password are empty ends
            	},	// function login ends

    async try_login (inputUsername, inputPassword) {
    // try_login (inputUsername, inputPassword) {
     
      this.message = "I'm inside async try_login function. Username is: " + inputUsername + " and password: " + inputPassword;
      try{
      // const response = await StaticContentServiceUser.try_login("test", "test");
      // const response = await StaticContentServiceUser.try_login(inputUsername, inputPassword);
      // const response = await AjaxUser.try_login(inputUsername, inputPassword);
      // AjaxUser.try_login(inputUsername, inputPassword, this.message);

      /*
$.ajax({
  url: "",
  cache: false,
  success: function(html){
    // $("#result").append(html);
    $(this.message).append(html);
  }
});

*/

/*
// $.get("http://icanmakemyownapp.com/iqbal/v3/get-poem.php?poemId=001_001", function(data, status){
$.get("http://ghummantech.com/dourbeen_api.php?apicall=login/", function(data, status){
      alert("Data: " + data + "\nStatus: " + status);
    });
*/

// var data = $({username: 'test', password: 'test'}).serialize();
// var data = new FormData();
// data.append = ('username',"test");
// data.append = ('password',"test");
var myData = {
username: 'test',
password: 'test'

}

$.ajax({
                 url: 'http://ghummantech.com/dourbeen_api.php?apicall=login',
                 // url: 'http://icanmakemyownapp.com/iqbal/v3/get-poem.php?poemId=001_001',
                 type: 'POST',
                 // dataType: 'jsonp',
                 dataType: 'text',
                 // dataType: 'text',
		 // data: ({username: 'test', password: 'test'}).serialize(),
		 // data: JSON.stringify(myData),
		 // data: myData,
		 // data: "username&password",
		 data: {username: "test", password: "test"},
		 // data: ("&username=test&password=test").serialize(),
                 // data:person,
                 // error: function(data, status){
                 success: function(data, status){

      alert("Data: " + data + "\nStatus: " + status);
                     // console.log(data);
                 }
             });

// Assign handlers immediately after making the request,
// and remember the jqxhr object for this request
/*
alert("I'm before var jqxhr");
var jqxhr = $.get( "http://google.com", function() {
  alert( "success" );
})
  .done(function() {
    alert( "second success" );
  })
  .fail(function() {
    alert( "error" );
  })
  .always(function() {
    alert( "finished" );
  });
 
// Perform other work here ...
 
// Set another completion function for the request above
jqxhr.always(function() {
  alert( "second finished" );
});

alert("I'm after jqxhr.always");
*/

      // this.message = response;
      // const response = await StaticContentService.getPoemList("001_001");
      // const response = await StaticContentService.getPoemList("List_001");

      // this.message = response;
      // this.message = "inside try";
      // var yamlObject = YAML.parse(response.data)
      // this.message = "inside try after api call";
      // this.message = yamlObject;
      }catch(err){
alert("inside catch err");
alert(err);

      // var yamlObject = YAML.parse(response.data)
      this.message = err;
      // this.message = "inside catch";
      // this.message = "Inside catch and error is: " + err;
      // console.log(yamlObject)
      }
    }
        }	// methods ends
}

</script>

<style scoped>
</style>
