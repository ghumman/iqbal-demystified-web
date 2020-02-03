<template>
  <!-- <body class="fixed-nav sticky-footer" id="page-top"> -->
  <div class="fixed-nav sticky-footer" id="page-top">
  <div> hello </div>

    <img src="./../assets/logo.png">
    <h1> Allama Iqbal </h1>

    <div v-for="list in listOfLists.lists">
      <router-link :to="{ path: 'ListPoemPage', query: { listId: list.id }}"> {{ list.name[0].text }} [{{ list.name[1].text }}] </router-link>
    </div>

  </div>
  <!-- </body> -->
</template>

<script>
import StaticContentService from '@/services/StaticContentService'
require('../assets/css/poem_page.css')

export default {
  data () {
    return {
      listOfLists: []
    }
  },
  created () {
    this.getListOfLists()
  },
  methods: {
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

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
