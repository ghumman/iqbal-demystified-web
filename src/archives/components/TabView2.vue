////////////////////////////////////////
//	HTML
////////////////////////////////////////
<template>

<div id="TabView2" class="container">
      <!-- <div v-if=" profileSigninMessage == 'message: Login successfull username: test'"> -->

      <!-- <div v-if=" profileSigninMessage != 'message: Login successfull username: test'"> -->

	<!-- <router-link :to="{ name: 'ProfilePage'}"><img src="./../assets/android_app_assets/icon_signed_in.png" style="width:200px;height:200px;border:20;"></router-link> -->

	<router-link :to="{ path: this.goToPage, query: {messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/icon_signed_in.png" style="width:200px;height:200px;border:20;"></router-link> 


	<!-- <router-link :to="{ name: this.goToPage, messageFromSigninPage:profileSigninMessage}"><img src="./../assets/android_app_assets/icon_signed_in.png" style="width:200px;height:200px;border:20;"></router-link> -->

      <!-- </div> -->

      <!-- <div v-if=" profileSigninMessage != 'message: Login successfull username: test'"> -->

      <!-- <div v-else>

    <router-link :to="{ name: 'RegisterPage'}"><img src="./../assets/android_app_assets/icon_signed_in.png" style="width:200px;height:200px;border:20;"></router-link>

      </div> -->

    <!-- <router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_001'}}"><img src="./../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg" class="tab_pictures_class"></router-link> -->

    <router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_Editor_Pick', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/icon_best.png" style="width:200px;height:200px;border:20;"></router-link>

    <!-- <router-link :to="{ name: 'IntikhabPage'}"><img src="./../assets/android_app_assets/icon_best.png" style="width:200px;height:200px;border:20;"></router-link> -->

    <!-- <router-link :to="{ name: 'BookMarksPage'}"><img src="./../assets/android_app_assets/icon_bookmark.png" style="width:200px;height:200px;border:20;"></router-link> -->

    <router-link :to="{ name: 'CommentsPage', query: {messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/icon_discussion.png" style="width:200px;height:200px;border:20;"></router-link>

    <router-link :to="{ name: 'SearchPage', query: {messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/icon_search.png" style="width:200px;height:200px;border:20;"></router-link>

    <router-link :to="{ name: 'InfoPage', query: {messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/icon_info.png" style="width:200px;height:200px;border:20;"></router-link>

</div> <!-- div id=TabView2 finished -->


</template>

////////////////////////////////////////
//	SCRIPT
////////////////////////////////////////
<script>

import StaticContentService from '@/services/StaticContentService'
require('../assets/css/poem_page.css')

export default {
	name: 'TabView2',
	el: '#TabView2',
        data () {
		return {
			profileSigninMessage: "hello",
      			goToPage: 'RegisterPage',
			activetab: 1,
                	msg: 'Welcome to Page1',
			listOfLists: [],
			username: ""
		}
	},
	created () {
		// this.getListOfLists();
    		this.profileSigninMessage = this.$route.query.messageFromSigninPage;
    		this.check_login();

	},
	methods: {
	
    		check_login(){
	console.log("I am inside check_login");

	if (this.profileSigninMessage != ""){
	var decodedString = atob(this.profileSigninMessage);
	console.log("Value of decodedString");
	console.log(decodedString);
        let newArr = decodedString.split(":");

	console.log("Value of newArr");
	console.log(newArr);

	this.username =  newArr[1];
	this.goToPage = "ProfilePage";
	}
	else this.goToPage = "RegisterPage";
	
    		},
    		// TODO: Use async and await to get data from the server
    		async getListOfLists () {
      			const response = await StaticContentService.getListOfLists()

      			var yamlObject = YAML.parse(response.data)
      			this.listOfLists = yamlObject
      			console.log(yamlObject)
    		}
        }
}
</script>

////////////////////////////////////////
//	CSS
////////////////////////////////////////
<style scoped>
    h1, h2 {
        font-weight: normal;
    }

    ul {
        list-style-type: none;
        padding: 0;
    }

    li {
        display: inline-block;
        margin: 0 10px;
    }

    a {
        color: #42b983;
    }
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

.container {  
    max-width: 620px; 
    min-width: 420px;
    margin: 40px auto;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 0.9em;
    color: #888;
}

/* Style the tabs */
.tabs {
    overflow: hidden;
  margin-left: 20px;
    margin-bottom: -2px;
}

.tabs ul {
    list-style-type: none;
    margin-left: 20px;
}

.tabs a{
    float: left;
    cursor: pointer;
    padding: 12px 24px;
    transition: background-color 0.2s;
    border: 1px solid #ccc;
    border-right: none;
    background-color: #f1f1f1;
    border-radius: 10px 10px 0 0;
    font-weight: bold;
}
.tabs a:last-child { 
    border-right: 1px solid #ccc;
}

/* Change background color of tabs on hover */
.tabs a:hover {
    background-color: #aaa;
    color: #fff;
}

/* Styling for active tab */
.tabs a.active {
    background-color: #fff;
    color: #484848;
    border-bottom: 2px solid #fff;
    cursor: default;
}

/* Style the tab content */
.tabcontent {
    padding: 30px;
    border: 1px solid #ccc;
    border-radius: 10px;
  box-shadow: 3px 3px 6px #e1e1e1
}
</style>
