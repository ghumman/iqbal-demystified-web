export default {

  getPoemList (listId) {
        const yamlFile = require('!raw-loader!../assets/lists/' + listId + '.yaml');
        console.log("yamlFile: ");
        console.log(yamlFile.default);
        return yamlFile.default;

  },

  getPoemListSearch (listId) {
	var  YAML = require('yamljs');
	  	
	var yamlFile = Array(11);
	var yamlObject = Array(11);
	var i, j, k;
	var newList =  {poems: []};


	for (i=1; i<=11; i++)

		if (i <= 9){
        		yamlFile[i-1] = require('!raw-loader!../assets/lists/List_00' + i + '.yaml');
      			yamlObject[i-1] = YAML.parse(yamlFile[i-1].default);
		}
		else{
	       		yamlFile[i-1] = require('!raw-loader!../assets/lists/List_0' + i + '.yaml');
      			yamlObject[i-1] = YAML.parse(yamlFile[i-1].default);
		}

      	console.log("Testing");

for (k =0; k<yamlObject.length; k++){
for (i=0; i<(yamlObject[k].sections).length; i++) {

	if(Object.keys(yamlObject[k].sections[i]) === "poems"){
		for (j=0; j<(yamlObject[k].sections[i].poems).length; j++) {
			if (JSON.stringify(yamlObject[k].sections[i].poems[j].poemName[0].text).match(listId)){
				newList['poems'].push(yamlObject[k].sections[i].poems[j]);
		
				console.log("Inside second for");
				console.log(yamlObject[k].sections[i].poems[j].poemName[0].text);
			}
		}
	}
}
}

      	console.log("Testing Finished");

return newList;

  },

  getPoemSearch (poemId) {
	var  YAML = require('yamljs');

	var yamlFile = Array(1440);
	var yamlObject = Array(1440);


	var i, k, l;
	var numberOfFiles = [172, 179, 202, 43, 19, 31, 163, 153, 61, 25, 392];
	var sumOfFiles = [0, 172, 351, 553, 596, 615, 646, 809, 962, 1023, 1048];

	var newList =  {sher: []};

	for (l=1; l<=numberOfFiles.length; l++){
	for (i=1; i<=numberOfFiles[l-1]; i++){
		if (l <=9 ){	// if l/books number is between 1-9
		if (i <= 9){
        		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!../assets/poems/00' + l + '/00' + l + '_00' + i + '.yaml');
      			yamlObject[i-1 + sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else if (i <= 99){
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!../assets/poems/00' + l + '/00' + l + '_0' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else {
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!../assets/poems/00' + l + '/00' + l + '_' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		}	// if l <= 9 ends
		else {	// else if l/books nubmer is between 10-11
		if (i <= 9){
        		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!../assets/poems/0' + l + '/0' + l + '_00' + i + '.yaml');
      			yamlObject[i-1 + sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else if (i <= 99){
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!../assets/poems/0' + l + '/0' + l + '_0' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}
		else {
	       		yamlFile[i-1 + sumOfFiles[l-1]] = require('!raw-loader!../assets/poems/0' + l + '/0' + l + '_' + i + '.yaml');
      			yamlObject[i-1+sumOfFiles[l-1]] = YAML.parse(yamlFile[i-1+sumOfFiles[l-1]].default);
		}

		}	// else if l > 9 ends
}
}


      	console.log("Testing");

console.log(yamlObject.length);
for (k =0; k<yamlObject.length; k++){
for (i=0; i<(yamlObject[k].sher).length; i++) {

			if (JSON.stringify(yamlObject[k].sher[i].sherContent[0].text).match(poemId)){
				newList['sher'].push(yamlObject[k].sher[i]);
		
				console.log("Inside second for");
				console.log(yamlObject[k].sher[i]);

		}
}
}

      	console.log("Testing Finished");

return newList;

  },
  getPoem (poemId) {
	// split the stirng listId
	var arr = poemId.split("_");

	//print both parts of string
	console.log("arr[0]: " + arr[0]);
	console.log("arr[1]: " + arr[1]);

        const yamlFile = require('!raw-loader!../assets/poems/' + arr[0] + '/' + poemId + '.yaml');
        console.log(yamlFile.default);
        return yamlFile.default;

  },

    getRecentSher (sherList) {
	var  YAML = require('yamljs');
	console.log("Inside getRecentSher");
	console.log(sherList);

	var newList =  {sher: []};
	var i;
	var sherArray = sherList.split(",");
	for (i=0; i < (sherArray.length - 1); i++){

	console.log("sherArray");
	console.log(sherArray);

	var arr = sherArray[i].split("_");

        // const yamlFile = require('raw-loader!./../assets/poems/' + arr[0] + '/' + sherList + '.yaml');

        const yamlFile = require('!raw-loader!../assets/poems/' + arr[0] + '/' + arr[0] + '_' + arr[1] + '.yaml');

	var sherIndex = arr[2] - 1;

	console.log("sherIndex");
	console.log(sherIndex);

	var yamlObject = YAML.parse(yamlFile.default);

	newList['sher'].push(yamlObject.sher[sherIndex]);
	}	// for number of total shers ends
	
	console.log("newList");
	console.log(newList);

	return newList;
	
},	// function getRecent Sher ends

    getSherDiscussion (sherGeneralDiscussionServerResponse) {
	return sherGeneralDiscussionServerResponse;


	}	// function getSherDiscussion Sher
}	// default ends
