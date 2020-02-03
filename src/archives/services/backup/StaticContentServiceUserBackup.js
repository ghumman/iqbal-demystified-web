import Api from '@/services/ApiUser'

export default {

  // the way we're sending parameters like following is becuase 
  // apicall needs to be sent as GET and
  // rest of parameters as POST
/*
  // login function call
  try_login (inputUsername, inputPassword) {
    // return Api().post('apicall=login', {
    return Api().get('', {
	params: {
    		username: inputUsername,
    		password: inputPassword
	}
   })
  }
*/

/*
  // login function call
  try_login (inputUsername, inputPassword) {
    return Api().post('/', {
    		username: inputUsername,
    		password: inputPassword
   })
  }

*/

  // login function call
  
  /*try_login (inputUsername, inputPassword) {
    var qs = require('qs');
    // const querystring = require('querystring');
    // return Api().post('', querystring.stringify({
    return JSON.stringify(Api().post('', qs.stringify({
    // return Api().post('', {
	username: 'test',
	password: 'test' 
    })))
  }*/

  try_login (inputUsername, inputPassword) {
	var params = new URLSearchParams();
	params.append('username', 'test');
	params.append('password', 'test');
	return Api().post('', params); 
    // var qs = require('qs');
    // const querystring = require('querystring');
    // return Api().post('', querystring.stringify({
    /*return JSON.stringify(Api().post('', qs.stringify({
    // return Api().post('', {
	username: 'test',
	password: 'test' 
    })))*/
  }
  // signup function call
  // TODO: following needs to be implemented
  /*try_signup () {
    return Api().post('apicall=signup', {
    	firstName: 'Fred',
    	lastName: 'Flintstone'
   })
  }*/
}
