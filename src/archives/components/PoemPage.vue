<template>
  <!-- <body class="poem_page" id="poem_page"> -->

  <div>
<!--
      <div v-if=" profileSigninMessage == 'message: Login successfull username: test'"> 
	<div class="circle">T</div>
      </div>
      <div v-else>
	<router-link :to="{ path: 'RegisterPage'}"><div class="rectangle">SIGN IN</div></router-link>
      </div>
-->

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

<table>

<!--------------------------------------------------------------------
		Heading
-------------------------------------------------------------------->

  <div class="sticky_header" id= "sticky_header">
    <div v-for="heading in poemDetail.heading">
      <!-- <poem_title class = "poem_heading">{{heading.text}}</poem_title> -->
      <poem_heading>{{heading.text}}</poem_heading>
    </div>
  </div>

<!-- <table> -->

<!--------------------------------------------------------------------
		Sher
-------------------------------------------------------------------->

  <!-- <div v-for="(verse,index) in poemDetail.sher"> -->

  <!-- <div v-for="(verse,index) in splitedList2" :key="verse.id" text-align = "center"> -->
  <div v-for="(verse,index) in splitedList2" :key="verse.id"> 

<!------------------------------------------------------------------
  <div v-for="row in splitedList2"> 
	<p>{{ row.sherContent[0].text[0] }} </br>{{ row.sherContent[0].text[1] }} </p>	
   </div> 
--------------------------------------------------------------------->

<!------------------------------------------------------------------
		Even
--------------------------------------------------------------------->
      <div v-if=" index % 2 == 0"> <!-- even rows starts-->

      <div v-if=" verse.sherContent[1] != undefined"> <!-- if english translation available starts -->

      <div v-if=" index == 0"> <!-- first row of even starts-->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="show_english_translation({{index}})">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-bind:id="englishDivision">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="show_english_translation(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div ref="index">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click='isOpen = !isOpen'>{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isOpen">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isActive">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle(0)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isActive[0]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle(0)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isOn">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle(0)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isOn">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text" v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></router-link>

</even_tab_color></td></tr>
	
	</div> <!-- first row of even ends-->


      <div v-else> <!-- all even rows other than first starts-->

    	<!-- <tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text}}</poem_title></br> {{verse.sherContent[1].text}} </br></br></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="show_english_translation($event)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-bind:id="englishDivision" style="display:none">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click='isOpen = !isOpen'>{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isOpen">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle(1)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isActive[2]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center" v-on:click="toggle(3)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div>{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></even_tab_color></td></tr> -->

    	<tr ><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text" v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></router-link>

</even_tab_color></td></tr> 
	
	</div>	<!-- all even rows other than first ends-->

      </div> <!-- if english translation available ends -->

      <div v-if=" verse.sherContent[1] == undefined"> <!-- if english translation not available starts -->

    	<!-- <tr align="center"><td class="ui-helper-center" text-align="center"><even_tab_color text-align="center"><poem_title class="poem_text" text-align="center">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br></br></even_tab_color></td></tr> -->

      <div v-if=" index == 0"> <!-- first row of even starts-->


    	<tr ><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text" v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">"Translation is missing"</br>"Please contribute"</br></br></div></router-link>

</even_tab_color></td></tr>
	
	</div> <!-- first row of even ends-->

      <div v-else> <!-- all even rows other than first starts-->

    	<tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text" v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">"Translation is missing"</br>"Please contribute"</br></br></div></router-link>

</even_tab_color></td></tr> 
	
	</div>	<!-- all even rows other than first ends-->

      </div>	<!-- if english translation not available ends -->

      </div> <!-- even rows ends-->

<!------------------------------------------------------------------
		Odd
--------------------------------------------------------------------->
      <div v-else> 	<!-- odd rows starts -->

      <div v-if=" verse.sherContent[1] != undefined"> 


    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text">{{verse.sherContent[0].text}} </poem_title></br> {{verse.sherContent[1].text}} </br></br></odd_tab_color></td></tr> -->

    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text" v-on:click="show_english_translation($event)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-bind:id="englishDivision" style="display:none">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></odd_tab_color></td></tr> -->

    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text" v-on:click='isOpen = !isOpen'>{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isOpen">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></odd_tab_color></td></tr> -->

    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text" v-on:click="toggle(1)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div v-show="isActive[3]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></odd_tab_color></td></tr> -->

    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text" v-on:click="toggle(4)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br><div>{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></odd_tab_color></td></tr>  -->

    	<tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text" v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}}</br></br></div></router-link>

</odd_tab_color></td></tr> 

	
	</div>	<!-- if english translation availabe ends-->
      <div v-if=" verse.sherContent[1] == undefined"> 

    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br></br></odd_tab_color></td></tr> -->

    	<tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text" v-on:click="toggle(index)">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</br></poem_title></br>

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}"><div v-show="isActive[index]">"Translation is missing"</br>"Please contribute"</br></br></div></router-link>

</odd_tab_color></td></tr> 


	</div>	<!-- inside odd if no englisth translation ends-->


      </div>  <!-- div v else, if odd ends -->
    </div>	<!-- div v for verse index in poem detail.sher ends -->
  </table>

  <!-- </body> -->

</div>

</template>

<script>
// import StaticContentService from '@/services/StaticContentService'
import StaticContentService from '@/services/StaticContentServiceYaml'
import Vue from 'vue';

require('../assets/css/poem_page.css')

export default {
  data () {
    return {
      profileSigninMessage: "",
      poemDetail: [],
      // isOpen: [],
      isOn: false,
      isActive: []
   

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

	var a = "string"
	console.log(a)

	var b = a.padEnd(20)
	console.log(b)

	console.log("value of el.sherContent[0].text")
	console.log(el.sherContent[0].text)

	console.log("value of (el.sherContent[0].text).padEnd(200)")
	console.log((el.sherContent[0].text).padEnd(100))
	
	try {
	el.sherContent[0].text = el.sherContent[0].text.split('|')

	el.sherContent[0].text[0] = (el.sherContent[0].text[0]).padStart(100, ' ')
	el.sherContent[0].text[1] = (el.sherContent[0].text[1]).padStart(100, ' ')
	console.log("value of el.sherContent[0].text[0]")
	console.log(el.sherContent[0].text[0])

	console.log("value of el.sherContent[0].text[1]")
	console.log(el.sherContent[0].text[1])
	}
	catch(err){}

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
    this.getPoem(this.$route.query.poemId),
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

poem_title.poem_text {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
}


/* poem_title1.poem_heading{ */
poem_heading{
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: bold;
  font-style: normal;
  // font-size: 250%;
  font-size: 150%;
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
    // background: #FFF8DC;
    background-size: 100% 100%;
    text-align: center;
    // color: #777;
}
odd_tab_color {
    // background: #CCC;
    // background: #FAEBD7;
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
  //width: 50px;
  width: 70px;
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
  // width: 30px;
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
div {
    white-space: pre-wrap;
}
</style>
