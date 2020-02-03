import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://icanmakemyownapp.com/iqbal/v3/'
    // baseURL: 'http://ghummantech.com/dourbeen_api.php?apicall=login'
    // baseURL: 'http://ghummantech.com/dourbeen_api.php?apicall=login/'
    // baseURL: 'http://ghummantech.com/'
    // baseURL: 'http://ghummantech.com/dourbeen_api.php?apicall=login',
    // headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    // headers: {'Content-Type': 'application/json'}
    // timeout: 1000,
  })
  // axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
  // axios.defaults.headers.post['Content-Type'] = 'application/json';
}
