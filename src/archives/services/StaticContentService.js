import Api from '@/services/Api'

export default {

  getListOfLists () {
    return Api().get('get-list-of-lists.php')
  },

  getPoemList (listId) {
    return Api().get('get-list.php', {
      params: {
        listId: listId
      }})
  },

  getPoem (poemId) {
    return Api().get('get-poem.php', {
      params: {
        poemId: poemId
      }})
  }
}
