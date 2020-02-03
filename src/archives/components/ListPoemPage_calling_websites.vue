/////////////////////////////////////////////////////////////////
//	HTML
/////////////////////////////////////////////////////////////////

<template>
  <div>
      <div v-if=" profileSigninMessage == 'message: Login successfull username: test'"> 
	<div class="circle">T</div>
      </div>

      <!-- If you are not signed in show rectangle 
	with label sign in. and if clicked go to register page-->
      <div v-else>
	<router-link :to="{ path: 'RegisterPage'}"><div class="rectangle">SIGN IN</div></router-link>
      </div>
  <body class="fixed-nav sticky-footer" id="page-top">

  <!-- <div class="new_nav_tag" id="new_nav_tag">HELLO </div> -->

  <!-- display title of book -->
  <!-- also this header will be sticky -->

  <div class="sticky_header" id="sticky_header">
  	<div v-for="name in poemList.name"> 
  		<tab_title class = "b">{{name.text}}</tab_title>
  	</div>
  </div>

  <div class="rest_of_page" id="rest_of_page">

<!-- <fixed-header :fixed.sync="isFixed">
<div :class="{ 'is-fixed': isFixed }"> hello </div>
</fixed-header> -->

<!-- <router-link :to="'ExampleSimplePage'">Go to Example Sample Page</router-link> -->


<table>
  <div v-for="(section,index) in poemList.sections"> 

    <div v-if="section.sectionName">
    <b><tr><th> <tab_title class="a">{{ section.sectionName[0].text }}</tab_title> </br>( {{ section.sectionName[1].text }} )</br></br></th></tr></b>
    </div>
    

    <div v-for="(poem,index) in section.poems">

      <div v-if=" index % 2 == 0">
      <router-link :to="{ path: 'PoemPage', query: { poemId: poem.id , messageFromSigninPage:profileSigninMessage}}"><tr><td><even_tab_color><tab_title class="a">{{ poem.poemName[0].text }}</tab_title> </br>( {{ poem.poemName[1].text }} )</br></br> </even_tab_color></td></tr></router-link>
      </div>

      <div v-else>
	<router-link :to="{ path: 'PoemPage', query: { poemId: poem.id , messageFromSigninPage:profileSigninMessage}}"><tr><td><odd_tab_color><tab_title class="a">{{ poem.poemName[0].text }}</tab_title> </br>( {{ poem.poemName[1].text }} )</br></br> </odd_tab_color></td></tr></router-link>
      </div>
    </div>

  </div>

</table> <!-- table ends-->

</div>	<!-- div for rest of page ends-->

  </body>
</div>
</template>

/////////////////////////////////////////////////////////////////
//	Javascript
/////////////////////////////////////////////////////////////////

<script>

var yaml = require('js-yaml');
var fs   = require('fs');


// import FixedHeader from 'vue-fixed-header'
import StaticContentService from '@/services/StaticContentService'
// import StaticContentService from '@/services/StaticContentServiceLocal'
require('../assets/css/poem_page.css')

export default {
  components: {
    // FixedHeader
  },

  data () {
    return {
      profileSigninMessage: "",
      isFixed: true,
      poemList: []
    }
  },
  created () {
    this.getPoemList(this.$route.query.listId),
    window.addEventListener('scroll', this.handleScroll),
    this.profileSigninMessage = this.$route.query.messageFromSigninPage
    // this.profileSigninMessage = $parent.$route.query.messageFromSigninPage;
  },
  destroyed: function () {
    window.removeEventListener('scroll', this.handleScroll);
  },

  methods: {
    async getPoemList (listId) {
/*
// Get document, or throw exception on error
try {
  var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  // var doc = yaml.safeLoad(fs.readFileSync('/home/ghumman/programming/heroku_cli/router-project/src/services/List_Editor_Pick.yaml', 'utf8'));
  // alert(doc);
  console.log(doc);
} catch (e) {
  console.log(e);
}
*/



      const response = await StaticContentService.getPoemList(listId)

      console.log("Value of response: " + response)

      var yamlObject = YAML.parse(response.data)
      this.poemList = yamlObject
      console.log(yamlObject)
    },

    
    handleScroll:function () {
        // alert('I can not control scroll function')
	// let myBanner =  document.getElementById("myHeader").text
	// let myBanner =  document.getElementById("myHeader")
        // alert(myBanner.innerText)
	let myBanner2 = document.getElementById("sticky_header")
	let restOfPage = document.getElementById("rest_of_page")
	// myBanner2.innerHTML = myBanner.innerText
	
	 if(window.pageYOffset > 150){
        	// alert(myBanner.innerText)
		myBanner2.style.position = 'sticky'; 
		// restOfPage.style.position = 'relative'; 
		myBanner2.style.top = 0;
		// myBanner2.style.right = "50%";
	}else{
		myBanner2.style.position = 'relative';
		myBanner2.style.top = 100;
		myBanner2.style.left = "0%";
		myBanner2.style.display = "inline-block";
	}	// else ends
     }	// handleScroll function ends
  }	// methods end
}	// export default ends
</script>

///////////////////////////////////////////////////////////////////
//	CSS
///////////////////////////////////////////////////////////////////
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

tab_title.a {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
}


tab_title.b {
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

td {
  height: 50px;
  vertical-align: bottom;
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
    // color: #777;
}
odd_tab_color {
    // background: #CCC;
    background: #FAEBD7;
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
      // padding: 10px 0px;
      text-align: center;
      // position: absolute;
      width: 100%;


          list-style-type: none;
          display: inline-block;
          padding: 10px 40px;
          // padding: 5px 20px;
          text-align: center;
          border-left: 1px solid white;
          color: black;
          // font-size: 10px;
          // font-size: 18px;

}

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

</style>
