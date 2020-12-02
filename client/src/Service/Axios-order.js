import axios from 'axios';

export default() => {
  axios.defaults.headers.common['Authorization'] = 'AUTH TOKEN';
axios.defaults.headers.post['Content-Type'] = 'application/json';

  return axios.create({
    baseURL: 'http://localhost:8080/api'
  })
}