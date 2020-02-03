<template>
<div class="vue-touch-keyboard">

<h2 class="text-center">Allama Iqbal Search Engine</h2>
  <div class="container" id="app">

	<div v-if=" splitedFirstMessage == 'done'"> 
		<circle_login>{{splitedListUsername}}</circle_login>
	</div>
	<div v-else>
		<router-link :to="{ path: 'RegisterPage'}"><rectangle>SIGN IN</rectangle></router-link>
	</div>

<form action="">
  <input type="radio" id = "radioId" name="searchType" value="title" checked="checked"> Title
  <input type="radio" id = "radioId" name="searchType" value="text"> Text

		<fieldset>
      <legend>SEARCH</legend>
      <input type="text" placeholder="Text input" @focus="show" data-layout="normal" />
    </fieldset>

		<!-- <fieldset>
      <legend>Compact layout</legend>
      <input type="text" placeholder="Text input" @focus="show" data-layout="compact" />
    </fieldset>

		<fieldset>
      <legend>Numeric layout</legend>
      <input type="text" placeholder="Text input" @focus="show" data-layout="numeric" />
    </fieldset> -->

		<vue-touch-keyboard id="keyboard" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" :next="next" />


</form>
  </div>


</div></template>


<script>
import VueTouchKeyboard from './UrduKeyboard.vue';
// import UrduKeyboard from './UrduKeyboard.vue';
let component = require("./UrduKeyboard.vue");
	export default {
			component,
	layouts: require("./layouts"),
	/*install(Vue) {
		Vue.component("VueTouchKeyboard", component);
	},*/
	  components: {
    		VueTouchKeyboard
    		// UrduKeyboard
  	},
		/*props: {
			input: HTMLInputElement,
			layout: [String, Object],

			accept: Function,
			cancel: Function,
			change: Function,
			next: Function,

			options: {
				type: Object,
				default() {
					return {};
				}
			}
		},
		*/
		
		data () {
			return {
				      visible: false,
      			profileSigninMessage: "",
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false
      }
			};
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
    	this.scrollToTop()
    	this.profileSigninMessage = this.$route.query.messageFromSigninPage
    },

		methods: {
				
      scrollToTop() {
      	window.scrollTo(0,0);
      },
	
			        accept(text) {
          alert("Input text: " + text);
          this.hide();
        },
	
	

        show(e) {
	  // console.log("you can see me");
	  // console.log(this.input.radio.value);
	  // var version = document.getElementById("radioId");
	  // console.log(version.checked);
	  // console.log(version.value);
	  // console.log(this.document.getElementById("myRadio").checked);
          this.input = e.target;
	  // console.log(this.input);
          this.layout = e.target.dataset.layout;
	  // console.log(this.layout);
	  

          if (!this.visible)
            this.visible = true;
        },

        hide() {
          this.visible = false;
        }
		}
	};
	
</script>



<style>


tab_title.a {
  font-family: 'Jameel Noori Nastaleeq';
  font-weight: normal;
  font-style: normal;
  font-size: 100%;
}

.vue-touch-keyboard .keyboard {
  width: 100%;
  margin: 0;
  /*
  // Apple style
  .key {
  	color: #aaa;
  	//font: bold 9pt arial;
  	background: #eff0f2;
  	border-radius: 4px;
  	border-top: 1px solid #ddd;
  	box-shadow: 
  		inset 0 0 25px #e8e8e8,
  		0 1px 0 #c3c3c3,
  		0 2px 0 #c9c9c9,
  		0 2px 3px #333;
  	text-shadow: 0px 1px 0px #f5f5f5;

  	&.control {
  		box-shadow: 
  			0 1px 0 #c3c3c3,
  			0 2px 0 #c9c9c9,
  			0 2px 3px #333;
  		text-shadow: 0px 1px 0px #777;
  	}

  	&:hover {
  		color: #aaa;
  		background-color: inherit;
  		border-color: inherit;
  	}

  	&:active {
  		color: #888;
  		background: #ebeced;
  		transform: translateY(3px);
  		box-shadow: inset 0 0 25px #ddd, 0 0 3px #333;
  		border-top: 1px solid #eee;
  	}
  }*/
}
.vue-touch-keyboard .keyboard .line {
  display: flex;
  justify-content: space-around;
}
.vue-touch-keyboard .keyboard .line:not(:last-child) {
  margin-bottom: 0.5em;
}
.vue-touch-keyboard .keyboard .key {
  flex: 40;
  height: 2.2em;
  line-height: 2.2em;
  overflow: hidden;
  vertical-align: middle;
  border: 1px solid #ccc;
  color: #333;
  background-color: #fff;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.6);
  border-radius: 0.35em;
  font-size: 1.25em;
  text-align: center;
  white-space: nowrap;
  user-select: none;
  cursor: pointer;
}
.vue-touch-keyboard .keyboard .key:not(:last-child) {
  margin-right: 0.5em;
}
.vue-touch-keyboard .keyboard .key.backspace {
  // background-image: url("./icons/backspace.svg");
  background-image: url("./icons/backspace3.png");
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 35%;
}
.vue-touch-keyboard .keyboard .key.half {
  flex: 20;
}
.vue-touch-keyboard .keyboard .key.control {
  color: #fff;
  background-color: #7d7d7d;
  border-color: #656565;
}
.vue-touch-keyboard .keyboard .key.featured {
  color: #fff;
  background-color: #337ab7;
  border-color: #2e6da4;
}
.vue-touch-keyboard .keyboard .key:hover {
  color: #333;
  background-color: #d6d6d6;
  border-color: #adadad;
}
.vue-touch-keyboard .keyboard .key:active {
  transform: scale(0.98);
  color: #333;
  background-color: #d4d4d4;
  border-color: #8c8c8c;
}
.vue-touch-keyboard .keyboard .key.activated {
  color: #fff;
  background-color: #5bc0de;
  border-color: #46b8da;
}
.vue-touch-keyboard .keyboard .placeholder {
  flex: 20;
  height: 2.2em;
  line-height: 2.2em;
}
.vue-touch-keyboard .keyboard .placeholder:not(:last-child) {
  margin-right: 0.5em;
}
.vue-touch-keyboard .keyboard:before, .vue-touch-keyboard .keyboard:after {
  content: "";
  display: table;
}
.vue-touch-keyboard .keyboard:after {
  clear: both;
}

html {
  // font-family: Tahoma;
  font-family: 'Jameel Noori Nastaleeq';
  // font-size: 16px;
}
body {
  // font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-family: 'Jameel Noori Nastaleeq';
  // font-size: 16px;
  color: #333;
}
* {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
h1 {
  text-align: center;
  font-size: 36px;
  margin-top: 20px;
  margin-bottom: 10px;
  font-weight: 500;
}
.panel-body {
  padding: 15px;
}
#keyboard {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
  width: 100%;
  max-width: 1000px;
  margin: 0 auto;
  padding: 1em;
  background-color: #eee;
  box-shadow: 0px -3px 10px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
}
fieldset {
  display: block-inline;
  width: 300px;
  padding: 15px;
  margin: 15px auto;
  border-style: solid;
  background-color: #fff;
  border-color: #ddd;
  border-width: 1px;
  border-radius: 4px;
}
input {
  display: block;
  width: 100%;
  height: 34px;
  padding: 6px 12px;
  font-size: 14px;
  line-height: 1.42857;
  color: #555;
  background-color: #fff;
  background-image: none;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  transition: border-color ease-in-out 0.15s, box-shadow ease-in-out 0.15s;
}
input:focus {
  border-color: #66afe9;
  outline: 0;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, .6);
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
