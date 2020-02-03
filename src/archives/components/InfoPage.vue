<template>

	<div id="InfoPageComponent" class="container">

		<div class="headerExample">

	<div v-if=" splitedFirstMessage == 'done'"> 
		<circle_login>{{splitedListUsername}}</circle_login>
	</div>
	<div v-else>
		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>
	</div>

			<h1><b>INFORMATION</b></h1>

  			<p>Developer:</br></br>Ahmed Ghumman</br></br><a href="https://ghummantech.com"> https://ghummantech.com </a></br></br>For suggestions and reporting bugs: admin@ghummantech.com</br></br>Special thanks to Iqbal Demystified Android App Developers:</br></br>AZEEM GHUMMAN</br></br>FAIZAN KHAN</br></br><tab_title>اخلاصِ عمل مانگ نیاگانِ کُہن سے</br>“!شاہاں چہ عجب گر بنوازند گدا را”</tab_title></br></br>May Allah give them reward for making the code open source.</p>

		</div>

	</div> 

</template>

<script>
export default {
        data () {
		return {
      			profileSigninMessage: ""
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
    created(){
    	this.scrollToTop(),
    	this.profileSigninMessage = this.$route.query.messageFromSigninPage
    },
    methods: {
				
      scrollToTop() {
      	window.scrollTo(0,0);
      }
    }
}


  
</script>

<style scoped>
    tab_title {
	font-family: 'Jameel Noori Nastaleeq';
    	font-weight: normal;
    	font-style: normal;
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
