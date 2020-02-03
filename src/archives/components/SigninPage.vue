<template>

<div id="SigninPage">
        <h1>Sign In</h1>
<app-user-detail :myName="name"></app-user-detail>
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
<password_format><router-link :to="'forgotpasswordpage'"><p>I Forgot My Password!</p></router-link></password_format>

<router-link :to="'registerpage'"><p>Do not have an account?</br> Register Here</p></router-link>
        
<p id=statusMessage>{{message}}</p>

        <!-- <input type="password" name="password" v-model="input.password" placeholder="Password" /> </br></br> -->
        <!-- <button type="button" v-on:click="login()">Login</button> -->
	<!--<h2>{{input.username}}</h2>-->
</div>

</template>

<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"> -->

<script>
var $ = require('jquery')
window.jQuery = $
export default {
	name: 'SigninPage',
        data () {
		return {
			name: 'Lucas',
			message: "",
                	input: {
                    		username: "",
                    		password: ""
                	},
		}
	},

    created: function () {
    	this.scrollToTop()
    },

	methods: {
      		scrollToTop() {
      			window.scrollTo(0,0);
      		},
        	login() {
			
			// this.$router.push('/registerpage');
			// this.message = "I'm a hidden message";
                	if(this.input.username != "" && this.input.password != "") {
    					this.try_login(this.input.username, this.input.password);
                	} else {
                    		// console.log("A username and password must be present");
                    		alert("A username and password must be present");
                	}	// else if user or password are empty ends
            	},	// function login ends

async try_login (inputUsername, inputPassword) {
	try{
		var element = this;
		$.ajax({
			// url: 'http://ghummantech.com/dourbeen_api.php?apicall=login',
			// url: 'http://www.icanmakemyownapp.com/iqbal/v3/login.php',
			url: 'https://www.icanmakemyownapp.com/iqbal/v3/login.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {username: inputUsername, password: inputPassword},
                 	// success: function(data, status, username, message){	// success funciton starts
			// following is a feature of ES2015, => instead of function allows us to use this keyword inside ajax calls. 
                 	success: (data, status, username, message) => {	// success funciton starts
				// var obj = JSON.parse(data);	
				console.log("data");
				console.log(data);
				if (data == "done")	{
					console.log("Successfully Logged in");
				
				// first check if message is login successfull, because if it not, there won't be any user object
				// var serverMessage = obj.message;
				// Check if serverMessage = Login successfull
//				if (serverMessage == "Login successfull") {
					// var user = obj.user;
      					// alert("message: " + obj.message + " username: " + user.username);
      					// this.message = "message: " + obj.message + " username: " + user.username;
      					// this.message = "hello world";
      					// document.getElementById("").innerHTML =  = "hello world";
					// $("#statusMessage").text("message: " + obj.message + " username: " + user.username);
					// $("#statusMessage").text("Successfully Logged in as: " + username);

					$("#statusMessage").text(data + ":" + inputUsername);
					console.log(data + ":" + inputUsername);
					// console.log("Successfully Logged in as: " + inputUsername);
					// console.log(username);
					// console.log(inputUsername);
					// <router-link :to="{ name: 'ProfilePage', params: {message: "loggedin"}"></router-link>;
					 // this.$router.push('/profilepage');
					 // $router.push('/profilepage');
					 // this.$router.go('/profilepage');
					 // $(element).$router.push('/registerpage');
					 // this.$router.push({path: '/profilepage', params: {messageFromSigninPage: 'hello'}});
					 // this.$router.push({path: '/profilepage', query: {messageFromSigninPage: 'hello'}});
					 // this.$router.push({path: '/profilepage', query: {messageFromSigninPage: "message: " + obj.message + " username: " + user.username}});
					 // this.$router.push({path: '/', query: {messageFromSigninPage: "message: " + obj.message + " username: " + user.username}});
					 // this.$router.push({path: '/', query: {messageFromSigninPage: "message: " + data + " username: " + inputUsername}});
					 // this.$router.push({path: '/', query: {messageFromSigninPage:data + ":" + inputUsername + ":" + inputPassword}});

					var simpleString = data + ":" + inputUsername + ":" + inputPassword;
					var encodedString = btoa(simpleString);
					 // this.$router.push({path: '/', query: {messageFromSigninPage:data + ":" + inputUsername + ":" + inputPassword}});
					 this.$router.push({path: '/', query: {messageFromSigninPage:encodedString}});

				}
				// else if message is Invalid username or password
				else {
			
      					// alert("message: " + obj.message);
					// $("#statusMessage").text("message: " + obj.message);
					$("#statusMessage").text("message: " + data);
				}
                 	}	// success function ends
		});	// ajax call ends

	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}
}	// try_login function ends
}	// methods ends
}	// export default ends

</script>

<style scoped>
password_format {
	text-align: center; 
	font-size: small;
}
</style>
