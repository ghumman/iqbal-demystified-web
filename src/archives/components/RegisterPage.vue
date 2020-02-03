<template>

<div id="RegisterPage">
        <h1>REGISTER</h1>
  <p>

     <input 
       type="text" 
       name="first_name" 
       v-model="input.first_name" 
       id="first_name" 
       placeholder="First Name" 
     >
  
  </p>
  <p>

     <input 
       type="text" 
       name="last_name" 
       v-model="input.last_name" 
       id="last_name" 
       placeholder="Last Name" 
     >
  
  </p>
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
      type="email"
      name="email"
      v-model="input.email"
      id="email"
      placeholder="Email"
    >
  </p>

  <p>
     <input 
       type="password" 
       name="password1" 
       v-model="input.password1" 
       id="password1" 
       placeholder="Password" 
     >
  </p>

  <p>
     <input 
       type="password" 
       name="password2" 
       v-model="input.password2" 
       id="password2" 
       placeholder="Password (again)" 
     >
  </p>

  <p>
    <input
      type="submit"
      value="REGISTER"
      v-on:click="register()"
    >
  </p>

<router-link :to="'signinpage'"><p>Already Registerd?</br> Login Here</p></router-link>
        

</div>

</template>

<script>

var $ = require('jquery')
window.jQuery = $

export default {
	name: 'RegisterPage',
        data () {
		return {
			
                	input: {
                    		first_name: "",
                    		last_name: "",
                    		username: "",
                    		email: "",
                    		password: "",
                    		password1: "",
                    		password2: ""
                	},
			mockAccount: {
				username: "ahmed",
				password: "ghumman"
			}
		}
	},

	created: function () {
    		this.scrollToTop()
	},

	methods: {

      		scrollToTop() {
      			window.scrollTo(0,0);
      		},
		
        	async register() {

                	if(this.input.first_name != "" && this.input.last_name != "" && this.input.username != "" && this.input.email && this.input.password1 != "" && this.input.password2 != "") {
				if (this.input.password1 == this.input.password2) {
					this.input.password = this.input.password1;

					try{
						$.ajax({
							url: 'https://www.icanmakemyownapp.com/iqbal/v3/create-account.php',
                					type: 'POST',
                 					dataType: 'text',
		 					data: {first_name: this.input.first_name, last_name: this.input.last_name, username: this.input.username, password: this.input.password, email: this.input.email},
                 					success: (data, status, username, message) => {	// success funciton starts

								if (data.trim() == "Your account has been created! Please check your email and activate your account by clicking on a link that we have sent you in the email. Don't forget to check in your Junk folder.")	{
									alert(data);
									console.log("Successfully Registered");
									var simpleString = "done" + ":" + this.input.username + ":" + this.input.password;
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
		}	// function async register ends

	}	// methods ends
}	// export default ends

</script>

<style scoped>
</style>
