<template>
<div class="vue-touch-keyboard">

<!-- <h1 class="text-center">Demo of vue-touch-keyboard</h1>
  <div class="container" id="app">
 
<form action="">
  <input type="radio" id = "radioId" name="searchType" value="title" checked="checked"> Title<br>
  <input type="radio" id = "radioId" name="searchType" value="text"> Title + Text<br>
</form>


		<fieldset>
      <legend>Normal layout</legend>
      <tab_title class="a"><input type="text" placeholder="Text input" @focus="show" data-layout="normal" /></tab_title>
    </fieldset>

		<fieldset>
      <legend>Compact layout</legend>
      <input type="text" placeholder="Text input" @focus="show" data-layout="compact" />
    </fieldset>

		<fieldset>
      <legend>Numeric layout</legend>
      <input type="text" placeholder="Text input" @focus="show" data-layout="numeric" />
    </fieldset>


		<vue-touch-keyboard id="keyboard" v-if="visible" :layout="layout" :cancel="hide" :accept="accept" :input="input" :next="next" />

  </div>
-->

  <!-- input(type="text", v-model="keyboardText", v-if="!input")-->
  <div class="keyboard">
    <div class="line" v-for="(line, index) in keySet" :key="index"><span v-for="(key, index) in line" :key="index" :class="getClassesOfKey(key)" v-text="getCaptionOfKey(key)" @click="e =&gt; clickKey(e, key)" @mousedown="mousedown" :style="getKeyStyle(key)"></span></div>
  </div>
</div></template>


<script>
	import Layouts from "./layouts";
	import isString from "lodash/isString";
	import isObject from "lodash/isObject";

	require('../assets/css/poem_page.css')

	export default {
		//////////////////////////////////////////////////
		// -> Default elements: 
		// props, data, computed, 
		// watch, methods, mounted, 
		// -> methods elements:
		// getLayout, changeKeySet, toggleKeySet, getCaptionOfKey, 
		// getClassesOfKey, getKeyStyle, supportsSelection, getCaret
		// backspace, insertChar, mousedown, clickKey, setFocusToInput,
		// accept, show, hide, next, 
		//////////////////////////////////////////////////
		props: {
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
		},	// props finishes
		
		data () {
			return {
				currentKeySet: "default",

      				profileSigninMessage: "",
				inputScrollLeft: 0,
				
				      visible: false,
      layout: "normal",
      input: null,
      options: {
        useKbEvents: false
      }
			};
		},	// data finishes
    		created(){
    			this.profileSigninMessage = this.$route.query.messageFromSigninPage
    },

		computed: {

			keySet() {
				let layout = this.getLayout();
				if (!layout) return;
				
				let keySet = layout[this.currentKeySet];
				if (!keySet) return;

				let res = [];

				let meta = layout["_meta"] || {};

				keySet.forEach((line) => {
					let row = [];
					line.split(" ").forEach((item) => {
						if (isObject(item)) {
							row.push(item);
						}
						else if (isString(item)) {
							if (item.length > 2 && item[0] == "{" && item[item.length- 1] == "}") {
								let name = item.substring(1, item.length - 1);
								if (meta[name])
									row.push(meta[name]);
								else
									console.warn("Missing named key from meta: " + name);
							} else {
								if (item == "") {
									// Placeholder
									row.push({
										placeholder: true
									});
									
								} else {
									// Normal key
									row.push({
										key: item,
										text: item
									});
								}
							}
						}
					});
					res.push(row);
				});	// keySet forEach ends

				return res;
			}	// function keySet finishes			
		},	//computed ends

		watch: {
			layout() {
				console.log("Layout changed");
				this.currentKeySet = "default";
			}
		},	// watch ends

		methods: {
			getLayout() {
				if (isString(this.layout))
					return Layouts[this.layout];

				return this.layout;
			},
			
			changeKeySet(name) {
				let layout = this.getLayout();
				if (layout[name] != null)
					this.currentKeySet = name;
			},
			
			toggleKeySet(name) {
				this.currentKeySet = this.currentKeySet == name ? "default" : name;
			},
			
			getCaptionOfKey(key) {
				return key.text || key.key || "";
			},
			
			getClassesOfKey(key) {
				if (key.placeholder)
					return "placeholder";
				else {
					let classes = "key " + (key.func || "") + " " + (key.classes || "");
					if (key.keySet && this.currentKeySet == key.keySet)
						classes += " activated";

					return classes;
				}
			},

			getKeyStyle(key) {
				if (key.width) 
					return {
						flex: key.width
					};
			},

			supportsSelection() {
				return (/text|password|search|tel|url/).test(this.input.type); 
			},

			getCaret() {
				if (this.supportsSelection()) {
					let pos = {
						start: this.input.selectionStart || 0,
						end: this.input.selectionEnd || 0
					};

					if (pos.end < pos.start)
						pos.end = pos.start;

					return pos;

				} else {
					let val = this.input.value;
					return {
						start: val.length,
						end: val.length
					};
				}
			},

			backspace(caret, text) {
				text = text.substring(0, caret.start - 1) + text.substring(caret.start);
				caret.start -= 1;
				caret.end = caret.start;
				return text;
			},

			insertChar(caret, text, ch) {
				text = text.substr(0, caret.start) + ch.toString() + text.substr(caret.start);
				caret.start += ch.length;
				caret.end = caret.start;
				return text;
			},

			mousedown(e) {
				if (!this.input) return;
				if (this.options.preventClickEvent) e.preventDefault();

				this.inputScrollLeft = this.input.scrollLeft;
				//console.log("mousedown: ", this.input.scrollLeft, this.input.scrollWidth, this.input.clientWidth);
			},

			clickKey(e, key) {
				if (!this.input) return;
				if (this.options.preventClickEvent) e.preventDefault();

				let caret = this.getCaret();
				let text = this.input.value;
				
				let addChar = null;
				if (typeof key == "object") {
					if (key.keySet) {
						this.toggleKeySet(key.keySet);
					}
					else if (key.func) {
						switch(key.func) {

						case "backspace": {
							text = this.backspace(caret, text);
							break;
						}

						case "accept": {
							if (this.accept)
								this.accept(text);
							return;
						}

						case "cancel": {
							if (this.cancel)
								this.cancel();
							return;
						}

						case "next": {
							if (this.next)
								this.next();
							return;
						}

						}
					} else {
						addChar = key.key;
					}

				} else {
					addChar = key;
				}

				if (addChar) {
					if (this.input.maxLength <= 0 || text.length < this.input.maxLength) {
						if (this.options.useKbEvents) {
							let e = document.createEvent("Event"); 
							e.initEvent("keydown", true, true);
							e.which = e.keyCode = addChar.charCodeAt();
							if (this.input.dispatchEvent(e)) {
								text = this.insertChar(caret, text, addChar);
							}
						} else {
							text = this.insertChar(caret, text, addChar);
						}
					} 

					if (this.currentKeySet == "shifted")
						this.changeKeySet("default");
				}

				this.input.value = text;
				this.setFocusToInput(caret);

				if (this.change)
					this.change(text, addChar);

				if (this.input.maxLength > 0 && text.length >= this.input.maxLength) {
					// The value reached the maxLength
					if (this.next)
						this.next();
				}

				// trigger 'input' Event
				this.input.dispatchEvent(new Event('input', { bubbles: true }));

			},
			
			setFocusToInput(caret) {
				this.input.focus();
				if (caret && this.supportsSelection()) {
					this.input.selectionStart = caret.start;
					this.input.selectionEnd = caret.end;
				}
			},

			// Search button pressed
			accept(text) {
          // console.log("Input text: " + text);
          console.log("You searched for: " + text);
          console.log("Value of this.profileSigninMessage");
          console.log(this.profileSigninMessage);
	  var radioStatus = document.getElementById("radioId");
	  console.log(radioStatus.checked);
	  // console.log(radioStatus.value);
	  // this.$router.push({ name: 'ListPoemPageSearch', query: { listId: '123' } });
	  // do not start search if text is empty
	  
	  if (text.trim() != ""){
	
	  if (radioStatus.checked){
	  	this.$router.push({ name: 'ListPoemPageSearch', query: { listId: text, messageFromSigninPage:this.profileSigninMessage } });
	  }
	  else{
	  	this.$router.push({ name: 'PoemPageSearch', query: { poemId: text , messageFromSigninPage:this.profileSigninMessage} });
	  }
	
          this.hide();
	  }
	  // else if text is empty tell user to put some data
	  else{
		alert("Text can not be empty");

	 }
        },

        show(e) {
	  console.log("Inside show of UrduKeyboard");
          this.input = e.target;
          this.layout = e.target.dataset.layout;

          if (!this.visible)
            this.visible = true
        },

			hide() {
          this.visible = false;
        },
				
				next() {
					let inputs = document.querySelectorAll("input");
					let found = false;
					[].forEach.call(inputs, (item, i) => {
						if (!found && item == this.input && i < inputs.length - 1) {
							found = true;
							this.$nextTick(() => {
								inputs[i+1].focus();
							});
						}
					});
					if (!found) {
						this.input.blur();
						this.hide();
					}
				}	
			
		},

		mounted() {
			if (this.input) {
				this.setFocusToInput();
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
  background-image: url("./icons/backspace4.png");
  // background-color: white;
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
  font-size: 16px;
}
body {
  // font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-family: 'Jameel Noori Nastaleeq';
  font-size: 16px;
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
  display: block;
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




</style>
