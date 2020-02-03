// import Api from '@/services/Api'
// import Api from '@/services/ApiLocal'
/*yaml = require('js-yaml');
fs   = require('fs');*/

export default {

  getListOfLists () {
    return Api().get('get-list-of-lists.php')
  },

  /*
  getPoemList (listId) {
    return Api().get('get-list.php', {
      params: {
        listId: listId
      }})
  },
  */

  getPoemList (listId) {

/*
// Get document, or throw exception on error
try {
  // var doc = yaml.safeLoad(fs.readFileSync('/home/ixti/example.yml', 'utf8'));
  var doc = yaml.safeLoad(fs.readFileSync('./List_Editor_Pick.yaml', 'utf8'));
  console.log(doc);
} catch (e) {
  console.log(e);
}
*/



    var rawFile = new XMLHttpRequest();
    // rawFile.open("GET", file, false);
    // rawFile.open("GET", './List_Editor_Pick.yaml', false);
    // rawFile.open("GET", './List_Editor_Pick.yaml', true);
    rawFile.open("GET", './List_Editor_Pick.yaml', true);
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText;
                alert(allText);
            }
        }
    }
    return rawFile.send(null);

/*
	var rawFile = new XMLHttpRequest();
  // rawFile.open("GET", "testing.txt", true);
  rawFile.open("GET", "List_Editor_Pick.yaml", true);
  rawFile.onreadystatechange = function() {
    if (rawFile.readyState === 4) {
      var allText = rawFile.responseText;
      document.getElementById("textSection").innerHTML = allText;
    }
  }
  return rawFile.send();
*/

/*
    return "---                                                           [308/370]\
name:\
- lang: ur\
  text: انتخاب\
- lang: en\
  text: Editor's Pick\
sections:\
- sectionName:\
  - lang: ur\
    text: بچوں کے لیے\
  - lang: en\
    text: FOR CHILDREN\
- poems:\
  - id: '001_006'\
    poemName:\
    - lang: ur\
      text: ايک مکڑا اور مکھي\
    - lang: en\
      text: A SPIDER AND A FLY";
*/


  },
  getPoem (poemId) {
    return Api().get('get-poem.php', {
      params: {
        poemId: poemId
      }})
  }
}
