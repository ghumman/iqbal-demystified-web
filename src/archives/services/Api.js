import axios from 'axios'

export default () => {
  return axios.create({
    // baseURL: 'http://icanmakemyownapp.com/iqbal/v3/'
    baseURL: 'http://ghummantech.com/'
  })
}
