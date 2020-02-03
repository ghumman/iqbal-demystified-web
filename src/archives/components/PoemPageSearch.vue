<template>
  <!-- <body class="poem_page" id="poem_page"> -->

  <div>

	<div v-if=" splitedFirstMessage == 'done'"> 
		<circle_login>{{splitedListUsername}}</circle_login>
	</div>
	<div v-else>
		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>
	</div>

  <body class="fixed-nav sticky-footer" id="page-top">

<table>

  <div class="sticky_header" id= "sticky_header">
    <!-- <div v-for="heading in poemDetail.heading"> -->
      <!-- <poem_title class = "poem_heading">{{heading.text}}</poem_title> -->
      <poem_title class = "poem_heading">Search Results</poem_title>
    <!-- </div> -->
  </div>

<!-- <table> -->
  <div v-for="(verse,index) in splitedList2" :key="verse.id"> 
  <!-- <div v-for="(verse,index) in poemDetail.sher"> -->
      <div v-if=" index % 2 == 0">

      <div v-if=" verse.sherContent[1] != undefined"> 

    	<tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}}</poem_title></br> 

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}} </br></br></router-link>

</even_tab_color></td></tr> 

    	<!-- <tr><td class="ui-helper-center"><even_tab_color><poem_title class="poem_text"> {{verse.sherContent[0].text}}</poem_title></br></br></even_tab_color></td></tr> -->

	</div>

      </div>

      <div v-else>

      <div v-if=" verse.sherContent[1] != undefined"> 

   	<tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text">{{verse.sherContent[0].text[0]}}</br>{{verse.sherContent[0].text[1]}} </poem_title></br> 

<router-link :to="{ path: 'SherPage', query: { sherId: verse.id , messageFromSigninPage:profileSigninMessage}}">{{verse.sherContent[1].text[0]}}</br>{{verse.sherContent[1].text[1]}} </br></br></router-link>

</odd_tab_color></td></tr> 

    	<!-- <tr><td class="ui-helper-center"><odd_tab_color><poem_title class="poem_text">{{verse.sherContent[0].text}} </poem_title></br></br></odd_tab_color></td></tr> -->

	</div>

      </div> <!-- div v else  -->
    </div> <!-- div v for verse index in poem detail.sher ends -->
  </table>

  </body>

</div>

</template>

<script>
// import StaticContentService from '@/services/StaticContentService'
import StaticContentService from '@/services/StaticContentServiceYaml'

require('../assets/css/poem_page.css')

export default {
  data () {
    return {
      profileSigninMessage: "",
      poemDetail: []
    }
  },
  computed: {

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
  created () {
    this.scrollToTop(),
    this.getPoemSearch(this.$route.query.poemId),
    window.addEventListener('scroll', this.handleScroll),
    this.profileSigninMessage = this.$route.query.messageFromSigninPage
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
      scrollToTop() {
      	window.scrollTo(0,0);
      },
    // async getPoem (poemId) {
    // getPoem (poemId) {
    getPoemSearch (poemId) {
      // const response = await StaticContentService.getPoem(poemId)
      // const response = StaticContentService.getPoem(poemId)
      // var response = StaticContentService.getPoem(poemId)
      var response = StaticContentService.getPoemSearch(poemId)
      // var yamlObject = YAML.parse(response.data)
      // var yamlObject = YAML.parse(response)
      // this.poemDetail = yamlObject
      this.poemDetail = response
      // console.log(yamlObject)
      console.log("Back to methods getPoem");
      console.log(this.poemDetail)
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


poem_title.poem_heading {
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
  width: 50%;
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
