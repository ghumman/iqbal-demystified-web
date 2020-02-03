<template>

<div id="ChangePasswordPage">
        <h1>Change Password</h1>
<app-user-detail :myName="name"></app-user-detail>
  <p>

     <input 
       type="text" 
       name="old_password" 
       v-model="input.old_password" 
       id="old_password" 
       placeholder="Current Password" 
     >
  
  </p>

  <p>
     <input 
       type="text" 
       name="new_password1" 
       v-model="input.new_password1" 
       id="new_password1" 
       placeholder="New Password" 
     >
  </p>

  <p>
     <input 
       type="text" 
       name="new_password2" 
       v-model="input.new_password2" 
       id="new_password2" 
       placeholder="New Password (again)" 
     >
  </p>

  <p>
    <input
      type="submit"
      value="CHANGE PASSWORD"
      v-on:click="change_password()"
    >
  </p> 

        
<p id=statusMessage>{{message}}</p>

</div>

</template>

<script>
var $ = require('jquery')
window.jQuery = $
export default {
	name: 'ChangePasswordPage',
        data () {
		return {
			profileSigninMessage: "",	
			message: "",
			username: "",
                	input: {
                    		old_password: "",
                    		new_password1: "",
                    		new_password2: "",
                    		new_password: ""
                	}
		}
	},

    // created: function () {
    created () {
    	this.scrollToTop(),
    	this.profileSigninMessage = this.$route.query.messageFromSigninPage
    	this.get_username();
    },

	methods: {
      		scrollToTop() {
      			window.scrollTo(0,0);
      		},

		async change_password(){

                	if(this.input.old_password != "" && this.input.new_password1 != "" && this.input.new_password2 != "") {
				if (this.input.new_password1 == this.input.new_password2) {
					this.input.new_password = this.input.new_password1;
		 			console.log("value of this.username");
		 			console.log(this.username);

		 			console.log("value of this.input.old_password");
		 			console.log(this.input.old_password);
		 			console.log("value of this.input.new_password");
		 			console.log(this.input.new_password);

					try{
						$.ajax({
							url: 'https://www.icanmakemyownapp.com/iqbal/v3/change-password.php',
                					type: 'POST',
                 					dataType: 'text',
		 					data: {username: this.username, old_password: this.input.old_password, new_password: this.input.new_password},
                 					success: (data, status, username, message) => {	// success funciton starts
								console.log("Value of data");
								console.log(data);


								if (data.trim() == "done")	{
									alert("Password Successfully Changed");
									console.log("Password Successfully Changed");
									var simpleString = "done" + ":" + this.username + ":" + this.input.new_password;
									// console.log ("value of simpleString");
									// console.log (simpleString);
									var encodedString = btoa(simpleString);
									this.$router.push({path: '/', query: {messageFromSigninPage:encodedString}});
								}
								// else if account not registered
								else {
									alert("Unable to register your account:" + data);
								}
                 					}	// success function ends
						});	// ajax call ends

					}catch(err){
						alert("inside catch err");
						alert(err);
						this.message = err;
					}
		
				}	// if password1 = password2 ends
				else {
					alert("Passwords do not match");
				}
		
                	} else {
                    		// console.log("A username and password must be present");
                    		alert("All fields are required");
                	}
		},	// function async register ends

	
    get_username(){
	try{
	var decodedString = atob(this.profileSigninMessage);
        let newArr = decodedString.split(":");

	console.log("Inside splitedList2")
	console.log(newArr[0])
	console.log(newArr[1])
	this.username = newArr[1]
	
	}
	catch(err){
		return "Error"
	}
    }	// function get_username ends
				

	}	// methods ends
}	// export default ends

</script>

<style scoped>
</style>
