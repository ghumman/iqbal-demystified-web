////////////////////////////////////////
//	HTML
////////////////////////////////////////
<link rel="stylesheet" media="screen"  type="text/css"/>
<template>

<div id="TabView1" class="container">
    <img src="./../assets/allam_iqbal_pic.jpg" >
 	
    <!-- number of tabs and their titles--> 
    <div class="tabs">
        <a v-on:click="activetab=1" v-bind:class="[ activetab === 1 ? 'active' : '' ]"><tab_title>اردو</tab_title></a>
        <a v-on:click="activetab=2" v-bind:class="[ activetab === 2 ? 'active' : '' ]"><tab_title>(فارسی  (۱</tab_title></a>
        <a v-on:click="activetab=3" v-bind:class="[ activetab === 3 ? 'active' : '' ]"><tab_title>(فارسی  (۲</tab_title></a>
    </div>


    <div class="content">
	
	<!-- contents of first tab -->
        <div v-if="activetab === 1" class="tabcontent">
        
	<!-- first book-->   
	<!-- <router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_001'}}"><img src="./../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg" style="width:200px;height:200px;border:20;padding:10px;"></router-link> -->
	<!-- <tab_pic_format><router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_001'}}"><img src="./../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg"></router-link></tab_pic_format> -->

	<!-- <router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_001'}}"><img src="./../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg" class="tab_pictures_class"></router-link> -->


	<!-- <router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_001', messageFromSigninPage:'{{profileSigninMessage}}'}}"><img src="./../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg" class="tab_pictures_class"></router-link> -->

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_002', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_bal_ae_jabreel_urdu_2.jpg" class="tab_pictures_class"></router-link>
	
	<!-- second book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_001', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_bang_ae_dara_urdu_1.jpg" class="tab_pictures_class"></router-link>

	<!-- third book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_004', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_armaghan_ae_hijaz_urdu_4.jpg" class="tab_pictures_class"></router-link>

	<!-- forth book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_003', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_zarb_ae_kaleem_urdu_3.jpg" class="tab_pictures_class"></router-link>

        </div>


	<!-- contents of second tab -->
        <div v-if="activetab === 2" class="tabcontent">

	<!-- first book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_006', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_rumuz_ae_bekhudi_persian_6.jpg" class="tab_pictures_class"></router-link>
	
	<!-- second book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_005', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_asrar_ae_khudi_persian_5.jpg" class="tab_pictures_class"></router-link>

	<!-- third book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_007', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_payam_ae_hijaz_persian_7.jpg" class="tab_pictures_class"></router-link>

	<!-- forth book-->   

	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_008', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_zabur_ae_ajam_persian_8.jpg" class="tab_pictures_class"></router-link>


        </div>


	<!-- Contents of third tab -->
        <div v-if="activetab === 3" class="tabcontent">

	<!-- first book-->   
	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_009', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_javed_nama_persian_9.jpg" class="tab_pictures_class"></router-link>
	
	<!-- second book-->   
	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_010', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_pas_cheh_bayad_kard_persian_10.jpg" class="tab_pictures_class"></router-link>

	<!-- third book-->   
	<router-link :to="{ name: 'ListPoemPage', query: {listId: 'List_011', messageFromSigninPage:profileSigninMessage}}"><img src="./../assets/android_app_assets/book_armaghan_ae_hijaz_persian_11.jpg" class="tab_pictures_class"></router-link>

        </div> <!-- third tab div finished -->

    </div> <!-- content of tabs finished -->
  
</div> <!-- div id=tab finished -->


</template>

////////////////////////////////////////
//	SCRIPT
////////////////////////////////////////
<script>

import StaticContentService from '@/services/StaticContentService'
require('../assets/css/poem_page.css')

export default {
	name: 'TabView1',
	el: '#TabView1',
        data () {
		return {
			profileSigninMessage: "hello",
			activetab: 1,
                	msg: 'Welcome to Page1',
			listOfLists: []
		}
	},
	created () {
		// this.getListOfLists()
    		// this.profileSigninMessage = this.$route.query.messageFromSigninPage;
    		// this.profileSigninMessage = $parent.$route.query.messageFromSigninPage;
    		this.profileSigninMessage = this.$route.query.messageFromSigninPage;
	},
	methods: {
    		// TODO: Use async and await to get data from the server
    		/*
		async getListOfLists () {
      			const response = await StaticContentService.getListOfLists()

      			var yamlObject = YAML.parse(response.data)
      			this.listOfLists = yamlObject
      			console.log(yamlObject)
    		}
		*/
        }
}
</script>

////////////////////////////////////////
//	CSS
////////////////////////////////////////
<style scoped>

    tab_title {
	font-family: 'Jameel Noori Nastaleeq';
    	font-weight: normal;
    	font-style: normal;
    }

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

/*tab pictures style*/
.tab_pictures_class {

	width: 40%;
	height: auto;
	padding:10px;

	/*width:400px;
	height:400px;
	border:20;
	padding:10px;*/

}
</style>
