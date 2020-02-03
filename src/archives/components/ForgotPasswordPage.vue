<template>

<div id="ForgotPasswordPage">
        <h1>Forgot Password</h1>
<!-- <app-user-detail :myName="name"></app-user-detail> -->
  <p>

     <input 
       type="text" 
       name="email" 
       v-model="input.email" 
       id="email" 
       placeholder="Email" 
     >
  
  </p>


  <p>
    <input
      type="submit"
      value="REST MY PASSWORD!"
      v-on:click="reset_password()"
    >
  </p> 

        
<p id=statusMessage>{{message}}</p>

</div>

</template>

<!-- <script src="https://code.jquery.com/jquery-3.3.1.min.js"> -->

<script>
var $ = require('jquery')
window.jQuery = $
export default {
	name: 'ForgotPasswordPage',
        data () {
		return {
			message: "",
                	input: {
                    		email: ""
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

async reset_password () {
	console.log("Value of this.input.email.trim()");
	console.log(this.input.email.trim());
	
        if(this.input.email.trim() != "") {
	try{
		$.ajax({
			url: 'https://www.icanmakemyownapp.com/iqbal/v3/forgot-password.php',
                	type: 'POST',
                 	dataType: 'text',
		 	data: {email: this.input.email},
                 	success: (data) => {	// success funciton starts
				console.log("Value of this.input.email");
				console.log(this.input.email);
				console.log("data");
				console.log(data);
				if (data.trim() == "email sent")	{
					$("#statusMessage").text("Email sent.");
					console.log(data);
					alert("Email sent with the new password. Please check your email.");
					 this.$router.push({path: '/signinpage'});

				}
				else if (data.trim() == "email not found"){
					$("#statusMessage").text("Unable to find your email."); 
					alert("Could not found email in our system, please double check email address or create a new account.");
				}
                 	}	// success function ends
		});	// ajax call ends

	}catch(err){
		alert("inside catch err");
		alert(err);
		this.message = err;
	}
	}	// if email not empty ends
	else {
		console.log("Email can not be empty");
		alert("Email can not be empty");
		$("#statusMessage").text("Email can not be empty"); 
	}
}	// reset_password function ends
}	// methods ends
}	// export default ends

</script>

<style scoped>
</style>
